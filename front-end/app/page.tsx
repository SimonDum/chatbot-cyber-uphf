// "use client";

import Navbar from "./components/navbar";
import Projet from "./pages/projet";  
import Information from "./pages/information";
import Contact from "./pages/contact";

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