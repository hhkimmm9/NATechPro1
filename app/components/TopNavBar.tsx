"use client";

import SignInButton from "./SignInButton";
import React from 'react'
import Logo from './Logo'
import Link from 'next/link'
import { useSession } from "next-auth/react";

const TopNavBar = () => {
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

        <SignInButton session={session} />
      </nav>
    </div>
  )
}

export default TopNavBar;
