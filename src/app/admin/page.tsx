"use client";

import AboutEditor from "@/components/admin/AboutEditor";
import ContactList from "@/components/admin/ContactList";
import EducationEditor from "@/components/admin/EducationEditor";
import ExperienceEditor from "@/components/admin/ExperienceEditor";
import HomeEditor from "@/components/admin/HomeEditor";
import ProjectEditor from "@/components/admin/ProjectEditor";
import { addData, getData, updateData } from "@/services/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type AllData = Record<string, Array<Record<string, string>>>;

const initialHomeFormData = { heading: "", summary: "" };
const initialAboutFormData = { aboutme: "", noofprojects: "", yearofexerience: "", noofclients: "", skills: "" };
const initialExperienceFormData = { position: "", company: "", duration: "", location: "", jobprofile: "" };
const initialEducationFormData = { degree: "", year: "", college: "" };
const initialProjectFormData = { name: "", website: "", technologies: "", github: "" };

export default function AdminPage() {
  const [currentTab, setCurrentTab] = useState("home");
  const [homeFormData, setHomeFormData] = useState<Record<string, string>>(initialHomeFormData);
  const [aboutFormData, setAboutFormData] = useState<Record<string, string>>(initialAboutFormData);
  const [experienceFormData, setExperienceFormData] = useState<Record<string, string>>(initialExperienceFormData);
  const [educationFormData, setEducationFormData] = useState<Record<string, string>>(initialEducationFormData);
  const [projectFormData, setProjectFormData] = useState<Record<string, string>>(initialProjectFormData);
  const [allData, setAllData] = useState<AllData>({});
  const [update, setUpdate] = useState(false);
  const [authUser, setAuthUser] = useState(false);
  const router = useRouter();

  const menuItems = [
    {
      id: "home",
      label: "Home",
      component: <HomeEditor formData={homeFormData} setFormData={setHomeFormData} handleSaveData={handleSaveData} />,
    },
    {
      id: "about",
      label: "About Page",
      component: <AboutEditor formData={aboutFormData} setFormData={setAboutFormData} handleSaveData={handleSaveData} />,
    },
    {
      id: "experience",
      label: "Experience",
      component: (
        <ExperienceEditor
          formData={experienceFormData}
          setFormData={setExperienceFormData}
          handleSaveData={handleSaveData}
          data={allData?.experience as any}
        />
      ),
    },
    {
      id: "education",
      label: "Education",
      component: (
        <EducationEditor
          formData={educationFormData}
          setFormData={setEducationFormData}
          handleSaveData={handleSaveData}
          data={allData?.education as any}
          setAllData={setAllData}
        />
      ),
    },
    {
      id: "projects",
      label: "Projects",
      component: (
        <ProjectEditor
          formData={projectFormData}
          setFormData={setProjectFormData}
          handleSaveData={handleSaveData}
          data={allData?.projects as any}
        />
      ),
    },
    {
      id: "contact",
      label: "Contact",
      component: <ContactList data={allData?.contact as any} />,
    },
  ];

  async function handleSaveData(_resource: string) {
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

  function resetFormData() {
    setHomeFormData(initialHomeFormData);
    setAboutFormData(initialAboutFormData);
    setExperienceFormData(initialExperienceFormData);
    setEducationFormData(initialEducationFormData);
    setProjectFormData(initialProjectFormData);
  }

  useEffect(() => {
    const isAuth = JSON.parse(sessionStorage.getItem("authUser") ?? "false");
    if (!isAuth) {
      router.push("/login");
    } else {
      setAuthUser(true);
    }
  }, []);

  if (!authUser) return null;

  return (
    <div className="border-b border-gray-400">
      <nav className="-mb-0.5 flex justify-center space-x-6" role="tablist">
        {menuItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className="p-4 font-bold text-xl text-black"
            onClick={() => {
              setCurrentTab(item.id);
              resetFormData();
              setUpdate(false);
            }}
          >
            {item.label}
          </button>
        ))}
        <button
          onClick={() => {
            sessionStorage.removeItem("authUser");
            router.push("/login");
          }}
          className="p-4 font-bold text-xl text-black"
        >
          Logout
        </button>
      </nav>
      <div className="mt-10 p-10">
        {menuItems.map((item) => item.id === currentTab && <div key={item.id}>{item.component}</div>)}
      </div>
    </div>
  );
}
