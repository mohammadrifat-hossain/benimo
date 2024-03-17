import client from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { userId, friendId } = await req.json();

  try {
    const res = await client.friends.create({
      data: {
        userId,
        friendId,
      },
    });
    const ress = await client.friends.create({
      data: {
        userId:friendId,
        friendId: userId,
      },
    });
    if (!res) {
      return NextResponse.json({
        message: "Something went wrong",
        success: false,
      });
    }
    return NextResponse.json({ message: "Added to messenger", success: true });
  } catch (error: any) {
    console.log("add to friend", error);
    return NextResponse.json({ message: error.message, success: false });
  }
};
