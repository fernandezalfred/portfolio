"use client";

import { addData, getData, updateData } from "@/services/api";
import { useEffect, useRef, useState } from "react";

type AllData = Record<string, unknown[]>;

export interface Notification {
  type: "success" | "error";
  message: string;
}

const initialHomeFormData = { heading: "", summary: "" };
const initialAboutFormData = { aboutme: "", noofprojects: "", yearofexerience: "", noofclients: "", skills: "" };
const initialExperienceFormData = { text: "" };
const initialProjectFormData = { name: "", website: "", technologies: "", github: "" };

export function useAdminData(currentTab: string) {
  const [homeFormData, setHomeFormData] = useState<Record<string, string>>(initialHomeFormData);
  const [aboutFormData, setAboutFormData] = useState<Record<string, string>>(initialAboutFormData);
  const [experienceFormData, setExperienceFormData] = useState<Record<string, string>>(initialExperienceFormData);
  const [projectFormData, setProjectFormData] = useState<Record<string, string>>(initialProjectFormData);
  const [allData, setAllData] = useState<AllData>({});
  const [update, setUpdate] = useState(false);
  const [notification, setNotification] = useState<Notification | null>(null);
  const notifTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    fetchAllData();
  }, [currentTab]);

  function showNotification(type: "success" | "error", message: string) {
    if (notifTimer.current) clearTimeout(notifTimer.current);
    setNotification({ type, message });
    notifTimer.current = setTimeout(() => setNotification(null), 4000);
  }

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

    if (currentTab === "experience" && response?.data?.length) {
      setExperienceFormData(response.data[0]);
      setUpdate(true);
    }

    if (response?.success) {
      setAllData((prev) => ({ ...prev, [currentTab]: response.data }));
    }
  }

  async function handleSaveData(resource: string) {
    const dataMap: Record<string, Record<string, string>> = {
      home: homeFormData,
      about: aboutFormData,
      experience: experienceFormData,
      projects: projectFormData,
    };

    const response = update
      ? await updateData(resource, dataMap[resource])
      : await addData(resource, dataMap[resource]);

    if (response?.success) {
      showNotification("success", response.message ?? "Saved successfully");
      resetFormData();
      fetchAllData();
    } else {
      showNotification("error", response?.message ?? "An unknown error occurred");
    }
  }

  function resetFormData() {
    setHomeFormData(initialHomeFormData);
    setAboutFormData(initialAboutFormData);
    setExperienceFormData(initialExperienceFormData);
    setProjectFormData(initialProjectFormData);
    setUpdate(false);
  }

  return {
    homeFormData, setHomeFormData,
    aboutFormData, setAboutFormData,
    experienceFormData, setExperienceFormData,
    projectFormData, setProjectFormData,
    allData, setAllData,
    handleSaveData,
    resetFormData,
    notification,
  };
}
