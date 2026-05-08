import { renderHook, act } from "@testing-library/react";
import { FavoritesProvider, useFavorites } from "../FavoritesContext";

/**
 * Groupe de tests du contexte FavoritesContext.
 *
 * Le but est de vérifier que les favoris sont bien ajoutés
 * et supprimés correctement.
 */
describe("FavoritesContext", () => {

  /**
   * Vérifie qu’un favori peut être ajouté puis retiré.
   */
  test("ajoute et retire un favori", () => {

    /**
     * Wrapper React utilisé pour fournir le contexte.
     *
     * Comme useFavorites dépend de FavoritesProvider,
     * on doit envelopper le hook dans son provider
     * pendant le test.
     */
    const wrapper = ({ children }: any) => (
      <FavoritesProvider>{children}</FavoritesProvider>
    );

    /**
     * renderHook permet de tester directement un hook React.
     *
     * Ici on exécute useFavorites dans un environnement de test.
     */
    const { result } = renderHook(() => useFavorites(), { wrapper });

    /**
     * act sert à encapsuler les mises à jour React.
     *
     * Cela permet à React de terminer correctement
     * les modifications de state avant les assertions.
     */
    act(() => {

      /**
       * Ajout du favori avec l’id "1".
       */
      result.current.toggleFavorite("1");
    });

    /**
     * Vérifie que le favori a bien été ajouté.
     */
    expect(result.current.isFavorite("1")).toBe(true);

    act(() => {

      /**
       * Deuxième appel :
       * le favori doit être retiré.
       */
      result.current.toggleFavorite("1");
    });

    /**
     * Vérifie que le favori n’existe plus.
     */
    expect(result.current.isFavorite("1")).toBe(false);
  });
});