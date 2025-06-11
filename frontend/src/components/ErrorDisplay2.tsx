import React from 'react';

interface ErrorDisplayProps {
  error: string;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error }) => {
  if (!error) return null;
  
  return (
    <div className="mx-4 mt-4 p-4 bg-red-500/20 backdrop-blur-sm border border-red-400/30 rounded-xl text-red-200">
      {error}
    </div>
  );
};