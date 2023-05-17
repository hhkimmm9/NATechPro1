// 'use client';

import React from 'react'
import Logo from './Logo'
import Link from 'next/link'

const TopNavBar = () => {
  return (
    // <Disclosure as="nav">
      <div className='flex flex-row bg-gray-200 p-3 justify-between items-center font-medium'>
        <Link href='/'>
          <Logo />
        </Link>

        {/* tabs */}
        <div className='flex w-1/2 justify-around text-lg'>
          <Link href="/">Home</Link>
          <Link href="#">Features</Link>
          <Link href="#">FAQ</Link>
          <Link href="#">Contact</Link>
          <Link href="#">Log in</Link>
        </div>

        {/* signup */}
        <Link href='/users/auth' className='bg-sky-600 rounded-2xl py-2 px-6 text-white whitespace-nowrap'>
          Sign up
        </Link>
      </div>
    // </Disclosure>
  )
}

export default TopNavBar