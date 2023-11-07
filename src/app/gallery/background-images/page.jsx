'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import Card from '../../components/Card'
import { useSession } from "next-auth/react";

import PageHeading from '@/app/gallery/components/PageHeading';
import DataHandleBar from '@/app/gallery/components/DataHandleBar';
import GalleryImages from "@/app/gallery/components/GalleryImages";

const BackgroundImagesPage = () => {
  const [imageData, setImageData] = useState(undefined)
  const [imgToUpload, setImageToUpload] = useState()
  
  const { data: session, status } = useSession({ required: true })

  const MyDropzone = () => {
    const onDrop = useCallback(async (acceptedFiles) => {
      const formData = new FormData()
      formData.append('file', acceptedFiles[0])
      formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || "")
        formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_PRESET || "")

      try {

        const responseCloudinary = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/upload`, {
          method: "POST",
          body: formData
        });
        const resultCloudinary = await responseCloudinary.json();

        // console.log(resultCloudinary)

        const response = await fetch('/api/gallery', {
          headers: {
            authorization: `Bearer ${session?.user.accessToken}`,
          },
          method: 'POST',
          body: JSON.stringify({
            name: `${resultCloudinary.original_filename}_${resultCloudinary.asset_id}`,
            image: resultCloudinary.secure_url,
            type: 'backgroundImage',
            userID: session.user._id
          })
        });
        const result = await response.json();

        // console.log("Success:", result);
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
      const response = await fetch(`/api/gallery?userID=${session?.user._id}`, {
        headers: {
          'authorization': `Bearer ${session?.user.accessToken}`
        },
      })

      const result = await response.json()
      setImageData(result)
    }
    // fetch images from the server
    getImgs()
  }, [session])

  const handleSearch = async (e) => {
    e.preventDefault()

    await axios.post(`/api/gallery?name=${searchTerm}`)
      .then(({ data }) => {
        setImageData(data)
      })
      .finally(() => {
        setSearchTerm('')
      })
  }

  return (
    <div>
      <div className='flex flex-col px-16 py-10'>
        <PageHeading heading={'Background Images'} enableTabs={true}
          emitCurrentTab={(currentTab) => { console.log(currentTab)}}
        />

        <div className='pt-2 flex flex-col gap-4'>
          <DataHandleBar />

          {/* upload a new background image */}
          { MyDropzone() }

          <GalleryImages imageData={imageData} galleryType={'backgroundImage'} />

          {/* TODO: pagination */}
        </div>
      </div>
    </div>
  )
}

export default BackgroundImagesPage