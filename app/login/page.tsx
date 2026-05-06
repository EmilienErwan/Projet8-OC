"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
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

      if (!res.ok) {
        setError(data.error || data.message || "Identifiants invalides");
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
        <h1>Heureux de vous revoir</h1>

        <p>
          Connectez-vous pour retrouver vos réservations, vos annonces et tout
          ce qui rend vos séjours uniques.
        </p>

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