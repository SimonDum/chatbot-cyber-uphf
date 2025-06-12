import React from 'react';
import { Github, Linkedin, Mail, GraduationCap } from 'lucide-react';

const teamMembers = [
  {
    name: 'Bastian Corlay',
    role: 'Rédacteur en cybersécurité',
    description: 'Responsable du contenu et de la base de connaissances en cybersécurité',
    image: '/image1.png',
    speciality: 'Cybersécurité & Réseaux',
    social: {
      github: '#',
      linkedin: '#',
      email: 'bastian.corlay@uphf.fr'
    }
  },
  {
    name: 'Tristan Ducraux',
    role: 'Designer UI/UX',
    description: 'Conception de l\'interface utilisateur et expérience utilisateur',
    image: '/image2.jpg',
    speciality: 'Design & Interface',
    social: {
      github: '#',
      linkedin: '#',
      email: 'tristan.ducraux@uphf.fr'
    }
  },
  {
    name: 'Simon Dumoulin',
    role: 'Développeur principal',
    description: 'Développement de l\'IA et architecture technique du chatbot',
    image: '/image3.png',
    speciality: 'IA & Développement',
    social: {
      github: '#',
      linkedin: '#',
      email: 'simon.dumoulin@uphf.fr'
    }
  }
];

function Information() {
  return (
    <div className="min-h-screen mx-auto px-6" id="information">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Notre Équipe
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-blue-100 leading-relaxed max-w-4xl mx-auto">
            Nous sommes trois étudiants passionnés de l'UPHF (Université Polytechnique Hauts-de-France), 
            spécialisés en informatique et cybersécurité. Notre mission est de rendre l'apprentissage 
            de la cybersécurité accessible grâce à l'intelligence artificielle.
          </p>
        </div>

        {/* Badge UPHF */}
        <div className="flex justify-center mb-12">
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-xl rounded-2xl p-6 border border-white/10 flex items-center space-x-4">
            <GraduationCap className="w-8 h-8 text-blue-400" />
            <div className="text-center">
              <h3 className="text-white font-bold text-lg">UPHF - Université Polytechnique Hauts-de-France</h3>
              <p className="text-blue-200">FISE 4A Informatique & Cybersécurité</p>
            </div>
          </div>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <div key={index} className="group">
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:-translate-y-2 shadow-xl hover:shadow-2xl h-full">
                {/* Photo */}
                <div className="relative mb-6">
                  <div 
                    className="w-32 h-32 mx-auto rounded-full bg-cover bg-center border-4 border-blue-400/30 group-hover:border-blue-400/50 transition-all"
                    style={{ backgroundImage: `url(${member.image})` }}
                  />
                  <div className="absolute inset-0 w-32 h-32 mx-auto rounded-full bg-gradient-to-t from-blue-500/20 to-transparent group-hover:from-blue-500/30 transition-all"></div>
                </div>

                {/* Info */}
                <div className="text-center space-y-4">
                  <h3 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">
                    {member.name}
                  </h3>
                  <div className="space-y-2">
                    <p className="text-blue-400 font-semibold text-lg">
                      {member.role}
                    </p>
                    <div className="px-3 py-1 bg-blue-500/20 rounded-full text-sm text-blue-300 w-fit mx-auto">
                      {member.speciality}
                    </div>
                  </div>
                  <p className="text-blue-200 leading-relaxed">
                    {member.description}
                  </p>

                  {/* Social Links */}
                  <div className="flex justify-center space-x-4 pt-4">
                    <a 
                      href={member.social.github}
                      className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all hover:scale-110"
                      title="GitHub"
                    >
                      <Github className="w-5 h-5 text-white" />
                    </a>
                    <a 
                      href={member.social.linkedin}
                      className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all hover:scale-110"
                      title="LinkedIn"
                    >
                      <Linkedin className="w-5 h-5 text-white" />
                    </a>
                    <a 
                      href={`mailto:${member.social.email}`}
                      className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all hover:scale-110"
                      title="Email"
                    >
                      <Mail className="w-5 h-5 text-white" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Information;