"use client";
import PostView from "@/components/PostView";
import { toast } from "@/components/ui/use-toast";
import { PostType, UserProfileType } from "@/lib/types";
import axios from "axios";
import { MessageCircle, UserMinus, UserPlus, VerifiedIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { TbCircleChevronLeft } from "react-icons/tb";

const UserProfile = ({
  params: { userId },
}: {
  params: { userId: string };
}) => {
  const { data: userData } = useSession();
  const router = useRouter();

  const [userInfo, setUserInfo] = useState<UserProfileType | null>(null);
  const [profileInfo, setProfileInfo] = useState<UserProfileType | null>(null);
  const [allPosts, setAllPosts] = useState<PostType[] | null>(null);
  const [followed, setFollowed] = useState(false);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);

  const getUser = useCallback(async () => {
    const { data } = await axios.post("/api/getuser", {
      userEmail: userData?.user?.email,
    });
    setUserInfo(data?.userInfo);
  }, [userData]);

  // ! profileInfo
  const getProfileInfo = useCallback(async () => {
    if (userInfo) {
      const { data } = await axios.post("/api/getprofileinfo", {
        userId,
        myId: userInfo?.id,
      });
      setProfileInfo(data?.userInfo);
      setFollowed(data?.followed ? true : false);
    }
  }, [userId, userInfo]);

  useEffect(() => {
    if (userId === userInfo?.id) {
      router.push("/profile");
    }
  }, [router, userInfo, userId]);

  const getUserPost = useCallback(async () => {
    const { data } = await axios.post(`/api/userposts`, {
      userId: profileInfo?.id,
    });
    setAllPosts(data?.userPosts);
  }, [profileInfo]);

  // get followers / following
  const getFollowing = useCallback(async () => {
    const { data } = await axios.post("/api/getfollowing", {
      userId: profileInfo?.id,
    });
    setFollowing(data?.following?.length > 0 ? data?.following?.length : 0);
  }, [profileInfo]);

  const getFollowers = useCallback(async () => {
    const { data } = await axios.post("/api/getfollowers", {
      userId: profileInfo?.id,
    });
    setFollowers(data?.followers?.length > 0 ? data?.followers?.length : 0);
  }, [profileInfo]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  useEffect(() => {
    getProfileInfo();
  }, [getProfileInfo]);

  useEffect(() => {
    getUserPost();
  }, [getUserPost]);

  useEffect(() => {
    getFollowing();
  }, [getFollowing]);

  useEffect(() => {
    getFollowers();
  }, [getFollowers]);

  //follow system
  const handleFollow = async () => {
    const { data } = await axios.post("/api/follow", {
      myId: userInfo?.id,
      userId: profileInfo?.id,
    });
    
    if (data?.success) {
      router.refresh()
      getFollowers();
      getFollowing();
    }

    toast({
      title: data?.message,
    });
    setFollowed(data?.followed ? true : false);
  };

  const handleUnfollow = async () => {
    const { data } = await axios.post("/api/unfollow", {
      myId: userInfo?.id,
      userId: profileInfo?.id,
    });

    if (data?.success) {
      router.refresh()
      getFollowers();
      getFollowing();
    }

    setFollowed(data?.unfollowed.count ? false : true);
  };

  const handleBack = () => {
    history.back();
  };

  const handleMessage = async () => {};

  return (
    <div className="w-full overflow-y-auto">
      <div className="pl-5">
        <TbCircleChevronLeft size={"28px"} onClick={handleBack} />
      </div>
      <div className="p-4 max-w-[600px] w-full mx-auto">
        <div className="p-2 rounded-lg bg-slate-200 flex flex-col gap-3 items-center justify-center">
          <Image
            alt="profile"
            height={100}
            width={100}
            src={
              profileInfo?.image
                ? profileInfo.image
                : "https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?t=st=1709793783~exp=1709797383~hmac=1eb331173ed3f1b60b281adfa47fc12c20d1839130ecf9b7e5fb9f961a1bc8a5&w=826"
            }
            className="rounded-full"
          />
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-xl font-bold flex items-center gap-1 justify-center">
              {profileInfo?.name}{" "}
              {profileInfo?.verified && (
                <VerifiedIcon className="-mt-[1px]" fill="#00FFFF90" />
              )}
            </h1>
            <h3 className="text-[#44444486]">
              @{profileInfo?.name.toLowerCase().replace(/\s/g, "")}
            </h3>
            <div className="flex items-center justify-center gap-2 my-2">
              <div>{followers} Followers</div>
              <span className="h-[20px] w-[1px] bg-slate-400"></span>
              <div>{following} Following</div>
            </div>
            {/* follow buttons */}
            <div className={`${profileInfo ? "block" : "hidden"}`}>
              {followed ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleUnfollow}
                    className="flex items-center gap-2 px-5 py-1.5 bg-indigo-400 text-white hover:bg-indigo-300 hover:shadow-lg transition-all rounded-full"
                  >
                    Unfollow <UserMinus />
                  </button>
                  <button
                    onClick={handleMessage}
                    className="flex items-center gap-2 px-5 py-1.5 bg-indigo-400 text-white hover:bg-indigo-300 hover:shadow-lg transition-all rounded-full"
                  >
                    Message <MessageCircle />
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleFollow}
                  className="flex items-center gap-2 px-5 py-1.5 bg-indigo-400 text-white hover:bg-indigo-300 hover:shadow-lg transition-all rounded-full"
                >
                  Follow <UserPlus />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[1200px] w-full mx-auto">
        {allPosts?.length! > 0 ? (
          allPosts
            ?.reverse()
            .map((item, i) => (
              <PostView
                key={item.id}
                postId={item.id}
                userEmail={userInfo?.email}
              />
            ))
        ) : (
          <div className="w-full px-2 text-lg">No post found</div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
