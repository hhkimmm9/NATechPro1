import Gallery from "@/models/GalleryModel";
import { connectMongoDB } from "@/lib/db";


export const GET = async (req: Request, { params }: { params: { id: string } } ) => {
    try {
        await connectMongoDB(); 
        const gallery = await Gallery.findById(params.id)
        if (!gallery) return new Response(`Gallery id:${params.id} not found`, { status: 404 });
        return new Response(JSON.stringify(gallery), { status: 200 })

    } catch (error: any) {
        console.log(error)
        return new Response("Internal Server Error", { status: 500 });
    }
}

export const PATCH = async (req:Request, { params }: { params: { id: string } } ) => {
    const { name } = await req.json();
    try {
        await connectMongoDB();
        const existingGallery = await Gallery.findById(params.id);
        if (!existingGallery) return new Response(`Gallery id:${params.id} not found`, { status: 404 });
        // update
        existingGallery.name = name; 
        await existingGallery.save();
        return new Response(`Successfully updated gallery id:${params.id}`);
    } catch (err) {
        return new Response("Error updating gallery", { status: 500 });
    }
}

export const DELETE = async (req:Request, { params }: { params: { id: string } } ) => {
    try {
        await connectMongoDB();
        await Gallery.findByIdAndRemove(params.id);
        return new Response(`Successfully deleted gallery id:${params.id}`);
    } catch (err) {
        return new Response("Error updating gallery", { status: 500 });
    }
}