import Gallery, { IGallery } from "@/models/GalleryModel"
import { connectMongoDB } from "@/config/db"
import { verifyJwt } from "@/utils/jwt"

/* [GET] http:/localhost:3000/api/gallery  
 *  get all galleries created by a specific user                      
 *  user is authenticated by verifying bearer token that is sent under headers
 * 
 *  or you can add query params to filter out galleries by tags
 *  http:/localhost:3000/api/gallery?tags=apple,banana
 */
export const GET = async (req:Request) => {
    await connectMongoDB();

    try {
        // verify token and extract userID
        const accessToken = req.headers.get("authorization");
        const token = accessToken?.split(' ')[1];
        const decodedToken = verifyJwt(token || "");
        if (!accessToken || !decodedToken) return new Response("Unauthorized (wrong or expired token)", { status: 403 });
        const userID = decodedToken._id;

        // user verified, get all galleries by that user 
        // req params - tags
        const url = new URL(req.url);
        const tags = url.searchParams.get("tags")
        const tagsArray = tags ? tags.split(',') : [];

        const query = { 
            userID: { $in: userID },
            ...(tags ? { tags: { $in: tagsArray } } : {})
        }

        const galleries = await Gallery.find(query).sort({"updatedAt":-1});
        return new Response(JSON.stringify(galleries), { status: 200} );
    } catch (err: any) {
        return new Response(err.message, { status: 500 });
    }
}


/* [POST] http:/localhost:3000/api/gallery
 *  Create a gallery 
 *  req body: name, image, userID, tags
 */
export const POST = async (req: Request) => {
    await connectMongoDB();

    try {
        // verify token and extract userID
        const accessToken = req.headers.get("authorization");
        const token = accessToken?.split(' ')[1];
        const decodedToken = verifyJwt(token || "");
        if (!accessToken || !decodedToken) return new Response("Unauthorized (wrong or expired token)", { status: 403 });
        const userID = decodedToken._id;

        // user verified, create gallery for that user 
        const body: IGallery = await req.json();
        const gallery = await Gallery.create(body);
        return new Response("Gallery created", { status: 200 });
    } catch (err: any) {
        return new Response(err.message, { status: 500 });
    }

}
