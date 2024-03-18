import { StoryModel } from "@/lib/models/storyModel"
import { connnectdb } from "@/lib/mongodb"
import client from "@/lib/prismadb"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export const POST = async (req) => {
  const {userEmail} = await req.json()

  try {
    if(!userEmail){
      return NextResponse.json({message:"Unauthorized", success:false})
    }
    const userInfo = await client.user.findUnique({
      where:{
        email: userEmail
      }
    })
    
    if(!userInfo){
      return NextResponse.json({message:"User not found", success:false})
    }

    //*
    const followers = await client.follower.findMany({
      where:{
        userId: userInfo?.id
      }
    })
    const following = await client.following.findMany({
      where:{
        followerUserId: userInfo?.id
      }
    })

    const followingUserIds = following.map(follow => follow.userId);
    

    // Find connected users - those present in both followers and following
    const connectedUsers = followers.filter(follower =>
      followingUserIds.includes(follower.followerUserId)
    ).map(user => user.followerUserId);

    await connnectdb()
    const stories = await StoryModel.find({
      userId: { $in: connectedUsers },
    });
    
    if(!stories){
      return NextResponse.json({message:"No story found", success:false})
    }
    return NextResponse.json({stories, success:true})
    
  } catch (error) {
    
  }
  
}