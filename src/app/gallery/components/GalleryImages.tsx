"use client";

import React from 'react';
import { MdOutlineCancel } from "react-icons/md";
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { IGallery, GalleryTypeEnum } from "@/app/interfaces/index";

const GalleryImages = (
  {
    imageData,
    galleryType,
    refresh
  }: {
    imageData: (IGallery[] | undefined),
    galleryType: GalleryTypeEnum,
    refresh: Function
  }
) => {

  const { data: session } = useSession({ required: true });

  const deleteImage = async (itemId: string) => {
    try {

      const response = await fetch(`/api/gallery/${itemId}`,
        {
          method: 'DELETE',
          headers: {
            authorization: `Bearer ${session?.user.accessToken}`,
          }
        });

      const result = response.json();

      refresh()
    } catch (error) {
      console.log(error)
      // 
    }
  }

  return (
    <>
      <div className="p-5 flex rounded-lg shadow bg-stone-100">
        {imageData && (

          <div className='grid grid-cols-2 gap-2'>
            { imageData.map((item, index) => {
              if (item.type === galleryType) {
                return (
                  <div className='
                    relative col-span-1
                    p-4 rounded-xl bg-white
                    flex flex-col
                  '>
                    <div className='flex flex-col gap-4'>
                      <Image src={item.image} alt={`background image ${index}`}
                        width={240} height={200} className='mx-auto'
                      />
                      <span className='truncate whitespace-nowrap'>{item.name}</span>
                    </div>
                      
                        
                    <div onClick={() => deleteImage(item._id)} 
                      className='
                        absolute top-2 right-2.5
                        text-stone-600 cursor-pointer
                        hover:text-stone-800 hover:scale-125 duration-150
                    '>
                      <MdOutlineCancel size={24} />
                    </div>
                  </div>
                )
              }
            })}
          </div>
        )}
      </div>
    </>
  )
}

export default GalleryImages