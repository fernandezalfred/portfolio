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

const cardVariants = {
  offscreen: { y: 40, opacity: 0 },
  onscreen:  { y: 0, opacity: 1, transition: { type: "spring" as const, duration: 0.7 } },
};

// Rotating accent colors for the top card border
const ACCENT_COLORS = [
  "from-green-main to-emerald-400",
  "from-blue-500 to-cyan-400",
  "from-violet-500 to-purple-400",
  "from-orange-500 to-amber-400",
  "from-pink-500 to-rose-400",
  "from-teal-500 to-green-400",
];

export default function ProjectSection({ data }: ProjectSectionProps) {
  return (
    <section id="project" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-green-main/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-16">
        {/* Heading */}
        <AnimationWrapper className="text-center mb-14">
          <p className="text-green-main text-sm font-semibold uppercase tracking-widest mb-3">
            Portfolio
          </p>
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
            My <span className="text-green-main">Projects</span>
          </h2>
          <div className="mt-5 mx-auto w-16 h-1 rounded-full bg-green-main" />
          <p className="text-gray-500 mt-5 text-lg max-w-xl mx-auto">
            A selection of things I&apos;ve designed and built
          </p>
        </AnimationWrapper>

        {/* Grid */}
        <AnimationWrapper>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.map((project, index) => (
              <ProjectCard
                key={project._id}
                project={project}
                index={index}
                accentColor={ACCENT_COLORS[index % ACCENT_COLORS.length]}
              />
            ))}
          </div>
        </AnimationWrapper>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  accentColor,
}: {
  project: ProjectData;
  index: number;
  accentColor: string;
}) {
  const technologies = project.technologies.split(",").map((t) => t.trim()).filter(Boolean);

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -4 }}
      className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
    >
      {/* Gradient top accent bar */}
      <div className={`h-1 w-full bg-gradient-to-r ${accentColor}`} />

      <div className="p-6 flex flex-col flex-1 gap-4">
        {/* Header: name + number */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-bold text-gray-900 capitalize leading-snug group-hover:text-green-main transition-colors">
            {project.name}
          </h3>
          <span className="shrink-0 text-xs font-bold text-gray-300 tabular-nums mt-0.5">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 flex-1">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="text-xs px-2.5 py-1 rounded-full bg-gray-50 border border-gray-200 text-gray-600 font-medium"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4 pt-3 border-t border-gray-100">
          {project.website && (
            <a
              href={project.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-semibold text-green-main hover:opacity-70 transition-opacity"
            >
              <FaExternalLinkAlt className="w-3 h-3" />
              Live Demo
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors"
            >
              <FaGithub className="w-4 h-4" />
              Source
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
