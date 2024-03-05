import client from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { postText, imageUrl, userEmail } = await req.json();

  try {
    const userInfo = await client.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    if (!userInfo) {
      return NextResponse.json({ message: "User not found", success: false });
    } else {
      const createPost = await client.post.create({
        data: {
          content: postText,
          imageUrl,
          author: {
            connect: {
              id: userInfo.id,
            },
          },
        },
      });

      if(createPost){
        return NextResponse.json({message:"Post uploaded", success: true, post: createPost})
      }else{
        return NextResponse.json({message:"Internal server error", success:false})
      }

      // Now, createPost contains the newly created post with the connected author.
    }
  } catch (error: any) {
    // Handle error
    return NextResponse.json({message:error.message, success: false})
  }
};
