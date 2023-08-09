'use client'

import React, { useContext, useState, useEffect } from 'react'
import Image from 'next/image'
import Script from 'next/script'
// import AppContext from "@/app/components/hooks/createContext"
import AppContext from "../../components/hooks/createContext"
import { InferenceSession, Tensor } from "onnxruntime-web"
const ort = require("onnxruntime-web")
import npyjs from "npyjs"

export default function EditorPage() {
  const {
    clicks: [clicks],
    image: [, setImage],
    maskImg: [, setMaskImg],
  } = useContext(AppContext)

  // const IMAGE_PATH = "/assets/data/truck.jpg";
  const IMAGE_EMBEDDING = "/assets/data/truck_embedding.npy"
  const MODEL_DIR = "/assets/model/sam_onnx_quantized.onnx"

  const [imageUrl, setIamgeUrl] = useState('')
  const [model, setModel] = useState(null) // ONNX model
  const [tensor, setTensor] = useState(null) // Image embedding tensor

  useEffect(() => {
    // Initialize the ONNX model
    const initModel = async () => {
      try {
        if (MODEL_DIR === undefined) return;
        const URL = MODEL_DIR
        const model = await InferenceSession.create(URL)
        setModel(model)
      } catch (e) {
        console.log(e)
      }
    };
    initModel();
  }, [])

  const changeImage = async (e) => {
    let file = e.target.files[0]
    let url = window.URL.createObjectURL(file)
    console.log(url)

    // change image in front page
    setIamgeUrl(url)

    // Load the image
    // const url = new URL(imageUrl, location.origin);
    loadImage(url);

    changeImageEvent(file)
  }

  const loadImage = async (url) => {
    try {
      const img = new Image();
      img.src = url.href;
      img.onload = () => {
        const { height, width, samScale } = handleImageScale(img);
        setModelScale({
          height: height,  // original image height
          width: width,  // original image width
          samScale: samScale, // scaling factor for image which has been resized to longest side 1024
        });
        img.width = width; 
        img.height = height; 
        setImage(img);
      };
    } catch (error) {
      console.log(error);
    }
  };
  
  const changeImageEvent = async (imageFile) => {
    // send image to server
    let formData = new FormData()
    formData.append("file", imageFile, "image.jpg")
    await fetch("http://localhost:8888/image-embedding", {
      method: 'POST',
      body: formData,
      headers: {
        accept: "application/json",
      }
    }).then((response) => response.json())
      .then((data) => {

        // 
        console.log(data)
        let image_embedding = data.image_embedding
        console.log(image_embedding)

        const binaryString = atob(image_embedding);
        // Create a DataView to read the binary data as float32 values
        const dataView = new DataView(new ArrayBuffer(binaryString.length));
        for (let i = 0; i < binaryString.length; i++) {
            dataView.setUint8(i, binaryString.charCodeAt(i));
        }
        
        // Read the float32 values from the DataView
        // const float32Array = new Float32Array(dataView.buffer);
        // tensor = new ort.Tensor("float32", float32Array, data.image_embedding_shape);

        // ----------------------------------------------------------------

        // Load the Segment Anything pre-computed embedding
        Promise.resolve(loadNpyTensor(image_embedding, "float32")).then(
          (embedding) => setTensor(embedding)
        );
      }).catch((e) => {
        alert('사용 할 수 없는 이미지 입니다.')
      })
  }

  // Decode a Numpy file into a tensor. 
  const loadNpyTensor = async (tensorFile, dType) => {
    let npLoader = new npyjs();
    const npArray = await npLoader.load(tensorFile);
    const tensor = new ort.Tensor(dType, npArray.data, npArray.shape);
    return tensor;
  };

  const handleSubmit = (e) => {
    e.preventDefault()

    // 
  }

  return (
    <>
      {/* <Script
        src='https://cdn.jsdelivr.net/npm/onnxruntime-web/dist/ort.min.js'
        onLoad={() => { console.log('onnx script loaded correctly.'); }}
      /> */}
      
      <div className="p-5">
        <form onSubmit={(e) => handleSubmit(e)}>
          <label>
            Your image file
            <input type="file" id="fileUploader" accept="image/*" onChange={(e) => changeImage(e)}/>
          </label>
          <button type='submit'>submit</button>
        </form>

        { imageUrl.length > 0 && (
          <Image id="img" src={imageUrl} alt='' width={512} height={512} className='object-contain'/>
        )}
      </div>
    </>
  )
}