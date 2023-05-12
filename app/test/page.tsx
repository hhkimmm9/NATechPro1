'use client'

import React, { useState } from 'react'
import axios from 'axios'

export default function Test() {
    const [name, setName] = useState<string>("default")
    const [image, setImage] = useState<File | string>("")
    const [imagePreview, setImagePreview] = useState<string>("")

    const generateImagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader()
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImagePreview(reader.result as string)
            }
        }
        setImage(e.target.files?.[0] || "")
        reader.readAsDataURL(e.target.files?.[0] as File)
    }


    // upload to cloudinary on client side, retrieve url from response and send a POST request to /api/gallery to create a new gallery 
    async function handleFile() {
        const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/upload`
        const formData = new FormData()
        formData.append('file', image)
        formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || "")
        formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_PRESET || "")

        axios.post(url, formData)
        .then(res => {
            // console.log(res.data.secure_url)
            setImage(res.data.secure_url)
            // create gallery
            axios.post(`${process.env.NEXT_PUBLIC_URL}/api/gallery`, {
                "name": name,
                "image": res.data.secure_url
            })
            .then(res => {
                console.log("gallery created")
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err));

    }


    return (
        <div>
            <input type="text" name="name" onChange={(e) => setName(e.target.value)}/>
            <input type="file" name="image" onChange={generateImagePreview}/>
            <img src={imagePreview} style={{maxWidth: '500px', maxHeight:'200px'}}/>
            <button onClick={handleFile}>Create Gallery</button>

        </div>
    )
}

