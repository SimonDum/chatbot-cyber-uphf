import React from 'react';
import { Menu, Sun, Moon, } from 'lucide-react';
import { ConversationResponse } from '../types';

interface ChatHeaderProps {
  currentConversation: ConversationResponse | null;
  onToggleSidebar: () => void;
  formatConversationTitle: (conversation: ConversationResponse) => string;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  currentConversation,
  onToggleSidebar,
  formatConversationTitle
}) => {
  return (
    <header className="bg-black/20 backdrop-blur-xl border-b border-white/10 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleSidebar}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-white font-semibold text-lg">
            {currentConversation ? formatConversationTitle(currentConversation) : ''}
          </h1>
        </div>
      </div>
    </header>
  );
};