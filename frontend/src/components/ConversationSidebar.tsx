import React from 'react';
import { Plus, User, LogOut } from 'lucide-react';
import { ConversationResponse } from '../types';
import { ConversationItem } from './ConversationItem';

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
    <div
      className={`${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } fixed md:relative w-72 bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg h-screen transition-transform duration-300 ease-in-out z-20 md:translate-x-0 border-r border-gray-200/50 dark:border-gray-700/50`}
    >
      <div className="p-4 border-b border-gray-200/50 dark:border-gray-700/50">
        <button
          onClick={onNewConversation}
          className="w-full flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg transition-colors font-medium"
        >
          <Plus className="w-5 h-5" />
          <span>New Chat</span>
        </button>
      </div>

      <div className="p-4 space-y-2 overflow-y-auto flex-1">
        {conversations.map(conv => (
          <ConversationItem
            key={conv.id}
            conversation={conv}
            isActive={currentConversation?.id === conv.id}
            onSelect={onSelectConversation}
            onDelete={onDeleteConversation}
            formatTitle={formatConversationTitle}
          />
        ))}
      </div>

      <div className="absolute bottom-0 w-full p-4 border-t border-gray-200/50 dark:border-gray-700/50 bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
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
            onClick={onSignOut}
            className="p-2 hover:bg-gray-100/80 dark:hover:bg-gray-700/50 rounded-lg transition-colors"
            title="Sign Out"
          >
            <LogOut className="w-5 h-5 text-gray-500 dark:text-gray-300" />
          </button>
        </div>
      </div>
    </div>
  );
};