"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { Link as LinkScroll, scroller } from "react-scroll";

interface MenuItem {
  id: string;
  label: string;
}

interface CreateMenusProps {
  activeLink: string;
  getMenuItems: MenuItem[];
  setActiveLink: (id: string) => void;
}

const menuItems: MenuItem[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "project", label: "Project" },
  { id: "contact", label: "Contact" },
];

function CreateMenus({ activeLink, getMenuItems, setActiveLink }: CreateMenusProps) {
  return getMenuItems.map((item) => (
    <LinkScroll
      key={item.id}
      activeClass="active"
      to={item.id}
      spy={true}
      smooth={true}
      duration={1000}
      onSetActive={() => setActiveLink(item.id)}
      className={`px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative ${
        activeLink === item.id
          ? "text-green-main animation-active shadow-green-main"
          : "text-[#000] font-bold hover:text-green-main"
      }`}
    >
      {item.label}
    </LinkScroll>
  ));
}

export default function Navbar() {
  const [activeLink, setActiveLink] = useState("home");
  const [scrollActive, setScrollActive] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScrollActive(window.screenY > 20);
    });
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 w-full z-30 bg-white-500 transition-all ${scrollActive ? "shadow-md pt-0" : "pt-4"}`}
      >
        <nav className="max-w-screen-xl px-6 sm:px-8 lg:px-16 mx-auto grid grid-flow-col py-3 sm:py-4">
          <div className="col-start-1 col-end-2 flex items-center">
            <div className="cursor-pointer flex gap-2 font-bold items-center text-[20px] text-green-main">
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
          </div>
          <ul className="hidden lg:flex col-start-4 col-end-8 text-[#000] items-center">
            <CreateMenus
              setActiveLink={setActiveLink}
              activeLink={activeLink}
              getMenuItems={menuItems}
            />
          </ul>
          <div className="col-start-10 col-end-12 flex justify-end">
            <button
              onClick={() =>
                scroller.scrollTo("contact", {
                  duration: 1500,
                  delay: 100,
                  smooth: true,
                })
              }
              className="py-2 px-5 border-2 border-green-600 text-green-600 font-semibold rounded-full text-xl hover:bg-gray-200 hover:text-white hover:shadow-lg transition-all duration-300 ease-in-out"
            >
              Contact Me
            </button>
          </div>
        </nav>
      </header>

      <nav className="fixed lg:hidden bottom-0 left-0 right-0 z-20 px-4 sm:px-8 shadow-t">
        <div className="bg-white-500 sm:px-3">
          <ul className="overflow-x-auto flex w-full justify-between items-center text-[#000]">
            <CreateMenus
              setActiveLink={setActiveLink}
              activeLink={activeLink}
              getMenuItems={menuItems}
            />
          </ul>
        </div>
      </nav>
    </>
  );
}
