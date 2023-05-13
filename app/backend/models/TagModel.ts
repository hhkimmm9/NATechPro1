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
        image_id: {
            type: Schema.Types.ObjectId,
            require: true
        },
        user_id: {
            type: String,
            require: true
        }
    },
    { collection: 'Tag' }
);

const Tag = models.Tag || model("Tag", TagSchema);

export default Tag; 
