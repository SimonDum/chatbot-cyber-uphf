import React from 'react';
import { Bot, User } from 'lucide-react';
import type { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className={`flex items-start space-x-3 ${message.role == 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        message.role == 'user'
          ? 'bg-blue-500' 
          : 'bg-slate-100'
      }`}>
        {message.role == 'user' ? (
          <User className="w-4 h-4 text-white" />
        ) : (
          <Bot className="w-4 h-4 text-slate-600" />
        )}
      </div>
      
      <div className={`flex-1 max-w-3xl ${message.role == 'user' ? 'flex justify-end' : ''}`}>
        <div className={`px-4 py-3 rounded-2xl ${
          message.role == 'user'
            ? 'bg-blue-500 text-white'
            : 'bg-white border border-slate-200'
        }`}>
          <p className={`text-sm leading-relaxed ${
            message.role == 'user' ? 'text-white' : 'text-slate-800'
          }`}>
            {message.content}
          </p>
          <p className={`text-xs mt-2 ${
            message.role == 'user' ? 'text-blue-100' : 'text-slate-500'
          }`}>
            {formatTime(message.created_at)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;