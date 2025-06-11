import React from 'react';
import { MessageSquare, ChevronRight, Trash2 } from 'lucide-react';
import { ConversationResponse } from '../types';

interface ConversationItemProps {
  conversation: ConversationResponse;
  isActive: boolean;
  onSelect: (conversation: ConversationResponse) => void;
  onDelete: (conversationId: number, e: React.MouseEvent) => void;
  formatTitle: (conversation: ConversationResponse) => string;
}

export const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
  isActive,
  onSelect,
  onDelete,
  formatTitle
}) => {
  return (
    <div
      className={`p-3 rounded-lg cursor-pointer transition-all group relative ${
        isActive
          ? 'bg-blue-100/80 dark:bg-blue-900/50 border border-blue-200/50'
          : 'hover:bg-gray-100/80 dark:hover:bg-gray-700/50'
      }`}
      onClick={() => onSelect(conversation)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <MessageSquare className="w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
          <span className="font-medium text-gray-700 dark:text-gray-100 truncate">
            {formatTitle(conversation)}
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={(e) => onDelete(conversation.id, e)}
            className="p-1 opacity-0 group-hover:opacity-100 hover:bg-red-100/80 dark:hover:bg-red-900/50 rounded transition-all"
            title="Delete conversation"
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </button>
          <ChevronRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        {new Date(conversation.updated_at).toLocaleDateString('fr-FR')}
      </p>
    </div>
  );
};