import client from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const POST = async (req:Request) => {
  const {userId} = await req.json()

  try {
    if(!userId){
      return NextResponse.json({message:"no user found", success:false})
    }
    const myNotifications = await client.notification.findMany({
      where:{
        userId
      }
    })

    return NextResponse.json({myNotifications, success:true})
    
  } catch (error: any) {
    console.log("get profile user", error);
    return NextResponse.json({message:error.message, success:false})
  }
  
}