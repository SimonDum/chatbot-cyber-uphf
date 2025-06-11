import React from 'react';
import { ConversationResponse } from '../types';
import { Shield, MessageSquare, Plus, Trash2, LogOut, User } from 'lucide-react';

interface ConversationSidebarProps {
  conversations: ConversationResponse[];
  currentConversation: ConversationResponse | null;
  isOpen: boolean;
  user: any;
  onNewConversation: () => void;
  onSelectConversation: (conversation: ConversationResponse) => void;
  onDeleteConversation: (conversationId: number, e: React.MouseEvent) => void;
  onSignOut: () => void;
  formatConversationTitle: (conversation: ConversationResponse) => string;
}

export const ConversationSidebar: React.FC<ConversationSidebarProps> = ({
  conversations,
  currentConversation,
  isOpen,
  user,
  onNewConversation,
  onSelectConversation,
  onDeleteConversation,
  onSignOut,
  formatConversationTitle
}) => {
  return (
    <div className={`${isOpen ? 'w-80' : 'w-0'} transition-all duration-300 overflow-hidden bg-black/20 backdrop-blur-xl border-r border-white/10`}>
      <div className="h-full flex flex-col p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500/20 rounded-lg backdrop-blur-sm">
              <Shield className="w-6 h-6 text-blue-400" />
            </div>
            <span className="text-white font-bold">CyberBot</span>
          </div>
        </div>

        {/* New Conversation Button */}
        <button
          onClick={onNewConversation}
          className="flex items-center space-x-3 w-full p-3 bg-blue-500/20 hover:bg-blue-500/30 rounded-xl text-white font-medium transition-all backdrop-blur-sm border border-blue-400/30 hover:border-blue-400/50 mb-4"
        >
          <Plus className="w-5 h-5" />
          <span>Nouvelle conversation</span>
        </button>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto space-y-2">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => onSelectConversation(conversation)}
              className={`group flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                currentConversation?.id === conversation.id
                  ? 'bg-blue-500/30 border border-blue-400/50'
                  : 'bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <MessageSquare className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span className="text-white text-sm truncate">
                  {formatConversationTitle(conversation)}
                </span>
              </div>
              <button
                onClick={(e) => onDeleteConversation(conversation.id, e)}
                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-500/20 rounded transition-all"
              >
                <Trash2 className="w-4 h-4 text-red-400" />
              </button>
            </div>
          ))}
        </div>

        {/* User Section */}
        <div className="border-t border-white/10 pt-4 mt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 min-w-0">
              <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-blue-400" />
              </div>
              <div className="min-w-0">
                <p className="font-medium text-gray-800 dark:text-gray-100 truncate">
                  {user?.full_name || user?.email || 'User'}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  {user?.email}
                </p>
              </div>
            </div>
            <button
              onClick={onSignOut}
              className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4 text-red-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};