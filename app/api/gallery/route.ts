import Gallery from "../../models/GalleryModel";
import connectMongoDB from "../../lib/db"
import { NextApiRequest, NextApiResponse } from "next";
interface RequestBody {
  name: string;
}

export async function GET() {
  console.log("connecting")
  console.log(process.env.MONGO_URI)
  connectMongoDB();
  console.log("connected");

  return new Response("get")


}
