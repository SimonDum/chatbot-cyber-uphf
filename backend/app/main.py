from app.services.chatbot import get_chatbot_service
from fastapi import FastAPI, Depends
from functools import lru_cache
from sqlalchemy.orm import Session
from app.core.database import get_db
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import auth, chat
from app.core.database import engine
from app.models import user, conversation
import os
from app.services.chatbot import ChatBotService
from app.core.database import SessionLocal
from app.models.user import User


# Create database tables
user.Base.metadata.create_all(bind=engine)
conversation.Base.metadata.create_all(bind=engine)

app = FastAPI(title="RAG Chatbot API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React app URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event(db: Session = Depends(get_db), chatbot_service: ChatBotService = Depends(get_chatbot_service)):
    print("▶ Loading documents...")
    folder = "documents"
    for filename in os.listdir(folder):
        path = os.path.join(folder, filename)
        ext = filename.split(".")[-1].lower()

        try:
            chunks = chatbot_service.process_document(path, ext, user.id, db)
            print(f"✅ {filename} → {chunks} chunks")
        except Exception as e:
            print(f"❌ {filename} → {str(e)}")

        db.commit()

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(chat.router, prefix="/api/chat", tags=["chat"])