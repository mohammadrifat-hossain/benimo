import client from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const POST = async (req:Request) => {
  const {postId, content, authorEmail} = await req.json()
  
  try {
    const userInfo = await client.user.findUnique({
      where: {
        email: authorEmail
      }
    })

    if(!userInfo){
      return NextResponse.json({message:"Unauthorized", success: false})
    }
    const addComment = await client.comment.create({
      data:{
        content,
        post: {
          connect: {
            id: postId
          }
        },
        author: {
          connect: {
            id: userInfo.id
          }
        }
      }
    })

    if(!addComment){
      return NextResponse.json({message:"Internal server error", success: false})
    }

    return NextResponse.json({message:"Comment added", success: true})
  } catch (error: any) {
    console.log("add comment", error);
    return NextResponse.json({message:error.message, success: false})
  }
  
}