import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Shield } from 'lucide-react';
import { Message } from '../types';

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
              ? 'bg-blue-500/20 backdrop-blur-sm border border-blue-400/30'
              : 'bg-white/10 backdrop-blur-sm border border-white/20'
          }`}
        >
          <div className="prose prose-invert prose-sm max-w-none
                         prose-headings:text-white 
                         prose-p:text-white prose-p:leading-relaxed
                         prose-strong:text-white prose-strong:font-bold
                         prose-em:text-blue-100
                         prose-code:bg-black/30 prose-code:text-blue-200 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                         prose-pre:bg-black/30 prose-pre:text-blue-200
                         prose-blockquote:border-l-blue-400 prose-blockquote:text-blue-100
                         prose-ul:text-white prose-ol:text-white prose-li:text-white
                         prose-li:marker:text-white prose-ul:marker:text-white prose-ol:marker:text-white
                         prose-a:text-blue-300 prose-a:no-underline hover:prose-a:text-blue-200 hover:prose-a:underline
                         prose-hr:border-white/20
                         prose-table:text-white prose-th:text-white prose-td:text-white
                         prose-th:bg-white/10 prose-th:border-white/20 prose-td:border-white/20">
            <ReactMarkdown>
              {message.content}
            </ReactMarkdown>
          </div>
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