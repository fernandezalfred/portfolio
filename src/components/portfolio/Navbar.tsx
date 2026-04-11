"use client";

import { useEffect, useState } from "react";
import Logo from "@/components/ui/Logo";
import { Link as ScrollLink, scroller } from "react-scroll";
import { motion } from "framer-motion";

interface NavItem {
  id: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "home",       label: "Home"       },
  { id: "about",      label: "About"      },
  { id: "experience", label: "Experience" },
  { id: "project",    label: "Project"    },
  { id: "contact",    label: "Contact"    },
];

// How close to the page bottom (in px) before we consider "contact" active.
// Needed because the last section can't scroll far enough to trigger spy.
const BOTTOM_THRESHOLD = 50;

interface NavLinksProps {
  items: NavItem[];
  activeId: string;
  onSelect: (id: string) => void;
  compact?: boolean;
}

function NavLinks({ items, activeId, onSelect, compact = false }: NavLinksProps) {
  return items.map((item) => {
    const isActive = activeId === item.id;
    return (
      <ScrollLink
        key={item.id}
        to={item.id}
        spy={true}
        smooth={true}
        duration={300}
        onClick={() => onSelect(item.id)}
        onSetActive={() => onSelect(item.id)}
        className={`
          ${compact ? "px-1.5 py-2 text-xs tracking-tight" : "px-4 py-2 mx-2"}
          cursor-pointer animation-hover inline-block relative
          ${isActive
            ? "text-green-main animation-active"
            : "text-black font-bold hover:text-green-main"}
        `}
      >
        {isActive && (
          <motion.span
            layoutId="navPill"
            className="absolute inset-0 bg-green-main/10 rounded-full -z-10"
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
          />
        )}
        {item.label}
      </ScrollLink>
    );
  });
}

export default function Navbar() {
  const [activeId, setActiveId]       = useState("home");
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    function handleScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setHasScrolled(window.scrollY > 20);
        const atBottom =
          window.innerHeight + window.scrollY >= document.body.scrollHeight - BOTTOM_THRESHOLD;
        if (atBottom) setActiveId("contact");
        ticking = false;
      });
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollToContact() {
    scroller.scrollTo("contact", { duration: 300, smooth: true });
  }

  return (
    <>
      {/* Desktop header */}
      <header
        className={`fixed top-0 w-full z-30 transition-all duration-300 ${
          hasScrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-white pt-4"
        }`}
      >
        <nav className="max-w-screen-xl px-6 sm:px-8 lg:px-16 mx-auto grid grid-flow-col py-3 sm:py-4">
          <div className="col-start-1 col-end-2 flex items-center">
            <Logo />
          </div>

          <ul className="hidden lg:flex col-start-4 col-end-8 items-center">
            <NavLinks items={NAV_ITEMS} activeId={activeId} onSelect={setActiveId} />
          </ul>

          <div className="col-start-10 col-end-12 flex justify-end">
            <button
              onClick={scrollToContact}
              className="py-2 px-5 border-2 border-green-main text-green-main font-semibold rounded-full text-sm hover:bg-green-main hover:text-white hover:shadow-lg transition-all duration-300"
            >
              Contact Me
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile bottom navigation bar */}
      <nav className="fixed lg:hidden bottom-4 left-1/2 -translate-x-1/2 z-20 w-[calc(100%-2rem)] max-w-sm">
        <div className="bg-white/95 backdrop-blur-md border border-gray-200 rounded-2xl shadow-xl px-2">
          <ul className="flex w-full justify-between items-center">
            <NavLinks items={NAV_ITEMS} activeId={activeId} onSelect={setActiveId} compact />
          </ul>
        </div>
      </nav>
    </>
  );
}
