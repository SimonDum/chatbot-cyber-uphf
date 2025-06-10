
import React from 'react';
import '../styles/information.css';

function information() {
  return (
    <div className='div-information' id="Information">
      <h1 className='titre-info'>A propos de nous</h1>
      <div className='trait-blanc2'></div>
      <br />
      <div className='div-info-contenu'>
        <p id='texte'>Nous sommes une équipe d’étudiants, à l’INSA Hauts-de-France en spécialité informatique et cybersécurité. Composez de 3 membres, nous nous sommes répartis les rôles comme ceci : </p>
        <br />
        <div className='div-info-profil'>
          <ul className='ul-info-profil'>
            <li className='li-info-profil'>
                <div className='cercle1'></div>
                <p className='prenom'>Bastian Corlay</p>
                <p className='role'>Rédacteur en cybersécurité, responsable du contenu et de la base de connaissances.</p>
            </li>
            <li className='li-info-profil'>
              <div className='cercle2'></div>
              <p className='prenom'>Tristan Ducraux</p>
              <p className='role'>Designer, chargé de la conception de l’interface utilisateur.</p>
            </li>
            <li className='li-info-profil'>
              <div className='cercle3'></div>
              <p className='prenom'>Simon Dumoulin</p>
              <p className='role'>Développeur principal, responsable du développement de l’agent IA et des choix techniques.</p>
            </li>
          </ul>
            
        </div>
      </div>
    </div>
  )
}

export default information