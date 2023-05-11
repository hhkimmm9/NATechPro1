import mongoose, { Schema, model, models } from "mongoose";

export const GallerySchema = new Schema(
    {   name: {
            type: String,
            require: true
        },
    },
    { collection: 'gallery' }
);

const Gallery = models.Gallery || model("Gallery", GallerySchema);

export default Gallery; 
