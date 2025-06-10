"use client";

// Import
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Shield, Lock, Mail, ArrowLeft, UserPlus, LogIn } from 'lucide-react';
import { Navigate } from 'react-router-dom';

// Page
import Chat from '../chat/page';


export default function LoginPageDemo() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);



 const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  if (!email || !password) {
    setError('Veuillez remplir tous les champs');
    return;
  }

  setIsLoading(true);

  const endpoint = isRegistering
    ? 'http://localhost:8000/api/register'
    : 'http://localhost:8000/api/login';

  try {
    const response = await axios.post(endpoint, { email, password });
    // const res = await axiosWithAuth.get('/conversations');

    if (!isRegistering) {
        // Connexion : récupérer et stocker le token
        const { access_token, token_type } = response.data;
        localStorage.setItem('token', access_token);
    }

    alert(isRegistering ? 'Compte créé avec succès !' : 'Connexion réussie !');
    setIsLoggedIn(true);
    // localStorage.setItem('token', response.data.access_token);
  } catch (error) {
    // Gestion plus simple des erreurs avec Axios
    if (error.response && error.response.data && error.response.data.detail) {
      setError(error.response.data.detail);
    } else {
      setError('Erreur inconnue');
    }
  } finally {
    setIsLoading(false);
  }
};



useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
    setIsLoggedIn(true);
  }
}, []);

  // Si l'utilisateur est connecté, afficher la page simple
  if (isLoggedIn) {
    axios.get('http://localhost:8000/api/conversations', {
    headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    });
  }

  return (
    <div className="min-h-screen relative">
      {/* Arrière-plan avec image simulée */}
      <div 
        className="absolute inset-0 z-0"
        style={{ 
        //   background: 'linear-gradient(135deg, #1e3a8a 0%, #3730a3 50%, #1e1b4b 100%)',
          backgroundImage: 'url(/images/pxfuel.jpg)',
          filter: 'brightness(0.7)'
        }}
      />
      
      {/* Overlay pattern pour simuler une texture */}
      <div 
        className="absolute inset-0 z-0 opacity-20"
        style={{
        //   backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md w-full border border-white/20 shadow-2xl">
          <button
            onClick={() => window.location.href = '/'}
            className="mb-6 text-white/80 hover:text-white flex items-center space-x-2 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Retourner à l'accueil</span>
          </button>

          <div className="flex justify-center mb-6">
            <div className="bg-white/10 p-4 rounded-full">
              <Shield className="w-12 h-12 text-blue-400" />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-center text-white mb-2">
            {isRegistering ? 'Créer un compte' : 'Bienvenue'}
          </h2>
          
          <p className="text-center text-blue-200 mb-6">
            {isRegistering 
              ? 'Inscrivez-vous pour accéder à votre assistant de cybersécurité'
              : 'Connectez-vous pour accéder à votre assistant de cybersécurité'}
          </p>
          
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
              <p className="text-red-200 text-center text-sm">{error}</p>
            </div>
          )}
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-blue-200">
                Adresse mail
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-blue-200/50 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"
                  placeholder=""
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-blue-200">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-blue-200/50 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
            
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full py-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>En cours...</span>
                </>
              ) : (
                <>
                  {isRegistering ? (
                    <>
                      <UserPlus className="w-5 h-5" />
                      <span>Créer un compte</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="w-5 h-5" />
                      <span>Connexion</span>
                    </>
                  )}
                </>
              )}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsRegistering(!isRegistering)}
                className="text-blue-200 hover:text-white transition-colors text-sm underline"
              >
                {isRegistering
                  ? 'Déjà un compte ? Connectez-vous'
                  : "Pas de compte ? Inscrivez-vous"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}