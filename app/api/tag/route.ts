import Tag, { ITag } from "@/models/TagModel"
import { connectMongoDB } from "@/config/db"

export const POST = async (req: Request) => {
    try {
        await connectMongoDB();
        const body: ITag = await req.json();

        if (!body.label || !body.user_id)
        return new Response("All fields are required", { status: 400 })
        
        await Tag.create(body);
        return new Response("Tag created", { status: 200 });
    } catch (err: any) {
        return new Response(err.message, { status: 500 });
    }
}