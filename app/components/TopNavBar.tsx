// 'use client';

import React from 'react'
import Logo from './Logo'
import Link from 'next/link'
import { Text } from "@nextui-org/react";
import Image from "next/image";

const TopNavBar = () => {
  const signedIn = false

  return (
    <nav className="bg-white flex justify-between items-center w-full z-10 px-5 min-h-[64px] border-b-2">
      <Link href='/' className='w-[216px]'>
        <Logo />
      </Link>

      <div className='flex w-1/2 justify-around text-lg'>
        <Link href="#">Gallery</Link>
        <Link href="#">FAQ</Link>
        <Link href="#">Contact</Link>
      </div>

      { signedIn ? (
        <div className="flex gap-4 items-right">
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
        </div>
      ) : (
        // auth
        <div className='flex gap-2'>
          {/* sign in */}
          <Link href='/auth?tab=login'
            className='
              border border-sky-600 rounded-2xl py-2 px-6 font-semibold text-sky-600 whitespace-nowrap
              hover:bg-sky-50
            '
          > Sign in </Link>

          {/* sign up */}
          <Link href='/auth?tab=register'
            className='
              bg-sky-500 rounded-2xl py-2 px-6 font-semibold text-white whitespace-nowrap
              hover:bg-sky-600
            '
          > Sign up </Link>
        </div>
      )}
      
    </nav>
  )
}

export default TopNavBar