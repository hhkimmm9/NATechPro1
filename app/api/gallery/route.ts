import Gallery, { IGallery } from "@/models/GalleryModel"
import { connectMongoDB } from "@/config/db"
import upload from "@/backend/utils/multer"


export const GET = async () => {
    try {
        await connectMongoDB();
        const galleries = await Gallery.find({});
        return new Response(JSON.stringify(galleries), { status: 200} );
    } catch (err: any) {
        return new Response(err.message, { status: 500 });
    }
}


export const POST = async (req: Request) => {
    try {
        await connectMongoDB();
        const body: IGallery = await req.json();
        const gallery = await Gallery.create(body);
        return new Response("Gallery created", { status: 200 });
    } catch (err: any) {
        return new Response(err.message, { status: 500 });
    }

}
