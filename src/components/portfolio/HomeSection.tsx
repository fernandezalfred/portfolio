"use client";

import { useRef } from "react";
import AnimationWrapper from "@/components/ui/AnimationWrapper";
import { motion } from "framer-motion";
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaTwitter } from "react-icons/fa";
import { scroller } from "react-scroll";
import Image from "next/image";
import home from "@/assets/home.png";

interface HomeData {
  _id: string;
  heading: string;
  summary: string;
}

interface HomeSectionProps {
  data: HomeData[] | null;
}

// Slide up + fade in animation used by framer-motion
const fadeUpVariants = {
  offscreen: { y: 150, opacity: 0 },
  onscreen: ({ duration = 2 } = {}) => ({
    y: 0,
    opacity: 1,
    transition: { type: "spring", duration },
  }),
};

// Spin + scale animation for each social icon
const socialIconVariants = {
  initial:  { scale: 0 },
  animate:  { rotate: 360, scale: 1 },
  hover:    { scale: 1.1, rotate: 360 },
  tap:      { scale: 0.9, rotate: -360, borderRadius: "100%" },
  transition: { type: "spring", damping: 10, stiffness: 100, duration: 1.5 },
};

const SOCIAL_ICONS = [
  { id: "facebook",  Icon: FaFacebookF  },
  { id: "twitter",   Icon: FaTwitter    },
  { id: "linkedin",  Icon: FaLinkedinIn },
  { id: "instagram", Icon: FaInstagram  },
];

export default function HomeSection({ data }: HomeSectionProps) {
  const dragContainerRef = useRef<HTMLDivElement>(null);

  const heading = data?.[0]?.heading ?? "";
  const summary = data?.[0]?.summary ?? "";

  return (
    <div className="max-w-screen-xl mt-24 px-8 xl:px-16 mx-auto" id="home">
      <AnimationWrapper>
        <motion.div
          className="grid grid-flow-row sm:grid-flow-col grid-rows-2 md:grid-rows-1 sm:grid-cols-2 gap-12 py-10 sm:py-20"
          variants={fadeUpVariants}
        >
          {/* Left column: text + buttons + social icons */}
          <div className="flex flex-col justify-center items-start row-start-2 sm:row-start-1">
            <Heading text={heading} />

            <p className="text-gray-700 mt-4 mb-8 text-lg leading-relaxed">{summary}</p>

            {/* Call-to-action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <button
                onClick={() => scroller.scrollTo("project", { duration: 1000, smooth: true })}
                className="py-3 px-8 bg-green-main text-white font-semibold rounded-full hover:opacity-90 hover:shadow-lg transition-all duration-300"
              >
                View My Work
              </button>
              <button
                onClick={() => scroller.scrollTo("contact", { duration: 1000, smooth: true })}
                className="py-3 px-8 border-2 border-green-main text-green-main font-semibold rounded-full hover:bg-green-main hover:text-white transition-all duration-300"
              >
                Hire Me
              </button>
            </div>

            {/* Social media links */}
            <div className="flex gap-3">
              {SOCIAL_ICONS.map(({ id, Icon }) => (
                <motion.div
                  key={id}
                  initial={socialIconVariants.initial}
                  animate={socialIconVariants.animate}
                  transition={socialIconVariants.transition}
                  whileHover={socialIconVariants.hover}
                  whileTap={socialIconVariants.tap}
                  className="cursor-pointer p-2 bg-white rounded-full shadow-md border border-gray-100"
                >
                  <Icon color="rgba(13, 183, 96, 1)" className="w-10 h-10" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right column: draggable profile image */}
          <motion.div ref={dragContainerRef} className="flex w-full justify-end">
            <motion.div
              drag
              dragConstraints={dragContainerRef}
              className="w-[400px] h-[400px] relative bg-green-main rounded-lg shadow-2xl"
            >
              {/* Decorative offset border behind the image */}
              <div className="absolute w-[400px] h-[400px] top-[40px] left-[-30px] rounded-lg border-[6px] border-gray-800" />

              <Image
                src={home}
                alt="Profile photo"
                quality={100}
                width={300}
                height={300}
                className="absolute top-[-15px] rounded-lg"
                style={{ width: "100%", height: "auto" }}
                loading="eager"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </AnimationWrapper>
    </div>
  );
}

// Renders the heading with words 3 and 4 (0-indexed: 2, 3) highlighted in green.
// Example: "Hi I'm John Doe the Developer" → "John Doe" are green.
function Heading({ text }: { text: string }) {
  const HIGHLIGHTED_INDICES = [2, 3];

  return (
    <h1 className="mb-6 text-4xl lg:text-5xl xl:text-6xl font-bold leading-snug">
      {text.split(" ").map((word, index) => (
        <span
          key={index}
          className={HIGHLIGHTED_INDICES.includes(index) ? "text-green-main" : "text-gray-800"}
        >
          {word}{" "}
        </span>
      ))}
    </h1>
  );
}
