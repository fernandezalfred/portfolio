import AboutSection from "@/components/portfolio/AboutSection";
import ContactSection from "@/components/portfolio/ContactSection";
import ExperienceSection from "@/components/portfolio/ExperienceSection";
import HomeSection from "@/components/portfolio/HomeSection";
import ProjectSection from "@/components/portfolio/ProjectSection";

async function fetchSection(section: string): Promise<any[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/${section}`, {
    method: "GET",
    cache: "no-store",
  });
  const data = await res.json();
  return data?.data;
}

export default async function Home() {
  const homeSectionData = await fetchSection("home");
  const aboutSectionData = await fetchSection("about");
  const experienceSectionData = await fetchSection("experience");
  const projectSectionData = await fetchSection("projects");

  const aboutData = aboutSectionData?.length ? aboutSectionData[0] : null;

  return (
    <main>
      <HomeSection data={homeSectionData} />
      <AboutSection data={aboutData} />
      <ExperienceSection experienceText={experienceSectionData?.[0]?.text ?? null} />
      <ProjectSection data={projectSectionData} />
      <ContactSection />
      <footer className="border-t border-gray-100 py-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Alfredo Fernandez. All rights reserved.
      </footer>
    </main>
  );
}
