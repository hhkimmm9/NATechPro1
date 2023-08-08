import React from 'react'
import Logo from './Logo'
import Link from 'next/link'

const Footer = () => {
  return (
    <div className='px-8 py-4 flex justify-between text-neutral-700 bg-neutral-100'>
      <div className='flex gap-8 items-center'>
        <p className="font-medium">© 2023 mosPic</p>
        <Link href="#" className="font-medium text-neutral-700 hover:text-neutral-800">Feedback</Link>
        <Link href="#" className="font-medium text-neutral-700 hover:text-neutral-800">Cookie Policy</Link>
        <Link href="#" className="font-medium text-neutral-700 hover:text-neutral-800">Terms</Link>
      </div>
      <p className="font-medium">NATechPro1</p>
    </div>
  )
}

export default Footer