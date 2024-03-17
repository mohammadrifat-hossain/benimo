import client from "@/lib/prismadb"
import { NextResponse } from "next/server"

export const POST = async (req:Request) => {
  const {senderId, receiverId} = await req.json()

  try {
    const messages = await client.message.findMany({
      where:{
        OR: [
          { senderId, receiverId },
          { senderId: receiverId, receiverId: senderId }
        ]
      }
    })

    return NextResponse.json({messages, success: true})
  } catch (error: any) {
    console.log("get messages", error);
    return NextResponse.json({message: error.message})
  }
}