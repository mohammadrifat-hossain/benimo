import client from "@/lib/prismadb"
import { NextResponse } from "next/server"

export const POST = async (req:Request) => {
  const {userId} = await req.json()

  try {
    if(!userId){
      return NextResponse.json({message:"no user found", success:false})
    }
    const friends = await client.friends.findMany({
      where:{
        userId
      }
    })

    return NextResponse.json({friends, success:true})
  } catch (error:any) {
    console.log(error);
    return NextResponse.json({message:error.message, success:false})
  }
  
}