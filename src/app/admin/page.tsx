"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AboutEditor from "@/components/admin/AboutEditor";
import AdminNav from "@/components/admin/AdminNav";
import ContactList from "@/components/admin/ContactList";
import EducationEditor from "@/components/admin/EducationEditor";
import ExperienceEditor from "@/components/admin/ExperienceEditor";
import HomeEditor from "@/components/admin/HomeEditor";
import ProjectEditor from "@/components/admin/ProjectEditor";
import { useAdminData } from "./useAdminData";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About Page" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function AdminPage() {
  return (
    <Suspense>
      <AdminPageContent />
    </Suspense>
  );
}

function AdminPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentTab, setCurrentTab] = useState(searchParams.get("tab") ?? "home");
  const [authUser, setAuthUser] = useState(false);

  const {
    homeFormData, setHomeFormData,
    aboutFormData, setAboutFormData,
    experienceFormData, setExperienceFormData,
    educationFormData, setEducationFormData,
    projectFormData, setProjectFormData,
    allData, setAllData,
    handleSaveData,
    resetFormData,
  } = useAdminData(currentTab);

  useEffect(() => {
    const isAuth = JSON.parse(sessionStorage.getItem("authUser") ?? "false");
    if (!isAuth) {
      router.push("/login");
    } else {
      setAuthUser(true);
    }
  }, []);

  function handleTabChange(id: string) {
    setCurrentTab(id);
    router.push(`/admin?tab=${id}`);
    resetFormData();
  }

  function handleLogout() {
    sessionStorage.removeItem("authUser");
    router.push("/login");
  }

  const tabContent: Record<string, React.ReactNode> = {
    home: <HomeEditor formData={homeFormData} setFormData={setHomeFormData} handleSaveData={handleSaveData} />,
    about: <AboutEditor formData={aboutFormData} setFormData={setAboutFormData} handleSaveData={handleSaveData} />,
    experience: <ExperienceEditor formData={experienceFormData} setFormData={setExperienceFormData} handleSaveData={handleSaveData} data={allData?.experience as any} setAllData={setAllData} />,
    education: <EducationEditor formData={educationFormData} setFormData={setEducationFormData} handleSaveData={handleSaveData} data={allData?.education as any} setAllData={setAllData} />,
    projects: <ProjectEditor formData={projectFormData} setFormData={setProjectFormData} handleSaveData={handleSaveData} data={allData?.projects as any} setAllData={setAllData} />,
    contact: <ContactList data={allData?.contact as any} />,
  };

  const currentNavLabel = NAV_ITEMS.find((item) => item.id === currentTab)?.label ?? currentTab;

  if (!authUser) return null;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminNav
        items={NAV_ITEMS}
        currentTab={currentTab}
        onTabChange={handleTabChange}
        onLogout={handleLogout}
      />

      {/* Content area — offset by sidebar on desktop, top bar on mobile */}
      <main className="flex-1 lg:ml-64 pt-14 lg:pt-0 min-w-0">
        <div className="p-5 sm:p-8 max-w-4xl mx-auto">
          {/* Page header */}
          <div className="mb-6 pb-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">{currentNavLabel}</h2>
            <p className="text-gray-500 text-sm mt-1">Manage your {currentNavLabel.toLowerCase()} content</p>
          </div>

          {tabContent[currentTab]}
        </div>
      </main>
    </div>
  );
}
