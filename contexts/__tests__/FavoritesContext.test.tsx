import { renderHook, act } from "@testing-library/react";
import { FavoritesProvider, useFavorites } from "../FavoritesContext";

describe("FavoritesContext", () => {
  test("ajoute et retire un favori", () => {
    const wrapper = ({ children }: any) => (
      <FavoritesProvider>{children}</FavoritesProvider>
    );

    const { result } = renderHook(() => useFavorites(), { wrapper });

    act(() => {
      result.current.toggleFavorite("1");
    });

    expect(result.current.isFavorite("1")).toBe(true);

    act(() => {
      result.current.toggleFavorite("1");
    });

    expect(result.current.isFavorite("1")).toBe(false);
  });
});