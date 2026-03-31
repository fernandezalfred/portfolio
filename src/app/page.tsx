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
  const educationSectionData = await fetchSection("education");
  const projectSectionData = await fetchSection("projects");

  const aboutData = aboutSectionData?.length
    ? { ...aboutSectionData[0], noofprojects: String(projectSectionData?.length ?? 0) }
    : null;

  return (
    <div>
      <HomeSection data={homeSectionData} />
      <AboutSection data={aboutData} />
      <ExperienceSection educationData={educationSectionData} experienceData={experienceSectionData} />
      <ProjectSection data={projectSectionData} />
      <ContactSection />
    </div>
  );
}
