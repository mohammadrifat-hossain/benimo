import client from "@/lib/prismadb"
import { NextResponse } from "next/server"

export const POST = async (req:Request) => {
  const {userId} = await req.json()
  if(!userId){
    return NextResponse.json({message:"No id found", success:false})
  }

  try {
    const user = await client.user.findUnique({
      where:{
        id: userId
      }
    })
    
    if(!user){
      return NextResponse.json({message:"No user found", success:false})
    }

    return NextResponse.json({user, success:true})
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({message: error.message, success:false})
  }
}