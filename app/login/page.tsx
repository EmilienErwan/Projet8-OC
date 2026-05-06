"use client";

import Link from "next/link";
import { useState } from "react";

/**
 * Page de connexion utilisateur
 *
 * Permet :
 * - de saisir email et mot de passe
 * - d’envoyer une requête à l’API
 * - de stocker le token JWT
 */
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  /**
   * Envoi du formulaire de connexion
   */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      /**
       * Appel API pour authentification
       */
      const res = await fetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      /**
       * Gestion des erreurs
       */
      if (!res.ok) {
        setError(data.error || data.message || "Identifiants invalides");
        return;
      }

      /**
       * Stockage du token JWT dans le localStorage
       */
      localStorage.setItem("token", data.token);

      /**
       * Redirection vers la page d’accueil
       */
      window.location.href = "/";
    } catch {
      setError("Erreur réseau");
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <h1>Heureux de vous revoir</h1>

        <p>
          Connectez-vous pour retrouver vos réservations, vos annonces et tout
          ce qui rend vos séjours uniques.
        </p>

        {/* Affichage erreur */}
        {error && <p className="form-error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <label>
            Adresse email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label>
            Mot de passe
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <button type="submit">Se connecter</button>
        </form>

        <p className="switch">
          <Link href="#">Mot de passe oublié</Link>
        </p>

        <p className="switch">
          Pas encore de compte ? <Link href="/register">Inscrivez-vous</Link>
        </p>
      </div>
    </section>
  );
}