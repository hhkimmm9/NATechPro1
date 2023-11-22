'use client'

import React, { useContext, useState, useEffect, useCallback, useRef } from 'react'
import Script from 'next/script'
import AppContext from "@/app/components/hooks/createContext"

import { useSession } from "next-auth/react";

import { useDropzone } from 'react-dropzone'
import Cropper, { ReactCropperElement } from "react-cropper"
import "cropperjs/dist/cropper.css";

const ort = require("onnxruntime-web")
import npyjs from "npyjs"
import { InferenceSession, Tensor } from "onnxruntime-web"

const EditorPage: React.FC = () => {
  const {
    clicks: [clicks],
    image: [, setImage],
    maskImg: [, setMaskImg],
  } = useContext(AppContext)

  const [imageUrl, setImageUrl] = useState('')
  const [imageSelected, setImageSelected] = useState(false)
  const [model, setModel] = useState(null) // ONNX model
  const [tensor, setTensor] = useState(null) // Image embedding tensor

  const { data: session, status } = useSession({ required: true })

  const cropperRef = useRef<ReactCropperElement>(null)
  const onCrop = (event: any) => {
    // console.log(event.detail.x);
    // console.log(event.detail.y);
    // console.log(event.detail.width);
    // console.log(event.detail.height);
    // console.log(event.detail.rotate);
    // console.log(event.detail.scaleX);
    // console.log(event.detail.scaleY);

    const cropper = cropperRef.current?.cropper

    // console.log(cropper?.getCroppedCanvas().toDataURL('image/jpeg'))
    // console.log(cropper?.getCroppedCanvas())
  }

  // handling the drag and drop box.
  const MyDropzone = () => {
    const onDrop = useCallback(async (acceptedFiles: any) => {

      setImageSelected(true)

      // change tha image on the page.
      let url = window.URL.createObjectURL(acceptedFiles[0])

      // change image in the page
      setImageUrl(url)
    }, [])

    const { getRootProps, getInputProps, isDragActive} = useDropzone({ onDrop })

    if (!imageSelected) {
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
  }
  
  const submitImage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const cropper = cropperRef.current?.cropper

    // cropper?.getCroppedCanvas({
    //   width: 288,
    //   height: 162,
    // });

    // cropper?.getCroppedCanvas({
    //   minWidth: 256,
    //   minHeight: 256,
    //   maxWidth: 4096,
    //   maxHeight: 4096,
    // })

    // as users change the cropper
    await cropper?.getCroppedCanvas().toBlob(async (blob: any) => {
      const formData = new FormData()
      
      let imageFile = new File([blob], "image.jpg", { type: "image/jpeg" })
      formData.append("file", imageFile, "image.jpg")

      try {
        const response = await fetch(`/api/gallery?imageType=imageEmbedding`, {
          headers: {
            authorization: `Bearer ${session?.user.accessToken}`,
          },
          method: 'POST',
          body: formData
        });
        const result = await response.json()
  
        console.log("Success:", result)
      } catch(error: any) {
        console.log(error.message);
        alert('사용 할 수 없는 이미지 입니다.')
      }
    }, "image/jpeg")
  }

  // Decode a Numpy file into a tensor. 
  const loadNpyTensor = async (tensorFile: any, dType: any) => {
    let npLoader = new npyjs();
    const npArray = await npLoader.load(tensorFile);
    const tensor = new ort.Tensor(dType, npArray.data, npArray.shape);
    return tensor;
  };

  return (
    <>
      {/* <Script
        src='https://cdn.jsdelivr.net/npm/onnxruntime-web/dist/ort.min.js'
        onLoad={() => { console.log('onnx script loaded correctly.'); }}
      /> */}
      
      <div className="p-5">
        { MyDropzone() }

        { imageSelected && (
          <>
            <Cropper
              src={imageUrl}
              style={{ height: 400, width: "100%" }}
              // Cropper.js options
              initialAspectRatio={16 / 9}
              guides={false}
              crop={onCrop}
              ref={cropperRef}
            />

            <form onSubmit={(e) => submitImage(e)} className='mt-8 flex gap-8 justify-center'>
              <button onClick={() => { setImageUrl(''); setImageSelected(false); }}
                className='
                  px-2 py-1 border rounded-xl hover:bg-stone-50
              '> Cancel </button>

              <button type="submit" className='
                  px-2 py-1 border rounded-xl hover:bg-blue-100
              '> Submit </button>
            </form>
          </>
        )}
      </div>
    </>
  )
}

export default EditorPage