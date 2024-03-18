import client from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const { senderId, senderName, receiverId, message } = await req.json();

  try {
    // Create message
    const messageSuccess = await client.message.create({
      data: {
        senderId,
        senderName,
        receiverId,
        message,
      },
    });

    // Find the highest index number for sender
    const senderFriends = await client.friends.findMany({
      where: {
        userId: senderId,
      },
    });
    const highestSenderIndex = Math.max(...senderFriends.map(friend => friend.index));

    // Update sender's friend index
    await client.friends.updateMany({
      where: {
        userId: senderId,
        friendId: receiverId,
      },
      data: {
        index: highestSenderIndex + 1,
      },
    });

    // Find the highest index number for receiver
    const receiverFriends = await client.friends.findMany({
      where: {
        userId: receiverId,
      },
    });
    const highestReceiverIndex = Math.max(...receiverFriends.map(friend => friend.index));

    // Update receiver's friend index
    await client.friends.updateMany({
      where: {
        userId: receiverId,
        friendId: senderId,
      },
      data: {
        index: highestReceiverIndex + 1,
      },
    });

    if (!messageSuccess) {
      return NextResponse.json({ success: false });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.log('message send', error);
    return NextResponse.json({ success: false });
  }
};
