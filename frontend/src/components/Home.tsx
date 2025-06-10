import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, ChevronRight, Lock, Shield as ShieldIcon, UserCheck } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Lock className="w-6 h-6 text-blue-400" />,
      title: 'Security Best Practices',
      description: 'Learn about the latest security practices and how to implement them effectively.'
    },
    {
      icon: <ShieldIcon className="w-6 h-6 text-blue-400" />,
      title: 'Threat Protection',
      description: 'Understand common threats and how to protect yourself and your organization.'
    },
    {
      icon: <UserCheck className="w-6 h-6 text-blue-400" />,
      title: 'Personalized Guidance',
      description: 'Get tailored advice for your specific security needs and concerns.'
    }
  ];

  return (
    <div className="min-h-screen relative">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ 
          backgroundImage: 'url(https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop)',
          filter: 'brightness(0.7)'
        }}
      />
      
      <div className="relative z-10 min-h-screen flex flex-col">
        <header className="p-6">
          <nav className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-blue-400" />
              <span className="text-white font-semibold text-xl">CyberGuard AI</span>
            </div>
            <button
              onClick={() => navigate('/login')}
              className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white font-medium transition-colors backdrop-blur-sm border border-white/20"
            >
              Sign In
            </button>
          </nav>
        </header>

        <main className="flex-1 flex items-center">
          <div className="max-w-7xl mx-auto px-4 py-12 w-full">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
                  Your Personal Cybersecurity Assistant
                </h1>
                
                <p className="text-xl text-blue-50 leading-relaxed">
                  Get expert guidance on cybersecurity best practices, threat protection, and security awareness. Available 24/7 to help keep you safe online.
                </p>
                
                <button
                  onClick={() => navigate('/login')}
                  className="flex items-center space-x-2 px-8 py-4 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-semibold transition-colors text-lg group"
                >
                  <span>Get Started</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <div className="space-y-6">
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
          </div>
        </main>
      </div>
    </div>
  );
}