import client from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { postId } = await req.json();

  try {
    if (!postId) {
      return NextResponse.json({ message: "Post not found", success: false });
    }
    const postComments = await client.comment.findMany({
      where: {
        postId,
      },
    });
    if (!postComments) {
      return NextResponse.json({ message: "No post Comments", success: false });
    }
    return NextResponse.json({ postComments, success: true });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message, success: false });
  }
};
