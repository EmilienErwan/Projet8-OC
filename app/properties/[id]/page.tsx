import Link from "next/link";
import { notFound } from "next/navigation";
import HostCard from "@/components/HostCard";
import TagList from "@/components/TagList";
import { getProperty } from "@/services/api";
import PropertyGallery from "@/components/PropertyGallery";

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

      <div className="property-top-layout">
        <PropertyGallery images={images} title={property.title} />
        <HostCard host={property.host} />
      </div>

      <article className="property-detail-card">
        <h1>{property.title}</h1>
        <p className="location">⌖ {property.location}</p>
        <p className="description">{property.description}</p>

        <TagList title="Équipements" items={property.equipments} />
        <TagList title="Catégorie" items={property.tags} />
      </article>
    </section>
  );
}