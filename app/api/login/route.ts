import { NextResponse } from "next/server";
import User from "@/app/backend/models/UserModel";
import { connectMongoDB } from "@/config/db";
import * as bcrypt from "bcryptjs";

interface RequestBody {
  email: string;
  password: string;
}

export async function POST(req: Request) {
  const body: RequestBody = await req.json();

  try {
    await connectMongoDB();
    const { email, password } = body;

    if (!email || !password)
      return new Response(JSON.stringify("All fields are required"), {
        status: 400,
      });

    const foundUser = await User.findOne({ email: email }).exec();

    if (!foundUser)
      return new Response(JSON.stringify("User does not exist."), {
        status: 401,
      });

    const isMatch = await bcrypt.compare(password, foundUser.password);

    if (!isMatch)
      return new Response(JSON.stringify("Invalid credential."), {
        status: 401,
      });

    const { password: pass, ...userWithoutPass } = foundUser._doc;
    return NextResponse.json(userWithoutPass);
  } catch (err: any) {
    return new Response(err.message, { status: 500 });
  }
}
