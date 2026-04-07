import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const raw =
    process.env.NEXT_PUBLIC_BASE_URL ?? "https://fernandezalfred.dev";
  const base = raw.startsWith("http") ? raw : `https://${raw}`;
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/register", "/api/"],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
