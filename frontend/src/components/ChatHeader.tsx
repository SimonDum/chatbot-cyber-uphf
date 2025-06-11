import React from 'react';
import { Menu, Shield, Sun, Moon } from 'lucide-react';
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
    <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50 p-4 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <button
          onClick={onToggleSidebar}
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
        onClick={onToggleDarkMode}
        className="p-2 hover:bg-gray-100/80 dark:hover:bg-gray-700/50 rounded-lg transition-colors"
        title="Toggle Dark Mode"
      >
        {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>
    </div>
  );
};