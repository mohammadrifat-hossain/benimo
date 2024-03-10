import client from "@/lib/prismadb";
import { NextResponse } from "next/server";

// Function to shuffle an array
function shuffleArray(array:any) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}

export const GET = async () => {
  try {
    let allPosts = await client.post.findMany();
    allPosts = shuffleArray(allPosts); // Shuffle the allPosts array
    return NextResponse.json({ allPosts })
  } catch (error:any) {
    console.log("get all posts", error);
    return NextResponse.json({ message: error.message })
  }
}
