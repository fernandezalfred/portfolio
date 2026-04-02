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

const fadeUpVariants = {
  offscreen: { y: 60, opacity: 0 },
  onscreen: ({ duration = 1.2 } = {}) => ({
    y: 0,
    opacity: 1,
    transition: { type: "spring" as const, duration },
  }),
};

const socialIconVariants = {
  initial:    { scale: 0, opacity: 0 },
  animate:    { scale: 1, opacity: 1 },
  hover:      { scale: 1.15, y: -2 },
  tap:        { scale: 0.9 },
  transition: { type: "spring" as const, damping: 12, stiffness: 200 },
};

const SOCIAL_ICONS = [
  { id: "facebook",  Icon: FaFacebookF,  href: "#" },
  { id: "twitter",   Icon: FaTwitter,    href: "#" },
  { id: "linkedin",  Icon: FaLinkedinIn, href: "#" },
  { id: "instagram", Icon: FaInstagram,  href: "#" },
];

export default function HomeSection({ data }: HomeSectionProps) {
  const dragContainerRef = useRef<HTMLDivElement>(null);

  const heading = data?.[0]?.heading ?? "";
  const summary = data?.[0]?.summary ?? "";

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-green-main/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -left-32 w-[400px] h-[400px] bg-green-main/5 rounded-full blur-3xl" />
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, #0DB760 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="max-w-screen-xl w-full px-6 sm:px-8 lg:px-16 mx-auto pt-28 pb-16">
        <AnimationWrapper>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-12 lg:gap-20 items-center"
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
                  onClick={() => scroller.scrollTo("project", { duration: 300, smooth: true })}
                  className="py-3 px-8 bg-green-main text-white font-semibold rounded-full hover:opacity-90 hover:shadow-lg hover:shadow-green-main/30 transition-all duration-300 text-sm"
                >
                  View My Work
                </button>
                <button
                  onClick={() => scroller.scrollTo("contact", { duration: 300, smooth: true })}
                  className="py-3 px-8 border-2 border-green-main text-green-main font-semibold rounded-full hover:bg-green-main hover:text-white transition-all duration-300 text-sm"
                >
                  Hire Me
                </button>
              </div>

              {/* Social icons */}
              <div className="flex items-center gap-3">
                <p className="text-xs text-gray-400 uppercase tracking-widest font-medium mr-1">Follow</p>
                {SOCIAL_ICONS.map(({ id, Icon, href }, i) => (
                  <motion.a
                    key={id}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={socialIconVariants.initial}
                    animate={socialIconVariants.animate}
                    transition={{ ...socialIconVariants.transition, delay: 0.4 + i * 0.1 }}
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
                <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-2xl overflow-hidden bg-green-main shadow-2xl">
                  <Image
                    src={home}
                    alt="Profile photo"
                    quality={100}
                    fill
                    className="object-cover object-top"
                    loading="eager"
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
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-400"
        >
          <p className="text-xs uppercase tracking-widest font-medium">Scroll</p>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}

function Heading({ text }: { text: string }) {
  const words = text.split(" ");
  const HIGHLIGHTED_INDICES = [2, 3];

  return (
    <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tight">
      {words.map((word, index) => (
        <span
          key={index}
          className={HIGHLIGHTED_INDICES.includes(index) ? "text-green-main" : "text-gray-900"}
        >
          {word}{" "}
        </span>
      ))}
    </h1>
  );
}
