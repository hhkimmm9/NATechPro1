"use client"

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import SearchInput from "@/app/components/SearchInput"
import GalleryImages from "./components/GalleryImages";
import { IGallery, GalleryTypeEnum } from "@/app/interfaces/index";

const GalleryPage = () => {
  const { data: session, status } = useSession({ required: true });

  const [imageData, setImageData] = useState<IGallery[] | undefined>(undefined)

  useEffect(() => {
    if (status === "authenticated") getImageData()
  }, [status])

  const getImageData = async () => {
    try {
      const response = await fetch(`/api/gallery?userID=${session?.user._id}`, {
        cache: "no-store",
        headers: {
          authorization: `Bearer ${session?.user.accessToken}`,
        }
      })
      const result = await response.json()
      setImageData(result)
    } catch (err) {
      // error handling here
      console.log(err)
    }
  }

  return (
    <div className="h-full p-5 flex flex-col gap-4">
      <div>
        <text className="font-bold text-lg px-5">My Gallery</text>
        <SearchInput onChange={() => {}}/>
      </div>

      <GalleryImages
        imageData={imageData}
        galleryType={GalleryTypeEnum.GALLERY}
        refresh={getImageData}
      />
    </div>
  );
}

export default GalleryPage