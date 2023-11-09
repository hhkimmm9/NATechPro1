import mongoose, { Schema, model, models } from "mongoose";

export const GallerySchema = new Schema(
    {   name: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true,
            enum: ['galleryImage', 'segment', 'backgroundImage'],
            default: 'galleryImage',
        },
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
    },
    { timestamps: true }
);

const Gallery = models.Gallery || model("Gallery", GallerySchema);

export default Gallery; 
