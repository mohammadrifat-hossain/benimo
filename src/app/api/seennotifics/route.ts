import client from "@/lib/prismadb"
import { NextResponse } from "next/server"

export const POST = async (req:Request) => {
  const {notificsId} = await req.json()
  try {
    await client.notification.update({
      where:{
        id: notificsId
      },
      data: {
        seen:true
      }
    })

    return NextResponse.json({success:true})
  } catch (error: any) {
    console.log("notifics seen",error);
    return NextResponse.json({message:error.message,success:false})
  }
}