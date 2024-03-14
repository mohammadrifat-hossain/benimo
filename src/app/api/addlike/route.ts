import client from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { postInfo, currentUserEmail } = await req.json();

  try {
    if (!postInfo) {
      return NextResponse.json({ message: "No post found", success: false });
    } else {
      const userInfo = await client.user.findUnique({
        where: {
          email: currentUserEmail,
        },
      });

      if (!userInfo) {
        return NextResponse.json({ message: "user not found", success: false });
      } else {
        const alreadyLiked = await client.like.findMany({
          where:{
            postId: postInfo?.id,
            authorId: userInfo?.id
          }
        });
        
        if(alreadyLiked[0]){          
          const deleteLike = await client.like.delete({
            where: {
              id: alreadyLiked[0].id
            },
          });
          return NextResponse.json({message:"like removed", success:true})
        }else{
          const liked = await client.like.create({
            data: {
              post: {
                connect: {
                  id: postInfo.id,
                },
              },
              author: {
                connect: {
                  id: userInfo.id
                },
              },
            },
          });
          if (liked) {
            await client.notification.create({
              data: {
                userId: postInfo?.authorId,
                notification: 'Someone liked your post',
                redirectUrl: `/postcontent/${postInfo?.id}`
              }
            })
            return NextResponse.json({
              message: "liked",
              success: true,
            });
          } else {
            return NextResponse.json({
              message: "failed to like",
              success: false,
            });
          }
        }
      }
    }
  } catch (error: any) {
    console.log("addlike",error);
    return NextResponse.json({ message: error.message, success: false });
  }
};
