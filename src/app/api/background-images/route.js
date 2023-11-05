import Gallery from "@/backend/models/GalleryModel";
import { connectMongoDB } from "@/backend/config/db";
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { NextResponse } from "next/server"

export const GET = (req, res) => {

}

export const POST = (req, res) => {
  
}