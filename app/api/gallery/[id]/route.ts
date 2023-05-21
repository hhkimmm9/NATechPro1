import Gallery from "@/models/GalleryModel";
import { connectMongoDB } from "@/config/db"

/* [GET] http:/localhost:3000/api/gallery/6469913f713c10b3cc553ad3
 * return gallery with the specified id 
 */
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

/* [PATCH] http:/localhost:3000/api/gallery/6469913f713c10b3cc553ad3
 * update gallery with the specified id 
 * req body: name, image, tags
 */
export const PATCH = async (req:Request, { params }: { params: { id: string } } ) => {
    const { name, image, tags } = await req.json();
    try {
        await connectMongoDB();
        const existingGallery = await Gallery.findById(params.id);
        if (!existingGallery) return new Response(`Gallery id:${params.id} not found`, { status: 404 });
        // update
        existingGallery.name = name; 
        existingGallery.image = image;
        existingGallery.tags = tags;
        await existingGallery.save();
        return new Response(`Successfully updated gallery id:${params.id}`);
    } catch (err:any) {
        return new Response(err.message, { status: 500 });
    }
}


/* [DELETE] http:/localhost:3000/api/gallery/6469913f713c10b3cc553ad3
 * delete gallery with the specified id 
 */
export const DELETE = async (req:Request, { params }: { params: { id: string } } ) => {
    try {
        await connectMongoDB();
        await Gallery.findByIdAndRemove(params.id);
        return new Response(`Successfully deleted gallery id:${params.id}`);
    } catch (err:any) {
        return new Response(err.message, { status: 500 });
    }
}