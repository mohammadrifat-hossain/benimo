import client from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { userId } = await req.json();

  try {
    if (!userId) {
      return NextResponse.json({ message: "no user is found", success: false });
    }
    const userPosts = await client.post.findMany({
      where: {
        authorId: userId,
      },
    });
    
    return NextResponse.json({userPosts, success: true})
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({message:error.message, success: true})
  }
};
