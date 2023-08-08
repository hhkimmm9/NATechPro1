import mongoose, { Schema, model, models } from "mongoose";

export const TagSchema = new Schema(
    {   label: {
            type: String,
            require: true
        },
        user_id: {
            type: Schema.Types.ObjectId,
            ref: "User",
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
