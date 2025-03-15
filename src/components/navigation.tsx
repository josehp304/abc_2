"use client"

import { Home, User, Briefcase, FileText, UserRoundPen, BriefcaseBusiness } from 'lucide-react'
import { NavBar } from "@/components/ui/tubelight-navbar"

export const navItems = [
  { name: 'Home', url: '/', icon: Home },
  { name: 'About', url: '/aboutus', icon: User },
  { name: 'Projects', url: '/projects', icon: Briefcase },
  { name: 'Contact', url:'/contactus', icon: UserRoundPen},
  {name:'Join us', url:'/joinus', icon:BriefcaseBusiness}
]

export function Navigation() {
  return <NavBar items={navItems} />
}
