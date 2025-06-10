from app.services.chatbot import ChatBotService, get_chatbot_service
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.api.routes.auth import get_current_user
from app.models.user import User
from app.models.conversation import Conversation as ConversationModel # SQLAlchemy model
from app.schemas.conversation import MessageCreate, ChatResponse, Conversation # Pydantic schemas
from typing import List

router = APIRouter()

@router.get("/conversations", response_model=List[Conversation])
async def get_conversations(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
    chatbot_service: ChatBotService = Depends(get_chatbot_service)
):
    """Récupérer toutes les conversations de l'utilisateur"""
    conversations = chatbot_service.get_user_conversations(
        current_user.id, db
    )
    
    return conversations

@router.post("/conversations")
async def create_conversation(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Créer une nouvelle conversation"""
    try:
        new_conversation = ConversationModel(
            user_id=current_user.id,
            title="Nouvelle conversation",
        )
        db.add(new_conversation)
        db.commit()
        db.refresh(new_conversation)
        return new_conversation
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/conversations/{conversation_id}", response_model=Conversation)
async def get_conversation(
    conversation_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
    chatbot_service: ChatBotService = Depends(get_chatbot_service)
):
    """Récupérer une conversation spécifique avec son historique"""
    conversation = chatbot_service.get_conversation(
        conversation_id, current_user.id, db
    )
    if not conversation:
        raise HTTPException(status_code=404, detail="Conversation not found")
    return conversation

@router.delete("/conversations/{conversation_id}")
async def delete_conversation(
    conversation_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
    chatbot_service: ChatBotService = Depends(get_chatbot_service)
):
    """Supprimer une conversation"""
    conversation = db.query(ConversationModel).filter(
        ConversationModel.id == conversation_id,
        ConversationModel.user_id == current_user.id
    ).first()
    
    if not conversation:
        raise HTTPException(status_code=404, detail="Conversation not found")
    
    # Supprimer de la BDD
    db.delete(conversation)
    db.commit()
    
    return {"message": "Conversation deleted successfully"}

@router.post("/conversations/{conversation_id}/messages", response_model=ChatResponse)
async def send_message(
    conversation_id: int,
    message: MessageCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
    chatbot_service: ChatBotService = Depends(get_chatbot_service)
):
    """Envoyer un message dans une conversation spécifique"""
    # Vérifier que la conversation existe et appartient à l'utilisateur
    conversation = db.query(ConversationModel).filter(
        ConversationModel.id == conversation_id,
        ConversationModel.user_id == current_user.id
    ).first()
    
    if not conversation:
        raise HTTPException(status_code=404, detail="Conversation not found")
    
    try:
        # Forcer l'ID de conversation dans le message
        message.conversation_id = conversation_id
        response = await chatbot_service.send_message(message, current_user.id, db)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))