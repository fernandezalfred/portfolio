"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { Link as ScrollLink, scroller } from "react-scroll";

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
}

function NavLinks({ items, activeId, onSelect }: NavLinksProps) {
  return items.map((item) => {
    const isActive = activeId === item.id;
    return (
      <ScrollLink
        key={item.id}
        to={item.id}
        spy={true}
        smooth={true}
        duration={1000}
        onClick={() => onSelect(item.id)}
        onSetActive={() => onSelect(item.id)}
        className={`
          px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative
          ${isActive
            ? "text-green-main animation-active"
            : "text-black font-bold hover:text-green-main"}
        `}
      >
        {item.label}
      </ScrollLink>
    );
  });
}

export default function Navbar() {
  const [activeId, setActiveId]       = useState("home");
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setHasScrolled(window.scrollY > 20);

      // Activate "contact" when the user reaches the bottom of the page,
      // since the spy never fires for the last section.
      const atBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - BOTTOM_THRESHOLD;
      if (atBottom) setActiveId("contact");
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollToContact() {
    scroller.scrollTo("contact", { duration: 1500, delay: 100, smooth: true });
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
            <Image
              src={logo}
              alt="Logo"
              quality={100}
              width={120}
              height={100}
              style={{ width: "100%", height: "auto" }}
              loading="eager"
            />
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
      <nav className="fixed lg:hidden bottom-0 left-0 right-0 z-20 px-4 sm:px-8 border-t border-gray-100 shadow-lg">
        <div className="bg-white/90 backdrop-blur-md sm:px-3">
          <ul className="overflow-x-auto flex w-full justify-between items-center text-black">
            <NavLinks items={NAV_ITEMS} activeId={activeId} onSelect={setActiveId} />
          </ul>
        </div>
      </nav>
    </>
  );
}
