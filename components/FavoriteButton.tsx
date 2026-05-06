"use client";

import { Heart } from "lucide-react";
import { useFavorites } from "@/contexts/FavoritesContext";

export default function FavoriteButton({ id }: { id: string }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(id);

  return (
    <button
      className={`favorite-btn ${active ? "active" : ""}`}
      onClick={(event) => {
        event.preventDefault();
        toggleFavorite(id);
      }}
      aria-label={active ? "Retirer des favoris" : "Ajouter aux favoris"}
    >
      <Heart size={16} fill={active ? "currentColor" : "none"} />
    </button>
  );
}