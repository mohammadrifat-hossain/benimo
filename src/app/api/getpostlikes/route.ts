import client from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { postId } = await req.json();
  
  try {
    if (!postId) {
      return NextResponse.json({ message: "Post not found", success: false });
    } else {      
      const postLikes = await client.like.findMany({
        where: {
          postId,
        },
      });
      
      if (!postLikes) {
        console.log("here");
        
        return NextResponse.json({ message: "No post Likes", success: false });
      } else {
        return NextResponse.json({ postLikes, success: true });
      }
    }
  } catch (error: any) {
    console.log('getlike',error);
    return NextResponse.json({ message: error.message, success: false });
  }
};
