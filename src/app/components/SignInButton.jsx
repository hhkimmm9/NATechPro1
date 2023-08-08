import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import Link from 'next/link'
import { Text } from "@nextui-org/react";
import { usePathname } from 'next/navigation'

const SignInButton = ({session}) => {
  const pathname = usePathname()
  
  const dropdownRef = useRef()
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    let showDropdownHandler = (e) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener("mousedown", showDropdownHandler)
  })

  if (session && session.user) {
    return (
      <>
        <div ref={dropdownRef} className="relative">
          <button type="button" className="flex gap-4 items-right items-center" onClick={() => setShowDropdown((prev) => !prev)}>
            <Image
              src={"/images/default.png"}
              height={2048}
              width={1365}
              alt="profile image"
              className="w-8 h-8 object-contain rounded-full"
            />
            <div className="flex flex-col text-lg justify-center">
              <Text>{session?.user.email}</Text>
            </div>
          </button>
          
          { showDropdown && 
            <div className='absolute w-44 top-14 left-0 right-0 border shadow rounded-lg bg-white'>
              <ul>
                <li onClick={() => setShowDropdown(false)} className='hover:underline cursor-pointer'>
                  <Link href='#' className='text-black'> Account </Link>
                </li>
                <li onClick={() => setShowDropdown(false)} className='hover:underline cursor-pointer'>
                  <Link href='#' className='text-black'> Settings </Link>
                </li>
                <li onClick={() => { setShowDropdown(false); signOut(); }} className='hover:underline cursor-pointer'>
                  Sign out
                </li>
              </ul>
            </div>
          }
        </div>
      </>
    );
  }
  return (
    <>
      { pathname !== '/auth' &&
        <div className='flex gap-2 justify-end'>
          {/* sign in */}
          <button
            className='
              border border-sky-600 rounded-2xl py-2 px-6 font-semibold text-sky-600 whitespace-nowrap
              hover:bg-sky-50
            '
            onClick={() => signIn()}
          >  Sign in </button>
          

          {/* sign up */}
          <Link href='/auth?tab=register'
            className='
              bg-sky-500 rounded-2xl py-2 px-6 font-semibold text-white whitespace-nowrap
              hover:bg-sky-600
            '
          > Sign up </Link>
        </div>
      }
    </>
  );
};

export default SignInButton;
