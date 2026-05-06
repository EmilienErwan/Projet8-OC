import Link from "next/link";
import Image from "next/image";
import { Property } from "@/types/property";
import { getImageUrl } from "@/services/api";
import FavoriteButton from "./FavoriteButton";

/**
 * Carte représentant un logement dans la liste
 *
 * @param property Données du logement
 */
export default function PropertyCard({ property }: { property: Property }) {
  /**
   * Gestion du prix :
   * - utilise price_per_night si disponible
   * - sinon price
   * - sinon fallback à 100€
   */
  const price = property.price_per_night ?? property.price ?? 100;

  return (
    /**
     * Toute la carte est cliquable → navigation vers le détail
     */
    <Link href={`/properties/${property.id}`} className="property-card">
      <div className="property-image-wrapper">
        <Image
          /**
           * Gestion des images :
           * - cover en priorité
           * - sinon première image
           * - sinon placeholder (via getImageUrl)
           */
          src={getImageUrl(property.cover || property.pictures?.[0])}
          alt={property.title}
          fill
          className="property-image"
          sizes="(max-width: 768px) 100vw, 33vw"
          loading="eager"
        />

        {/* Bouton favoris positionné sur l’image */}
        <FavoriteButton id={property.id} />
      </div>

      <div className="property-content">
        <h2>{property.title}</h2>
        <p>{property.location}</p>

        <p className="price">
          <strong>{price}€</strong> par nuit
        </p>
      </div>
    </Link>
  );
}