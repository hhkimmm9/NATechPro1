import mongoose, { Schema, model, models } from "mongoose";

export interface ITag {
    label: string
    image_id: string
    user_id: string
}

export const TagSchema = new Schema(
    {   label: {
            type: String,
            require: true
        },
        user_id: {
            type: String,
            require: true
        },
        images: [
            { type: Schema.Types.ObjectId, ref: 'image' }
        ]
    },
    { collection: 'tag' }
);

const Tag = models.Tag || model("Tag", TagSchema);

export default Tag; 
