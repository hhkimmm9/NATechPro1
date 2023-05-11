import Gallery from "@/models/GalleryModel"
import { connectMongoDB } from "@/config/db"

export const GET = async () => {
    try {
        await connectMongoDB();
        const galleries = await Gallery.find({});
        return new Response(JSON.stringify(galleries), { status: 200} );
    } catch (error: any) {
        return new Response("Internal Server Error", { status: 500 });
    }
}

export const POST = async (req: Request) => {
    try {
        await connectMongoDB();
        const { name } = await req.json();
        const gallery = await Gallery.create({ name });
        return new Response("Created gallery", { status: 200 });
    } catch (error: any) {
        return new Response("Internal Server Error", { status: 500 });
    }

}
