import client from "@/lib/prismadb"
import { NextResponse } from "next/server"


export const POST = async (req:Request) => {
  const {id} = await req.json()

  try {
    const result = await client.otp.findUnique({
      where:{
        id
      }
    })

    return NextResponse.json({otp: result?.code, expireAt: result?.expireAt})
  } catch (error) {
    console.log(error);
    return NextResponse.json("Invalid token")
  }
}