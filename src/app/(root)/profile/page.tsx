"use client";
import PostView from "@/components/PostView";
import { PostType, UserProfileType } from "@/lib/types";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const ProfilePage = () => {
  const { data: userData } = useSession();
  const router = useRouter()

  const [userInfo, setUserInfo] = useState<UserProfileType | null>(null);
  const [allPosts, setAllPosts] = useState<PostType[] | null>(null);
  const [followers, setFollowers] = useState(0)
  const [following, setFollowing] = useState(0)

  useEffect(()=>{
    if(!userData?.user){
      router.push('/login')
    }
  },[router, userData])

  const getUser = useCallback(async () => {
    const { data } = await axios.post("/api/getuser", {
      userEmail: userData?.user?.email,
    });
    setUserInfo(data?.userInfo);
  }, [userData]);

  const getUserPost = useCallback(async () => {
    const { data } = await axios.post(`/api/userposts`, {
      userId: userInfo?.id,
    });
    setAllPosts(data?.userPosts);
  }, [userInfo]);

  const getFollowing = useCallback(async() =>{
    const {data} = await axios.post('/api/getfollowing',{
      userId: userInfo?.id
    })
    setFollowing(data?.following?.length > 0 ? data?.following?.length : 0)
    
  },[userInfo])

  const getFollowers = useCallback(async()=>{
    const {data} = await axios.post('/api/getfollowers',{
      userId: userInfo?.id
    })
    setFollowers(data?.followers?.length > 0 ? data?.followers?.length : 0)
    
  },[userInfo])

  useEffect(() => {
    getUser();
  }, [getUser]);

  useEffect(() => {
    getUserPost();
  }, [getUserPost]);

  useEffect(() => {
    getFollowing();
  }, [getFollowing]);

  useEffect(() => {
    getFollowers();
  }, [getFollowers]);



  return (
    <div className="w-full overflow-y-auto">
      <div className="p-4 max-w-[600px] w-full mx-auto">
        <div className="p-2 rounded-lg bg-slate-200 flex flex-col gap-3 items-center justify-center">
          <Image
            alt="profile"
            height={100}
            width={100}
            src={
              userInfo?.image
                ? userInfo.image
                : "https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?t=st=1709793783~exp=1709797383~hmac=1eb331173ed3f1b60b281adfa47fc12c20d1839130ecf9b7e5fb9f961a1bc8a5&w=826"
            }
            className="rounded-full"
          />
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-xl font-bold">{userInfo?.name}</h1>
            <h3 className="text-[#44444486]">
              @{userInfo?.name.toLowerCase().replace(/\s/g, "")}
            </h3>
            <div className="flex items-center justify-center gap-2 my-2">
              <div>{followers} Followers</div>
              <span className="h-[20px] w-[1px] bg-slate-400"></span>
              <div>{following} Following</div>
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

export default ProfilePage;
