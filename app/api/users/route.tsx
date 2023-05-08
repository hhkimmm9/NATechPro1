import { NextApiRequest } from "next";

export async function GET(req:NextApiRequest) {
  return new Response("user api")
}