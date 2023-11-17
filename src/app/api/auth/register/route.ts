import { NextResponse } from "next/server";
import * as bcrypt from "bcryptjs";
import User from "@/backend/models/UserModel";
import { connectMongoDB } from "@/backend/config/db";


export async function POST(req: any) {
  const body = await req.json();

  try {
    await connectMongoDB();
    const { email, password } = body;

    if (!email || !password) return new Response("All fields are required", { status: 400 });

    // Check if user already exists
    const foundUser = await User.findOne({ email: email }).exec();
    if (foundUser) return new Response("Email already exists.", { status: 409 });

    // Password ecryption
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();

    if (!savedUser) return new Response("Error registering.", { status: 400 });

    const user = {
      id: savedUser._doc._id,
      email: savedUser._doc.email,
    };

    return NextResponse.json({ success: true, user });
  } catch (err: any) {
    return new Response(err.message, { status: 500 });
  }
}
