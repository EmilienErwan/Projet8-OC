import { getImageUrl } from "../api";

describe("getImageUrl", () => {
  test("retourne placeholder si vide", () => {
    expect(getImageUrl("")).toBe("/placeholder.jpg");
  });

  test("retourne URL externe", () => {
    const url = "https://test.com/image.jpg";
    expect(getImageUrl(url)).toBe(url);
  });

  test("concatène URL locale", () => {
    expect(getImageUrl("/image.jpg")).toContain("http://localhost:4000");
  });
});import { getImageUrl } from "../api";

/**
 * Groupe de tests de la fonction getImageUrl.
 *
 * Cette fonction sert à générer une URL d’image valide
 * selon le type de chemin reçu.
 */
describe("getImageUrl", () => {

  /**
   * Vérifie qu’une image par défaut est retournée
   * lorsque le chemin est vide.
   *
   * Cela évite les erreurs d’affichage si aucune image
   * n’est disponible.
   */
  test("retourne placeholder si vide", () => {

    expect(getImageUrl("")).toBe("/placeholder.jpg");
  });

  /**
   * Vérifie que les URLs externes sont conservées telles quelles.
   *
   * Exemple :
   * https://test.com/image.jpg
   */
  test("retourne URL externe", () => {

    const url = "https://test.com/image.jpg";

    expect(getImageUrl(url)).toBe(url);
  });

  /**
   * Vérifie que les chemins locaux sont correctement
   * concaténés avec l’URL du serveur backend.
   *
   * Exemple :
   * /image.jpg
   * devient :
   * http://localhost:4000/image.jpg
   */
  test("concatène URL locale", () => {

    expect(getImageUrl("/image.jpg"))
      .toContain("http://localhost:4000");
  });
});