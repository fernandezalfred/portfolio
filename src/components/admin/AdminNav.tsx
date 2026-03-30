"use client";

import { useState } from "react";

interface MenuItem {
  id: string;
  label: string;
}

interface AdminNavProps {
  items: MenuItem[];
  currentTab: string;
  onTabChange: (id: string) => void;
  onLogout: () => void;
}

export default function AdminNav({ items, currentTab, onTabChange, onLogout }: AdminNavProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  function handleTabChange(id: string) {
    onTabChange(id);
    setMobileOpen(false);
  }

  const navContent = (
    <nav className="flex flex-col h-full">
      <div className="px-6 py-5 border-b border-gray-700">
        <h1 className="text-white font-bold text-xl tracking-tight">Admin Panel</h1>
        <p className="text-gray-400 text-xs mt-0.5">Portfolio CMS</p>
      </div>

      <ul className="flex-1 py-4 space-y-1 px-3 overflow-y-auto">
        {items.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => handleTabChange(item.id)}
              className={`w-full text-left px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
                currentTab === item.id
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-300 hover:bg-gray-700/60 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>

      <div className="p-4 border-t border-gray-700">
        <button
          onClick={onLogout}
          className="w-full text-left px-4 py-2.5 rounded-lg text-sm text-gray-400 hover:bg-red-600 hover:text-white font-medium transition-all"
        >
          Sign out
        </button>
      </div>
    </nav>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-gray-900 min-h-screen fixed left-0 top-0 z-40">
        {navContent}
      </aside>

      {/* Mobile top bar */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-gray-900 shadow-lg">
        <span className="text-white font-bold text-lg">Admin Panel</span>
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="text-white p-2 rounded-md hover:bg-gray-700 transition-colors"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </header>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`lg:hidden fixed top-0 left-0 h-full w-64 bg-gray-900 z-50 transform transition-transform duration-300 ease-in-out ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {navContent}
      </aside>
    </>
  );
}
