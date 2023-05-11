import Gallery from "@/models/GalleryModel";
import { connectMongoDB } from "@/lib/db";

export const GET = async (req: Request, { params }: { params: { id: string } } ) => {
    try {
        await connectMongoDB(); 

        const gallery = await Gallery.findById(params.id)
        if (!gallery) return new Response("Gallery not found", { status: 404 });
        return new Response(JSON.stringify(gallery), { status: 200 })

    } catch (error: any) {
        return new Response("Internal Server Error", { status: 500 });
    }
}