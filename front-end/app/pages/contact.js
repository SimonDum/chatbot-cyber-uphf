'use client';

import React, {useState} from 'react';
import '../styles/contact.css';

// interface DonneeFormulaire {
//   prenom: string;
//   nom: string;
//   email: string;
//   entreprise: string;
//   message: string;
// }


function contact() {
//   const [DonneeFormulaire, SetDonneeFormulaire] = useState<DonneeFormulaire>({
//     prenom: '',
//     nom: '',
//     email: '',
//     entreprise: '',
//     message: ''
//   });

  // const handleInputChange = (field: keyof DonneeFormulaire, value: string) => {
  //   setFormData(prev => ({
  //     ...prev,
  //     [field]: value
  //   }));
  // };


  



  return (
    <div className='div-contact' id="Contact">
      <h1 id='titre-contact'>Contactez-nous</h1>
      <div className='trait-blanc3'></div>
      <div className='div-contenu'>
        <div className='div-support'>
          <p className='titre-balise-contact'>Support</p>
          <p id="mail">Envoyez-nous un mail à chatbot-uphf@gmail.com</p>
        </div>
        <div className='div-rgpd'>
          <p className='titre-balise-contact'>Demande relatives à la protection des données</p>
          <p id="droit-rgpd">Vous avez des droits concernant la gestion de vos données. Veuillez choisir une option ci-dessous :</p>
        </div>
        <div className='div-message'>
          <p className='titre-balise-contact'>Contacter notre équipe commerciale</p>
          <div className="champ-remplir">
            <p id="champ-obligatoire">* Tous les champs sont obligatoires</p>
            <input type="text" id="prenom" placeholder="Prenom*"/>
            <input type="text" id="nom" placeholder="Nom*"/>
            <input type="text" id="email" placeholder="Email*"/>
            <input type="text" id="entreprise" placeholder="Entreprise*"/>
            <button id="button-envoyer">Envoyer</button>
            <textarea type="text" id="message" placeholder='Saisissez votre message...'/>
        </div>
        </div>
      </div>
    </div>
  )
}

export default contact