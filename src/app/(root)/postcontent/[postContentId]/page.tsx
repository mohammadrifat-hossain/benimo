"use client";
// import UserDetails from "./UserDetails";
import UserDetails from "@/components/UserDetails";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsThreeDots } from "react-icons/bs";
import {
  ArrowUpRightFromSquare,
  Edit,
  Heart,
  MessageCircle,
  Send,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import { Skeleton } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { CommentType, UserProfileType } from "@/lib/types";
import { useRouter } from "next/navigation";
import { Toast } from "@/components/ui/toast";
import { useSession } from "next-auth/react";
import { toast } from "@/components/ui/use-toast";
import CommentSection from "../../_components/CommentSection";
import DeleteConfirmation from "../../_components/DeleteConfirmation";
import { TbCircleChevronLeft } from "react-icons/tb";

interface PostContentProps {
  params: {
    postContentId: string;
  };
}
interface PostInfoTypes {
  id: string;
  content: string;
  imageUrl: string;
  createdAt: string;
  authorId: string;
}

const PostContent = ({ params: { postContentId } }: PostContentProps) => {
  const [postInfo, setPostInfo] = useState<PostInfoTypes | null>(null);
  const [postAuthor, setPostAuthor] = useState<UserProfileType | null>(null);
  const [postLikes, setPostLikes] = useState(0);
  const [postComments, setPostComments] = useState(0);
  const [allPostComments, setAllPostComments] = useState<CommentType[] | null>(
    null
  );
  const [isLiked, setIsLiked] = useState<boolean | null>(null);
  const [commentValue, setCommentValue] = useState("");

  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const commentInput = useRef<HTMLInputElement | null>(null);
  const { data: UserData } = useSession();

  const getPost = useCallback(async () => {
    const { data } = await axios.post("/api/getpostdetails", {
      postId: postContentId,
      userEmail: UserData?.user?.email,
    });
    setPostInfo(data.postInfo);
    setIsLiked(data?.isLiked?.length > 0 ? true : false);
  }, [postContentId, UserData]);

  const getAuthor = useCallback(async () => {
    const { data } = await axios.post("/api/getauthordetails", {
      authorId: postInfo?.authorId,
    });
    if (data.success) {
      setPostAuthor(data.authorInfo);
    }
  }, [postInfo]);

  const getPostLikes = useCallback(async () => {
    const { data } = await axios.post("/api/getpostlikes", {
      postId: postContentId,
    });
    setPostLikes(data?.postLikes?.length);
  }, [postContentId]);

  const getPostComments = useCallback(async () => {
    const { data } = await axios.post("/api/getpostcomments", {
      postId: postContentId,
    });
    if (data) {
      setPostComments(data?.postComments?.length);
      setAllPostComments(data?.postComments.reverse());
    }
  }, [postContentId]);

  useEffect(() => {
    getPost();
  }, [postContentId, getPost]);

  useEffect(() => {
    getAuthor();
  }, [getAuthor]);

  useEffect(() => {
    getPostLikes();
  }, [getPostLikes]);

  useEffect(() => {
    getPostComments();
  }, [getPostComments]);
  useEffect(() => {
    if (commentInput.current && postAuthor) {
      commentInput.current.focus();
      router.refresh();
    }
  }, [postAuthor, router]);

  //functions
  const handleAddLike = useCallback(async () => {
    if (!UserData?.user) {
      router.push("/login");
      toast({
        title: "Login first",
      });
    } else {
      const { data } = await axios.post("/api/addlike", {
        postInfo,
        currentUserEmail: UserData?.user?.email,
      });
      if (data?.success) {
        router.refresh();
        getPostLikes();
        getPost();
        if (data?.message === "liked") {
          audioRef.current?.play();
        }
      }
    }
  }, [postInfo, router, getPostLikes, UserData, getPost]);

  const handleAddComment = useCallback(async () => {
    if (commentValue) {
      const { data } = await axios.post("/api/addcomment", {
        content: commentValue,
        postId: postInfo?.id,
        authorEmail: UserData?.user?.email,
      });
      if (data?.success) {
        setCommentValue("");
        getPostComments();
      } else {
        toast({
          title: data?.message,
        });
      }
    } else {
      toast({
        title: "Write a comment first",
      });
    }
  }, [commentValue, postInfo, UserData, getPostComments]);
  //
  const handleBack = () => {
    history.back();
  };
  return (
    <div className="mt-5 max-w-[1200px] mx-auto h-full overflow-y-scroll">
      <div className="pl-5">
        <TbCircleChevronLeft size={"28px"} onClick={handleBack} />
      </div>
      <div className="flex items-center justify-between w-full p-4">
        <div>
          <UserDetails
            authorInfo={postAuthor}
            createdAt={postInfo?.createdAt}
          />
        </div>
        <div>
          <audio
            ref={audioRef}
            src="https://codeskulptor-demos.commondatastorage.googleapis.com/pang/pop.mp3"
          />
          {postAuthor?.email === UserData?.user?.email && (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <BsThreeDots size={"26px"} />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <div className="flex flex-col gap-2 justify-start items-start w-full">
                  <button
                    className="flex items-center justify-start gap-2 hover:bg-[#aaaaaa38] transition-all w-full"
                    onClick={() => router.push(`/editpost/${postContentId}`)}
                  >
                    <Edit />
                    Edit
                  </button>
                  {/* <button className="flex items-center justify-start gap-2 hover:bg-[#aaaaaa38] transition-all w-full">
                    <Trash2 />
                    Delete
                  </button> */}
                  <DeleteConfirmation postId={postContentId} />
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
      <div className="px-2">
        <p>{postInfo?.content}</p>
      </div>
      <div className="w-full">
        {postInfo?.imageUrl ? (
          <Image
            src={postInfo?.imageUrl}
            height={1000}
            width={1000}
            alt="postimage"
            className="w-full"
          />
        ) : (
          <Skeleton
            variant="rectangular"
            className="w-full min-h-[60vh] h-full rounded-md"
          />
        )}
      </div>
      <div className="w-full flex items-center justify-between p-3 pl-4 border-b border-b-[#bbbbbb80]">
        <div className="flex w-full items-center justify-evenly gap-10">
          <div className="flex items-center justify-center gap-1">
            <Heart
              size={"26px"}
              className="cursor-pointer"
              onClick={handleAddLike}
              fill={isLiked ? "#f0000090" : "#fff"}
            />{" "}
            {postLikes}
          </div>
          <div className="flex items-center justify-center gap-1">
            <MessageCircle size={"26px"} className="cursor-pointer" />{" "}
            {postComments}
          </div>
          <ArrowUpRightFromSquare size={"26px"} className="cursor-pointer" />
        </div>
      </div>
      <div className="w-full py-2">
        <div className="w-full flex items-center justify-between gap-5 px-3">
          <input
            type="text"
            className="w-full px-5 py-2 rounded-full focus:shadow-sm outline-none transition-all hover:shadow-sm bg-transparent border-[#bbbbbb91] border"
            placeholder="Add a comment"
            ref={commentInput}
            value={commentValue}
            onChange={(e) => setCommentValue(e.target.value)}
          />
          <button
            className="px-5 py-2 flex items-center justify-center gap-3 rounded-full bg-indigo-500 hover:bg-indigo-700 transition-all text-white"
            onClick={handleAddComment}
          >
            Add <Send />
          </button>
        </div>
      </div>
      <div className="w-full mt-4">
        <div className="flex flex-col items-center justify-center w-full gap-4">
          {allPostComments?.map((item, i) => (
            <CommentSection
              key={i}
              createdAt={item.createdAt}
              content={item.content}
              authorId={item.authorId}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostContent;
