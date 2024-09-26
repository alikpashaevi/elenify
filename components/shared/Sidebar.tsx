"use client"

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { SignedIn } from '@clerk/nextjs'

import logo from '../../public/assets/images/logo-text.svg'
import { navLinks } from '../../constants' 
import { usePathname } from 'next/navigation'

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className='sidebar'>
      <div className="flex size-full flex-col gap-4">
        <Link href="/" className='sidebar-logo'>
          <Image src={logo} alt="logo" width={180} height={28} />
        </Link>
        <nav className='sidebar-nav'>
          <SignedIn>
            <ul className='sidebar-nav-elements'>
              {navLinks.map((link) => {
                const isActive = link.route === pathname;

                return (
                  <li key={link.label} className={`sidebar-nav_element group ${isActive ? 'bg-purple-gradient text-white' : "text-gray-700"}`}>
                    <Link href={link.route} className='sidebar-link'>
                      <Image src={link.icon} alt={link.label} width={24} height={24} className={` ${isActive && 'brightness-200'}`} />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </SignedIn>
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar