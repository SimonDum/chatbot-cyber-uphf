import React from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  input: string;
  isLoading: boolean;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  input,
  isLoading,
  onInputChange,
  onSubmit
}) => {
  return (
    <div className="p-6 bg-black/20 backdrop-blur-xl border-t border-white/10">
  <form onSubmit={onSubmit} className='flex h-full'>
    <div className="flex-1 relative">
      <textarea
        value={input}
        onChange={(e) => onInputChange(e.target.value)}
        placeholder="Posez votre question sur la cybersécurité..."
        className="w-full h-full p-6 pr-16 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-blue-200 resize-none focus:outline-none focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20"
        rows={3}
        style={{ minHeight: '100px', maxHeight: '200px' }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSubmit(e);
          }
        }}
      />
      <button
        type="submit"
        disabled={!input.trim() || isLoading}
        className="absolute right-2 bottom-2 p-3 bg-blue-500/20 hover:bg-blue-500/30 disabled:bg-gray-500/20 disabled:cursor-not-allowed rounded-lg text-white font-medium transition-all backdrop-blur-sm border border-blue-400/30 hover:border-blue-400/50 disabled:border-gray-400/30"
      >
        <Send className="w-5 h-5" />
      </button>
    </div>
  </form>
</div>
  );
};