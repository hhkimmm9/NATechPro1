"use client";

import SignInButton from "../components/SignInButton"
import React from 'react'
import Logo from '../components/Logo'
import Link from 'next/link'
import { useSession } from "next-auth/react"
import { usePathname } from "next/navigation";

const TopNavBar = () => {
  const { data: session } = useSession();

  const pathname = usePathname()

  return (
    <>
      <nav className="
        w-full
        min-h-[64px]
        z-10
        px-8
        py-2
        grid
        grid-cols-4
        gap-8
        items-center
        border-b-2
      bg-neutral-100
      ">
        <Logo />

        <div className='
          col-start-2
          col-span-2
          col-end-4
          flex
          justify-around
          text-lg
          font-medium
        '>
          <Link href="/" className={`text-black hover:underline
            ${pathname === '/' ? 'font-bold' : ''}`
          }>Home</Link>

          { session?.user && (
            <>
              <Link href="/gallery" className={`text-black hover:underline
                ${pathname.includes('/users/gallery') ? 'font-bold' : ''}`
              }>Gallery</Link>
            </>
          )}
          <Link href="#" className={`text-black hover:underline
            ${pathname.includes('/faqs') ? 'font-bold' : ''}`
          }>FAQ</Link>

          <Link href="#" className={`text-black hover:underline
            ${pathname.includes('/contact') ? 'font-bold' : ''}`
          }>Contact</Link>
        </div>

        <div className="flex justify-end">
          <SignInButton session={session} />
        </div>
      </nav>
    </>
  )
}

export default TopNavBar;
