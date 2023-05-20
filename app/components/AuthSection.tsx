import React from 'react'
import Image from "next/image";
import Link from 'next/link'
import { Text } from "@nextui-org/react";
import { usePathname } from 'next/navigation'
import { useSession } from "next-auth/react";

const AuthSection = (props) => {
  const pathname = usePathname()
  const { data: session } = useSession();

  return (
    <div className='col-start-4 col-span-1 flex justify-end'>
      { session?.user !== undefined ? (
        <button type='button' className="flex gap-4 items-right items-center"
          onClick={() => props.emitSetShowDropdown((prev: Boolean) => !prev)}
        >
          <Image
            src="https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg"
            height={36}
            width={36}
            alt="profile image"
            className="rounded-full"
          />
          <div className="flex flex-col text-lg justify-center">
            <Text>Username</Text>
          </div>
        </button>
      ) : (<></>)}

      { (session == undefined && pathname !== '/auth') ? (
        // signIn
        <div className='flex gap-2'>
          {/* sign in */}
          <Link href='/auth?tab=login'
            className='
              border border-sky-600 rounded-2xl py-2 px-6 font-semibold text-sky-600 whitespace-nowrap
              hover:bg-sky-50
            '><p>Sign in</p>
          </Link>

          {/* sign up */}
          <Link href='/auth?tab=register'
            className='
              bg-sky-500 rounded-2xl py-2 px-6 font-semibold text-white whitespace-nowrap
              hover:bg-sky-600
            '><p>Sign up</p>
          </Link>
        </div>
      ) : (<></>)}
    </div>
  )
}

export default AuthSection