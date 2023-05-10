import mongoose, { Schema, models } from "mongoose";

export const GallarySchema = new Schema({
    name: {
        type: String,
        require: true
    },
});

export default mongoose?.models?.Gallery || mongoose.model("Gallery", GallarySchema);