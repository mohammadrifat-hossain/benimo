import client from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { searchValue } = await req.json();

  try {
    const result = await client.user.findMany({
      where: {
        name: {
          contains: searchValue,
          mode: "insensitive",
        },
      },
    });

    return NextResponse.json({ result, success: true });
  } catch (error) {
    console.log("search user", error);
    return NextResponse.json({ success: false });
  }
};
