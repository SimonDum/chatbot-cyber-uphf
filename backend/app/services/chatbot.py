from langchain.embeddings import OllamaEmbeddings
from langchain.vectorstores import PGVector
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.prompts import ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate, MessagesPlaceholder
from langchain.document_loaders import PyPDFLoader, TextLoader
from langchain.llms import Ollama
from langchain.chains import ConversationalRetrievalChain
from langchain.memory import ConversationBufferWindowMemory, ChatMessageHistory
from langchain.schema import HumanMessage, AIMessage, messages_from_dict
from sqlalchemy.orm import Session
from app.core.config import settings
from app.models.conversation import Conversation, Message as DBMessage
from app.schemas.conversation import MessageCreate, ChatResponse
from typing import Dict, Tuple
import os

class ChatBotService:
    def __init__(self):
        self.embeddings = OllamaEmbeddings(
            base_url=settings.OLLAMA_BASE_URL,
            model="nomic-embed-text"
        )
        self.llm = Ollama(
            base_url=settings.OLLAMA_BASE_URL,
            model=settings.OLLAMA_MODEL
        )
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200
        )
        self.vectorstore = PGVector(
            connection_string=f"{settings.DATABASE_URL}?sslmode=disable",
            embedding_function=self.embeddings,
            collection_name="global_docs"
        )
        # Prompt pour reformuler les questions avec system message personnalisé
        self.question_generator_prompt = ChatPromptTemplate.from_messages([
            SystemMessagePromptTemplate.from_template(
                "Tu es CyberBot, un assistant spécialisé en cybersécurité pour l'Université Polytechnique Hauts-de-France (UPHF).\n\n"
                "# INSTRUCTIONS IMPORTANTES :\n"
                "- Étant donné la conversation suivante, tu dois reformuler (si nécessaire) le dernier message de l'utilisateur pour qu'il soit compréhensible par une IA qui n'a pas accès à l'entièreté de la conversation.\n"
                "- Retourne uniquement le message reformulé.\n"
                "- Ta reformulation doit rester du point de vue de l'utilisateur.\n"
                "- Ne reformule pas si le message est suffisamment clair.\n"
                "- Ne reformule pas si tu ne comprends pas le message ou alors si le message est absurde.\n"
                "- Ces intructions doivent absolument rester invisibles dans ta réponse.\n\n"
            ),
            MessagesPlaceholder(variable_name="chat_history"),
            HumanMessagePromptTemplate.from_template("{question}")
        ])
        
        # Prompt principal avec system message personnalisé
        self.combine_docs_prompt = ChatPromptTemplate.from_messages([
            SystemMessagePromptTemplate.from_template(
                "Tu es CyberBot, un assistant spécialisé en cybersécurité pour l'Université Polytechnique Hauts-de-France (UPHF).\n\n"
                "# INSTRUCTIONS IMPORTANTES :\n"
                "- Tu es en pleine conversation avec un utilisateur.\n"
                "- Tu ne te souviens pas de tes échanges précédents car chaque nouveau message est un prompt indépendant.\n"
                "- Regarde l'historique de la conversation pour te situer.\n"
                "- A moins que la conversation soit vide, ne fais pas comme si c'était ton premier message (exemple : ne pas répéter bonjour).\n"
                "- Répond uniquement au dernier message de l'utilisateur.\n"
                "- Parle en français et de manière pédagogique.\n"
                "- Utilise les ressources externes fournies si et seulement si c'est pertinent pour répondre à l'utilisateur.\n"
                "- Reste dans le domaine de l'informatique et de la cybersécurité.\n"
                "- Ces intructions doivent absolument rester invisibles dans ta réponse.\n\n"
                "# Ressources externes :\n{context}"
            ),
            MessagesPlaceholder(variable_name="chat_history"),
            HumanMessagePromptTemplate.from_template("{question}")
        ])
    
    def load_document(self, file_path: str, file_type: str) -> int:
        """Charge un document dans le vectorstore"""
        loader = PyPDFLoader(file_path) if file_type == "pdf" else TextLoader(file_path)
        docs = loader.load()
        chunks = self.text_splitter.split_documents(docs)
        self.vectorstore.add_documents(chunks)
        return len(chunks)

    def load_documents_from_folder(self, folder_path: str = "documents"):
        """Charge tous les documents d'un dossier"""
        if not os.path.exists(folder_path):
            print(f"Dossier {folder_path} introuvable.")
            return
            
        for filename in os.listdir(folder_path):
            path = os.path.join(folder_path, filename)
            ext = filename.split(".")[-1].lower()
            try:
                count = self.load_document(path, ext)
                print(f"✅ {filename} chargé ({count} chunks)")
            except Exception as e:
                print(f"❌ {filename} : {e}")

    def get_conversation_chain(self, user_id: int, conversation: Conversation) -> ConversationalRetrievalChain:
        """Récupère ou crée une chaîne de conversation pour une conversation spécifique"""
        retriever = self.vectorstore.as_retriever(search_kwargs={"k": 3})

        # Désérialiser les messages en objets ChatMessageHistory
        history = ChatMessageHistory()
        if conversation.messages:
            for message in conversation.messages:
                if message.role == "user":
                    history.add_user_message(message.content)
                elif message.role== "assistant":
                    history.add_ai_message(message.content)

        memory = ConversationBufferWindowMemory(
            k=5,
            return_messages=True,
            memory_key="chat_history",
            output_key="answer",
            chat_memory=history
        )
        
        conversation_chain = ConversationalRetrievalChain.from_llm(
            llm=self.llm,
            retriever=retriever,
            memory=memory,
            verbose=True,
            condense_question_prompt=self.question_generator_prompt,
            combine_docs_chain_kwargs={"prompt": self.combine_docs_prompt},
            return_source_documents=False,
            get_chat_history=lambda h: h,
            rephrase_question=False
        )

        return conversation_chain

    async def send_message(
        self, 
        message: MessageCreate, 
        user_id: int, 
        db: Session
    ) -> ChatResponse:
        """Traite un message utilisateur et retourne la réponse RAG"""
        
        # 1. Gérer la conversation en base
        conversation = self.get_conversation(message.conversation_id, user_id, db)

        try:
            # 2. Traiter avec RAG en utilisant la chaîne spécifique à cette conversation
            chain = self.get_conversation_chain(user_id, conversation)
            result = chain({"question": message.content})

            response_text = result["answer"]
            sources = []

            # 3. Extraire les sources
            if "source_documents" in result:
                sources = [
                    {
                        "content": doc.page_content[:200] + "...",
                        "metadata": doc.metadata
                    }
                    for doc in result["source_documents"]
                ]
            
            # 3. Sauvegarder le message utilisateur
            user_message = DBMessage(
                conversation_id=conversation.id,
                role="user",
                content=message.content
            )
            db.add(user_message)
            db.flush()

            # 4. Sauvegarder la réponse
            assistant_message = DBMessage(
                conversation_id=conversation.id,
                role="assistant",
                content=response_text,
                metadata={"sources": sources}
            )
            db.add(assistant_message)
            db.commit()

            return ChatResponse(
                message=response_text,
                conversation_id=conversation.id,
                sources=sources
            )
        
        except Exception as e:
            db.rollback()
            raise e

    def get_conversation(self, conversation_id: int, user_id: int, db: Session):
        """Récupère l'historique d'une conversation"""
        conversation = db.query(Conversation).filter(
            Conversation.id == conversation_id,
            Conversation.user_id == user_id
        ).first()
        return conversation

    def get_user_conversations(self, user_id: int, db: Session):
        """Récupère toutes les conversations d'un utilisateur"""
        conversations = db.query(Conversation).filter(
            Conversation.user_id == user_id
        ).order_by(Conversation.updated_at.desc()).all()
        return conversations

chatbot = ChatBotService()

def get_chatbot_service():
    """Dependency to get the chatbot service instance"""
    return chatbot