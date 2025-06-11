// "use client";

import Navbar from "navbar";
import Projet from "./projet"; 
import Information from "./information";
import Contact from "./contact";

export default function Home() {
  

  return (  
    <main className="fond">

      <Navbar />

      <div className="container">
        <h1 className="titre-cyberbot">CyberBot votre assistant IA</h1>
        <div className = "input-wrapper">
          <input className="input" type="text" placeholder="Posez votre question en cybersécurité..." />
          <button className="button">envoyer</button>
        </div>
      </div>
      
      <Projet />
      <br />
      <Information />
      <br />
      <Contact />
      <br />
    </main>
  );
}