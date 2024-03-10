import client from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { userEmail } = await req.json();
  try {
    if (!userEmail) {
      return NextResponse.json({
        message: "No user Email found",
        success: false,
      });
    }
    const userInfo = await client.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    if(!userInfo){
      return NextResponse.json({
        message: "No user found",
        success: false,
      });
    }
    return NextResponse.json({
      userInfo,
      success: true,
    });
  } catch (error) {}
};
