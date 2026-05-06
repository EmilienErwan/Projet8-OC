"use client";

import { useEffect, useState } from "react";

export default function AddPropertyPage() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [cover, setCover] = useState("");
  const [description, setDescription] = useState("");
  const [equipments, setEquipments] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/login";
    }
  }, []);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");

    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    try {
      const res = await fetch("/api/properties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
  title,
  location,
  description,
  cover:
  cover.trim() ||
  "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/accommodation-20-1.jpg",
  price_per_night: Number(price),

  host: {
    name: "Hôte Kasa",
    picture:
      "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/profile-picture-1.jpg",
  },

  equipments: equipments
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean),

  tags: tags
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean),
}),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || data.message || "Erreur lors de la création");
        return;
      }

      alert("Logement créé avec succès !");
      window.location.href = data.id ? `/properties/${data.id}` : "/";
    } catch {
      setError("Erreur réseau");
    }
  }

  return (
    <section className="add-property-page">
      <h1>Ajouter un logement</h1>

      {error && <p className="form-error">{error}</p>}

      <form className="property-form" onSubmit={handleSubmit}>
        <label>
          Titre
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>

        <label>
          Localisation
          <input value={location} onChange={(e) => setLocation(e.target.value)} required />
        </label>

        <label>
          Prix par nuit
          <input
            type="number"
            min="1"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>

        <label>
          Image principale URL
          <input
            value={cover}
            onChange={(e) => setCover(e.target.value)}
            placeholder="https://..."
          />
        </label>

        <label>
          Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            required
          />
        </label>

        <label>
          Équipements, séparés par des virgules
          <input
            value={equipments}
            onChange={(e) => setEquipments(e.target.value)}
            placeholder="Wifi, Cuisine, Climatisation"
          />
        </label>

        <label>
          Tags, séparés par des virgules
          <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Mer, Moderne, Famille"
          />
        </label>

        <button type="submit">Créer le logement</button>
      </form>
    </section>
  );
}