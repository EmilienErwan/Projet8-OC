"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { getImageUrl } from "@/services/api";

export default function Carousel({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const safeImages = images.length > 0 ? images : ["/placeholder.jpg"];
  const [index, setIndex] = useState(0);
  const hasMany = safeImages.length > 1;

  const previous = () => {
    setIndex((current) =>
      current === 0 ? safeImages.length - 1 : current - 1
    );
  };

  const next = () => {
    setIndex((current) =>
      current === safeImages.length - 1 ? 0 : current + 1
    );
  };

  return (
    <section className="carousel" aria-label={`Photos du logement ${title}`}>
      <Image
        src={getImageUrl(safeImages[index])}
        alt={`${title} - photo ${index + 1}`}
        fill
        className="carousel-image"
        sizes="(max-width: 768px) 100vw, 1120px"
        priority
      />

      {hasMany && (
        <>
          <button
            type="button"
            className="carousel-btn left"
            onClick={previous}
            aria-label="Image précédente"
          >
            <ChevronLeft size={40} />
          </button>

          <button
            type="button"
            className="carousel-btn right"
            onClick={next}
            aria-label="Image suivante"
          >
            <ChevronRight size={40} />
          </button>

          <p className="carousel-counter">
            {index + 1}/{safeImages.length}
          </p>
        </>
      )}
    </section>
  );
}