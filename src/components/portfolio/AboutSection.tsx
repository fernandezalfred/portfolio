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

// Slide up + fade in used for major content blocks
const fadeUpVariants = {
  offscreen: { y: 150, opacity: 0 },
  onscreen: ({ duration = 2 } = {}) => ({
    y: 0,
    opacity: 1,
    transition: { type: "spring" as const, duration },
  }),
};

// Individual skill badge entrance animation
const skillBadgeVariants = {
  hidden:  { y: 20, opacity: 0 },
  visible: { y: 0,  opacity: 1 },
};

// Alignment for the three stat columns: left / center / right
const STAT_ALIGNMENTS = ["sm:justify-start", "sm:justify-center", "sm:justify-end"] as const;

export default function AboutSection({ data }: AboutSectionProps) {
  const stats = [
    { label: "Clients",    value: data?.noofclients     ?? "0" },
    { label: "Projects",   value: data?.noofprojects    ?? "0" },
    { label: "Experience", value: data?.yearofexerience ?? "0" },
  ];

  const skills = data?.skills?.split(",").map((s) => s.trim()) ?? [];

  return (
    <div
      className="max-w-screen-xl mt-24 mb-6 sm:mt-14 sm:mb-14 px-6 sm:px-8 lg:px-16 mx-auto"
      id="about"
    >
      {/* Stats row: Clients / Projects / Experience */}
      <div className="w-full flex">
        <AnimationWrapper className="rounded-lg w-full grid grid-cols-1 sm:grid-cols-3 py-9 divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-green-main z-10">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              custom={{ duration: 2 + index }}
              variants={fadeUpVariants}
              className={`flex items-center justify-start ${STAT_ALIGNMENTS[index]} py-4 sm:py-6 w-8/12 px-4 sm:w-auto mx-auto sm:mx-0`}
            >
              <div className="flex flex-col">
                <p className="text-[50px] text-green-main font-bold">{stat.value}+</p>
                <p className="text-[25px] font-bold text-black">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </AnimationWrapper>
      </div>

      {/* "Why hire me" heading + bio text */}
      <AnimationWrapper className="pt-6">
        <div className="flex flex-col justify-center items-center">
          <h1 className="leading-[70px] mb-4 text-3xl lg:text-4xl xl:text-5xl font-medium text-center">
            Why Hire Me For Your Next{" "}
            <span className="text-green-main">Project</span>
          </h1>
          <p className="text-gray-700 mt-4 mb-8 text-center max-w-2xl">{data?.aboutme}</p>
        </div>
      </AnimationWrapper>

      {/* Image + skills grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <AnimationWrapper className="flex w-full">
          <motion.div variants={fadeUpVariants} className="h-full w-full p-4">
            <Image
              src={about}
              alt="About illustration"
              quality={100}
              height={414}
              width={508}
              loading="eager"
            />
          </motion.div>
        </AnimationWrapper>

        <AnimationWrapper className="flex items-center w-full p-4">
          <motion.div variants={fadeUpVariants} className="flex flex-wrap gap-3 w-full">
            {skills.map((skill) => (
              <motion.div key={skill} variants={skillBadgeVariants}>
                <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium border-2 border-green-main text-green-main bg-white hover:bg-green-main hover:text-white transition-colors duration-200 cursor-default">
                  {skill}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </AnimationWrapper>
      </div>
    </div>
  );
}
