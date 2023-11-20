'use client'

import React, { useContext, useState, useEffect, useCallback, useRef } from 'react'
import Script from 'next/script'
import AppContext from "@/app/components/hooks/createContext"

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
    const formData = new FormData()

    cropper?.getCroppedCanvas({
      width: 288,
      height: 162,
    });

    cropper?.getCroppedCanvas({
      minWidth: 256,
      minHeight: 256,
      maxWidth: 4096,
      maxHeight: 4096,
    })

    await cropper?.getCroppedCanvas().toBlob((blob: any) => {
      let imageFile = new File([blob], "image.jpg", { type: "image/jpeg" })
      formData.append("file", imageFile, "image.jpg")
    }, "image/jpeg")
    
    try {
      // send image to server
      const response = await fetch("http://0.0.0.0:8888/image-embedding", {
        method: "POST",
        body: formData,
        headers: {
          // 'Content-Type': 'multipart/form-data'
          accept: "application/json"
        }
      })
  
      const result = await response.json()

      console.log('result: ', result.data)
      // let image_embedding = result.data.image_embedding
      // console.log(image_embedding)

      // const binaryString = atob(image_embedding);
      // // Create a DataView to read the binary data as float32 values
      // const dataView = new DataView(new ArrayBuffer(binaryString.length));
      // for (let i = 0; i < binaryString.length; i++) {
      //     dataView.setUint8(i, binaryString.charCodeAt(i));
      // }
      
      // Read the float32 values from the DataView
      // const float32Array = new Float32Array(dataView.buffer);
      // tensor = new ort.Tensor("float32", float32Array, data.image_embedding_shape);

      // ----------------------------------------------------------------

      // Load the Segment Anything pre-computed embedding
      // Promise.resolve(loadNpyTensor(image_embedding, "float32")).then(
      //   (embedding) => setTensor(embedding)
      // );
    }

    catch(error: any) {
      console.log(error.message);
      alert('사용 할 수 없는 이미지 입니다.')
    }
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