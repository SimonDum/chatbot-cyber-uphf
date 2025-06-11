import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, Mail, ArrowLeft, UserPlus, LogIn, User, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { ErrorDisplay } from './ErrorDisplay';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isRegistering) {
        await register({ 
          email, 
          password, 
          full_name: fullName 
        });
      } else {
        await login({ email, password });
      }
      navigate('/chat');
    } catch (err: any) {
      const detail = err.response?.data?.detail;
      if (Array.isArray(detail)) {
        // Erreur de validation Pydantic : on concatène les messages
        setError(detail.map((d: any) => d.msg).join(', '));
      } else if (typeof detail === 'string') {
        setError(detail);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError('Une erreur est survenue');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed z-0"
        style={{ 
          backgroundImage: 'url(/pxfuel.jpg)',
          filter: 'brightness(0.4)'
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-indigo-900/30 z-0" />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          {/* Bouton retour */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-white/80 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Retour à l'accueil</span>
          </button>

          {/* Formulaire de connexion/inscription */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <Shield className="w-8 h-8 text-blue-400" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">
                {isRegistering ? 'Inscription à CyberBot UPHF' : 'Connexion à CyberBot UPHF'}
              </h1>
              <p className="text-blue-200">
                {isRegistering 
                  ? 'Créer un compte pour utiliser votre assistant cybersécurité'
                  : 'Connectez-vous pour commencer à discuter avec votre assistant cybersécurité'}
              </p>
            </div>

            <ErrorDisplay error={error} />

            <form onSubmit={handleSubmit} className="space-y-6">
              {isRegistering && (
                <div>
                  <label htmlFor="fullName" className="block text-white font-medium mb-2">
                    Nom complet
                  </label>
                  <div className="relative">
                    <input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all pl-12"
                      placeholder="Simon Dumoulin"
                      required={isRegistering}
                    />
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300" />
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-white font-medium mb-2">
                  {isRegistering ? 'Adresse Email' : 'Adresse Email'}
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all pl-12"
                    placeholder="prenom.nom@uphf.fr"
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300" />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-white font-medium mb-2">
                  Mot de passe
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all pl-12 pr-12"
                    placeholder="•••••••••"
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-300 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center space-x-3 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg text-white font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    {isRegistering ? (
                      <>
                        <UserPlus className="w-5 h-5" />
                        <span>S'inscrire</span>
                      </>
                    ) : (
                      <>
                        <LogIn className="w-5 h-5" />
                        <span>Accéder au Chat</span>
                      </>
                    )}
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={() => {
                  setIsRegistering(!isRegistering);
                  setError('');
                  setFullName('');
                }}
                className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
              >
                {isRegistering
                  ? 'Vous possédez déjà un compte ? Connectez-vous'
                  : "Vous n'avez pas encore de compte ? Inscrivez-vous"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}