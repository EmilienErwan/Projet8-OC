import Image from "next/image";
import { getImageUrl } from "@/services/api";

export default function PropertyGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const safeImages = images.length > 0 ? images : ["/placeholder.jpg"];
  const galleryImages = [...safeImages, ...safeImages].slice(0, 5);

  return (
    <div className="property-gallery">
      {galleryImages.map((image, index) => (
        <div key={`${image}-${index}`} className={`gallery-item gallery-item-${index}`}>
          <Image
            src={getImageUrl(image)}
            alt={`${title} - photo ${index + 1}`}
            fill
            sizes={index === 0 ? "(max-width: 768px) 100vw, 430px" : "180px"}
            className="cover-image"
            priority={index === 0}
          />
        </div>
      ))}
    </div>
  );
}