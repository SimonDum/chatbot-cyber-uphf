import React from 'react';
import { Shield } from 'lucide-react';
import { Message } from '../types';


// ChatMessage Component
interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-3xl ${message.role === 'user' ? 'order-2' : 'order-1'}`}>
        <div
          className={`p-4 rounded-2xl ${
            message.role === 'user'
              ? 'bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 text-white'
              : 'bg-white/10 backdrop-blur-sm border border-white/20 text-white'
          }`}
        >
          <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
        </div>
        <div className={`text-xs text-blue-200 mt-2 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
          {new Date(message.created_at).toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
      </div>
      {message.role !== 'user' && (
        <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
          <Shield className="w-4 h-4 text-blue-400" />
        </div>
      )}
    </div>
  );
};