import React from 'react';
import { Brain, Shield, Zap, Users, Target, Lightbulb, GraduationCap, BookOpen } from 'lucide-react';

const projectFeatures = [
  {
    icon: <Brain className="w-8 h-8 text-blue-400" />,
    title: 'IA Conversationnelle',
    description: 'Chatbot intelligent spécialisé en cybersécurité, capable de répondre aux questions des étudiants de manière pédagogique.'
  },
  {
    icon: <BookOpen className="w-8 h-8 text-green-400" />,
    title: 'Contenu Pédagogique',
    description: 'Base de connaissances adaptée au niveau universitaire, couvrant les fondamentaux de la cybersécurité.'
  },
  {
    icon: <Zap className="w-8 h-8 text-yellow-400" />,
    title: 'Apprentissage Interactif',
    description: 'Interface de chat intuitive permettant un apprentissage par questions-réponses en temps réel.'
  },
  {
    icon: <Users className="w-8 h-8 text-purple-400" />,
    title: 'Communauté Étudiante',
    description: 'Conçu par et pour les étudiants de l\'UPHF, adapté aux besoins de la communauté universitaire.'
  }
];

const objectives = [
  {
    icon: <Target className="w-6 h-6 text-red-400" />,
    title: 'Accessibilité Éducative',
    description: 'Rendre la cybersécurité accessible aux étudiants de tous niveaux, du débutant à l\'expert.'
  },
  {
    icon: <Lightbulb className="w-6 h-6 text-orange-400" />,
    title: 'Innovation Pédagogique',
    description: 'Utiliser l\'IA pour créer une nouvelle approche d\'apprentissage de la cybersécurité.'
  },
  {
    icon: <GraduationCap className="w-6 h-6 text-blue-400" />,
    title: 'Excellence Académique',
    description: 'Contribuer à l\'excellence de la formation en cybersécurité à l\'UPHF.'
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
              <h2 className="text-3xl font-bold text-white mb-6">Vision du Projet</h2>
              <p className="text-xl text-blue-100 leading-relaxed max-w-4xl mx-auto">
                CyberBot UPHF est né de notre constat que la cybersécurité peut sembler complexe et intimidante 
                pour de nombreux étudiants. Notre vision est de créer un assistant IA qui démystifie cette discipline 
                en offrant des explications claires, des exemples concrets et un accompagnement personnalisé 
                pour chaque apprenant de notre université.
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

        {/* Objectifs */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Objectifs Pédagogiques</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {objectives.map((objective, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-white/10 rounded-lg flex-shrink-0">
                    {objective.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">
                      {objective.title}
                    </h3>
                    <p className="text-blue-200 leading-relaxed">
                      {objective.description}
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
          <div className="grid grid-cols-2 gap-4">
            {['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Python', 'OpenAI API', 'NLP', 'Machine Learning'].map((tech, index) => (
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