import { StoryModel } from "@/lib/models/storyModel"
import { NextResponse } from "next/server";

export const POST = async (req:Request) => {
  const {storyId} = await req.json()
  try {
    const deleteStory  =  await StoryModel.deleteOne({_id: storyId})
    
    return NextResponse.json({message: "deleted", success:true})
    
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({message:error.message, success: false})
  }
  
}