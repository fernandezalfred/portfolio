import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const raw =
    process.env.NEXT_PUBLIC_BASE_URL ?? "https://fernandezalfred.dev";
  const base = raw.startsWith("http") ? raw : `https://${raw}`;
  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
