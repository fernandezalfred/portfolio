"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AboutEditor from "@/components/admin/AboutEditor";
import AdminNav from "@/components/admin/AdminNav";
import ContactList from "@/components/admin/ContactList";
import ExperienceEditor from "@/components/admin/ExperienceEditor";
import HomeEditor from "@/components/admin/HomeEditor";
import ProjectEditor from "@/components/admin/ProjectEditor";
import { useAdminData } from "./useAdminData";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About Page" },
  { id: "experience", label: "Experience" },
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
    projectFormData, setProjectFormData,
    allData, setAllData,
    handleSaveData,
    resetFormData,
    notification,
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
    experience: <ExperienceEditor formData={experienceFormData} setFormData={setExperienceFormData} handleSaveData={handleSaveData} />,
    projects: <ProjectEditor formData={projectFormData} setFormData={setProjectFormData} handleSaveData={handleSaveData} data={allData?.projects as any} setAllData={setAllData} />,
    contact: <ContactList data={allData?.contact as any} setAllData={setAllData} />,
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

          {notification && (
            <div
              className={`mb-5 flex items-start gap-3 rounded-lg border px-4 py-3 text-sm font-medium ${
                notification.type === "success"
                  ? "border-green-200 bg-green-50 text-green-800"
                  : "border-red-200 bg-red-50 text-red-800"
              }`}
            >
              {notification.type === "success" ? (
                <svg className="mt-0.5 h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" clipRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                </svg>
              ) : (
                <svg className="mt-0.5 h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" clipRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-9a1 1 0 112 0v4a1 1 0 11-2 0V9zm1-4a1 1 0 100 2 1 1 0 000-2z" />
                </svg>
              )}
              {notification.message}
            </div>
          )}

          {tabContent[currentTab]}
        </div>
      </main>
    </div>
  );
}
