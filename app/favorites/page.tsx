"use client";

import { useEffect, useState } from "react";
import { useFavorites } from "@/contexts/FavoritesContext";
import { getProperties } from "@/services/api";
import { Property } from "@/types/property";
import PropertyCard from "@/components/PropertyCard";

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    getProperties().then((data) => {
      const filtered = data.filter((p) => favorites.includes(p.id));
      setProperties(filtered);
    });
  }, [favorites]);

  return (
    <section className="favorites-page">
      <h1>Vos logements favoris</h1>

      {properties.length === 0 ? (
        <p>Aucun favori pour le moment.</p>
      ) : (
        <div className="properties-grid">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </section>
  );
}