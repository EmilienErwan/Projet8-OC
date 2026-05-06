import Link from "next/link";
import { notFound } from "next/navigation";
import Carousel from "@/components/Carousel";
import HostCard from "@/components/HostCard";
import TagList from "@/components/TagList";
import { getProperty } from "@/services/api";

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let property;

  try {
    property = await getProperty(id);
  } catch {
    notFound();
  }

  const images = property.pictures?.length
    ? property.pictures
    : property.cover
      ? [property.cover]
      : [];

  return (
    <section className="property-detail-page">
      <Link href="/" className="back-link">← Retour aux annonces</Link>

      <Carousel images={images} title={property.title} />

      <div className="property-detail-layout">
        <article className="property-detail-card">
          <h1>{property.title}</h1>
          <p className="location">{property.location}</p>

          <p className="description">{property.description}</p>

          <TagList title="Équipements" items={property.equipments} />
          <TagList title="Catégorie" items={property.tags} />
        </article>

        <HostCard host={property.host} />
      </div>
    </section>
  );
}