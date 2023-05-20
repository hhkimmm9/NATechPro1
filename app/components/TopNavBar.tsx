"use client";

import React, { useState } from 'react'
import Logo from './Logo'
import Link from 'next/link'
import { signOut, useSession } from "next-auth/react";
import AuthSection from './AuthSection';

const TopNavBar = () => {
  const [showDropdown, setShowDropdown] = useState(false)

  const { data: session } = useSession();

  return (
    <div className='relative'>
      <nav className="grid grid-cols-4 gap-8 bg-white items-center w-full z-10 px-5 min-h-[64px] border-b-2">
        <Logo />

        <div className='col-start-2 col-span-2 col-end-4 flex justify-around text-lg font-semibold'>
          { session?.user ? (
              <Link href="/user/gallery" className='text-black hover:underline'>Gallery</Link>
            ) : (
              <></>
            ) 
          }
          <Link href="#" className='text-black hover:underline'>FAQ</Link>
          <Link href="#" className='text-black hover:underline'>Contact</Link>
        </div>

        <AuthSection emitSetShowDropdown={setShowDropdown}/>
      </nav>

      {/* dropdown */}
      { (showDropdown && session?.user !== undefined) ?? (
          <div className='absolute top-[64px] right-0 border shadow rounded-lg mr-1 bg-white'>
            <ul>
              <li className='hover:underline cursor-pointer'>
                <Link href='#' className='text-black'> Account </Link>
              </li>
              <li className='hover:underline cursor-pointer'>
                <Link href='#' className='text-black'> Settings </Link>
              </li>
              <li className='hover:underline cursor-pointer'>
                <Link href="/api/auth/signout" className="text-black" onClick={(e) => {
                  e.preventDefault()
                  signOut()
                }}>Sign out</Link>
              </li>
            </ul>
          </div>
        )}
    </div>
  )
}

export default TopNavBar;
