"use client";

import Link from "next/link";
import { Heart, MessageSquare, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function Header() {
  const [isLogged, setIsLogged] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsLogged(!!localStorage.getItem("token"));
  }, []);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  function logout() {
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  return (
    <header className="header">
      <Link href="/" className="mobile-logo" aria-label="Accueil Kasa" onClick={closeMenu}>
        <span className="house-logo">⌂</span>
      </Link>

      <nav className="desktop-nav" aria-label="Navigation principale">
        <Link href="/">Accueil</Link>
        <Link href="/about">À propos</Link>
        <Link href="/" className="logo">Kasa</Link>

        {isLogged ? <Link href="/add-property">+ Ajouter</Link> : <Link href="/login">Connexion</Link>}

        <Link href="/favorites" aria-label="Favoris"><Heart size={16} /></Link>
        <Link href="/messages" aria-label="Messages"><MessageSquare size={16} /></Link>

        {isLogged && (
          <button className="logout-btn" onClick={logout}>
            Déconnexion
          </button>
        )}
      </nav>

      <button
        className="mobile-menu"
        type="button"
        aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((current) => !current)}
      >
        {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
      </button>

      {isMenuOpen && (
        <nav className="mobile-nav" aria-label="Navigation mobile">
          <Link href="/" onClick={closeMenu}>Accueil</Link>
          <Link href="/about" onClick={closeMenu}>À propos</Link>
          <Link href="/favorites" onClick={closeMenu}>Favoris</Link>
          <Link href="/messages" onClick={closeMenu}>Messages</Link>

          {isLogged ? (
            <>
              <Link href="/add-property" onClick={closeMenu}>Ajouter un logement</Link>
              <button onClick={logout}>Déconnexion</button>
            </>
          ) : (
            <Link href="/login" onClick={closeMenu}>Connexion</Link>
          )}
        </nav>
      )}
    </header>
  );
}