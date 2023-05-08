import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest, {params}:{params:{id:string}}) {
  const id = params.id;
  const { searchParams } = req.nextUrl;
  const sort = searchParams.get("sort");
  return NextResponse.json({ message: "gallery api", id, sort});
}
