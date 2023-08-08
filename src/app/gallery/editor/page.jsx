'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import {distanceSize, drawCircle, drawPolygon} from "../../../sam/script/utils.js"
import {onnxMaskToImage, clearMask} from "../../../sam/script/maskUtils.js"

export default function EditorPage() {
    let drawMode = 0        // 0: default, 1: hover, 2: click
    let model
    let imgShape
    let tensor
    let [distanceHeight, distanceWidth] = distanceSize()
    let lefts = []
    let rights = []
    
    const [imageUrl, setIamgeUrl] = useState('') 

    useEffect(() => {
        samInit()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(e.target)
    }

    const samInit = async () => {
        const MODEL_DIR = "/decoder/sam_onnx_quantized.onnx"
        model = await ort.InferenceSession.create(MODEL_DIR).then(console.log("model loaded"))
    
        const IMAGE_EMBEDDING = "/model/embedding.npy"
        NumpyLoader.ajax(IMAGE_EMBEDDING, function (e) {
            tensor = new ort.Tensor("float32", e.data, e.shape)
            console.log("image embedding loaded")
        })
        drawMode = 0
    }

    const changeImage = async (e) => {
        let file = e.target.files[0]
        let url = window.URL.createObjectURL(file)
        // change image in front page
        setIamgeUrl(url) // $("#img").attr("src", url)
        // $(".select-hover").removeClass("select-hover")
        changeImageEvent(file)
    }
    
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
                let image_embedding = data.image_embedding
                const binaryString = atob(image_embedding);
                // Create a DataView to read the binary data as float32 values
                const dataView = new DataView(new ArrayBuffer(binaryString.length));
                for (let i = 0; i < binaryString.length; i++) {
                    dataView.setUint8(i, binaryString.charCodeAt(i));
                }
                // Read the float32 values from the DataView
                const float32Array = new Float32Array(dataView.buffer);
                tensor = new ort.Tensor("float32", float32Array, data.image_embedding_shape);
            }).catch((e) => {
                alert('사용 할 수 없는 이미지 입니다.')
            })
    }

    return (
        <div className="p-5">
            <form onSubmit={(e) => handleSubmit(e)}>
                <label>
                    Your image file
                    <input type="file" id="fileUploader" accept="image/*" onChange={(e) => changeImage(e)}/>
                </label>
                <button type='submit'>submit</button>
            </form>

            { imageUrl.length > 0 && (
                <Image src={imageUrl} alt='' width={512} height={512} className='object-contain'/>
            )}
        </div>
    )
}