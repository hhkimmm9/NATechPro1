import Tag, { ITag } from "@/models/TagModel"
import { connectMongoDB } from "@/config/db"

export const GET = async (req: Request, { params }: { params: { id: string } } ) => {
    try {
        await connectMongoDB(); 
        const tag = await Tag.findById(params.id)
        if (!tag) return new Response("tag not found", { status: 404 });
        return new Response(JSON.stringify(tag), { status: 200 })
    } catch (error: any) {
        return new Response("Internal Server Error", { status: 500 });
    }
}

export const PATCH = async (req: Request, { params }: { params: { id: string } } ) => {
    try {
        await connectMongoDB();
        const { label } = await req.json();

        if (!label) return new Response("All fields are required", { status: 400 })
        
        const tag = await Tag.findById(params.id);
        if (!tag) return new Response(`tag id:${params.id} not found`, { status: 404 });
        tag.label = label; 
        await tag.save();
        return new Response(`Successfully updated tag`, { status: 200 });
    } catch (err: any) {
        return new Response(err.message, { status: 500 });
    }
}

export const DELETE = async (req: Request, { params }: { params: { id: string } } ) => {
    try {
        await connectMongoDB();
        await Tag.findByIdAndRemove(params.id);

        return new Response("Tag deleted", { status: 200 });
    } catch (err: any) {
        return new Response(err.message, { status: 500 });
    }
}

export const POST = async (req: Request, { params }: { params: { id: string } } ) => {
    try {
        await connectMongoDB();
        const body: ITag = await req.json();

        const tag = await Tag.findById(params.id);
        if (!tag) return new Response(`tag id:${params.id} not found`, { status: 404 });

        if (!body.image_id) return new Response("All fields are required", { status: 400 })

        tag.images.push(body.image_id)
        await tag.save();
        return new Response("Tag created", { status: 200 });
    } catch (err: any) {
        return new Response(err.message, { status: 500 });
    }
}