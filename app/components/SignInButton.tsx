import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import Link from 'next/link'
import { Text } from "@nextui-org/react";

const SignInButton = ({session} : any) => {

  const [showDropdown, setShowDropdown] = useState(false);

  if (session && session.user) {
    return (
      <>
      <button type="button" className="flex gap-4 items-right items-center" onClick={() => setShowDropdown((prev) => !prev)}>
        <Image
          src={"https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg"}
          height={36}
          width={36}
          alt="profile image"
          className="rounded-full"
        />
        <div className="flex flex-col text-lg justify-center">
          <Text>{session?.user.email}</Text>
        </div>
      </button>
      
      { showDropdown && 
        <div className='absolute top-[64px] right-0 border shadow rounded-lg mr-1 bg-white'>
          <ul>
            <li className='hover:underline cursor-pointer'>
              <Link href='#' className='text-black'> Account </Link>
            </li>
            <li className='hover:underline cursor-pointer'>
              <Link href='#' className='text-black'> Settings </Link>
            </li>
            <li onClick={() => signOut()} className='hover:underline cursor-pointer'>
              Sign out
            </li>
          </ul>
        </div>
      }
      </>
    );
  }
  return (
    <>
      <div className='flex gap-2'>
        {/* sign in */}
        {/* <Link href='/auth?tab=login' */}
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
    </>
  );
};

export default SignInButton;
