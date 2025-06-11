
import React from 'react';

function information() {
  return (
    <div className='min-h-screen mx-auto border-4 border-green-600' id="Information">
      <h1 className='text-5xl md:text-6xl font-bold text-white leading-tight'>A propos de nous</h1>
      <div className='mt-4 h-2 w-96 rounded-lg bg-white'></div>
      <div className='text-white'>
        <p className='mt-7 mb-7 text-lg'>Nous sommes une équipe d’étudiants, à l’INSA Hauts-de-France en spécialité informatique et cybersécurité. Composez de 3 membres, nous nous sommes répartis les rôles comme ceci : </p>
        <div className=' grid grid-cols-3 grid-rows-1 gap-3 justify-items-center text-center'>
              <div className='size-64 bg-[url(/image1.png)] bg-center bg-cover rounded-full'></div>
              <div className='size-64 bg-[url(/image2.jpg)] bg-center bg-cover rounded-full'></div>
              <div className='size-64 bg-[url(/image3.png)] bg-center bg-cover rounded-full'></div>
              <p className='text-xl'>Bastian Corlay</p>
              <p className='text-xl'>Tristan Ducraux</p>
              <p className='text-xl'>Simon Dumoulin</p>
              <p className='text-lg'>Rédacteur en cybersécurité, responsable du contenu et de la base de connaissances.</p>
              <p className='text-lg'>Designer, chargé de la conception de l’interface utilisateur.</p>
              <p className='text-lg'>Développeur principal, responsable du développement de l’agent IA et des choix techniques.</p>
        </div>
      </div>
    </div>
  )
}

export default information