import { NextResponse } from "next/server";
import User from "@/app/models/UserModel";
import * as bcrypt from "bcryptjs";
import { connectMongoDB } from "@/app/libs/MongoConnect";

interface RequestBody {
  email: string;
  password: string;
}

export async function POST(req: Request) {
  const body: RequestBody = await req.json();
  connectMongoDB().catch((err) => new Response(err));

  try {
    const { email, password } = body;

    if (!email || !password)
      return new Response("All fields are required", { status: 400 });

    const foundUser = await User.findOne({ email: email }).exec();

    if (!foundUser)
      return new Response("User does not exist.", { status: 401 });

    const isMatch = await bcrypt.compare(password, foundUser.password);

    if (!isMatch) return new Response("Invalid credential.", { status: 401 });

    const { password: pass, ...userWithoutPass } = foundUser._doc;
    return NextResponse.json(userWithoutPass);
  } catch (err: any) {
    return new Response(err.message, { status: 500 });
  }
}
