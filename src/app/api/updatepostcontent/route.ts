import client from "@/lib/prismadb"
import { NextResponse } from "next/server"

export const PUT = async (req:Request) => {
  const {postId, postText} = await req.json()

  try {
    if(!postId){
      return NextResponse.json({message:"invalid post id", success:false})
    }
    const updatedPost = await client.post.update({
      where: {
        id: postId,
      },
      data: {
        content: postText,
      },
    });
    if(!updatedPost){
      return NextResponse.json({message:"Internal server error", success:false})
    }

    return NextResponse.json({message:"Post updated", success:true})
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({message:error.message, success:false})
  }
  
}