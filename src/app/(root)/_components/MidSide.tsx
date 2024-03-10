"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import StoryComponent from "./StoryComponent";
import PostView from "@/components/PostView";
import Image from "next/image";
import { PostType } from "@/lib/types";
import axios from "axios";

const MidSide = () => {
  const { data } = useSession();
  const router = useRouter();

  const [inputValue, setInputValue] = useState("");
  const [allPosts, setAllPosts] = useState<PostType[] | null>(null);

  useEffect(() => {
    if (!data?.user) {
      router.push("/login");
    }
  }, [router, data]);

  const getAllPosts = useCallback(async () => {
    const { data } = await axios.get("/api/getallposts");
    setAllPosts(data.allPosts);
  }, []);

  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

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
          {allPosts && allPosts?.length > 0 ? (
            allPosts?.map((item, i) => (
              <PostView
                key={item.id}
                postId={item.id}
                userEmail={data?.user?.email}
              />
            ))
          ) : (
            <div className="w-full mt-6 flex items-center justify-center">
              <h1 className="text-lg">No post available</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MidSide;
