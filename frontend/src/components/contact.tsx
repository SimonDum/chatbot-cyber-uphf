'use client';

import React, {useState} from 'react';

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
    <div className='min-h-screen mx-auto border-4 border-yellow-400' id="Contact">
      <h1 className='text-5xl md:text-6xl font-bold text-white leading-tight'>Contactez-nous</h1>
      <div className='mt-4 h-2 w-80 rounded-lg bg-white'></div>
      <div className='mt-5 grid grid-flow-col md:grid-flow-col grid-row-2 gap-10'>
        {/* Colonne 1 -> ligne 1 et 2 */}
        <div className='col-span-1 flex flex-col gap-10'>
          <div className=' bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20'>
            <p className='text-xl font-semibold'>Support</p>
            <p className="">Envoyez-nous un mail à chatbot-uphf@gmail.com</p>
          </div>
        </div>
        <div className='col-span-1 flex flex-col gap-10'>
            <div className='bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20'>
              <p className='text-xl font-semibold'>Demande relatives à la protection des données</p>
              <p className="">Vous avez des droits concernant la gestion de vos données. Veuillez choisir une option ci-dessous :</p>
            </div>
        </div>
        {/* Colonne 2 -> ligne 1 et 2 => prend toutes les lignes */}
        <div className='row-span-2 flex-1 bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20'>
          <p className='text-xl font-semibold'>Contacter notre équipe commerciale</p>
          <div className="grid grid-flow-col grid-row-6 gap-5">
            <p className="mt-5 flex flex-col">* Tous les champs sont obligatoires</p>
            <input type="text" className="flex flex-col text-black placeholder-black bg-transparent border-0 border-b-2 border-black" placeholder="Prenom*"/>
            <input type="text" className="flex flex-col text-black placeholder-black bg-transparent border-0 border-b-2 border-black" placeholder="Nom*"/>
            <input type="text" className="flex flex-col text-black placeholder-black bg-transparent border-0 border-b-2 border-black" placeholder="Email*"/>
            <input type="text" className="flex flex-col text-black placeholder-black bg-transparent border-0 border-b-2 border-black" placeholder="Entreprise*"/>
            <button className="bg-black text-white rounded-md flex flex-col">Envoyer</button>
            <textarea className="mt-5 row-span-6 rounded-md resize-none" placeholder='Saisissez votre message...'/>
        </div>
        </div>
      </div>
    </div>
  )
}

export default contact