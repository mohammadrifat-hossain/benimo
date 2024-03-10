import client from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const DELETE = async (
  req: Request,
  { params: { postId } }: { params: { postId: string } }
) => {
  try {
    if (!postId) {
      return NextResponse.json({ message: "Invalid post", success: false });
    }
    const deletePost = await client.post.delete({
      where: {
        id: postId,
      },
    });
    if (!deletePost) {
      return NextResponse.json({
        message: "Internal server error",
        success: false,
      });
    }

    return NextResponse.json({ message: "Post deleted", success: true });
  } catch (error: any) {
    console.log(error);

    return NextResponse.json({ message: error.message, success: false });
  }
};
