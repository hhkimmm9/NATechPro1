'use client'

import React, { useState } from 'react'


export default function Test() {
    const [name, setName] = useState("default")
    const [image, setImage] = useState("/images/default.png")

    const submitHandler = (e) => {
        e.preventDefault() 
        const formData = new FormData()
        formData.set('name', name)
        formData.set('image', image)

    }

    const onChange = (e) => {
        const reader = new FileReader()
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImage(reader.result)
            }
        }

        setImage(e.target.files[0])
        reader.readAsDataURL(e.target.files[0]);
    }

    return (
        <div>
            <h1>Create a new gallery</h1>
            <form onSubmit={submitHandler}>
                <div>
                    <label>Gallery Name</label>
                    <input
                        type="text"
                        placeholder="Type gallery name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <div>Upload Image</div>
                    <img src={image} style={{maxWidth: '500px', maxHeight:'200px'}}/>
                    <input
                        type="file"
                        id="formFile"
                        onChange={onChange}
                    />

                </div>
                <button type="submit">Submit</button>
            </form>

        </div>
    )
}
