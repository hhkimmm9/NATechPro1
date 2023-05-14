// 'use client';

import React from 'react'
import Logo from './Logo'
// import { Disclosure } from "@headlessui/react";

const TopNavBar = () => {
  return (
    // <Disclosure as="nav">
      <div className='flex flex-row bg-gray-200 p-3 justify-between items-center font-medium'>
        <Logo />

        {/* tabs */}
        <div className='flex w-1/2 justify-around text-lg'>
          <a href="/">Home</a>
          <a href="#">Features</a>
          <a href="#">FAQ</a>
          <a href="#">Contact</a>
          <a href="#">Log in</a>
        </div>

        {/* signup */}
        <a href="/users/register" className='bg-sky-600 rounded-2xl py-2 px-6 text-white whitespace-nowrap'>
          Sign up
        </a>
      </div>
    // </Disclosure>
  )
}

export default TopNavBar