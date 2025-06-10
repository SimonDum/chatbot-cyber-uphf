import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MessageSquare, Send, LogOut, Menu, User, ChevronRight, Plus, Shield, Sun, Moon, Trash2,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { chatAPI } from '../services/api';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface Conversation {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
  messages?: any[];
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [input, setInput] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadConversations();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const loadConversations = async () => {
    try {
      const data = await chatAPI.getConversations();
      setConversations(data);
    } catch (error) {
      console.error('Error loading conversations:', error);
      setError('Unable to load conversations');
    }
  };

  const selectConversation = async (conversation: Conversation) => {
    try {
      setCurrentConversation(conversation);
      setError('');
      
      const conversationData = await chatAPI.getConversation(conversation.id);
      
      const formattedMessages: Message[] = conversationData.messages?.map((msg: any) => ({
        id: msg.id?.toString() || crypto.randomUUID(),
        content: msg.content,
        role: msg.is_user ? 'user' : 'assistant',
        timestamp: new Date(msg.timestamp || Date.now()),
      })) || [];
      
      setMessages(formattedMessages);
    } catch (error) {
      console.error('Error loading conversation:', error);
      setError('Unable to load conversation');
    }
  };

  const startNewConversation = async () => {
    try {
      setError('');
      const newConversation = await chatAPI.createConversation();
      
      setConversations([newConversation, ...conversations]);
      setCurrentConversation(newConversation);
      setMessages([]);
    } catch (error) {
      console.error('Error creating conversation:', error);
      setError('Unable to create new conversation');
    }
  };

  const deleteConversation = async (conversationId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    
    try {
      await chatAPI.deleteConversation(conversationId);
      
      setConversations(conversations.filter(c => c.id !== conversationId));
      
      if (currentConversation?.id === conversationId) {
        setCurrentConversation(null);
        setMessages([]);
      }
    } catch (error) {
      console.error('Error deleting conversation:', error);
      setError('Unable to delete conversation');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !currentConversation || isLoading) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      content: input,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    setIsLoading(true);
    setError('');

    try {
      const response = await chatAPI.sendMessage(currentConversation.id, {
        content: input,
        conversation_id: currentConversation.id
      });
      
      const botMessage: Message = {
        id: crypto.randomUUID(),
        content: response.message || "Sorry, I couldn't process your request.",
        role: 'assistant',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
      loadConversations();
      
    } catch (error: any) {
      console.error('Error sending message:', error);
      
      setMessages(prev => prev.filter(msg => msg.id !== userMessage.id));
      
      if (error.response?.data?.detail) {
        setError(error.response.data.detail);
      } else {
        setError('Unable to send message. Please try again.');
      }
    } finally {
      setIsTyping(false);
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    logout();
    navigate('/');
  };

  const formatConversationTitle = (conversation: Conversation) => {
    if (conversation.title && conversation.title !== 'Nouvelle conversation') {
      return conversation.title;
    }
    return `Conversation ${new Date(conversation.created_at).toLocaleDateString()}`;
  };

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex text-gray-900 dark:text-gray-100">
        {/* Sidebar */}
        <div
          className={`${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } fixed md:relative w-72 bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg h-screen transition-transform duration-300 ease-in-out z-20 md:translate-x-0 border-r border-gray-200/50 dark:border-gray-700/50`}
        >
          <div className="p-4 border-b border-gray-200/50 dark:border-gray-700/50">
            <button
              onClick={startNewConversation}
              className="w-full flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg transition-colors font-medium"
            >
              <Plus className="w-5 h-5" />
              <span>New Chat</span>
            </button>
          </div>

          <div className="p-4 space-y-2 overflow-y-auto flex-1">
            {conversations.map(conv => (
              <div
                key={conv.id}
                className={`p-3 rounded-lg cursor-pointer transition-all group relative ${
                  currentConversation?.id === conv.id
                    ? 'bg-blue-100/80 dark:bg-blue-900/50 border border-blue-200/50'
                    : 'hover:bg-gray-100/80 dark:hover:bg-gray-700/50'
                }`}
                onClick={() => selectConversation(conv)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <MessageSquare className="w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                    <span className="font-medium text-gray-700 dark:text-gray-100 truncate">
                      {formatConversationTitle(conv)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={(e) => deleteConversation(conv.id, e)}
                      className="p-1 opacity-0 group-hover:opacity-100 hover:bg-red-100/80 dark:hover:bg-red-900/50 rounded transition-all"
                      title="Delete conversation"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                    <ChevronRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {new Date(conv.updated_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>

          <div className="absolute bottom-0 w-full p-4 border-t border-gray-200/50 dark:border-gray-700/50 bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-100">
                    {user?.full_name || user?.email || 'User'}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {user?.email}
                  </p>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="p-2 hover:bg-gray-100/80 dark:hover:bg-gray-700/50 rounded-lg transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-5 h-5 text-gray-500 dark:text-gray-300" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col h-screen">
          {/* Header */}
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="md:hidden p-2 hover:bg-gray-100/80 dark:hover:bg-gray-700/50 rounded-lg transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
              <Shield className="w-6 h-6 text-blue-500" />
              <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                {currentConversation 
                  ? formatConversationTitle(currentConversation)
                  : 'CyberGuard AI Assistant'
                }
              </h1>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 hover:bg-gray-100/80 dark:hover:bg-gray-700/50 rounded-lg transition-colors"
              title="Toggle Dark Mode"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50/90 dark:bg-red-900/20 border-l-4 border-red-500 p-4 m-4 rounded backdrop-blur-sm">
              <p className="text-red-700 dark:text-red-300">{error}</p>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {!currentConversation ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="bg-blue-50/80 dark:bg-blue-900/50 p-6 rounded-full inline-block backdrop-blur-sm">
                    <Shield className="w-12 h-12 text-blue-500" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                    Welcome to CyberGuard AI
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 max-w-md">
                    Create a new conversation or select an existing one to start chatting about cybersecurity topics.
                  </p>
                </div>
              </div>
            ) : messages.length === 0 ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="bg-blue-50/80 dark:bg-blue-900/50 p-6 rounded-full inline-block backdrop-blur-sm">
                    <Shield className="w-12 h-12 text-blue-500" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                    Start Your Conversation
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 max-w-md">
                    Ask me anything about cybersecurity, from basic concepts to advanced topics. I'm here to help you stay safe online.
                  </p>
                </div>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-2xl backdrop-blur-sm ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                        : 'bg-white/90 dark:bg-gray-800/90 border border-gray-200/50 dark:border-gray-700/50 text-gray-800 dark:text-gray-100'
                    }`}
                  >
                    <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                    <p className={`text-xs mt-2 ${
                      message.role === 'user' ? 'text-blue-100' : 'text-gray-400 dark:text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))
            )}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/90 dark:bg-gray-800/90 border border-gray-200/50 dark:border-gray-700/50 p-4 rounded-2xl backdrop-blur-sm">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          {currentConversation && (
            <form onSubmit={handleSubmit} className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border-t border-gray-200/50 dark:border-gray-700/50 p-4">
              <div className="max-w-4xl mx-auto flex space-x-4">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 border border-gray-300/50 dark:border-gray-600/50 bg-white/90 dark:bg-gray-900/90 text-gray-900 dark:text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}