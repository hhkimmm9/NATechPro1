"use client"

import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import Link from 'next/link'
import { Text } from "@nextui-org/react";
import { usePathname } from 'next/navigation'
import { useSession } from "next-auth/react"

const SignInButton = () => {
  const pathname = usePathname()
  
  const dropdownRef = useRef()
  const [showDropdown, setShowDropdown] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    let showDropdownHandler = (e) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener("mousedown", showDropdownHandler)
  })

  // signed in users
  if (session && session.user) {
    return (
      <>
        <div ref={dropdownRef} className="relative">
          <button type="button" onClick={() => setShowDropdown((prev) => !prev)}
            className="flex gap-3 items-center"
          >
            <Image src={"/images/default.png"} alt="profile image"
              height={2048} width={1365}
              className="w-8 h-8 rounded-full"
            />
            <div className="text-lg">
              {/* Text? */}
              <Text>{ session?.user.email }</Text>
            </div>
          </button>
          
          { showDropdown && (
            <div className='
              absolute top-14 left-0 right-0
              w-44
              border shadow rounded-lg bg-white
            '>
              <ul>
                {/* account */}
                <li onClick={() => setShowDropdown(false)}
                  className='hover:underline cursor-pointer'
                >
                  <Link href='#' className='text-black'> Account </Link>
                </li>

                {/* settings */}
                <li onClick={() => setShowDropdown(false)}
                  className='hover:underline cursor-pointer'
                >
                  <Link href='#' className='text-black'> Settings </Link>
                </li>

                {/* sign out */}
                <li onClick={() => { setShowDropdown(false); signOut(); }}
                  className='hover:underline cursor-pointer'
                >
                  Sign out
                </li>
              </ul>
            </div>
          )}
        </div>
      </>
    );
  }

  // guest users
  return (
    <>
      { pathname !== '/auth' &&
        <div className='grid grid-cols-2 gap-3 justify-end'>
          {/* sign in */}
          <button
            className='
              px-3
              py-1
              rounded-full
              border
            border-sky-600
              whitespace-nowrap
              font-semibold
            text-sky-600
            hover:bg-sky-50
            '
            onClick={() => signIn()}
          >  Sign in </button>
          

          {/* sign up */}
          <Link href='/auth?tab=register'
            className='
              px-3
              py-1
              rounded-full
            bg-sky-500
              whitespace-nowrap
              font-semibold
            text-white
            hover:bg-sky-400
            '
          > Sign up </Link>
        </div>
      }
    </>
  );
};

export default SignInButton;
