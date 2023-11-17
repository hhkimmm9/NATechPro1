import Gallery from "@/backend/models/GalleryModel";
import { connectMongoDB } from "@/backend/config/db";
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { NextResponse } from "next/server"

/* [GET] http:/localhost:3000/api/gallery
 *  get all galleries created by a specific user
 *  user is authenticated by verifying bearer token that is sent under headers
 *
 *  or you can add query params to filter out galleries by name/tags
 *  {{URL}}/api/gallery?name=998&tags=bottle
 *  get the requested user gallery where name begins with 998 and tags include bottle
 */
export const GET = async (req: any, res: any) => {
  await connectMongoDB();

  try {
    // verify token and extract userID
    const session = await getServerSession(req, {
      ...res,
      getHeader: (name) => res.headers?.get(name),
      setHeader: (name, value) => res.headers?.set(name, value),
    }, authOptions )
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 403 });

    const userID = session.user._id

    // user verified, get all galleries by that user
    // req params - tags
    const { searchParams }  = new URL(req.url);
    const name = searchParams.get("name");
    // const tags = searchParams.get("tags");
    // const tagsArray = tags ? tags.split(",") : [];

    const query = {
      userID: { $in: userID },
      // ...(tags ? { tags: { $in: tagsArray } } : {}), // includes tag
      ...(name ? { name: { $regex: `^${name}`, $options: "i" } } : {}), // begins with name, case insensitive
    };

    const galleries = await Gallery.find(query).sort({ updatedAt: -1 });

    return NextResponse.json(galleries, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
};

/* [POST] http:/localhost:3000/api/gallery
 *  Create a gallery
 *  req body: name, image, userID, tags
 */
export const POST = async (req: any, res: any) => {
  await connectMongoDB();

  try {
    // verify token and extract userID
    const session = await getServerSession(req, {
      ...res,
      getHeader: (name) => res.headers?.get(name),
      setHeader: (name, value) => res.headers?.set(name, value),
    }, authOptions )
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 403 });

    // user verified, create gallery for that user
    const body = await req.json();
    const gallery = await Gallery.create(body);
    return NextResponse.json({ message: "Gallery created" }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
};