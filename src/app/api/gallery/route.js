import Gallery from "@/backend/models/GalleryModel";
import { connectMongoDB } from "@/backend/config/db";
import { verifyJwt } from "@/backend/utils/jwt";

/* [GET] http:/localhost:3000/api/gallery
 *  get all galleries created by a specific user
 *  user is authenticated by verifying bearer token that is sent under headers
 *
 *  or you can add query params to filter out galleries by name/tags
 *  {{URL}}/api/gallery?name=998&tags=bottle
 *  get the requested user gallery where name begins with 998 and tags include bottle
 */
export const GET = async (req) => {
  await connectMongoDB();

  try {
    // verify token and extract userID
    const accessToken = req.headers.get("authorization");
    const token = accessToken?.split(" ")[1];
    const decodedToken = verifyJwt(token || "");
    if (!accessToken || !decodedToken)
      return new Response("Unauthorized (wrong or expired token)", {
        status: 403,
      });
    const userID = decodedToken._id;

    // user verified, get all galleries by that user
    // req params - tags
    const url = new URL(req.url);
    const name = url.searchParams.get("name");
    const tags = url.searchParams.get("tags");
    const tagsArray = tags ? tags.split(",") : [];

    const query = {
      userID: { $in: userID },
      ...(tags ? { tags: { $in: tagsArray } } : {}), // includes tag
      ...(name ? { name: { $regex: `^${name}`, $options: "i" } } : {}), // begins with name, case insensitive
    };

    const galleries = await Gallery.find(query).sort({ updatedAt: -1 });
    return new Response(JSON.stringify(galleries), { status: 200 });
  } catch (err) {
    return new Response(err.message, { status: 500 });
  }
};

/* [POST] http:/localhost:3000/api/gallery
 *  Create a gallery
 *  req body: name, image, userID, tags
 */
export const POST = async (req) => {
  await connectMongoDB();

  try {
    // verify token and extract userID
    const accessToken = req.headers.get("authorization");
    const token = accessToken?.split(" ")[1];
    const decodedToken = verifyJwt(token || "");
    if (!accessToken || !decodedToken)
      return new Response("Unauthorized (wrong or expired token)", {
        status: 403,
      });

    // user verified, create gallery for that user
    const body = await req.json();
    const gallery = await Gallery.create(body);
    return new Response("Gallery created", { status: 200 });
  } catch (err) {
    return new Response(err.message, { status: 500 });
  }
};
