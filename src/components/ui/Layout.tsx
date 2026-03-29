'use client'

import { usePathname } from "next/navigation"
import Navbar from "@/components/portfolio/Navbar"

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const pathName = usePathname()
  return (
    <>
      {!["/admin", "/login", "/register"].includes(pathName) ? <Navbar /> : null}
      {children}
    </>
  )
}
