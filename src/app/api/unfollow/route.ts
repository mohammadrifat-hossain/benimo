import client from "@/lib/prismadb"
import { NextResponse } from "next/server"

export const POST = async (req:Request) => {
  const {myId, userId} = await req.json()

  try {
    const unfollowed = await client.follower.deleteMany({
      where:{
        followerUserId: myId,
        userId
      }
    })
    const unfollowing = await client.following.deleteMany({
      where:{
        userId,
        followerUserId: myId
      }
    })

    if(!unfollowed){
      return NextResponse.json({message:"Something went wrong", success:false})
    }
    
    return NextResponse.json({unfollowed,message:"Unfollowing user", success:true})
  } catch (error: any) {
    console.log("follow",error);
    return NextResponse.json({message:error.message, success:false})
  }
}