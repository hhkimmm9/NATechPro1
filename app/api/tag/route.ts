import Tag, { ITag } from "@/models/TagModel"
import { connectMongoDB } from "@/config/db"
import { verifyJwt } from "@/utils/jwt"

export const POST = async (req: Request) => {
    await connectMongoDB();
    try {
        // verify token and extract userID
        const accessToken = req.headers.get("authorization");
        const token = accessToken?.split(' ')[1];
        const decodedToken = verifyJwt(token || "");
        if (!accessToken || !decodedToken) return new Response("Unauthorized (wrong or expired token)", { status: 403 });
        const userID = decodedToken._id;

        //user verified, create tag
        const body: ITag = await req.json();
        if (!body.label) return new Response("All fields are required", { status: 400 })
        body.userID = userID;
        await Tag.create(body);
        return new Response("Tag created", { status: 200 });
    } catch (err: any) {
        return new Response(err.message, { status: 500 });
    }
}

export const GET = async (req: Request) => {
    await connectMongoDB();
    try {
        // verify token and extract userID
        const accessToken = req.headers.get("authorization");
        const token = accessToken?.split(' ')[1];
        const decodedToken = verifyJwt(token || "");
        if (!accessToken || !decodedToken) return new Response("Unauthorized (wrong or expired token)", { status: 403 });
        const userID = decodedToken._id;

        // user verified, get all tags that user have
        const tags = await Tag.find({ userID: userID })
        return new Response(JSON.stringify(tags), { status: 200 });
    } catch (err: any) {
        return new Response(err.message, { status: 500 });
    }
}