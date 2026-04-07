import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import Layout from "@/components/ui/Layout";

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
  display: "swap",
});

const rawBase =
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://fernandezalfred.dev";
const BASE_URL = rawBase.startsWith("http") ? rawBase : `https://${rawBase}`;

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Alfredo Fernandez — Full Stack Web Developer",
    template: "%s | Alfredo Fernandez",
  },
  description:
    "Full Stack Web Developer & Designer specializing in React, Next.js, Node.js, and MongoDB. Available for freelance projects and full-time roles.",
  keywords: [
    "Alfredo Fernandez",
    "Full Stack Developer",
    "Web Developer",
    "React Developer",
    "Next.js",
    "Node.js",
    "MongoDB",
    "TypeScript",
    "Frontend Developer",
  ],
  authors: [{ name: "Alfredo Fernandez", url: BASE_URL }],
  creator: "Alfredo Fernandez",
  openGraph: {
    type: "website",
    url: BASE_URL,
    title: "Alfredo Fernandez — Full Stack Web Developer",
    description:
      "Full Stack Web Developer & Designer specializing in React, Next.js, Node.js, and MongoDB. Available for freelance projects and full-time roles.",
    siteName: "Alfredo Fernandez Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alfredo Fernandez — Full Stack Web Developer",
    description:
      "Full Stack Web Developer & Designer specializing in React, Next.js, Node.js, and MongoDB.",
    creator: "@alfredofernandez",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: {
    canonical: BASE_URL,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Alfredo Fernandez",
  url: BASE_URL,
  jobTitle: "Full Stack Web Developer & Designer",
  description:
    "Full Stack Web Developer specializing in React, Next.js, Node.js, and MongoDB.",
  knowsAbout: [
    "React",
    "Next.js",
    "Node.js",
    "MongoDB",
    "TypeScript",
    "Web Design",
  ],
  sameAs: [],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={rubik.className}>
        <Layout>{children}</Layout>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
