import { render, screen, fireEvent } from "@testing-library/react";
import Carousel from "../Carousel";

/**
 * Mock du composant Next/Image.
 *
 * En test, on remplace Next/Image par une simple balise <img>.
 * Cela permet de tester le comportement du carousel sans dépendre
 * du fonctionnement interne de Next.js.
 */
vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    return <img {...props} />;
  },
}));

/**
 * Mock de la fonction getImageUrl.
 *
 * Le but du test est de tester le carousel,
 * pas la logique de génération des URLs d’images.
 */
vi.mock("@/services/api", () => ({
  getImageUrl: (path?: string) => path || "/placeholder.jpg",
}));

/**
 * Jeu de données utilisé pour les tests.
 */
const images = ["img1.jpg", "img2.jpg", "img3.jpg"];

/**
 * Groupe de tests dédié au composant Carousel.
 */
describe("Carousel", () => {
  /**
   * Vérifie que le carousel affiche bien la première image au chargement.
   */
  test("affiche la première image", () => {
    render(<Carousel images={images} title="Test" />);

    const image = screen.getByAltText("Test - photo 1");

    expect(image).toBeInTheDocument();
  });

  /**
   * Vérifie que le bouton "Image suivante" permet de passer
   * de la première à la deuxième image.
   */
  test("passe à l'image suivante", () => {
    render(<Carousel images={images} title="Test" />);

    const nextBtn = screen.getByLabelText("Image suivante");

    fireEvent.click(nextBtn);

    expect(screen.getByAltText("Test - photo 2")).toBeInTheDocument();
  });

  /**
   * Vérifie le comportement circulaire du carousel.
   *
   * Avec trois images :
   * - clic 1 : image 2
   * - clic 2 : image 3
   * - clic 3 : retour à image 1
   */
  test("revient à la première image après la dernière", () => {
    render(<Carousel images={images} title="Test" />);

    const nextBtn = screen.getByLabelText("Image suivante");

    fireEvent.click(nextBtn);
    fireEvent.click(nextBtn);
    fireEvent.click(nextBtn);

    expect(screen.getByAltText("Test - photo 1")).toBeInTheDocument();
  });

  /**
   * Vérifie que les boutons de navigation sont masqués
   * lorsqu’il n’y a qu’une seule image.
   *
   * C’est un cas demandé dans les consignes du projet.
   */
  test("cache les boutons si une seule image", () => {
    render(<Carousel images={["img1.jpg"]} title="Test" />);

    expect(screen.queryByLabelText("Image suivante")).not.toBeInTheDocument();
  });
});