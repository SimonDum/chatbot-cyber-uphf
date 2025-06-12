import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, ChevronRight, Lock, UserCheck, Menu, X } from 'lucide-react';
import Information from './Information';
import Projet from './Projet';

export default function Home() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: <Lock className="w-6 h-6 text-blue-400" />,
      title: 'Chiffrement/Déchiffrement',
      description: 'Quelle est la différence entre HTTP et HTTPS ?'
    },
    {
      icon: <Shield className="w-6 h-6 text-blue-400" />,
      title: 'VPN et Réseaux',
      description: 'Qu\'est-ce qu\'un VPN et comment protège-t-il mes données ?'
    },
    {
      icon: <UserCheck className="w-6 h-6 text-blue-400" />,
      title: 'Développement Sécurisé',
      description: 'Comment développer une application sécurisée ?'
    }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen relative">
      {/* Background avec parallax */}
      <div 
        className="fixed inset-0 bg-cover bg-center z-0"
        style={{ 
          backgroundImage: 'url(/pxfuel.jpg)',
          filter: 'brightness(0.4)',
        }}
      />
      
      {/* Overlay gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-indigo-900/30 z-0" />
      
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header avec effet glassmorphism */}
        <header className={`fixed top-0 w-full transition-all duration-300 z-50 ${
          scrollY > 50 ? 'bg-black/20 backdrop-blur-lg border-b border-white/10' : ''
        }`}>
          <nav className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-500/20 rounded-lg backdrop-blur-sm">
                  <Shield className="w-8 h-8 text-blue-400" />
                </div>
                <span className="text-white font-bold text-xl">CyberBot UPHF</span>
              </div>

              {/* Navigation desktop */}
              <div className="hidden md:flex items-center space-x-8">
                <button 
                  onClick={() => scrollToSection('home')}
                  className="text-white/90 hover:text-white transition-colors font-medium"
                >
                  Accueil
                </button>
                <button 
                  onClick={() => scrollToSection('projet')}
                  className="text-white/90 hover:text-white transition-colors font-medium"
                >
                  Projet
                </button>
                <button 
                  onClick={() => scrollToSection('information')}
                  className="text-white/90 hover:text-white transition-colors font-medium"
                >
                  Équipe
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className="px-6 py-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg text-white font-medium transition-all backdrop-blur-sm border border-blue-400/30 hover:border-blue-400/50"
                >
                  Accéder au Chat
                </button>
              </div>

              {/* Menu mobile */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-white"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Menu mobile dropdown */}
            {isMenuOpen && (
              <div className="md:hidden mt-4 p-4 bg-black/40 backdrop-blur-lg rounded-lg border border-white/10">
                <div className="flex flex-col space-y-3">
                  <button onClick={() => scrollToSection('home')} className="text-white/90 hover:text-white transition-colors text-left">
                    Accueil
                  </button>
                  <button onClick={() => scrollToSection('projet')} className="text-white/90 hover:text-white transition-colors text-left">
                    Projet
                  </button>
                  <button onClick={() => scrollToSection('information')} className="text-white/90 hover:text-white transition-colors text-left">
                    Équipe
                  </button>
                  <button
                    onClick={() => navigate('/login')}
                    className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg text-white font-medium transition-all backdrop-blur-sm border border-blue-400/30"
                  >
                    Accéder au Chat
                  </button>
                </div>
              </div>
            )}
          </nav>
        </header>

        {/* Section Hero */}
        <section id="home" className="min-h-screen flex items-center pt-20">
          <div className="max-w-7xl mx-auto px-6 py-12 w-full">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Contenu principal */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                    Assistant IA en
                    <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Cybersécurité</span>
                  </h1>
                  <p className="text-xl text-blue-100 leading-relaxed max-w-2xl">
                    Développé par des étudiants de l'UPHF, CyberBot est votre assistant personnel pour apprendre 
                    la cybersécurité de manière interactive et accessible.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => navigate('/login')}
                    className="flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-xl text-white font-semibold transition-all text-lg group shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    <span>Commencer à chatter</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  
                  <button
                    onClick={() => scrollToSection('projet')}
                    className="flex items-center justify-center space-x-3 px-8 py-4 bg-white/10 hover:bg-white/20 rounded-xl text-white font-semibold transition-all text-lg backdrop-blur-sm border border-white/20 hover:border-white/30"
                  >
                    <span>Découvrir le projet</span>
                  </button>
                </div>

                {/* Badge universitaire */}
                <div className="flex items-center space-x-3 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 w-fit">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-white/90 font-medium">Projet étudiant - FISE 4A ICY</span>
                </div>
              </div>

              {/* Carte des fonctionnalités */}
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
                <div className="space-y-8">
                  <div className="text-center">
                    <h3 className="text-white font-bold text-2xl mb-2">Questions populaires</h3>
                    <p className="text-blue-200">Découvrez nos sujets les plus demandés</p>
                  </div>
                  
                  <div className="space-y-6">
                    {features.map((feature, index) => (
                      <div key={index} className="group cursor-pointer">
                        <div className="flex items-start space-x-4 p-4 rounded-xl hover:bg-white/5 transition-all">
                          <div className="bg-blue-500/20 p-3 rounded-xl group-hover:bg-blue-500/30 transition-colors">
                            {feature.icon}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-white font-semibold text-lg mb-2 group-hover:text-blue-300 transition-colors">
                              {feature.title}
                            </h4>
                            <p className="text-blue-200 leading-relaxed">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sections */}
        <section id="projet" className="py-20">
          <Projet />
        </section>
        
        <section id="information" className="py-20">
          <Information />
        </section>
      </div>
    </div>
  );
}