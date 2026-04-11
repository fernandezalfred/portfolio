"use client";

/**
 * Admin dashboard page (/admin).
 *
 * Renders a sidebar nav + a content area that swaps between section editors
 * (Home, About, Experience, Projects) and the Contact message list.
 *
 * Auth guard: reads `authUser` from sessionStorage (written by /login on success).
 * If absent, immediately redirects to /login — no server-side session needed.
 *
 * The active tab is synced to the URL query param `?tab=<id>` so that refreshing
 * or sharing a link lands on the correct editor.
 */

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AboutEditor from "@/components/admin/AboutEditor";
import AdminNav from "@/components/admin/AdminNav";
import ContactList, { ContactItem } from "@/components/admin/ContactList";
import ExperienceEditor from "@/components/admin/ExperienceEditor";
import HomeEditor from "@/components/admin/HomeEditor";
import ProjectEditor, { ProjectItem } from "@/components/admin/ProjectEditor";
import { useAdminData } from "./useAdminData";
import { AlertCircleIcon, CheckCircleIcon } from "@/components/ui/Icons";

// `id` must match the keys in `tabContent` below
const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About Page" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

/**
 * Wraps the real content in <Suspense> because useSearchParams() requires it
 * when the page is rendered with the Next.js App Router.
 */
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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

  // Redirect to login if the session flag is missing (set by /login on success)
  useEffect(() => {
    const isAuth = JSON.parse(sessionStorage.getItem("authUser") ?? "false");
    if (!isAuth) {
      router.push("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  // Switches the active editor, syncs the URL, and clears any stale form data
  function handleTabChange(id: string) {
    setCurrentTab(id);
    router.push(`/admin?tab=${id}`);
    resetFormData();
  }

  // Clears the session flag so a page refresh will require logging in again
  function handleLogout() {
    sessionStorage.removeItem("authUser");
    router.push("/login");
  }

  // To add a section: add an entry here and a matching item in NAV_ITEMS
  const tabContent: Record<string, React.ReactNode> = {
    home: <HomeEditor formData={homeFormData} setFormData={setHomeFormData} handleSaveData={handleSaveData} />,
    about: <AboutEditor formData={aboutFormData} setFormData={setAboutFormData} handleSaveData={handleSaveData} />,
    experience: <ExperienceEditor formData={experienceFormData} setFormData={setExperienceFormData} handleSaveData={handleSaveData} />,
    projects: <ProjectEditor formData={projectFormData} setFormData={setProjectFormData} handleSaveData={handleSaveData} data={allData.projects as ProjectItem[]} setAllData={setAllData} />,
    contact: <ContactList data={allData.contact as ContactItem[]} setAllData={setAllData} />,
  };

  const currentNavLabel = NAV_ITEMS.find((item) => item.id === currentTab)?.label ?? currentTab;

  // Render nothing while auth check is in progress to avoid a flash of content
  if (!isAuthenticated) return null;

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
                <CheckCircleIcon className="mt-0.5 h-4 w-4 shrink-0" />
              ) : (
                <AlertCircleIcon className="mt-0.5 h-4 w-4 shrink-0" />
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
