export interface User {
  id: number;
  email: string;
  full_name: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  full_name: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

export interface Message {
  id: number;
  content: string;
  is_user: boolean;
  timestamp: string;
  conversation_id: number;
}

export interface Conversation {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
  messages: Message[];
}

export interface MessageCreate {
  content: string;
  conversation_id?: number;
}

export interface ChatResponse {
  message: Message;
  conversation_id: Message;
  sources: string[];
}