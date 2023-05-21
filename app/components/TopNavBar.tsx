"use client";

import SignInButton from "./SignInButton";
import React from 'react'
import Logo from './Logo'
import Link from 'next/link'
import { useSession } from "next-auth/react";

const TopNavBar = () => {
  const { data: session } = useSession();

  return (
    <nav className="bg-white flex justify-between items-center w-full z-10 px-5 min-h-[64px] border-b-2 relative">
      <Link href='/' className='w-[216px]'>
        <Logo />
      </Link>

      <div className='flex w-1/2 justify-around text-lg font-semibold'>

      {(session && session.user) &&
        <Link href="/user/gallery" className='text-black hover:underline'>Gallery</Link>
      }
        <Link href="#" className='text-black hover:underline'>FAQ</Link>
        <Link href="#" className='text-black hover:underline'>Contact</Link>
      </div>

      <SignInButton session={session} />
    </nav>
  )
}

export default TopNavBar;
