import connectMongoDB from "../../lib/db"

export async function GET() {
  console.log("connecting")
  console.log(process.env.MONGO_URI)
  connectMongoDB();
  console.log("connected");

  return new Response("get")


}
