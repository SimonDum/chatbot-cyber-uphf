import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { chatAPI } from '../services/api';
import { ConversationResponse, Message } from '../types';
import { ConversationSidebar } from './ConversationSidebar';
import { ChatHeader } from './ChatHeader';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { ErrorDisplay } from './ErrorDisplay2';
import { EmptyState } from './EmptyState'
import { TypingIndicator } from './TypingIndicator2';

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<ConversationResponse[]>([]);
  const [currentConversation, setCurrentConversation] = useState<ConversationResponse | null>(null);
  const [input, setInput] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
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

  const selectConversation = async (conversation: ConversationResponse) => {
    try {
      setCurrentConversation(conversation);
      setError('');
      
      const conversationData = await chatAPI.getConversation(conversation.id);
      
      const formattedMessages: Message[] = conversationData.messages;
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

    const randomBuffer = new Uint32Array(1);
    const userMessage: Message = {
      id: crypto.getRandomValues(randomBuffer)[0],
      content: input,
      role: 'user',
      created_at: new Date().toISOString(),
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

      const randomBuffer = new Uint32Array(1);
      const botMessage: Message = {
        id: crypto.getRandomValues(randomBuffer)[0],
        content: response.message || "Sorry, I couldn't process your request.",
        role: 'assistant',
        created_at: new Date().toISOString(),
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

  const formatConversationTitle = (conversation: ConversationResponse) => {
    if (conversation.title && conversation.title !== 'Nouvelle conversation') {
      return conversation.title;
    }
    return conversation.title;
  };

  return (
    <div className="min-h-screen relative">
      {/* Background avec parallax */}
      <div 
        className="fixed inset-0 bg-cover bg-center z-0"
        style={{ 
          backgroundImage: 'url(/pxfuel.jpg)',
          filter: 'brightness(0.4)',
        }}
      />
      
      {/* Overlay gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-indigo-900/30 z-0" />
      
      <div className="relative z-10 min-h-screen flex text-white">
        <ConversationSidebar
          conversations={conversations}
          currentConversation={currentConversation}
          isOpen={isSidebarOpen}
          user={user}
          onNewConversation={startNewConversation}
          onSelectConversation={selectConversation}
          onDeleteConversation={deleteConversation}
          onSignOut={handleSignOut}
          formatConversationTitle={formatConversationTitle}
        />

        <div className="flex-1 flex flex-col h-screen">
          <ChatHeader
            currentConversation={currentConversation}
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            formatConversationTitle={formatConversationTitle}
          />

          <ErrorDisplay error={error} />

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {!currentConversation ? (
              <EmptyState showWelcome={true} />
            ) : messages.length === 0 ? (
              <EmptyState showWelcome={false} />
            ) : (
              messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))
            )}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {currentConversation && (
            <ChatInput
              input={input}
              isLoading={isLoading}
              onInputChange={setInput}
              onSubmit={handleSubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
}