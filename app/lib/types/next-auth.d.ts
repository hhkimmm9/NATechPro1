import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      _id: number;
      email: string;
      accessToken: string;
    };
  }
}