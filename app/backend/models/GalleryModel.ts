import mongoose, { Schema, model, models } from "mongoose";

export interface IGallery {
    name: string
    image: string 
    userID: mongoose.Schema.Types.ObjectId,
    tags: string[]
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
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        tags: {
            type: [String],
            required: true 

        }
    },
    { timestamps: true }
);

const Gallery = models.Gallery || model("Gallery", GallerySchema);

export default Gallery; 
