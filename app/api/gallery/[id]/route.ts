import Gallery from "@/models/GalleryModel";
import { connectMongoDB } from "@/config/db"
import { verifyJwt } from "@/utils/jwt"

/* [GET] http:/localhost:3000/api/gallery/6469913f713c10b3cc553ad3
 * return gallery with the specified id 
 */
export const GET = async (req: Request, { params }: { params: { id: string } } ) => {
    await connectMongoDB(); 

    try {
        // verify token and extract userID
        const accessToken = req.headers.get("authorization");
        const token = accessToken?.split(' ')[1];
        const decodedToken = verifyJwt(token || "");
        if (!accessToken || !decodedToken) return new Response("Unauthorized (wrong or expired token)", { status: 403 });

        // user verified, get gallery
        const gallery = await Gallery.findById(params.id)
        if (!gallery) return new Response(`Gallery id:${params.id} not found`)
        // check if user is the author
        if (gallery?.userID?.toString() !== decodedToken._id.toString()) return new Response("Not the author", { status: 403 })

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
    await connectMongoDB();

    try {
        // verify token
        const accessToken = req.headers.get("authorization");
        const token = accessToken?.split(' ')[1];
        const decodedToken = verifyJwt(token || "");
        if (!accessToken || !decodedToken) return new Response("Unauthorized (wrong or expired token)", { status: 403 });

        // user verified, update gallery 
        const gallery = await Gallery.findById(params.id)
        if (!gallery) return new Response(`Gallery id:${params.id} not found`)
        // check if user is the author
        if (gallery?.userID?.toString() !== decodedToken._id.toString()) return new Response("Not the author", { status: 403 })

        // update gallery
        const body = await req.json()
        const updatedGallery = await Gallery.findByIdAndUpdate(params.id, { $set: { ...body } }, { new: true })
        return new Response(`Successfully updated gallery id:${params.id}`);
    } catch (err:any) {
        return new Response(err.message, { status: 500 });
    }
}


/* [DELETE] http:/localhost:3000/api/gallery/6469913f713c10b3cc553ad3
 * delete gallery with the specified id 
 */
export const DELETE = async (req:Request, { params }: { params: { id: string } } ) => {
    await connectMongoDB();

    try {
        // verify token
        const accessToken = req.headers.get("authorization");
        const token = accessToken?.split(' ')[1];
        const decodedToken = verifyJwt(token || "");
        if (!accessToken || !decodedToken) return new Response("Unauthorized (wrong or expired token)", { status: 403 });

        // user verified, delete gallery
        const gallery = await Gallery.findById(params.id)
        if (!gallery) return new Response(`Gallery id:${params.id} not found`)
        // check if user is the author 
        if (gallery?.userID?.toString() !== decodedToken._id.toString()) return new Response("Not the author", { status: 403 })

        // delete gallery
        await Gallery.findByIdAndRemove(params.id);
        return new Response(`Successfully deleted gallery id:${params.id}`);
    } catch (err:any) {
        return new Response(err.message, { status: 500 });
    }
}