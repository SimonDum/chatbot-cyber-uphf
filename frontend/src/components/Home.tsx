import React, { useState, useEffect } from 'react';
import Information from "./information";
import Contact from "./contact";

import { useNavigate } from 'react-router-dom';
import { Shield, ChevronRight, Lock, Shield as ShieldIcon, UserCheck } from 'lucide-react';
import Projet from './projet';

export default function Home() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Lock className="w-6 h-6 text-blue-400" />,
      title: 'Chiffrement/Déchiffrement',
      description: 'Quelle est la différence entre Http et Https ?'
    },
    {
      icon: <ShieldIcon className="w-6 h-6 text-blue-400" />,
      title: 'VPN',
      description: 'Qu\'est-ce q\'un VPN ?'
    },
    {
      icon: <UserCheck className="w-6 h-6 text-blue-400" />,
      title: 'Autres Sujets',
      description: 'Je suis en projet, et je dois coder une IA.. Comment faire ?'
    }
  ];

  return (
    <div className="min-h-screen relative">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed z-0"
        style={{ 
          backgroundImage: 'url(/pxfuel.jpg)', //'url(https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop)',
          filter: 'brightness(0.7)'
        }}
      />
      
      <div className="relative z-10 min-h-screen flex flex-col">
        <header className="p-6">
          <nav className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-blue-400" />
              <span className="text-white font-semibold text-xl">CyberBot IA</span>
            </div>


              <a href="#" className="font-semibold text-blue-50">
                  Accueil
              </a>
              <a href="#Projet" className="font-semibold text-blue-50">
                  Projet
              </a>
              <a href="#Information" className="font-semibold text-blue-50">
                  A propos de nous
              </a>
              <a href="#Contact" className="font-semibold text-blue-50">
                  Contactez-nous
              </a>

              <button
                onClick={() => navigate('/login')}
                className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white font-medium transition-colors backdrop-blur-sm border border-white/20">
                  Connexion
              </button>
          </nav>
        </header>

        <main className="flex-1 flex items-center">
          {/* <Navbar /> */}
          <div className="max-w-7xl mx-auto px-4 py-12 w-full border-4 border-red-400">
            <div className="grid md:grid-cols-2 gap-12 items-center border-4 border-red-600">
              {/* Première Colonne */}
              <div className="space-y-8 border border-blue-600">
                <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
                  Assisstant Personnel de Cybersécurité
                </h1>
                <p className="text-xl text-blue-50 leading-relaxed">
                  Posez vos questions sur différents aspects de la cybersécurité comme la protection contre les menaces et la sensibilisation à la sécurité.
                </p>
                <button
                  onClick={() => navigate('/login')}
                  className="flex items-center space-x-2 px-8 py-4 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-semibold transition-colors text-lg group"
                >
                  <span>Commencer</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Deuxième Colonne */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <div className="space-y-6">
                  <div className='text-white font-bold text-2xl text-center'>Vos questions préférées : </div>
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="bg-white/10 p-3 rounded-lg">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-lg mb-1">
                          {feature.title}
                        </h3>
                        <p className="text-blue-200">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <section id="Projet">
              <Projet />
            </section>
            <section id="Information">
              <Information />
            </section>
            <section id="Contact">
              <Contact />
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}