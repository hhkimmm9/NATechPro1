// 'use client';

import React, { useState } from 'react'
import Logo from './Logo'
import Link from 'next/link'
import { Text } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from 'next/navigation'

const TopNavBar = () => {
  const [showDropdown, setShowDropdown] = useState(false)

  const router = useRouter()

  const [signedIn, setSignedIn] = useState(true)

  const handleSignout = () => {
    
    // 

    setSignedIn(false)
    setShowDropdown(false)

    router.push('/')
  }

  return (
    <nav className="bg-white flex justify-between items-center w-full z-10 px-5 min-h-[64px] border-b-2 relative">
      <Link href='/' className='w-[216px]'>
        <Logo />
      </Link>

      <div className='flex w-1/2 justify-around text-lg font-semibold'>
        { signedIn ? (
            <Link href="/user/gallery" className='text-black hover:underline'>Gallery</Link>
          ) : (
            <></>
          ) 
        }
        <Link href="#" className='text-black hover:underline'>FAQ</Link>
        <Link href="#" className='text-black hover:underline'>Contact</Link>
      </div>

      { signedIn ? (
        <button type='button' className="flex gap-4 items-right items-center" onClick={() => setShowDropdown(prev => !prev)}>
          <Image
            src={
              "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg"
            }
            height={36}
            width={36}
            alt="profile image"
            className="rounded-full"
          />
          <div className="flex flex-col text-lg justify-center">
            <Text>Username</Text>
          </div>
        </button>
      ) : (
        // auth
        <div className='flex gap-2'>
          {/* sign in */}
          {/* <Link href='/auth?tab=login' */}
          <Link href='#'
            className='
              border border-sky-600 rounded-2xl py-2 px-6 font-semibold text-sky-600 whitespace-nowrap
              hover:bg-sky-50
            '
          > <div onClick={() => setSignedIn(true) }> Sign in </div></Link>
          

          {/* sign up */}
          <Link href='/auth?tab=register'
            className='
              bg-sky-500 rounded-2xl py-2 px-6 font-semibold text-white whitespace-nowrap
              hover:bg-sky-600
            '
          > Sign up </Link>
        </div>
      )}

      {/* dropdown */}
      { showDropdown ? (
        <div className='absolute top-[64px] right-0 border shadow rounded-lg mr-1 bg-white'>
          <ul>
            <li className='hover:underline cursor-pointer'>
              <Link href='#' className='text-black'> Account </Link>
            </li>
            <li className='hover:underline cursor-pointer'>
              <Link href='#' className='text-black'> Settings </Link>
            </li>
            <li onClick={handleSignout} className='hover:underline cursor-pointer'>
              Sign out
            </li>
          </ul>
        </div>
      ) : (
        <></>
      ) }
      
    </nav>
  )
}

export default TopNavBar