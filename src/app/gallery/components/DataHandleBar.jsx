"use client"

import React, { useState, useEffect, useRef } from 'react'
import SearchInput from '@/app/components/SearchInput'

const DataHandleBar = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [dropdownType, setDropdownType] = useState('')

  const dropdownRef = useRef()

  useEffect(() => {
    // https://www.youtube.com/watch?v=HfZ7pdhS43s
    let handler = (e) => {
      if (!dropdownRef.current.contains(e.target)) {
        setShowDropdown(false)
        // console.log(dropdownRef.current)
      }
    }
    // add a listener to the dropdown
    document.addEventListener("mousedown", handler)
  }, [])

  const dropdownContent = () => {
    if (dropdownType === 'sort') {
      return (
        <div className='absolute z-10 top-12  rounded-2xl shadow-2xl bg-white border'>
          <ul>
            <li className='hover:bg-stone-100 px-2'>Ascending</li>
            <li className='hover:bg-stone-100 px-2'>Descending</li>
          </ul>
        </div>
      )
    }
    // do we need it if we are gonna have tabs?
    else if (dropdownType === 'filter')
    {
      return ( <></> )
    }
    
    setShowDropdown(true)
  }

  return (
    <>
      <div className='flex flex-row justify-between items-center'>
        <div>
          <form onSubmit={(e) => handleSearch(e)} className='flex gap-2 items-center'>
            <SearchInput value={searchTerm} onChange={(value) => setSearchTerm(value)}/>

            <button type='submit'>
            {/* magnifier icon */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>
          </form>
        </div>

        <div ref={dropdownRef} className='flex justify-end gap-2 relative z-0'>
          <button onClick={() => { setDropdownType('sort'); setShowDropdown(true);}}
            className='px-3 py-1 border rounded-full whitespace-nowrap flex gap-2 items-center shodow'
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25" />
            </svg>
            <p>Sort</p>
          </button>
          {/* <button onClick={() => { setDropdownType('filter'); setShowDropdown(true);}} className='px-3 py-2 border rounded-full whitespace-nowrap'>filter pl</button> */}
          { showDropdown && <>{ dropdownContent() }</> }
        </div>
      </div>
    </>
  )
}

export default DataHandleBar