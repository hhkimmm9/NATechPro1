'use client'

import React from 'react'
import Login from './components/Login'
import Register from './components/Register'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

const page = () => {
  const [hasAccount, setHasAccount] = useState(true)

  const searchParams = useSearchParams()

  useEffect(() => {
    searchParams.get('tab') == 'register' ? setHasAccount(false) : setHasAccount(true)
  }, [])
  
  return (
    <div className='max-w-4xl flex flex-col p-14 mx-auto'>
      <h1 className='text-center text-4xl font-bold'>Create a new account</h1>

      <div className='mt-10 flex flex-col border rounded-xl bg-white p-10 pt-4 max-w-xl mx-auto'>
        {/* login or signup tabs */}
        <div className='flex justify-around'>
          <div onClick={ () => setHasAccount(true) } className='w-1/2 text-center py-2 hover:bg-gray-100'>
            Login
          </div>
          <div onClick={ () => setHasAccount(false) } className='w-1/2 text-center py-2 hover:bg-gray-100'>
            Sign up
          </div>
        </div>

        { hasAccount ? <Login /> : <Register /> }
      </div>
    </div>
  )
}

export default page