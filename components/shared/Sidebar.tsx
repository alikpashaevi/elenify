"use client"
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import logo from '../../public/logo-icon.png'
import { navLinks } from '../../constants' 
import { usePathname } from 'next/navigation'
import { Button } from '../ui/button'

const Sidebar = () => {
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
    <aside className='sidebar'>
      <div className="flex size-full flex-col gap-4">
        <Link href="/" className='sidebar-logo'>
          <Image src={logo} alt="logo" width={28} height={28} />
          <h1 className='tracking-wider text-[36px] font-semibold text-purple-500 '>ELENIFY</h1>
        </Link>
        <nav className='sidebar-nav'>
          {loggedIn ? (
            <>
              <ul className='sidebar-nav-elements'>
                {navLinks.slice(0,6).map((link) => {
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
              <ul className='sidebar-nav_elements'>
                {navLinks.slice(6).map((link) => {
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
            </>
          ) : (
            <Button asChild className='button bg-purple-gradient bg-cover'>
              <Link href="/sign-in">Login</Link>
            </Button>
          )}
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar