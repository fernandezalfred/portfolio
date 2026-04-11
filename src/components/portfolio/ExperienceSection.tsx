"use client";

/**
 * Public "Experience" section of the portfolio.
 *
 * Renders a styled card with the experience summary text fetched from the database.
 * The section is only rendered when `experienceText` is non-null (i.e., data is loaded).
 *
 * Visual details:
 *  - Large decorative quote mark in the card background (aria-hidden).
 *  - Briefcase icon row with the author's name and title.
 *  - Bottom accent line with a "Freelance & Personal Projects" label.
 */

import AnimationWrapper from "@/components/ui/AnimationWrapper";
import { BriefcaseIcon } from "@/components/ui/Icons";

interface ExperienceSectionProps {
  experienceText: string | null;
}

export default function ExperienceSection({ experienceText }: ExperienceSectionProps) {
  return (
    <section id="experience" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-green-main/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16">
        {/* Heading */}
        <AnimationWrapper className="text-center mb-16">
          <p className="text-green-main text-sm font-semibold uppercase tracking-widest mb-3">
            Professional Background
          </p>
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
            My{" "}
            <span className="text-green-main">Experience</span>
          </h2>
          <div className="mt-5 mx-auto w-16 h-1 rounded-full bg-green-main" />
        </AnimationWrapper>

        {/* Card */}
        {experienceText && (
          <AnimationWrapper>
            <div className="relative bg-white rounded-2xl shadow-xl border border-gray-100 px-8 py-10 sm:px-14 sm:py-14">
              {/* Decorative quote mark */}
              <span
                aria-hidden="true"
                className="absolute top-6 left-8 text-[8rem] leading-none font-serif text-green-main/10 select-none pointer-events-none"
              >
                &ldquo;
              </span>

              {/* Brief icon row */}
              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-green-main/10">
                  <BriefcaseIcon className="w-5 h-5 text-green-main" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Alfredo Fernandez</p>
                  <p className="text-xs text-gray-400">Web Developer &amp; Designer</p>
                </div>
              </div>

              <p className="relative text-gray-600 text-lg sm:text-xl leading-relaxed z-10">
                {experienceText}
              </p>

              {/* Bottom accent line */}
              <div className="mt-10 pt-8 border-t border-gray-100 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-main" />
                <div className="w-8 h-0.5 bg-green-main/40" />
                <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">
                  Freelance &amp; Personal Projects
                </p>
              </div>
            </div>
          </AnimationWrapper>
        )}
      </div>
    </section>
  );
}

