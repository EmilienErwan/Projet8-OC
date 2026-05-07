import { render, screen, fireEvent } from "@testing-library/react";
import Carousel from "../Carousel";

vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    return <img {...props} />;
  },
}));

vi.mock("@/services/api", () => ({
  getImageUrl: (path?: string) => path || "/placeholder.jpg",
}));

const images = ["img1.jpg", "img2.jpg", "img3.jpg"];

describe("Carousel", () => {
  test("affiche la première image", () => {
    render(<Carousel images={images} title="Test" />);

    const image = screen.getByAltText("Test - photo 1");
    expect(image).toBeInTheDocument();
  });

  test("passe à l'image suivante", () => {
    render(<Carousel images={images} title="Test" />);

    const nextBtn = screen.getByLabelText("Image suivante");
    fireEvent.click(nextBtn);

    expect(screen.getByAltText("Test - photo 2")).toBeInTheDocument();
  });

  test("revient à la première image après la dernière", () => {
    render(<Carousel images={images} title="Test" />);

    const nextBtn = screen.getByLabelText("Image suivante");

    fireEvent.click(nextBtn);
    fireEvent.click(nextBtn);
    fireEvent.click(nextBtn);

    expect(screen.getByAltText("Test - photo 1")).toBeInTheDocument();
  });

  test("cache les boutons si une seule image", () => {
    render(<Carousel images={["img1.jpg"]} title="Test" />);

    expect(screen.queryByLabelText("Image suivante")).not.toBeInTheDocument();
  });
});