"use client"

import { Home, User, Briefcase, FileText, UserRoundPen, BriefcaseBusiness, PanelsTopLeft, Settings,Handshake,BookOpen } from 'lucide-react'
import { NavBar } from "@/components/ui/tubelight-navbar"

export const navItems = [
  { name: 'Home', url: '/', icon: Home },
  { name: 'About', url: '/aboutus', icon: User },
  
  { name: 'Contact', url:'/contactus', icon: UserRoundPen},
  { name: 'Projects', url: '/projects', icon: PanelsTopLeft },
  { name: 'Join us', url:'/joinus', icon: BriefcaseBusiness},
  { name: 'Services', url:'/services', icon: Handshake},
  {name: 'Blog',url:'blog',icon:BookOpen}
]

export function Navigation() {
  return <NavBar items={navItems} />
}
