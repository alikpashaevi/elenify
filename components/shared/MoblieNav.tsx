"use client"

import React from 'react'
import { useState, useEffect } from 'react'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "../ui/sheet"
import { usePathname } from 'next/navigation'

import Link from 'next/link'
import Image from 'next/image'
import { navLinks } from '../../constants'
import { Button } from '../ui/button'

//images
import logo from '../../public/logo-icon.png'
import menu from "../../public/assets/icons/menu.svg"

const MoblieNav = () => {
  const pathname = usePathname();
  const [loggedIn, setLoggedIn] = useState(false);

  const checkLoginStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoggedIn(false);
        return;
      }
      const response = await fetch('http://localhost:4000/api/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      if (response.ok) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    } catch (error) {
      console.error('Error checking login status:', error);
      setLoggedIn(false);
    }
  }

  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <header className='header'>
      <Link href="/" className='flex items-center gap-2 md:py-2'>
        <Image src={logo} alt="logo" width={28} height={28} />
        <h1 className='tracking-wider text-[36px] font-semibold text-purple-500 '>ELENIFY</h1>
      </Link>

      <nav className='flex gap-2'>
        {loggedIn ? (
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
                <div className='flex items-center gap-2'>
                  <Image src={logo} alt="logo" width={23} height={23} />
                  <h1 className='tracking-wider text-[28px] font-semibold text-purple-500 '>ELENIFY</h1>
                </div>
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
        ) : (
          <Button asChild className='button bg-purple-gradient bg-cover'>
            <Link href="/sign-in">Login</Link>
          </Button>
        )}
      </nav>
    </header>
  )
}


export default MoblieNav