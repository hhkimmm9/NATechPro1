'use client'

import React, { useState } from 'react'
import axios from 'axios'

export default function Test() {
    const [name, setName] = useState("default")
    const [image, setImage] = useState("")
    const cloudinary_name = process.env.NEXT_PUBLIC_CLOUDINARY_NAME
    const cloudinary_api_key = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET


    async function handleFile(e) {
        const url = `https://api.cloudinary.com/v1_1/${cloudinary_name}/upload`
        const formData = new FormData()
        formData.append('file', e.target.files[0])
        formData.append('api_key', cloudinary_api_key)
        formData.append('upload_preset', uploadPreset)

        axios.post(url, formData)
        .then(res => {
            console.log(res.data.secure_url)
            setImage(res.data.secure_url)
        })
        .catch(err => console.log(err));

    }


    return (
        <div>
            <input type="file" name="image" onChange={handleFile}/>
            <img src={image} style={{maxWidth: '500px', maxHeight:'200px'}}/>

        </div>
    )
}
