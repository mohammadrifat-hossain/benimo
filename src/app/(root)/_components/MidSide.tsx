"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import StoryComponent from "./StoryComponent";
import PostView from "@/components/PostView";
import Image from "next/image";

const MidSide = () => {
  const { data } = useSession();
  const router = useRouter();

  const [inputValue, setInputValue] = useState("");

  //functions

  const handlePush = () => {
    router.push(`/createpost/?inputValue=${inputValue}`);
  };

  return (
    <div className="w-full max-h-screen h-full overflow-y-scroll">
      <div>
        <div className="flex items-center justify-between m-3 gap-3 border-b pb-5 border-b-[#6666664b]">
          <Image
            src={
              data?.user?.image
                ? data.user.image
                : "https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?t=st=1709793783~exp=1709797383~hmac=1eb331173ed3f1b60b281adfa47fc12c20d1839130ecf9b7e5fb9f961a1bc8a5&w=826"
            }
            alt="profile"
            height={40}
            width={40}
            className="rounded-full"
          />
          <input
            type="text"
            className="w-full px-5 py-2 rounded-full focus:shadow-sm outline-none transition-all hover:shadow-sm bg-transparent border-[#bbbbbb91] border"
            placeholder="What's on your mind?"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <FaPlusCircle
            className="text-4xl cursor-pointer"
            onClick={handlePush}
          />
        </div>
        <div className="max-w-full">
          <StoryComponent />
        </div>
        <div className="w-full overflow-y-scroll relative">
          <PostView
            postId="65e965c2c3621913b337114d"
            userEmail={data?.user?.email}
          />
          <PostView
            postId="65e9b2ff00f7246c512d5865"
            userEmail={data?.user?.email}
          />
          <PostView
            postId="65e965c2c3621913b337114d"
            userEmail={data?.user?.email}
          />
        </div>
      </div>
    </div>
  );
};

export default MidSide;
