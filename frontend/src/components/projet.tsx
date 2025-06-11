import React from 'react';
// import '../styles/projet.css';

function Projet() {
  return (
    // div-projet
    <div className=' min-h-screen mx-auto pt-4 border-4 border-blue-600' id="Projet">
      {/* titre-projet */}
        <h1 className="text-white text-5xl md:text-6xl font-bold leading-tight">Projet</h1>
        {/* trait-blanc */}
        <div className='mt-4 h-2 w-40 rounded-lg bg-white'>
      </div>
      <br />
      <div className='text-blue-50 text-xl leading-relaxed'>
        <p>Le projet consiste à créer un chatbot éducatif spécialisé en cybersécurité. Ce chatbot devra :</p>
        <div className='ml-10'>
          <ul>
            <li>
              <p>Fournir des informations et ressources sur divers aspects de la cybersécurité (mots de passe, phishing, sécurité des réseaux, etc.).</p>
            </li>
            <li>
              <p>Conseiller les utilisateurs sur les bonnes pratiques à adopter.</p>
            </li> 
            <li>
              <p>Répondre aux questions concernant les actions de l’UPHF dans le domaine de la sécurité des systèmes d’information.</p>
            </li> 
            <li> 
              <p>Gérer des conversations multi-tours, c’est-à-dire des échanges prolongés sur un même sujet.</p>
            </li> 
            <li>
              <p>Être développé avec l’outil de votre choix (Hugging Face, Dialogflow, Rasa, etc.), en tenant compte des éventuels coûts.</p>
            </li> 
            <li>
              <p>Être présenté sous forme d’une application PC ou mobile, avec interaction par texte et/ou commande vocale.</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Projet