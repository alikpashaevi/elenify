"use client"

import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "../ui/sheet"
import { usePathname } from 'next/navigation'

import Link from 'next/link'
import Image from 'next/image'
import { SignedIn, UserButton } from '@clerk/nextjs'
import { navLinks } from '../../constants'
import { Button } from '../ui/button'
import { SignedOut } from '@clerk/nextjs'

//images
import logo from '../../public/assets/images/logo-text.svg'
import menu from "../../public/assets/icons/menu.svg"

const MoblieNav = () => {
  const pathname = usePathname();
  return (
    <header className='header'>
      <Link href="/" className='flex items-center gap-2 md:py-2'>
        <Image src={logo} alt="logo" width={180} height={28} />
      </Link>

      <nav className='flex gap-2'>
        <SignedIn>
          <UserButton afterSignOutUrl='/'  />
          <Sheet>
            <SheetTrigger>
              <Image 
                src={menu}
                alt="menu"
                width={32}
                height={32}
                className='cursor-pointer'
              />
            </SheetTrigger>
            <SheetContent className='sheet-content sm:w-64'>
              <>
                <Image src={logo} alt="logo" width={152} height={23} />
                <ul className='header-nav-elements'>
                  {navLinks.slice(0,6).map((link) => {
                    const isActive = link.route === pathname;

                    return (
                      <li key={link.label} className={`${isActive && 'gradient-text'} p-18 flex whitespace-nowrap text-dark-700`}>
                        <Link href={link.route} className='sidebar-link cursor-pointer '>
                          <Image src={link.icon} alt={link.label} width={24} height={24} />
                          <span>{link.label}</span>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </>
            </SheetContent>
          </Sheet>
        </SignedIn>
        <SignedOut>
          <Button asChild className='button bg-purple-gradient bg-cover'>
            <Link href="/sign-in">Login</Link>
          </Button>
        </SignedOut> 
      </nav>
    </header>
  )
}

export default MoblieNav