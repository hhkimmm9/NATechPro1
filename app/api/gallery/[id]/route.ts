import Gallery from "@/models/GalleryModel";
import { connectMongoDB } from "@/config/db"


export const GET = async (req: Request, { params }: { params: { id: string } } ) => {
    try {
        await connectMongoDB(); 
        const gallery = await Gallery.findById(params.id)
        if (!gallery) return new Response(`Gallery id:${params.id} not found`, { status: 404 });
        return new Response(JSON.stringify(gallery), { status: 200 })

    } catch (err: any) {
        return new Response(err.message, { status: 500 });
    }
}

export const PATCH = async (req:Request, { params }: { params: { id: string } } ) => {
    const { name, image } = await req.json();
    try {
        await connectMongoDB();
        const existingGallery = await Gallery.findById(params.id);
        if (!existingGallery) return new Response(`Gallery id:${params.id} not found`, { status: 404 });
        // update
        existingGallery.name = name; 
        existingGallery.image = image;
        await existingGallery.save();
        return new Response(`Successfully updated gallery id:${params.id}`);
    } catch (err:any) {
        return new Response(err.message, { status: 500 });
    }
}

export const DELETE = async (req:Request, { params }: { params: { id: string } } ) => {
    try {
        await connectMongoDB();
        await Gallery.findByIdAndRemove(params.id);
        return new Response(`Successfully deleted gallery id:${params.id}`);
    } catch (err:any) {
        return new Response(err.message, { status: 500 });
    }
}