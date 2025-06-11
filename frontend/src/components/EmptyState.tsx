import React from 'react';
import { Shield } from 'lucide-react';

interface EmptyStateProps {
  showWelcome: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ showWelcome }) => {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="bg-blue-50/80 dark:bg-blue-900/50 p-6 rounded-full inline-block backdrop-blur-sm">
          <Shield className="w-12 h-12 text-blue-500" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          {showWelcome ? 'Welcome to CyberGuard AI' : 'Start Your Conversation'}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-md">
          {showWelcome 
            ? 'Create a new conversation or select an existing one to start chatting about cybersecurity topics.'
            : 'Ask me anything about cybersecurity, from basic concepts to advanced topics. I\'m here to help you stay safe online.'
          }
        </p>
      </div>
    </div>
  );
};