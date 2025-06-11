import React from 'react';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] p-4 rounded-2xl backdrop-blur-sm ${
          message.role === 'user'
            ? 'bg-blue-500 text-white'
            : 'bg-white/90 dark:bg-gray-800/90 border border-gray-200/50 dark:border-gray-700/50 text-gray-800 dark:text-gray-100'
        }`}
      >
        <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
        <p className={`text-xs mt-2 ${
          message.role === 'user' ? 'text-blue-100' : 'text-gray-400 dark:text-gray-500'
        }`}>
          {new Date(message.created_at).toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
    </div>
  );
};