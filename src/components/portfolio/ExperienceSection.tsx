"use client";

import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from "@mui/lab";
import AnimationWrapper from "@/components/ui/AnimationWrapper";
import { motion } from "framer-motion";

interface ExperienceData {
  _id: string;
  position: string;
  company: string;
  duration: string;
  location: string;
  jobprofile: string;
}

interface EducationData {
  _id: string;
  degree: string;
  year: string;
  college: string;
}

interface ExperienceSectionProps {
  experienceData: ExperienceData[] | null;
  educationData: EducationData[] | null;
}

export default function ExperienceSection({ educationData, experienceData }: ExperienceSectionProps) {
  return (
    <div
      className="max-w-screen-xl mt-24 mb-6 sm:mt-14 sm:mb-14 px-6 sm:px-8 lg:px-16 mx-auto"
      id="experience"
    >
      <div className="grid grid-flow-row sm:grid-flow-col grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="flex flex-col gap-5">
          <AnimationWrapper className="py-6 sm:py-16">
            <div className="flex flex-col justify-center items-center row-start-2 sm:row-start-1">
              <h1 className="leading-[70px] mb-4 text-3xl lg:text-4xl xl:text-5xl font-bold">
                {"My Experience".split(" ").map((item, index) => (
                  <span key={index} className={`${index === 1 ? "text-green-main" : "text-[#000]"}`}>
                    {" "}{item}{" "}
                  </span>
                ))}
              </h1>
            </div>
          </AnimationWrapper>

          <AnimationWrapper>
            <div className="flex w-full">
              <motion.div className="container">
                <Timeline position="right">
                  {experienceData && experienceData.length
                    ? experienceData.map((item, i) => (
                        <TimelineItem key={i}>
                          <TimelineSeparator>
                            <TimelineDot className="bg-green-main" />
                            <TimelineConnector className="bg-green-main" />
                          </TimelineSeparator>
                          <TimelineContent>
                            <div className="border-[2px] p-4 rounded-[8px] border-green-main mt-[14px] ml-[16px]">
                              <p className="font-bold">{item.duration}</p>
                              <p className="font-extrabold mt-2">{item.company}, {item.location}</p>
                              <p className="font-extrabold mt-2">{item.position}</p>
                              <p className="font-bold mt-2">{item.jobprofile}</p>
                            </div>
                          </TimelineContent>
                        </TimelineItem>
                      ))
                    : null}
                </Timeline>
              </motion.div>
            </div>
          </AnimationWrapper>
        </div>

        <div className="flex flex-col gap-5">
          <AnimationWrapper className="py-6 sm:py-16">
            <div className="flex flex-col justify-center items-center row-start-2 sm:row-start-1">
              <h1 className="leading-[70px] mb-4 text-3xl lg:text-4xl xl:text-5xl font-bold">
                {"My Education".split(" ").map((item, index) => (
                  <span key={index} className={`${index === 1 ? "text-green-main" : "text-[#000]"}`}>
                    {" "}{item}{" "}
                  </span>
                ))}
              </h1>
            </div>
          </AnimationWrapper>

          <AnimationWrapper>
            <div className="flex w-full">
              <motion.div className="container">
                <Timeline position="right">
                  {educationData && educationData.length
                    ? educationData.map((item, i) => (
                        <TimelineItem key={i}>
                          <TimelineSeparator>
                            <TimelineDot className="bg-green-main" />
                            <TimelineConnector className="bg-green-main" />
                          </TimelineSeparator>
                          <TimelineContent>
                            <div className="border-[2px] p-4 rounded-[8px] border-green-main mt-[14px] ml-[16px]">
                              <p className="font-bold">Year: {item.year}</p>
                              <p className="font-extrabold mt-2">College: {item.college}</p>
                              <p className="font-bold mt-2">Degree: {item.degree}</p>
                            </div>
                          </TimelineContent>
                        </TimelineItem>
                      ))
                    : null}
                </Timeline>
              </motion.div>
            </div>
          </AnimationWrapper>
        </div>
      </div>
    </div>
  );
}
