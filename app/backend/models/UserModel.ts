import mongoose from "mongoose";

export interface Iuser {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      max: 50,
      unique: true,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Invalid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      min: 6,
    },
  },
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
