import client from "@/lib/prismadb"
import { NextResponse } from "next/server"


export const POST = async (req:Request) => {
  const {authorId} = await req.json()
  try {
    if(!authorId){
      return NextResponse.json({message:"Author not found", success:false})
    }else{
      const authorInfo = await client.user.findUnique({
        where:{
          id: authorId
        }
      })
      if(!authorInfo){
        return NextResponse.json({message:"Author not found", success:false})
      }else{
        return NextResponse.json({authorInfo, success:true})
      }
    }
    
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({message: error.message, success:false})
  }
}