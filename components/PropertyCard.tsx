import Link from "next/link";
import Image from "next/image";
import { Property } from "@/types/property";
import { getImageUrl } from "@/services/api";
import FavoriteButton from "./FavoriteButton";

export default function PropertyCard({ property }: { property: Property }) {
  const price = property.price_per_night ?? property.price ?? 100;

  return (
    <Link href={`/properties/${property.id}`} className="property-card">
      <div className="property-image-wrapper">
        <Image
          src={getImageUrl(property.cover || property.pictures?.[0])}
          alt={property.title}
          fill
          className="property-image"
          sizes="(max-width: 768px) 100vw, 33vw"
          loading="eager"
        />
        <FavoriteButton id={property.id} />
      </div>

      <div className="property-content">
        <h2>{property.title}</h2>
        <p>{property.location}</p>
        <p className="price"><strong>{price}€</strong> par nuit</p>
      </div>
    </Link>
  );
}