import { NextResponse } from "next/server";
import User, { Iuser } from "@/backend/models/UserModel";
import { connectMongoDB } from "@/backend/config/db";
import * as bcrypt from "bcryptjs";
import { signJwtAccessToken } from "@/backend/utils/jwt";

export async function POST(req) {
  const body = await req.json();
  
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
    const accessToken = signJwtAccessToken(userWithoutPass);
    const user = {
      ...userWithoutPass,
      accessToken,
    };
    // console.log(user)
    return new Response(JSON.stringify(user));
  } catch (err) {
    return new Response(err.message, { status: 500 });
  }
}
