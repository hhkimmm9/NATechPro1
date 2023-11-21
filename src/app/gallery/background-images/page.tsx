'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { useSession } from "next-auth/react";
import Card from '../../components/Card'
import { GalleryTypeEnum } from '@/app/interfaces';

import PageHeading from '@/app/gallery/components/PageHeading';
import DataHandleBar from '@/app/gallery/components/DataHandleBar';
import GalleryImages from "@/app/gallery/components/GalleryImages";

const BackgroundImagesPage = () => {
  const [imageData, setImageData] = useState(undefined)
  const [imgToUpload, setImageToUpload] = useState()
  
  const { data: session, status } = useSession({ required: true })

  const MyDropzone = () => {
    const onDrop = useCallback(async (acceptedFiles: any) => {
      const formData = new FormData()
      formData.append('file', acceptedFiles[0])

      try {
        const response = await fetch('/api/gallery', {
          headers: {
            authorization: `Bearer ${session?.user.accessToken}`,
          },
          method: 'POST',
          body: formData
        });
        const result = await response.json();

        console.log("Success:", result);

        getImgs()
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
    // fetch images from the server
    getImgs()
  }, [session])

  const getImgs = async () => {
    const response = await fetch(`/api/gallery?userID=${session?.user._id}`, {
      headers: {
        'authorization': `Bearer ${session?.user.accessToken}`
      },
    })

    const result = await response.json()
    setImageData(result)
  }

  return (
    <div>
      <div className='flex flex-col px-16 py-10'>
        <PageHeading heading={'Background Images'} enableTabs={true}
          emitCurrentTab={(currentTab: string) => { console.log(currentTab) }}
        />

        <div className='pt-2 flex flex-col gap-4'>
          <DataHandleBar />

          {/* upload a new background image */}
          { MyDropzone() }

          <GalleryImages
            imageData={imageData}
            galleryType={GalleryTypeEnum.BACKGROUND}
            refresh={() => getImgs()}
          />

          {/* TODO: pagination */}
        </div>
      </div>
    </div>
  )
}

export default BackgroundImagesPage