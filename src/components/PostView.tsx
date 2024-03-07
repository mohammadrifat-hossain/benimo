"use client";
import UserDetails from "./UserDetails";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { BsThreeDots } from "react-icons/bs";
import {
  ArrowUpRightFromSquare,
  Edit,
  Heart,
  MessageCircle,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import { Skeleton } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { CommentType, UserProfileType } from "@/lib/types";
import { useRouter } from "next/navigation";
import { toast } from "./ui/use-toast";
import { useSession } from "next-auth/react";

interface PostViewProps {
  postId: string;
  userEmail?: string | null;
  isProfile?: boolean;
}
interface PostInfoTypes {
  id: string;
  content: string;
  imageUrl: string;
  createdAt: string;
  authorId: string;
}

const PostView = ({ postId, userEmail, isProfile }: PostViewProps) => {
  const [postInfo, setPostInfo] = useState<PostInfoTypes | null>(null);
  const [postAuthor, setPostAuthor] = useState<UserProfileType | null>(null);
  const [postLikes, setPostLikes] = useState(0);
  const [postComments, setPostComments] = useState(0);
  const [postAllComments, setAllPostComments] = useState<CommentType | null>(
    null
  );
  const [isLiked, setIsLiked] = useState<boolean | null>(null);

  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const getPost = useCallback(async () => {
    const { data } = await axios.post("/api/getpostdetails", {
      postId,
      userEmail,
    });
    setPostInfo(data.postInfo);
    setIsLiked(data?.isLiked?.length > 0 ? true : false);
  }, [postId, userEmail]);

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
      postId,
    });
    setPostLikes(data?.postLikes?.length);
  }, [postId]);

  const getPostComments = useCallback(async () => {
    const { data } = await axios.post("/api/getpostcomments", {
      postId,
    });
    setPostComments(data?.postComments?.length);
    setAllPostComments(data?.postComments);
  }, [postId]);

  useEffect(() => {
    getPost();
  }, [postId, getPost]);

  useEffect(() => {
    getAuthor();
  }, [getAuthor]);

  useEffect(() => {
    getPostLikes();
  }, [getPostLikes]);

  useEffect(() => {
    getPostComments();
  }, [getPostComments]);

  //functions
  const handleAddLike = useCallback(async () => {
    const { data } = await axios.post("/api/addlike", {
      postInfo,
      currentUserEmail: userEmail,
    });
    if (data?.success) {
      router.refresh();
      getPostLikes();
      getPost();
      if (data?.message === "liked") {
        audioRef.current?.play();
      }
    }
  }, [postInfo, router, getPostLikes, userEmail, getPost]);

  return (
    <div className="mt-5 border-y border-y-[#bbbbbb67]">
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
          {isProfile && (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <BsThreeDots size={"26px"} />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <div className="flex flex-col gap-2 justify-start items-start w-full">
                  <button className="flex items-center justify-start gap-2 hover:bg-[#aaaaaa38] transition-all w-full">
                    <Edit />
                    Edit
                  </button>
                  <button className="flex items-center justify-start gap-2 hover:bg-[#aaaaaa38] transition-all w-full">
                    <Trash2 />
                    Delete
                  </button>
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
      <div className="w-full flex items-center justify-between p-3 pl-4">
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
    </div>
  );
};

export default PostView;
