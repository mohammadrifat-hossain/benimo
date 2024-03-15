import { StoryModel } from "@/lib/models/storyModel";
import { connnectdb } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export const POST = async (req:Request) => {
  const {userId, imageUrl, userName, userImage} = await req.json()
  try {
    if(!userId){
      return NextResponse.json({message: "No user found", success: false})
    }
    await connnectdb()

    await StoryModel.create({
      userId,
      imageUrl,
      userName,
      userImage
    })
    
    return NextResponse.json({message:"Story uploaded", success: true})

  } catch (error: any) {
    console.log(error);
    return NextResponse.json({message: error.message, success: false})
  }
  
}