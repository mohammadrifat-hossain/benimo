import client from "@/lib/prismadb"
import { NextResponse } from "next/server"

export const POST = async (req:Request) => {
  const {userId} = await req.json()

  try {
    if(!userId){
      return NextResponse.json({message:"No user found", success:false})
    }
    const followers = await client.follower.findMany({
      where:{
        userId: userId
      }
    })
    const following = await client.following.findMany({
      where:{
        followerUserId: userId
      }
    })

    const followerUserIds = followers.map(follower => follower.followerUserId);
    const followingUserIds = following.map(follow => follow.userId);
    

    // Find connected users - those present in both followers and following
    const connectedUsers = followers.filter(follower =>
      followingUserIds.includes(follower.followerUserId)
    ).map(user => user.followerUserId);

    // Find unique followers - those who are followers but not followed back by userId
    const uniqueFollowers = followers.filter(follower =>
      !followingUserIds.includes(follower.followerUserId)
    ).map(follower => follower.followerUserId);

    return NextResponse.json({followers: uniqueFollowers, connected:connectedUsers})

  } catch (error: any) {
    console.log(error);
    return NextResponse.json({message:error.message, success:false})
  }
} 