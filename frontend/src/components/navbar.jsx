"use client";

import React, { useState, useEffect } from 'react';
import '../styles/navbar.css';

function navbar() {

    const [scrolled, setScrolled] = useState(false);
    const [inSection, setInSection] = useState(false);

    useEffect(() => {
        // 1. Listener scroll pour savoir si scrollY > window.innerHeight
        const handleScroll = () => {
        setScrolled(window.scrollY > window.innerHeight);
        };
        window.addEventListener("scroll", handleScroll);

        // 2. IntersectionObserver pour détecter si on est sur une section ciblée
        // Par exemple on observe la section avec id "Projet"
        const section = document.getElementById("Projet");
        if (!section) return; // si la section n'existe pas, on stoppe

        const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
            setInSection(entry.isIntersecting);
            });
        },
        { threshold: 0.8 } // déclenche quand 50% de la section est visible
        );

        observer.observe(section);

        return () => {
        window.removeEventListener("scroll", handleScroll);
        observer.disconnect();
        };
    }, []);

    // Navbar floue si scrolled MAIS PAS si on est dans la section ciblée
    const shouldBlur = scrolled && !inSection;

  return (
    <nav className={`navbar ${shouldBlur ? "scrolled" : ""}`}>
        <div className="navdiv">
            <div className='left-side'>
                {/* LOGO */}
                {/* <img src="blablabla"></img> */}
                <p>Logo</p>
            </div>
            <div className='right-side'>
              <ul className='navul'>
                <li className='navli'>
                    <a href="/" className="nav-li-a">Accueil</a>
                </li>
                <li className='navli'>
                    <a href="#Projet" className="nav-li-a">Projet</a>
                </li>
                <li className='navli'>
                    <a href="#Information" className="nav-li-a">A propos de nous</a>
                </li>
                <li className='navli'>
                    <a href="#Contact" className="nav-li-a">Contactez-nous</a>
                </li>
                <button className='navbutton'>
                    <a href="/connexion" className="connexion">Connexion</a>
                </button>
                <button className='navbutton'>
                    <a href="/Inscription" className="inscription">S'inscrire</a>
                </button>
              </ul>
            </div>
        </div>
    </nav>
  )
}

export default navbar