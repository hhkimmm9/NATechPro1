import User from "@/backend/models/UserModel";
import { connectMongoDB } from "@/backend/config/db";
import * as bcrypt from "bcryptjs";
import { signJwtAccessToken } from "@/backend/utils/jwt";

export async function POST(req: any) {
  const body = await req.json();

  try {
    await connectMongoDB();
    const foundUser = await User.findOne({ email: body.email }).exec();
    if (foundUser) {
      const { password, ...userWithoutPass } = foundUser._doc;

      const accessToken = signJwtAccessToken(userWithoutPass);
      const user = {
        ...userWithoutPass,
        accessToken,
      };

      return new Response(JSON.stringify(user));
    } else {
      // Password ecryption
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(body.email + process.env.NEXTAUTH_SECRET, salt);

      const newUser = new User({
        email: body.email,
        password: hashedPassword,
      });

      const savedUser = await newUser.save();
      if (!savedUser) {
        return new Response(JSON.stringify("User signup failed with Google."), { status: 400 });
      }
      const { password, ...userWithoutPass } = savedUser._doc;
      const accessToken = signJwtAccessToken(userWithoutPass);

      const user = {
        ...userWithoutPass,
        accessToken,
      };
      return new Response(JSON.stringify(user));
    }
  } catch (err: any) {
    return new Response(err.message, { status: 500 });
  }
}
