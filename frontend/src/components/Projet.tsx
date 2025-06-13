import React from 'react';
import { Brain, Shield, Zap, Users, Target, Lightbulb, GraduationCap, BookOpen } from 'lucide-react';

const projectFeatures = [
  {
    icon: <Brain className="w-8 h-8 text-blue-400" />,
    title: 'IA Générative',
    description: 'Modèle LLama3, offrant un bon compromis entre qualité des réponses et temps d\'exécution.'
  },
  {
    icon: <BookOpen className="w-8 h-8 text-green-400" />,
    title: 'Connaissances sur l\'UPHF',
    description: 'Base de connaissances spécifiques à la SSI de l\'UPHF, intégrées via une méthode RAG.'
  },
  {
    icon: <Zap className="w-8 h-8 text-yellow-400" />,
    title: 'Conversation Intéractive',
    description: 'Interface de chat intuitive permettant de discuter en temps réel avec le chatbot.'
  },
  {
    icon: <Users className="w-8 h-8 text-purple-400" />,
    title: 'Communauté Étudiante',
    description: 'Conçu par et pour les étudiants de l\'UPHF, adapté aux besoins de la communauté universitaire.'
  }
];

function Projet() {
  return (
    <div className="min-h-screen mx-auto px-6" id="projet">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            CyberBot UPHF
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-blue-100 leading-relaxed max-w-4xl mx-auto">
            Un projet étudiant innovant développé à l'UPHF pour révolutionner l'apprentissage de la cybersécurité 
            grâce à l'intelligence artificielle conversationnelle.
          </p>
        </div>

        {/* Vision */}
        <div className="mb-20">
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-xl rounded-3xl p-12 border border-white/10">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-6">Description du Projet</h2>
              <p className="text-xl text-blue-100 leading-relaxed max-w-4xl mx-auto">
                Notre projet consistait à développer un chatbot conversationnel spécialisé en cybersécurité, destiné aux membres de l'UPHF (étudiants, personnel administratif, enseignants).
                Accessible via une application web responsive, il doit être en capacité de répondre aux questions liées à la cybersécurité, de fournir des conseils pratiques et d’informer sur les actions locales de l’université dans ce domaine.
              </p>
            </div>
          </div>
        </div>

        {/* Fonctionnalités */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Fonctionnalités du Chatbot</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {projectFeatures.map((feature, index) => (
              <div key={index} className="group">
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:-translate-y-2 shadow-xl hover:shadow-2xl h-full">
                  <div className="text-center space-y-4">
                    <div className="p-4 bg-white/10 rounded-xl w-fit mx-auto group-hover:scale-110 transition-transform">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-blue-200 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
          <h2 className="text-2xl font-bold text-white text-center mb-6">Technologies Utilisées</h2>
          <div className="grid grid-cols-3 gap-4">
            {['FastAPI', 'Ollama', 'LangChain', 'PostgreSQL', 'React', 'Tailwind'].map((tech, index) => (
              <div key={index} className="bg-white/10 rounded-lg p-3 text-center hover:bg-white/20 transition-colors">
                <span className="text-white font-semibold text-sm">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projet;