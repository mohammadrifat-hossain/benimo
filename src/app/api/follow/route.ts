import client from "@/lib/prismadb"
import { NextResponse } from "next/server"

export const POST = async (req:Request) => {
  const {myId, userId} = await req.json()

  try {
    const followed = await client.follower.create({
      data:{
        followerUserId: myId,
        followingUser: {
          connect: {
            id: userId
          }
        }
      }
    })
    const following = await client.following.create({
      data:{
        userId: userId,
        followerUser: {
          connect: {
            id: myId
          }
        }
      }
    })

    await client.notification.create({
      data: {
        userId,
        notification: 'You have a new Follower',
        redirectUrl: `/userprofile/${myId}`
      }
    })

    if(!followed){
      return NextResponse.json({message:"Something went wrong", success:false})
    }
    
    return NextResponse.json({followed,message:"Following user", success:true})
  } catch (error: any) {
    console.log("follow",error);
    return NextResponse.json({message:error.message, success:false})
  }
}