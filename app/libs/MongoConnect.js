import mongoose from "mongoose";

const { MONGO_URI } = process.env;

if (!MONGO_URI) throw new Error("Invalid MONGO_URI");

export const connectMongoDB = async () => {
  try {
    const { connection } = await mongoose.connect(MONGO_URI);

    if (connection.readyState === 1) {
      return Promise.resolve(true);
    }
  } catch (err) {
    return Promise.reject(err);
  }
};
