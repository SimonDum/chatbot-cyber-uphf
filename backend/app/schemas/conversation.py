from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from datetime import datetime

class MessageCreate(BaseModel):
    content: str
    conversation_id: Optional[int] = None

class Message(BaseModel):
    id: int
    role: str
    content: str
    metadata_: Dict[str, Any]
    created_at: datetime
    
    class Config:
        from_attributes = True

class ConversationCreate(BaseModel):
    title: Optional[str] = "New Conversation"

class Conversation(BaseModel):
    id: int
    title: str
    user_id: int
    created_at: datetime
    updated_at: Optional[datetime]
    messages: List[Message] = []
    
    class Config:
        from_attributes = True

class ChatResponse(BaseModel):
    message: str
    conversation_id: int
    sources: List[Dict[str, Any]] = []