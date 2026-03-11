import AboutSection from "@/components/portfolio/AboutSection";
import ContactSection from "@/components/portfolio/ContactSection";
import ExperienceSection from "@/components/portfolio/ExperienceSection";
import HomeSection from "@/components/portfolio/HomeSection";
import ProjectSection from "@/components/portfolio/ProjectSection";

async function fetchSection(section) {
  const res = await fetch(`http://localhost:3000/api/${section}`, {
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

  return (
    <div>
      <HomeSection data={homeSectionData} />
      <AboutSection data={aboutSectionData && aboutSectionData.length ? aboutSectionData[0] : []} />
      <ExperienceSection educationData={educationSectionData} experienceData={experienceSectionData} />
      <ProjectSection data={projectSectionData} />
      <ContactSection />
    </div>
  );
}
