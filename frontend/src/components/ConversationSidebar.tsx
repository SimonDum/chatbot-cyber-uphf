import React, { useState, useEffect } from 'react';
import { Plus, MessageSquare, Trash2, MoreVertical } from 'lucide-react';
import { chatAPI } from '../services/api';
import type { ConversationResponse } from '../types';

interface ConversationSidebarProps {
  conversations: ConversationResponse[];
  activeConversationId: number | null;
  onSelectConversation: (id: number) => void;
  onCreateConversation: () => void;
  onDeleteConversation: (id: number) => void;
  onRefreshConversations: () => void;
}

const ConversationSidebar: React.FC<ConversationSidebarProps> = ({
  conversations,
  activeConversationId,
  onSelectConversation,
  onCreateConversation,
  onDeleteConversation,
  onRefreshConversations,
}) => {
  const [showDeleteMenu, setShowDeleteMenu] = useState<number | null>(null);

  const handleDeleteConversation = async (id: number) => {
    try {
      await chatAPI.deleteConversation(id);
      onDeleteConversation(id);
      setShowDeleteMenu(null);
    } catch (error) {
      console.error('Failed to delete conversation:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 168) { // 7 days
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="w-80 bg-white border-r border-slate-200 flex flex-col h-full">
      <div className="p-4 border-b border-slate-200">
        <button
          onClick={onCreateConversation}
          className="w-full flex items-center justify-center space-x-2 bg-blue-500 text-white px-4 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">New Conversation</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {conversations.length === 0 ? (
          <div className="p-4 text-center text-slate-500">
            <MessageSquare className="w-12 h-12 mx-auto mb-3 text-slate-300" />
            <p className="text-sm">No conversations yet</p>
            <p className="text-xs text-slate-400 mt-1">Start a new chat to begin</p>
          </div>
        ) : (
          <div className="p-2">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`relative group flex items-center p-3 rounded-lg cursor-pointer transition-all mb-1 ${
                  activeConversationId === conversation.id
                    ? 'bg-blue-50 border border-blue-200'
                    : 'hover:bg-slate-50'
                }`}
                onClick={() => onSelectConversation(conversation.id)}
              >
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-slate-800 truncate">
                    {conversation.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {formatDate(conversation.updated_at)}
                  </p>
                  {conversation.messages.length > 0 && (
                    <p className="text-xs text-slate-400 truncate mt-1">
                      {conversation.messages[conversation.messages.length - 1].content}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowDeleteMenu(showDeleteMenu === conversation.id ? null : conversation.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-200 rounded transition-all"
                  >
                    <MoreVertical className="w-4 h-4 text-slate-500" />
                  </button>

                  {showDeleteMenu === conversation.id && (
                    <div className="absolute right-0 top-8 bg-white border border-slate-200 rounded-lg shadow-lg z-10 min-w-[120px]">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteConversation(conversation.id);
                        }}
                        className="w-full flex items-center space-x-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg text-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationSidebar;