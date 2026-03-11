'use client'

import { usePathname } from "next/navigation"
import Navbar from "@/components/portfolio/Navbar"

export default function Layout({ children }) {
  const pathName = usePathname()
  return (
    <>
      {pathName !== "/admin" ? <Navbar /> : null}
      {children}
    </>
  )
}
