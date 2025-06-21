import React from 'react';
import { Shield } from 'lucide-react';

interface EmptyStateProps {
  showWelcome: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ showWelcome }) => {
  const suggestions = [
    "Comment créer un mot de passe sécurisé ?",
    "Qu'est-ce qu'un VPN et comment l'utiliser ?",
    "Comment détecter un email de phishing ?",
    "Quelles sont les bonnes pratiques de sécurité web ?"
  ];

  return (
    <div className="flex-1 flex items-center justify-center p-8 h-full">
      <div className="text-center max-w-2xl">
        <div className="mb-8">
          <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10 text-blue-400" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            {showWelcome ? 'Bienvenue sur CyberBot' : 'Nouvelle conversation'}
          </h2>
          <p className="text-blue-200 text-lg leading-relaxed">
            {showWelcome 
              ? 'Votre assistant IA spécialisé en cybersécurité. Posez-moi vos questions pour apprendre et vous protéger en ligne.'
              : 'Commencez une nouvelle conversation en posant votre question sur la cybersécurité.'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer group"
            >
              <p className="text-white group-hover:text-blue-300 transition-colors">
                {suggestion}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};