"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Liste prédéfinie des équipements disponibles.
 */
const EQUIPMENTS = [
  "Micro-Ondes",
  "Clic-clac",
  "Douche italienne",
  "Four",
  "Frigo",
  "Rangements",
  "WIFI",
  "Lit",
  "Parking",
  "Bouilloire",
  "Sèche Cheveux",
  "SDB",
  "Machine à laver",
  "Toilettes sèches",
  "Cuisine équipée",
  "Cintres",
  "Télévision",
  "Baie vitrée",
  "Chambre Séparée",
  "Hotte",
  "Climatisation",
  "Baignoire",
  "Frigo Américain",
  "Vue Parc",
];

/**
 * Liste prédéfinie des catégories proposées à l’utilisateur.
 */
const DEFAULT_TAGS = [
  "Parc",
  "Night Life",
  "Culture",
  "Nature",
  "Touristique",
  "Vue sur mer",
  "Pour les couples",
  "Famille",
  "Forêt",
];

/**
 * Page d’ajout de propriété.
 *
 * Permet à un utilisateur connecté de créer un logement
 * avec ses informations principales, ses images,
 * ses équipements, ses catégories et les informations de l’hôte.
 */
export default function AddPropertyPage() {
  // const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");
  // const [zipCode, setZipCode] = useState("");
  // const [location, setLocation] = useState("");
  // const [price, setPrice] = useState("");
  const [propertyInfo, setPropertyInfo] = useState({
    title: "",
    description: "",
    zipCode: "",
    location: "",
    price: "",
  });

  const [cover, setCover] = useState("");
  const [pictures, setPictures] = useState<string[]>([]);

  const [hostName, setHostName] = useState("");
  const [hostPicture, setHostPicture] = useState("");

  const [selectedEquipments, setSelectedEquipments] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [customTag, setCustomTag] = useState("");

  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  /**
   * Protection de la page.
   * Si aucun token n’est présent, l’utilisateur est redirigé vers la connexion.
   */
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/login";
    }
  }, []);

  /**
   * Ajoute ou retire un équipement de la sélection.
   */
  function toggleEquipment(equipment: string) {
    setSelectedEquipments((current) =>
      current.includes(equipment)
        ? current.filter((item) => item !== equipment)
        : [...current, equipment]
    );
  }

  /**
   * Ajoute ou retire une catégorie de la sélection.
   */
  function toggleTag(tag: string) {
    setSelectedTags((current) =>
      current.includes(tag)
        ? current.filter((item) => item !== tag)
        : [...current, tag]
    );
  }

  /**
   * Ajoute une catégorie personnalisée à la liste sélectionnée.
   */
  function addCustomTag() {
    const cleanTag = customTag.trim();
    if (!cleanTag) return;

    if (!selectedTags.includes(cleanTag)) {
      setSelectedTags((current) => [...current, cleanTag]);
    }

    setCustomTag("");
  }

  /**
   * Upload une image vers le backend.
   *
   * @param file Fichier image sélectionné.
   * @param type Type d’image : couverture, image logement ou image hôte.
   */
  async function uploadImage(file: File, type: "cover" | "picture" | "host") {
    const token = localStorage.getItem("token");
    if (!token) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "purpose",
      type === "host"
        ? "user-picture"
        : type === "cover"
          ? "property-cover"
          : "property-picture"
    );

    setIsUploading(true);

    try {
      const res = await fetch("/api/uploads/image", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erreur lors de l’upload");
        return;
      }

      if (type === "cover") setCover(data.url);
      if (type === "picture") setPictures((current) => [...current, data.url]);
      if (type === "host") setHostPicture(data.url);
    } finally {
      setIsUploading(false);
    }
  }

  /**
   * Soumet le formulaire et crée une propriété via l’API.
   */
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
          title : propertyInfo.title,
          description: propertyInfo.description,
          location: `${propertyInfo.location}${propertyInfo.zipCode ? ` - ${propertyInfo.zipCode}` : ""}`,
          price_per_night: Number(propertyInfo.price) || 100,
          cover:
            cover ||
            "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/accommodation-20-1.jpg",
          pictures,
          host: {
            name: hostName || "Hôte Kasa",
            picture:
              hostPicture ||
              "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/profile-picture-1.jpg",
          },
          equipments: selectedEquipments,
          tags: selectedTags,
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
      <Link href="/" className="back-link">
        ← Retour aux annonces
      </Link>

      <form onSubmit={handleSubmit}>
        <div className="add-property-header">
          <h1>Ajouter une propriété</h1>
          <button type="submit">Ajouter</button>
        </div>

        {error && <p className="form-error">{error}</p>}
        {isUploading && <p className="form-info">Upload en cours...</p>}

        <div className="add-property-grid">
          <div className="form-card">
            <label>
              Titre de la propriété
              <input
                value={propertyInfo.title}
                onChange={(e) => setPropertyInfo((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Ex : Appartement cosy au coeur de paris"
                required
              />
            </label>

            <label>
              Description
              <textarea
                value={propertyInfo.description}
                onChange={(e) => setPropertyInfo((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Décrivez votre propriété en détail..."
                rows={6}
                required
              />
            </label>

            <label>
              Code postal
              <input
                value={propertyInfo.zipCode}
                onChange={(e) => setPropertyInfo((prev) => ({ ...prev, zipCode: e.target.value }))}
              />
            </label>

            <label>
              Localisation
              <input
                value={propertyInfo.location}
                onChange={(e) => setPropertyInfo((prev) => ({ ...prev, location: e.target.value }))}
                required
              />
            </label>

            <label>
              Prix par nuit
              <input
                type="number"
                value={propertyInfo.price}
                onChange={(e) => setPropertyInfo((prev) => ({ ...prev, price: e.target.value }))}
              />
            </label>
          </div>

          <div className="form-stack">
            <div className="form-card">
              <UploadField
                label="Image de couverture"
                onChange={(file) => uploadImage(file, "cover")}
              />

              {cover && (
                <p className="uploaded-text">Image de couverture ajoutée</p>
              )}

              <UploadField
                label="Image du logement"
                onChange={(file) => uploadImage(file, "picture")}
              />

              <button type="button" className="text-add">
                +Ajouter une image
              </button>

              {pictures.length > 0 && (
                <p className="uploaded-text">
                  {pictures.length} image(s) ajoutée(s)
                </p>
              )}
            </div>

            <div className="form-card">
              <label>
                Nom de l’hôte
                <input
                  value={hostName}
                  onChange={(e) => setHostName(e.target.value)}
                />
              </label>

              <UploadField
                label="Photo de profil"
                onChange={(file) => uploadImage(file, "host")}
              />

              <button type="button" className="text-add">
                +Ajouter une image
              </button>

              {hostPicture && (
                <p className="uploaded-text">Photo de profil ajoutée</p>
              )}
            </div>
          </div>

          <div className="form-card">
            <h2>Équipements</h2>

            <div className="checkbox-grid">
              {EQUIPMENTS.map((equipment) => (
                <label key={equipment} className="small-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedEquipments.includes(equipment)}
                    onChange={() => toggleEquipment(equipment)}
                  />
                  {equipment}
                </label>
              ))}
            </div>
          </div>

          <div className="form-card">
            <h2>Catégories</h2>

            <div className="tag-choice-list">
              {DEFAULT_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  className={
                    selectedTags.includes(tag)
                      ? "tag-choice active"
                      : "tag-choice"
                  }
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>

            <label>
              Ajouter une catégorie personnalisée
              <div className="inline-add">
                <input
                  value={customTag}
                  onChange={(e) => setCustomTag(e.target.value)}
                  placeholder="Nouveau tag"
                />
                <button type="button" onClick={addCustomTag}>
                  <Plus size={24} />
                </button>
              </div>
            </label>

            <button type="button" className="text-add" onClick={addCustomTag}>
              +Ajouter un tag
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

/**
 * Champ réutilisable pour sélectionner et uploader une image.
 *
 * @param label Texte affiché au-dessus du champ.
 * @param onChange Fonction appelée lorsqu’un fichier est sélectionné.
 */
function UploadField({
  label,
  onChange,
}: {
  label: string;
  onChange: (file: File) => void;
}) {
  return (
    <label>
      {label}
      <div className="inline-add">
        <input
          type="file"
          accept="image/*"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) onChange(file);
          }}
        />
        <span className="fake-plus">
          <Plus size={24} />
        </span>
      </div>
    </label>
  );
}