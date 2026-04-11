"use client";

/**
 * Hero / Home section of the portfolio (first visible section).
 *
 * Layout: two-column grid on sm+ screens.
 *  - Left: heading, summary, CTA buttons ("View My Work" / "Hire Me"), social icons.
 *  - Right: profile photo with a drag-and-drop interaction (Framer Motion).
 *
 * The heading component splits the text into words and highlights specific
 * word indices (HIGHLIGHTED_INDICES) in green — adjust those indices to change
 * which words are accented.
 *
 * CTA buttons use `react-scroll` to smooth-scroll to named sections (#project, #contact).
 */

import { useRef } from "react";
import AnimationWrapper from "@/components/ui/AnimationWrapper";
import { ChevronDownIcon } from "@/components/ui/Icons";
import { motion } from "framer-motion";
import { FaLinkedinIn, FaTwitter, FaGithub } from "react-icons/fa";
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

// Slides the content grid up from below and fades it in when it enters the viewport
const fadeUpVariants = {
  offscreen: { y: 60, opacity: 0 },
  onscreen: ({ duration = 1.2 } = {}) => ({
    y: 0,
    opacity: 1,
    transition: { type: "spring" as const, duration },
  }),
};

// Pop-in entrance + hover lift + tap shrink for each social icon button
const socialIconVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  hover: { scale: 1.15, y: -2 },
  tap: { scale: 0.9 },
  transition: { type: "spring" as const, damping: 12, stiffness: 200 },
};

// To add or remove a social link, update this array and import the icon from react-icons/fa
const SOCIAL_ICONS = [
  { id: "twitter", Icon: FaTwitter, href: "https://x.com/addier94" },
  {
    id: "linkedin",
    Icon: FaLinkedinIn,
    href: "https://www.linkedin.com/in/addier94",
  },
  { id: "github", Icon: FaGithub, href: "https://github.com/fernandezalfred" },
];

export default function HomeSection({ data }: HomeSectionProps) {
  const dragContainerRef = useRef<HTMLDivElement>(null); // constrains the draggable photo area

  const heading = data?.[0]?.heading ?? "";
  const summary = data?.[0]?.summary ?? "";

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pb-20 lg:pb-0"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-green-main/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -left-32 w-[400px] h-[400px] bg-green-main/5 rounded-full blur-3xl" />
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #0DB760 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="max-w-screen-xl w-full px-4 sm:px-8 lg:px-16 mx-auto pt-24 sm:pt-28 pb-16">
        <AnimationWrapper>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center"
            variants={fadeUpVariants}
          >
            {/* Left: text content */}
            <div className="flex flex-col justify-center order-2 sm:order-1">
              {/* Eyebrow */}
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center gap-2 text-green-main text-sm font-semibold uppercase tracking-widest mb-4"
              >
                <span className="w-6 h-px bg-green-main" />
                Available for hire
              </motion.span>

              <Heading text={heading} />

              <p className="text-gray-500 mt-4 mb-8 text-base sm:text-lg leading-relaxed max-w-md">
                {summary}
              </p>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-4 mb-10">
                <button
                  onClick={() =>
                    scroller.scrollTo("project", {
                      duration: 300,
                      smooth: true,
                    })
                  }
                  className="py-3 px-8 bg-green-main text-white font-semibold rounded-full hover:opacity-90 hover:shadow-lg hover:shadow-green-main/30 transition-all duration-300 text-sm"
                >
                  View My Work
                </button>
                <button
                  onClick={() =>
                    scroller.scrollTo("contact", {
                      duration: 300,
                      smooth: true,
                    })
                  }
                  className="py-3 px-8 border-2 border-green-main text-green-main font-semibold rounded-full hover:bg-green-main hover:text-white transition-all duration-300 text-sm"
                >
                  Hire Me
                </button>
              </div>

              {/* Social icons */}
              <div className="flex items-center gap-3">
                <p className="text-xs text-gray-400 uppercase tracking-widest font-medium mr-1">
                  Follow
                </p>
                {SOCIAL_ICONS.map(({ id, Icon, href }, i) => (
                  <motion.a
                    key={id}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={socialIconVariants.initial}
                    animate={socialIconVariants.animate}
                    transition={{
                      ...socialIconVariants.transition,
                      delay: 0.4 + i * 0.1,
                    }}
                    whileHover={socialIconVariants.hover}
                    whileTap={socialIconVariants.tap}
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm hover:border-green-main hover:shadow-md transition-all duration-200"
                  >
                    <Icon className="w-4 h-4 text-green-main" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Right: profile image */}
            <motion.div
              ref={dragContainerRef}
              className="flex w-full justify-center sm:justify-end order-1 sm:order-2"
            >
              <motion.div
                drag
                dragConstraints={dragContainerRef}
                dragElastic={0.1}
                className="relative cursor-grab active:cursor-grabbing"
              >
                {/* Outer ring */}
                <div className="absolute inset-0 rounded-2xl border-2 border-dashed border-green-main/30 scale-105" />
                {/* Offset shadow block */}
                <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl bg-green-main/20" />
                {/* Image container */}
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-2xl overflow-hidden bg-green-main shadow-2xl">
                  <Image
                    src={home}
                    alt="Alfredo Fernandez - Full Stack Web Developer & Designer"
                    quality={85}
                    fill
                    priority
                    className="object-cover object-top"
                  />
                </div>
                {/* Drag hint badge */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white border border-gray-200 shadow-md rounded-full px-3 py-1 text-xs text-gray-500 font-medium whitespace-nowrap">
                  Drag me
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimationWrapper>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-400 animate-bounce">
          <p className="text-xs uppercase tracking-widest font-medium">
            Scroll
          </p>
          <ChevronDownIcon />
        </div>
      </div>
    </section>
  );
}

/**
 * Splits the heading string into individual words and applies the brand green
 * color to the words at HIGHLIGHTED_INDICES (0-based).
 * Change HIGHLIGHTED_INDICES to accent different words without editing the DB text.
 */
function Heading({ text }: { text: string }) {
  const words = text.split(" ");
  const HIGHLIGHTED_INDICES = [2, 3]; // e.g. "Hi I'm Alfredo Fernandez" → "Alfredo Fernandez" in green

  return (
    <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tight">
      {words.map((word, index) => (
        <span
          key={index}
          className={
            HIGHLIGHTED_INDICES.includes(index)
              ? "text-green-main"
              : "text-gray-900"
          }
        >
          {word}{" "}
        </span>
      ))}
    </h1>
  );
}
