import React, { useState, useEffect } from 'react';
import ConversationSidebar from './ConversationSidebar';
import ChatInterface from './ChatInterface';
import { chatAPI } from '../services/api';
import type { Conversation } from '../types';

const ChatApp: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadConversations = async () => {
    try {
      const data = await chatAPI.getConversations();
      setConversations(data);
      
      // If no active conversation and we have conversations, select the first one
      if (!activeConversation && data.length > 0) {
        setActiveConversation(data[0]);
      }
    } catch (error) {
      console.error('Failed to load conversations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadConversation = async (conversationId: number) => {
    try {
      const conversation = await chatAPI.getConversation(conversationId);
      setActiveConversation(conversation);
    } catch (error) {
      console.error('Failed to load conversation:', error);
    }
  };

  const handleCreateConversation = async () => {
    try {
      const newConversation = await chatAPI.createConversation();
      setConversations(prev => [newConversation, ...prev]);
      setActiveConversation(newConversation);
    } catch (error) {
      console.error('Failed to create conversation:', error);
    }
  };

  const handleDeleteConversation = (conversationId: number) => {
    setConversations(prev => prev.filter(c => c.id !== conversationId));
    
    if (activeConversation?.id === conversationId) {
      const remainingConversations = conversations.filter(c => c.id !== conversationId);
      setActiveConversation(remainingConversations.length > 0 ? remainingConversations[0] : null);
    }
  };

  const handleSelectConversation = (conversationId: number) => {
    loadConversation(conversationId);
  };

  const handleMessageSent = () => {
    // Refresh the current conversation to get the latest messages
    if (activeConversation) {
      loadConversation(activeConversation.id);
    }
    // Also refresh the conversations list to update timestamps
    loadConversations();
  };

  useEffect(() => {
    loadConversations();
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading conversations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex">
      <ConversationSidebar
        conversations={conversations}
        activeConversationId={activeConversation?.id || null}
        onSelectConversation={handleSelectConversation}
        onCreateConversation={handleCreateConversation}
        onDeleteConversation={handleDeleteConversation}
        onRefreshConversations={loadConversations}
      />
      <ChatInterface
        conversation={activeConversation}
        onMessageSent={handleMessageSent}
      />
    </div>
  );
};

export default ChatApp;