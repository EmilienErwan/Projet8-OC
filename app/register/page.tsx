"use client";

import { useState } from "react";

/**
 * Page d’inscription utilisateur.
 *
 * Permet de créer un compte, d’accepter les conditions,
 * puis de connecter automatiquement l’utilisateur en stockant le token JWT.
 */
export default function RegisterPage() {
  const [name, setName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState("");

  /**
   * Gère la soumission du formulaire d’inscription.
   *
   * Vérifie d’abord que les conditions sont acceptées,
   * puis envoie les données à l’API.
   */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!accepted) {
      setError("Veuillez accepter les conditions.");
      return;
    }

    try {
      const res = await fetch("/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `${firstname} ${name}`,
          email,
          password,
          role: "owner",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erreur inscription");
        return;
      }

      localStorage.setItem("token", data.token);
      window.location.href = "/";
    } catch {
      setError("Erreur réseau");
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <h1>Rejoignez la communauté Kasa</h1>

        <p>
          Créez votre compte et commencez à voyager autrement : réservez des
          logements uniques, découvrez de nouvelles destinations et partagez vos
          propres lieux avec d’autres voyageurs.
        </p>

        {error && <p className="form-error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <label>
            Nom
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          <label>
            Prénom
            <input
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
          </label>

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

          <label className="checkbox">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
            />
            J’accepte les conditions générales d’utilisation
          </label>

          <button type="submit">S’inscrire</button>
        </form>

        <p className="switch">
          Déjà membre ? <a href="/login">Se connecter</a>
        </p>
      </div>
    </section>
  );
}