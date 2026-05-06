"use client";

import { Heart } from "lucide-react";
import { useFavorites } from "@/contexts/FavoritesContext";

/**
 * Bouton permettant d’ajouter ou retirer un logement des favoris
 *
 * @param id Identifiant du logement
 */
export default function FavoriteButton({ id }: { id: string }) {
  /**
   * Accès au contexte global des favoris
   */
  const { isFavorite, toggleFavorite } = useFavorites();

  /**
   * Vérifie si le logement est déjà en favori
   */
  const active = isFavorite(id);

  return (
    <button
      className={`favorite-btn ${active ? "active" : ""}`}

      /**
       * Empêche la navigation (souvent utilisé dans une card cliquable)
       * puis toggle le favori
       */
      onClick={(event) => {
        event.preventDefault();
        toggleFavorite(id);
      }}

      /**
       * Accessibilité : décrit l’action du bouton
       */
      aria-label={active ? "Retirer des favoris" : "Ajouter aux favoris"}
    >
      <Heart size={16} fill={active ? "currentColor" : "none"} />
    </button>
  );
}