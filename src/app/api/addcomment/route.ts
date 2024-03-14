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
    
    const postInfo = await client.post.findUnique({
      where: {
        id: addComment.postId
      }
    })
    

    if(!addComment){
      return NextResponse.json({message:"Internal server error", success: false})
    }
    await client.notification.create({
      data: {
        userId: postInfo?.authorId!,
        notification: 'Someone added comment on your post',
        redirectUrl: `/postcontent/${addComment?.authorId}`
      }
    })

    return NextResponse.json({message:"Comment added", success: true})
  } catch (error: any) {
    console.log("add comment", error);
    return NextResponse.json({message:error.message, success: false})
  }
  
}