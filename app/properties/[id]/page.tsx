import Link from "next/link";
import { notFound } from "next/navigation";
import HostCard from "@/components/HostCard";
import TagList from "@/components/TagList";
import { getProperty } from "@/services/api";
import Carousel from "@/components/Carousel";

/**
 * Page de détail d’un logement.
 *
 * Elle récupère une propriété depuis l’API grâce à son identifiant,
 * puis affiche ses images, ses informations, son hôte,
 * ses équipements et ses catégories.
 */
export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  /**
   * Récupération de l’identifiant depuis l’URL dynamique :
   * /properties/[id]
   */
  const { id } = await params;

  let property;

  /**
   * Récupération de la propriété depuis l’API.
   * Si l’API ne trouve pas la propriété, on affiche la page 404.
   */
  try {
    property = await getProperty(id);
  } catch {
    notFound();
  }

  /**
   * Préparation des images pour le carousel.
   * On utilise les images de galerie si elles existent,
   * sinon l’image de couverture,
   * sinon un tableau vide.
   */
  const images = property.pictures?.length
    ? property.pictures
    : property.cover
      ? [property.cover]
      : [];

  /**
   * Données structurées Schema.org.
   * Elles aident les moteurs de recherche à comprendre
   * que la page représente un logement.
   */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: property.title,
    description: property.description,
    address: property.location,
    image: images,
    priceRange: `${property.price_per_night ?? property.price ?? 100}€ par nuit`,
  };

  return (
    <section className="property-detail-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link href="/" className="back-link">
        ← Retour aux annonces
      </Link>

      <div className="property-top-layout">
        <Carousel images={images} title={property.title} />
        <HostCard host={property.host} />
      </div>

      <article className="property-detail-card">
        <h1>{property.title}</h1>
        <p className="location">⌖ {property.location}</p>
        <p className="description">{property.description}</p>

        <TagList title="Équipements" items={property.equipments} />
        <TagList title="Catégorie" items={property.tags} />
      </article>
    </section>
  );
}