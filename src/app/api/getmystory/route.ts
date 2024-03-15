import { StoryModel } from "@/lib/models/storyModel";
import client from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { userEmail } = await req.json();

  try {
    const myInfo = await client.user.findFirst({
      where: {
        email: userEmail,
      },
    });

    const myStory = await StoryModel.find({
      userId: myInfo?.id,
    });

    if (!myStory) {
      return NextResponse.json({ message: "No story found", success: false });
    }
    return NextResponse.json({ myStory, success: true });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message, success: false });
  }
};
