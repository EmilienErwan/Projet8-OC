import Image from "next/image";
import PropertyCard from "@/components/PropertyCard";
import { getProperties } from "@/services/api";

/**
 * Page d’accueil de l’application
 *
 * - Récupère les propriétés depuis l’API
 * - Affiche une section hero
 * - Affiche la liste des logements
 */
export default async function HomePage() {
  /**
   * Appel API côté serveur (Server Component)
   * → améliore les performances et le SEO
   */
  const properties = await getProperties();

  return (
    <section className="home-page">
      {/* Texte principal */}
      <div className="hero-text">
        <h1>Chez vous, partout et ailleurs</h1>
        <p>
          Avec Kasa, vivez des séjours uniques dans des hébergements chaleureux,
          sélectionnés avec soin par nos hôtes.
        </p>
      </div>

      {/* Image hero */}
      <div className="hero-image">
        <Image
          src="/hero-home.png"
          alt="Maison moderne dans les dunes"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 980px"
          className="cover-image"
        />
      </div>

      {/* Liste des logements */}
      <div className="properties-grid">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>

      {/* Section marketing */}
      <section className="how-it-works">
        <h2>Comment ça marche ?</h2>
        <p>
          Que vous partiez pour un week-end improvisé, des vacances en famille
          ou un voyage professionnel, Kasa vous aide à trouver un lieu qui vous ressemble.
        </p>

        <div className="steps">
          <article>
            <h3>Recherchez</h3>
            <p>Entrez votre destination, vos dates et laissez Kasa faire le reste.</p>
          </article>
          <article>
            <h3>Réservez</h3>
            <p>Profitez d’une plateforme sécurisée et de profils d’hôtes vérifiés.</p>
          </article>
          <article>
            <h3>Vivez l’expérience</h3>
            <p>Installez-vous, profitez de votre séjour, et sentez-vous chez vous.</p>
          </article>
        </div>
      </section>
    </section>
  );
}