"use client";

import AnimationWrapper from "@/components/ui/AnimationWrapper";
import { motion } from "framer-motion";
import Image from "next/image";
import about from "@/assets/about.png";

interface AboutData {
  _id: string;
  aboutme: string;
  noofprojects: string;
  yearofexerience: string;
  noofclients: string;
  skills: string;
}

interface AboutSectionProps {
  data: AboutData | null;
}

const fadeUpVariants = {
  offscreen: { y: 40, opacity: 0 },
  onscreen: ({ duration = 1 } = {}) => ({
    y: 0,
    opacity: 1,
    transition: { type: "spring" as const, duration },
  }),
};

export default function AboutSection({ data }: AboutSectionProps) {
  const stats = [
    { label: "Clients",         value: data?.noofclients     ?? "0", icon: "👥" },
    { label: "Projects",        value: data?.noofprojects    ?? "0", icon: "🚀" },
    { label: "Years Experience",value: data?.yearofexerience ?? "0", icon: "⚡" },
  ];

  const skills = data?.skills?.split(",").map((s) => s.trim()).filter(Boolean) ?? [];

  return (
    <section
      id="about"
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      {/* Section background accent */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-green-main/5 rounded-full blur-3xl -translate-y-1/2" />
      </div>

      <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-16">

        {/* Stats row */}
        <AnimationWrapper className="mb-20">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                custom={{ duration: 0.8 + index * 0.15 }}
                variants={fadeUpVariants}
                className="relative bg-white rounded-2xl border border-gray-100 shadow-sm p-7 flex items-center gap-5 hover:shadow-md hover:border-green-main/30 transition-all duration-300 group"
              >
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-green-main/10 flex items-center justify-center text-2xl group-hover:bg-green-main/20 transition-colors">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-4xl font-bold text-gray-900 leading-none">
                    {stat.value}
                    <span className="text-green-main">+</span>
                  </p>
                  <p className="text-sm text-gray-500 mt-1 font-medium">{stat.label}</p>
                </div>
                {/* Subtle corner accent */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-green-main/5 rounded-bl-3xl rounded-tr-2xl" />
              </motion.div>
            ))}
          </div>
        </AnimationWrapper>

        {/* "Why hire me" */}
        <AnimationWrapper className="text-center mb-16">
          <p className="text-green-main text-sm font-semibold uppercase tracking-widest mb-3">
            About Me
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Why Hire Me For Your Next{" "}
            <span className="text-green-main">Project?</span>
          </h2>
          <div className="mt-5 mx-auto w-16 h-1 rounded-full bg-green-main" />
          <p className="text-gray-500 mt-6 max-w-2xl mx-auto text-lg leading-relaxed">
            {data?.aboutme}
          </p>
        </AnimationWrapper>

        {/* Image + skills */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <AnimationWrapper>
            <motion.div variants={fadeUpVariants} className="relative flex justify-center">
              {/* Decorative frame */}
              <div className="absolute -bottom-4 -right-4 w-48 h-48 bg-green-main/10 rounded-2xl" />
              <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-green-main/20 rounded-xl" />
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-100">
                <Image
                  src={about}
                  alt="Alfredo Fernandez - About Me"
                  quality={100}
                  height={414}
                  width={508}
                  loading="eager"
                  className="block"
                />
              </div>
            </motion.div>
          </AnimationWrapper>

          {/* Skills */}
          <AnimationWrapper>
            <motion.div variants={fadeUpVariants}>
              <p className="text-green-main text-sm font-semibold uppercase tracking-widest mb-3">
                Tech Stack
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Skills &amp; Technologies</h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                    whileHover={{ y: -2, scale: 1.05 }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border border-green-main/30 text-green-main bg-green-main/5 hover:bg-green-main hover:text-white hover:border-green-main cursor-default transition-all duration-200 shadow-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-green-main/60 inline-block" />
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </AnimationWrapper>
        </div>
      </div>
    </section>
  );
}
