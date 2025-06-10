

import React from 'react';
import '../styles/projet.css';

function projet() {
  return (
    <div className='div-projet' id="Projet">
      <h1 className="titre-projet">Projet</h1>
      <div className='trait-blanc1'></div>
      <br />
      <div className='texte'>
        <p>Le projet consiste à créer un chatbot éducatif spécialisé en cybersécurité. Ce chatbot devra :<br /><br /></p>
        <ul>
          <li>
            <p>Fournir des informations et ressources sur divers aspects de la cybersécurité (mots de passe, phishing, sécurité des réseaux, etc.).<br /><br /></p>
          </li>
          <li>
            <p>Conseiller les utilisateurs sur les bonnes pratiques à adopter.<br /><br /></p>
          </li> 
          <li>
            <p>Répondre aux questions concernant les actions de l’UPHF dans le domaine de la sécurité des systèmes d’information.<br /><br /></p>
          </li> 
          <li> 
            <p>Gérer des conversations multi-tours, c’est-à-dire des échanges prolongés sur un même sujet.<br /><br /></p>
          </li> 
          <li>
            <p>Être développé avec l’outil de votre choix (Hugging Face, Dialogflow, Rasa, etc.), en tenant compte des éventuels coûts.<br /><br /></p>
          </li> 
          <li>
            <p>Être présenté sous forme d’une application PC ou mobile, avec interaction par texte et/ou commande vocale.</p>
          </li>
        </ul>

      </div>
    </div>
  )
}

export default projet