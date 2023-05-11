// import connectMongoDB from "../../lib/db"
import Gallery from "@/models/GalleryModel"
import { NextResponse } from "next/server"
import { connectMongoDB } from "@/lib/db"


export async function GET() {
    try {
        await connectMongoDB();
        const galleries = await Gallery.find({})
        // return new Response(JSON.stringify(galleries), { status: 200} )
        return NextResponse.json(galleries)
    } catch (error: any) {
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        await connectMongoDB();
        const { name } = await req.json()
        const gallery = await Gallery.create({ name })
        return new NextResponse("Gallery Created")
    } catch (error: any) {
        return new NextResponse("Internal Error", { status: 500 })
    }

}
