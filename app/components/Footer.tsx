import React from 'react'
import Logo from './Logo'

const Footer = () => {
  return (
    <div className='bg-gray-300 p-8 flex justify-around'>
      <div className='flex flex-col gap-2 mr-32'>
        <Logo />
        <a href="#">Instagram</a>
        <a href="#">Facebook</a>
        <a href="#">LinkedIn</a>
      </div>
      <div className='flex flex-col gap-2'>
        <a href="/" className='text-3xl'>Home</a>
        <a href="#">About</a>
        <a href="#">Features</a>
        <a href="#">Contact</a>
      </div>
      <div className='flex flex-col gap-2'>
      <a href="/" className='text-3xl'>Tools & API</a>
        <a href="#">API Documentation</a>
        <a href="#">Integration, tools and apps</a>
        <a href="#">Design Templates</a>
      </div>
      <div className='flex flex-col gap-2'>
      <a href="/" className='text-3xl'>Resources</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms & Conditions</a>
        <a href="#">FAQ</a>
      </div>
    </div>
  )
}

export default Footer