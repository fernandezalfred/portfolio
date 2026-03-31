"use client";

import AnimationWrapper from "@/components/ui/AnimationWrapper";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

interface ProjectData {
  _id: string;
  name: string;
  website: string;
  technologies: string;
  github: string;
  createdAt: string;
}

interface ProjectSectionProps {
  data: ProjectData[] | null;
}

// Each card slides up and fades in when it enters the viewport
const cardVariants = {
  offscreen: { y: 40, opacity: 0 },
  onscreen:  { y: 0,  opacity: 1, transition: { type: "spring" as const, duration: 0.8 } },
};

export default function ProjectSection({ data }: ProjectSectionProps) {
  return (
    <div
      className="max-w-screen-xl mt-24 mb-6 sm:mt-14 sm:mb-14 px-6 sm:px-8 mx-auto"
      id="project"
    >
      {/* Section heading */}
      <AnimationWrapper className="py-6 sm:py-16">
        <div className="flex flex-col items-center">
          <h1 className="leading-tight mb-2 text-3xl lg:text-4xl xl:text-5xl font-bold">
            My <span className="text-green-main">Projects</span>
          </h1>
          <p className="text-gray-500 mt-2 mb-8 text-center max-w-xl">
            A selection of things I&apos;ve built
          </p>
        </div>
      </AnimationWrapper>

      {/* Project cards grid */}
      <AnimationWrapper>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      </AnimationWrapper>
    </div>
  );
}

function ProjectCard({ project }: { project: ProjectData }) {
  const dateLabel = project.createdAt.split("T")[0];
  const technologies = project.technologies.split(",").map((t) => t.trim());

  return (
    <motion.div
      variants={cardVariants}
      className="border border-gray-200 rounded-xl p-5 flex flex-col gap-4 bg-white shadow-sm hover:shadow-md hover:border-green-main transition-all duration-300"
    >
      {/* Project name, date, and tech tags */}
      <div className="flex-1">
        <h3 className="text-xl text-black capitalize font-bold mb-1">{project.name}</h3>
        <p className="text-xs text-gray-400 mb-4">{dateLabel}</p>

        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Links to live demo and source code */}
      <div className="flex gap-3 pt-2 border-t border-gray-100">
        <a
          href={project.website}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-sm font-semibold text-green-main hover:opacity-75 transition-opacity"
        >
          <FaExternalLinkAlt className="w-3 h-3" />
          Live Demo
        </a>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-sm font-semibold text-gray-600 hover:text-green-main transition-colors"
        >
          <FaGithub className="w-4 h-4" />
          Source
        </a>
      </div>
    </motion.div>
  );
}
