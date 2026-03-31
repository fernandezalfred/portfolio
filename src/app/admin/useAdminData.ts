"use client";

import { addData, getData, updateData } from "@/services/api";
import { useEffect, useState } from "react";

type AllData = Record<string, unknown[]>;

const initialHomeFormData = { heading: "", summary: "" };
const initialAboutFormData = { aboutme: "", noofprojects: "", yearofexerience: "", noofclients: "", skills: "" };
const initialExperienceFormData = { position: "", company: "", duration: "", location: "", jobprofile: "" };
const initialEducationFormData = { degree: "", year: "", college: "" };
const initialProjectFormData = { name: "", website: "", technologies: "", github: "" };

export function useAdminData(currentTab: string) {
  const [homeFormData, setHomeFormData] = useState<Record<string, string>>(initialHomeFormData);
  const [aboutFormData, setAboutFormData] = useState<Record<string, string>>(initialAboutFormData);
  const [experienceFormData, setExperienceFormData] = useState<Record<string, string>>(initialExperienceFormData);
  const [educationFormData, setEducationFormData] = useState<Record<string, string>>(initialEducationFormData);
  const [projectFormData, setProjectFormData] = useState<Record<string, string>>(initialProjectFormData);
  const [allData, setAllData] = useState<AllData>({});
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    fetchAllData();
  }, [currentTab]);

  async function fetchAllData() {
    const response = await getData(currentTab);

    if (currentTab === "home" && response?.data?.length) {
      setHomeFormData(response.data[0]);
      setUpdate(true);
    }

    if (currentTab === "about" && response?.data?.length) {
      setAboutFormData(response.data[0]);
      setUpdate(true);
    }

    if (response?.success) {
      setAllData((prev) => ({ ...prev, [currentTab]: response.data }));
    }
  }

  async function handleSaveData() {
    const dataMap: Record<string, Record<string, string>> = {
      home: homeFormData,
      about: aboutFormData,
      experience: experienceFormData,
      education: educationFormData,
      projects: projectFormData,
    };

    const response = update
      ? await updateData(currentTab, dataMap[currentTab])
      : await addData(currentTab, dataMap[currentTab]);

    if (response?.success) {
      resetFormData();
      fetchAllData();
    }
  }

  function resetFormData() {
    setHomeFormData(initialHomeFormData);
    setAboutFormData(initialAboutFormData);
    setExperienceFormData(initialExperienceFormData);
    setEducationFormData(initialEducationFormData);
    setProjectFormData(initialProjectFormData);
    setUpdate(false);
  }

  return {
    homeFormData, setHomeFormData,
    aboutFormData, setAboutFormData,
    experienceFormData, setExperienceFormData,
    educationFormData, setEducationFormData,
    projectFormData, setProjectFormData,
    allData, setAllData,
    handleSaveData,
    resetFormData,
  };
}
