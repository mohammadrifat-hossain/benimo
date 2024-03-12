import client from "@/lib/prismadb"
import { NextResponse } from "next/server"

export const POST = async (req:Request) => {
  const {userId} = await req.json()

  try {
    if(!userId){
      return NextResponse.json({message:"No user found", success:false})
    }

    const following = await client.following.findMany({
      where:{
        followerUserId: userId
      }
    })
    
    return NextResponse.json({following, success:true})
    
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({message:error.message, success:false})
  }
  
}