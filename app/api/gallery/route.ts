import Gallery, { IGallery } from "@/models/GalleryModel"
import { connectMongoDB } from "@/config/db"

/* [GET] http:/localhost:3000/api/gallery  
 *  get all galleries                     
 *  
 *  or you can add query params to filter out galleries
 *  http:/localhost:3000/api/gallery?userID=64698ab60ffd0266b0c3dc89&tags=apple,banana
 */
export const GET = async (req:Request) => {
    await connectMongoDB();

    // const accessToken = req.headers.get("authorization");
    // const token - accessToken?.split(' ')[1];
    // const decodedToken = verifyJwtToken(token);
    // if (!accessToken || !decodedToken) {
        // return new Response("Unauthorized (wrong or expired token", {status:403});
    // }

    try {
        const url = new URL(req.url);
        const tags = url.searchParams.get("tags")
        const tagsArray = tags ? tags.split(',') : [];

        const query = { 
            userID: { $in: url.searchParams.get("userID") },
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
        const body: IGallery = await req.json();
        const gallery = await Gallery.create(body);
        return new Response("Gallery created", { status: 200 });
    } catch (err: any) {
        return new Response(err.message, { status: 500 });
    }

}
