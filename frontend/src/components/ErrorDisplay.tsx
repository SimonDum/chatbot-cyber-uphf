import React from 'react';

interface ErrorDisplayProps {
  error: string;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error }) => {
  if (!error) return null;

  return (
    <div className="bg-red-50/90 dark:bg-red-900/20 border-l-4 border-red-500 p-4 m-4 rounded backdrop-blur-sm">
      <p className="text-red-700 dark:text-red-300">{error}</p>
    </div>
  );
};