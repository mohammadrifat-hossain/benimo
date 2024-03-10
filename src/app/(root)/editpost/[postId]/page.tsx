"use client";
import { Loader } from "@/components/Loader";
import { toast } from "@/components/ui/use-toast";
import { PostType, UserProfileType } from "@/lib/types";
import axios from "axios";
import { Pencil } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { Suspense, useCallback, useEffect, useState } from "react";
import { FiUpload } from "react-icons/fi";

const EditPostPage = ({
  params: { postId },
}: {
  params: { postId: string };
}) => {
  const { data: userData } = useSession();
  const router = useRouter();

  const [postInfo, setPostInfo] = useState<PostType | null>(null);
  const [userInfo, setUserInfo] = useState<UserProfileType | null>(null);
  const [postText, setPostText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getPost = useCallback(async () => {
    const { data } = await axios.post("/api/getpostdetails", {
      postId,
      userEmail: userData?.user?.email,
    });
    setPostInfo(data?.postInfo);
    setUserInfo(data?.userInfo);
  }, [postId, userData]);

  useEffect(() => {
    getPost();
  }, [getPost]);

  useEffect(() => {
    if (userInfo && postInfo) {
      if (userInfo?.id !== postInfo?.authorId) {
        router.push("/");
        toast({
          title: "Your haven't permission to edit this post ",
        });
      }
    }
  }, [userInfo, router, postInfo]);

  useEffect(() => {
    if (postInfo) {
      setPostText(postInfo?.content);
    }
  }, [postInfo]);

  //functions
  const handleUpload = async () => {
    setIsLoading(true);
    const { data } = await axios.put("/api/updatepostcontent", {
      postId,
      postText,
    });
    if (data) setIsLoading(false);
    if (data?.success) {
      toast({
        title: data?.message,
      });
      router.push(`/postcontent/${postId}`);
    }
  };

  return (
    <Suspense fallback={<Loader />}>
      <div className="w-full p-2">
        <div>
          <h2 className="text-xl font-bold">Update this post</h2>
          <p className="text-[#aaa]">
            Posts made by you will be visible to the public. Everyone is able to
            leave comments and likes on your post.
          </p>
        </div>
        <div className="mt-5 max-w-[500px] w-full p-3 mx-auto">
          <div className="flex items-center justify-center gap-2 flex-col">
            <div className="w-full h-full relative">
              <input
                type="text"
                className="w-full h-full px-5 py-2 boxshadow bg-transparent rounded-lg outline-none pl-10"
                placeholder="Caption"
                value={postText!}
                onChange={(e) => setPostText(e.target.value)}
              />
              <Pencil
                className="absolute top-[20%] left-3 text-[#bbb]"
                size={"20px"}
              />
            </div>
          </div>

          <div className="flex items-center justify-center mt-5 flex-col w-full ">
            <Image
              src={postInfo?.imageUrl!}
              alt="postimage"
              height={1000}
              width={1000}
              className="w-full"
            />
          </div>

          <div className="flex items-center justify-center mt-5">
            <button
              className="px-5 py-2 border-t border-t-white border-l border-l-white  transition-all rounded-md max-w-[300px] text-lg w-full flex items-center justify-center gap-2 font-bold boxshadow hover:bg-[#e2e2e28f]"
              onClick={handleUpload}
              disabled={isLoading}
            >
              {isLoading ? (
                "UPLOADING..."
              ) : (
                <>
                  UPLOAD <FiUpload />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default EditPostPage;
