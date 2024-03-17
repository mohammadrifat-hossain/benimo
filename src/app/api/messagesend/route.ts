import client from "@/lib/prismadb"
import { NextResponse } from "next/server"

export const POST = async (req:Request) => {
  const {senderId, senderName, receiverId, text} = await req.json()

  try {
    const messageSuccess = await client.message.create({
      data:{
        senderId,
        senderName,
        receiverId,
        text
      }
    })
    if(!messageSuccess){
      return NextResponse.json({success:false})
    }
    return NextResponse.json({success:true})
  } catch (error) {
    console.log('message send',error);
    return NextResponse.json({success:false})
  }
}