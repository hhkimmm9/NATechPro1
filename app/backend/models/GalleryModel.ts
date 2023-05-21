import mongoose, { Schema, model, models } from "mongoose";

export interface IGallery {
    name: string
    image: string 

}

export const GallerySchema = new Schema(
    {   name: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        authorID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    { timestamps: true }
);

const Gallery = models.Gallery || model("Gallery", GallerySchema);

export default Gallery; 
