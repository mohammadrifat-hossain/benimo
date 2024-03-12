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
    
    return NextResponse.json({followers, success:true})
    
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({message:error.message, success:false})
  }
  
}