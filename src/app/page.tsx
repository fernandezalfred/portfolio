import AboutSection from "@/components/portfolio/AboutSection";
import ContactSection from "@/components/portfolio/ContactSection";
import ExperienceSection from "@/components/portfolio/ExperienceSection";
import HomeSection from "@/components/portfolio/HomeSection";
import ProjectSection from "@/components/portfolio/ProjectSection";

async function fetchSection(section: string): Promise<any[]> {
  const raw = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
  const baseUrl = raw.startsWith("http") ? raw : `https://${raw}`;
  const res = await fetch(`${baseUrl}/api/${section}`, {
    method: "GET",
    next: { revalidate: 60 },
  });
  const data = await res.json();
  return data?.data;
}

export default async function Home() {
  const [homeSectionData, aboutSectionData, experienceSectionData, projectSectionData] =
    await Promise.all([
      fetchSection("home"),
      fetchSection("about"),
      fetchSection("experience"),
      fetchSection("projects"),
    ]);

  const aboutData = aboutSectionData?.length ? aboutSectionData[0] : null;

  return (
    <main>
      <HomeSection data={homeSectionData} />
      <AboutSection data={aboutData} />
      <ExperienceSection experienceText={experienceSectionData?.[0]?.text ?? null} />
      <ProjectSection data={projectSectionData} />
      <ContactSection />
      <footer className="border-t border-gray-100 py-6 pb-24 lg:pb-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Alfredo Fernandez. All rights reserved.
      </footer>
    </main>
  );
}
