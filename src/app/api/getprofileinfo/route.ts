import client from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const POST = async (req:Request) => {
  const {userId, myId} = await req.json()

  try {
    const userInfo = await client.user.findUnique({
      where:{
        id: userId
      }
    })
    const followed = await client.following.findFirst({
      where:{
        followerUserId: myId,
        userId: userInfo?.id
      }
    })
    
    if(!userInfo){
      return NextResponse.json({message:"user not found", success:false})
    }

    return NextResponse.json({userInfo,followed, success:true})
    
  } catch (error: any) {
    console.log("get profile user", error);
    return NextResponse.json({message:error.message, success:false})
  }
  
}