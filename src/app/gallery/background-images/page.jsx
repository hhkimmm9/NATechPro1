'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import Card from '../../components/Card'
import { useSession } from "next-auth/react";
import GalleryImages from "@/app/gallery/components/GalleryImages";
import DataHandleBar from '@/app/gallery/components/DataHandleBar';

const BackgroundImagesPage = () => {
  const [currentTab, setCurrentTab] = useState('personal')
  const [imagesToShow, setImagesToShow] = useState(undefined)
  const [imgToUpload, setImageToUpload] = useState()
  
  const { data: session, status } = useSession({ required: true })

  const MyDropzone = () => {
    const onDrop = useCallback(async (acceptedFiles) => {
      const formData = new FormData()
      formData.append('background-image', acceptedFiles.files[0])

      try {
        const response = await fetch('/api/background-images', {
          headers: {
            authorization: `Bearer ${session?.user.accessToken}`,
          },
          method: 'PUT',
          body: formData
        });
  
        const result = await response.json();
        console.log("Success:", result);
      }
      catch (error) {
        console.log("Error:", error);
      }

    }, [])

    const { getRootProps, getInputProps, isDragActive} = useDropzone({ onDrop })

    return (
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {
          isDragActive
            ? (
              <p className='font-medium text-lg cursor-pointer'>Drop the files here ...</p>
            ) : (
              <div className='
                w-full
                p-8
                flex
                flex-col
                gap-3
                justify-center
                items-center
                cursor-pointer
                rounded-lg
                shadow
              bg-stone-100
              hover:bg-stone-50
              '>
                <p className='font-medium text-lg'> Click here to upload an image</p>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
              </div>
            )
        }
      </div>
    )
  }

  // beforeMount
  useEffect(() => {
    const getImgs = async () => {
      const response = await fetch(`/api/background-images?userID=${session?.user.id}`, {
        headers: {
          'authorization': `Bearer ${session?.user.accessToken}`
        },
      })

      const result = await response.json()
      setImagesToShow(result)
    }
    // fetch images from the server
    getImgs()
  }, [session])

  // tab change
  useEffect(() => {
    // send another request to the server to get filtered images
    const fetchImages = async () => {
      if (currentTab === 'personal') {
        // await axios.get('/api/gallery?')
        //   .then(({ data }) => {
        //     setImagesToShow(data)
        //   })
      }
      else if (currentTab === 'recent') {
        // await axios.get('/api/gallery?')
        //   .then(({ data }) => {
        //     setImagesToShow(data)
        //   })
      }
      else if (currentTab === 'favourite') {
        // await axios.get('/api/gallery?')
        //   .then(({ data }) => {
        //     setImagesToShow(data)
        //   })
      }
      else if (currentTab === 'shared') {
        // await axios.get('/api/gallery?')
        //   .then(({ data }) => {
        //     setImagesToShow(data)
        //   })
      }
    }
    fetchImages()
  }, [currentTab])

  const handleSearch = async (e) => {
    e.preventDefault()

    await axios.post(`/api/gallery?name=${searchTerm}`)
      .then(({ data }) => {
        setImagesToShow(data)
      })
      .finally(() => {
        setSearchTerm('')
      })
  }

  return (
    <div>
      <div className='flex flex-col px-16 py-10'>
        <div className='flex flex-row justify-between items-end'>
          <h1 className='text-3xl font-semibold'>Background Images</h1>
          <div className='mr-2 flex flex-row gap-4'>
            {/* personal */}
            <span onClick={() => setCurrentTab('personal')} className='cursor-pointer'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </span>

            {/* recent */}
            <span onClick={() => setCurrentTab('recent')} className='cursor-pointer'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" />
              </svg>
            </span>

            {/* favourite */}
            <span onClick={() => setCurrentTab('favourite')} className='cursor-pointer'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </span>

            {/* shared */}
            <span onClick={() => setCurrentTab('shared')} className='cursor-pointer'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
              </svg>
            </span>
          </div>
        </div>
        <hr className='border-b border-gray-500 w-full my-2' />

        <div className='pt-2 flex flex-col gap-4'>
          <DataHandleBar />

          {/* upload a new background image */}
          { MyDropzone() }

          <GalleryImages imageData={imagesToShow} />

          {/* TODO: pagination */}
        </div>
      </div>
    </div>
  )
}

export default BackgroundImagesPage