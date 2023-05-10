import mongoose from "mongoose";

const DB_URI = process.env.MONGO_URI || "";

let cached = global.mongoose;

if (!cached) cached = global.mongoose = { conn: null, promise: null };


async function connectMongoDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .set({ debug: true, strictQuery: false })
      .connect(`${DB_URI}`)
      .then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectMongoDB;