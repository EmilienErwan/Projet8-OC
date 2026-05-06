"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

/**
 * Type du contexte des favoris
 * - favorites : liste des IDs favoris
 * - isFavorite : vérifie si un logement est en favori
 * - toggleFavorite : ajoute ou retire un favori
 */
type FavoritesContextType = {
  favorites: string[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
};

/**
 * Création du contexte global des favoris
 */
const FavoritesContext = createContext<FavoritesContextType | null>(null);

/**
 * Provider global qui encapsule l’application
 * Permet de partager les favoris dans tout le projet
 */
export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);

  /**
   * Chargement des favoris depuis le localStorage au premier rendu
   */
  useEffect(() => {
    const stored = localStorage.getItem("kasa-favorites");
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  /**
   * Sauvegarde automatique des favoris dans le localStorage
   * à chaque modification
   */
  useEffect(() => {
    localStorage.setItem("kasa-favorites", JSON.stringify(favorites));
  }, [favorites]);

  /**
   * Memo du contexte pour éviter des re-renders inutiles
   */
  const value = useMemo(
    () => ({
      favorites,

      /**
       * Vérifie si un logement est en favori
       */
      isFavorite: (id: string) => favorites.includes(id),

      /**
       * Ajoute ou retire un favori
       */
      toggleFavorite: (id: string) => {
        setFavorites((current) =>
          current.includes(id)
            ? current.filter((favoriteId) => favoriteId !== id)
            : [...current, id]
        );
      },
    }),
    [favorites]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

/**
 * Hook personnalisé pour accéder au contexte des favoris
 */
export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites doit être utilisé dans FavoritesProvider");
  }

  return context;
}