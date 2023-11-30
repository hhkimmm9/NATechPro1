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

  // verify token and extract userID
  const session = await getServerSession(req, {
    ...res,
    getHeader: (name) => res.headers?.get(name),
    setHeader: (name, value) => res.headers?.set(name, value),
  }, authOptions )
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 403 });

  const searchParams = req.nextUrl.searchParams
  const imageType = searchParams.get('imageType')

  const formData = await req.formData()
  const file = formData.get('file')

  // background images
  if (imageType !== 'imageEmbedding') {

    const formDataToCloudinary = new FormData()
    formDataToCloudinary.append('file', file)
    formDataToCloudinary.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || "")
    formDataToCloudinary.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_PRESET || "")

    try {
      const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/upload`

      const responseCloudinary = await fetch(url, {
        method: "POST",
        body: formDataToCloudinary
      });
      const resultCloudinary = await responseCloudinary.json();
  
      // user verified, create gallery for that user
      await Gallery.create({
        name: `${resultCloudinary.original_filename}_${resultCloudinary.asset_id}`,
        image: resultCloudinary.secure_url,
        type: imageType,
        userID: session?.user._id
      });
      return NextResponse.json({ message: "Gallery created" }, { status: 200 });
    } catch (err: any) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }

  // image embedding
  else {
    const formDataToImageEmbeddingServer = new FormData()
    formDataToImageEmbeddingServer.append('file', file, "image.jpg")

    try {
      // send image to server
      const response = await fetch("http://0.0.0.0:8888/image-embedding", {
        method: "POST",
        body: formDataToImageEmbeddingServer,
        headers: {
          accept: "application/json"
        }
      })
  
      const result = await response.json()
      let image_embedding = result.image_embedding
      const binaryString = atob(image_embedding);

      // Create a DataView to read the binary data as float32 values
      const dataView = new DataView(new ArrayBuffer(binaryString.length))
      for (let i = 0; i < binaryString.length; i++) {
        dataView.setUint8(i, binaryString.charCodeAt(i))
      }

      // Read the float32 values from the DataView
      const float32Array = new Float32Array(dataView.buffer);

      return NextResponse.json({
        float32Array,
        imageEmbeddingShape: result.image_embedding_shape
      }, { status: 200 });
      
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
};