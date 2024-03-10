import client from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { postId, userEmail } = await req.json();

    if (!userEmail) {
      return NextResponse.json({ message: "Unauthorized", success: false });
    }

    const userInfo = await client.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    if (!userInfo) {
      return NextResponse.json({ message: "Unauthorized", success: false });
    }

    if (!postId) {
      return NextResponse.json({ message: "Invalid post", success: false });
    }

    const postInfo = await client.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!postInfo) {
      return NextResponse.json({ message: "Invalid post", success: false });
    }

    const isLiked = await client.like.findMany({
      where: {
        postId: postInfo.id,
        authorId: userInfo.id,
      },
    });

    return NextResponse.json({ postInfo, isLiked, userInfo, success: true });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: error.message, success: false });
  }
};
