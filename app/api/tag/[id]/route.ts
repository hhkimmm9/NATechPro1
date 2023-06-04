import Tag, { ITag } from "@/models/TagModel"
import { connectMongoDB } from "@/config/db"
import { verifyJwt } from "@/utils/jwt"

export const GET = async (req: Request, { params }: { params: { id: string } } ) => {
    await connectMongoDB(); 
    try {
        //verify token
        const accessToken = req.headers.get("authorization");
        const token = accessToken?.split(' ')[1];
        const decodedToken = verifyJwt(token || "");
        if (!accessToken || !decodedToken) return new Response("Unauthorized (wrong or expired token)", { status: 403 });

        // user verified get tag
        const tag = await Tag.findById(params.id)
        if (!tag) return new Response("tag not found", { status: 404 });
        return new Response(JSON.stringify(tag), { status: 200 })
    } catch (error: any) {
        return new Response("Internal Server Error", { status: 500 });
    }
}

export const PATCH = async (req: Request, { params }: { params: { id: string } } ) => {
    await connectMongoDB();
    try {
        //verify token
        const accessToken = req.headers.get("authorization");
        const token = accessToken?.split(' ')[1];
        const decodedToken = verifyJwt(token || "");
        if (!accessToken || !decodedToken) return new Response("Unauthorized (wrong or expired token)", { status: 403 });

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
    await connectMongoDB();
    try {
        //verify token
        const accessToken = req.headers.get("authorization");
        const token = accessToken?.split(' ')[1];
        const decodedToken = verifyJwt(token || "");
        if (!accessToken || !decodedToken) return new Response("Unauthorized (wrong or expired token)", { status: 403 });

        // user verified, delete tag
        await Tag.findByIdAndRemove(params.id);

        return new Response("Tag deleted", { status: 200 });
    } catch (err: any) {
        return new Response(err.message, { status: 500 });
    }
}

export const POST = async (req: Request, { params }: { params: { id: string } } ) => {
    await connectMongoDB();
    try {
        //verify token
        const accessToken = req.headers.get("authorization");
        const token = accessToken?.split(' ')[1];
        const decodedToken = verifyJwt(token || "");
        if (!accessToken || !decodedToken) return new Response("Unauthorized (wrong or expired token)", { status: 403 });

        const body: ITag = await req.json();
        const tag = await Tag.findById(params.id);
        if (!tag) return new Response(`tag id:${params.id} not found`, { status: 404 });

        if (!body.images) return new Response("All fields are required", { status: 400 })

        tag.images.push(body.images)
        await tag.save();
        return new Response("Tag created", { status: 200 });
    } catch (err: any) {
        return new Response(err.message, { status: 500 });
    }
}