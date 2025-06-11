import axios from 'axios';
import type { 
  UserLoginRequest, 
  UserRegisterRequest,
  User,
  ConversationResponse, 
  MessageCreate, 
  ChatResponse, 
  TokenLoginResponse
} from '../types';

const API_BASE_URL = 'http://localhost:8000/api'; // Adjust this to your FastAPI server URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: async (credentials: UserLoginRequest): Promise<TokenLoginResponse> => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  register: async (credentials: UserRegisterRequest): Promise<User> => {
    const response = await api.post('/auth/register', credentials);
    return response.data;
  },

  getMe: async (): Promise<User> => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

export const chatAPI = {
  getConversations: async (): Promise<ConversationResponse[]> => {
    const response = await api.get('/chat/conversations');
    return response.data;
  },

  createConversation: async (): Promise<ConversationResponse> => {
    const response = await api.post('/chat/conversations');
    return response.data;
  },

  getConversation: async (conversationId: number): Promise<ConversationResponse> => {
    const response = await api.get(`/chat/conversations/${conversationId}`);
    return response.data;
  },

  deleteConversation: async (conversationId: number): Promise<void> => {
    await api.delete(`/chat/conversations/${conversationId}`);
  },

  sendMessage: async (conversationId: number, message: MessageCreate): Promise<ChatResponse> => {
    const response = await api.post(`/chat/conversations/${conversationId}/messages`, message);
    return response.data;
  },
};

export default api;