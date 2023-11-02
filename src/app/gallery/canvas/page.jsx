'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { useDropzone } from 'react-dropzone'

const CanvasPage = () => {
  

  const MyDropzone = () => {
    const onDrop = useCallback((acceptedFiles) => {
      const formData = new FormData()
      formData.append('background-image', acceptedFiles.files[0])

      // axios.post('/api/gallery/', { formData, tags: 'background-image'},)

      // await axios.get(`/api/gallery?userID=${userID}`, {
      //   headers: { 'authorization': `Bearer ${session?.user.accessToken}` },
      // })
    }, [])

    const { getRootProps, getInputProps, isDragActive} = useDropzone({ onDrop })

    return (
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {
          isDragActive ? <p className='font-medium text-lg cursor-pointer'> Drop the files here ... </p> : (
            <div className='flex flex-col gap-1 items-center cursor-pointer min-w-full'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
              <p className='text-sm text-center'>Upload new background</p>
            </div>
          )
        }
      </div>
    )
  }

  return (
    <>
      <div className='border shadow rounded-lg p-6 m-6 flex flex-col max-w-[calc(100vw-240px)]' >
        {/* top */}
        <div className='flex justify-between mt-2'>
          <h2 className='font-bold'>Canvas</h2>
          <div>
            <button type='button' className='rounded-full bg-stone-300 hover:bg-stone-200 px-4 py-1 font-medium'>
              Tags
            </button>
          </div>
        </div>



        {/* bottom */}
        <div className='grid grid-cols-3 gap-6 mt-4'>

          {/* current background */}
          <div className='cols-span-1 flex flex-col'>
            <h3 className='text-lg whitespace-nowrap'>Current Background</h3>
            <div className='border p-2 rounded-lg grid grid-cols-2 gap-2 items-center h-full'>
              <Image src='/images/default.png' alt='Uploaded background image' width={256} height={256}
                className='object-cover col-span-1'
              />
              <div className='col-span-1 flex items-center justify-center'>
                { MyDropzone() }
              </div>
            </div>
          </div>

          {/* images */}
          <div className='cols-span-2 col-start-2 col-end-4 w-full'>
            <div className='flex flex-col'>
              <h3 className='text-lg'>Images</h3>
              <div className='border p-2 rounded-lg flex flex-row gap-2 overflow-x-auto grow'>
                {/* add more images */}
                <div className='flex flex-col gap-2 px-10 justify-center items-center text-center border border-dashed rounded-lg bg-stone-50 cursor-pointer'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className='text-sm'><span className='whitespace-nowrap'>Add more</span> images</p>
                </div>

                {/* images */}
                { imageHolder.map((item) => {
                  return (
                    <Image src='/images/default.png' alt='Images in image holder' width={256} height={256}
                      className='object-contain cursor-pointer'
                      key={item}
                    />
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CanvasPage