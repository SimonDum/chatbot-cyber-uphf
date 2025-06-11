import React from 'react';
import { Menu, Sun, Moon, } from 'lucide-react';
import { ConversationResponse } from '../types';

interface ChatHeaderProps {
  currentConversation: ConversationResponse | null;
  darkMode: boolean;
  onToggleSidebar: () => void;
  onToggleDarkMode: () => void;
  formatConversationTitle: (conversation: ConversationResponse) => string;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  currentConversation,
  darkMode,
  onToggleSidebar,
  onToggleDarkMode,
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
            {currentConversation ? formatConversationTitle(currentConversation) : 'CyberBot Assistant'}
          </h1>
        </div>
        <button
          onClick={onToggleDarkMode}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          {darkMode ? <Sun className="w-5 h-5 text-white" /> : <Moon className="w-5 h-5 text-white" />}
        </button>
      </div>
    </header>
  );
};