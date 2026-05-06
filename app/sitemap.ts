import { MetadataRoute } from "next";
import { getProperties } from "@/services/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "http://localhost:3000";

  const properties = await getProperties();

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/register`,
      lastModified: new Date(),
    },
    ...properties.map((property) => ({
      url: `${baseUrl}/properties/${property.id}`,
      lastModified: new Date(),
    })),
  ];
}