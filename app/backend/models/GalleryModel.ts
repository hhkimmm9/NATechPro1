import mongoose, { Schema, model, models } from "mongoose";

export interface GalleryInterface {
    name: string
    img: string 

}

export const GallerySchema = new Schema(
    {   name: {
            type: String,
            require: true
        },
        img: {
            type: String,
            require: true
        }
    },
    { collection: 'gallery' }
);

const Gallery = models.Gallery || model("Gallery", GallerySchema);

export default Gallery; 
