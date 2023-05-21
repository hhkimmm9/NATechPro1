import Gallery, { IGallery } from "@/models/GalleryModel"
import { connectMongoDB } from "@/config/db"
import upload from "@/backend/utils/multer"


export const GET = async (req:Request) => {
    await connectMongoDB();

    try {
        const url = new URL(req.url);
        const tags = url.searchParams.get("tags")
        const tagsArray = tags ? tags.split(',') : [];
        const query = tags ? { tags: { $in: tagsArray } } : {};

        const galleries = await Gallery.find(query).sort({"updatedAt":-1});
        return new Response(JSON.stringify(galleries), { status: 200} );
    } catch (err: any) {
        return new Response(err.message, { status: 500 });
    }
}


export const POST = async (req: Request) => {
    await connectMongoDB();

    // const accessToken = req.headers.get("authorization");
    // const token - accessToken?.split(' ')[1];
    // const decodedToken = verifyJwtToken(token);
    // if (!accessToken || !decodedToken) {
        // return new Response("Unauthorized (wrong or expired token", {status:403});
    // }

    try {
        const body: IGallery = await req.json();
        const gallery = await Gallery.create(body);
        return new Response("Gallery created", { status: 200 });
    } catch (err: any) {
        return new Response(err.message, { status: 500 });
    }

}
