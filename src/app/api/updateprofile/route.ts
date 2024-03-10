import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import client from "@/lib/prismadb";

export const PUT = async (req: Request) => {
  const { userName, imageUrl, oldPassword, newPassword, userId } =
    await req.json();

  try {
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized", success: false });
    }
    const userInfo = await client.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!userInfo) {
      return NextResponse.json({
        message: "UserInfo not found",
        success: false,
      });
    }

    let comparePassword;

    if (oldPassword && userInfo?.password && newPassword) {
      comparePassword = await bcrypt.compare(oldPassword, userInfo?.password);

      const hashPass = await bcrypt.hash(newPassword, 10);

      if (comparePassword) {
        const updateUser = await client.user.update({
          where: {
            id: userId,
          },
          data: {
            password: hashPass,
            name: userName,
            image: imageUrl,
          },
        });
        return NextResponse.json({
          message: "Password changed",
          updateUser,
          success: true,
        });
      } else {
        return NextResponse.json({
          message: "Password Incorrect",
          success: false,
        });
      }
    } else {
      const updateUser = await client.user.update({
        where: {
          id: userId,
        },
        data: {
          name: userName,
          image: imageUrl,
        },
      });
      return NextResponse.json({
        message: "Profile changed",
        updateUser,
        success: true,
      });
    }
  } catch (error: any) {
    console.log("prifileedit", error);
    return NextResponse.json({ message: error.message, success: false });
  }
};
