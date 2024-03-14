"use client";
import { toast } from "@/components/ui/use-toast";
import { UserProfileType } from "@/lib/types";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

interface MyFollowersProps{
  userId: string;
  getFollowers: () => void;
}

const MyFollowers = ({ userId, getFollowers }: MyFollowersProps) => {
  const [userInfo, setUserInfo] = useState<UserProfileType | null>(null);
  const [myInfo, setMyInfo] = useState<UserProfileType | null>(null)

  const {data: userData} = useSession()
  const router = useRouter()

  //functions
  const getUserInfo = useCallback(async () => {
    const { data } = await axios.post("/api/getauthordetails", {
      authorId: userId,
    });
    setUserInfo(data?.authorInfo);
  }, [userId]);

  const getMyInfo = useCallback(async () => {
    const { data } = await axios.post("/api/getuser", {
      userEmail: userData?.user?.email,
    });
    setMyInfo(data?.userInfo);
  }, [userData]);

  const handleFollow = async () =>{
    const {data} = await axios.post('/api/follow',{
      myId: myInfo?.id,
      userId: userInfo?.id
    })
    if(data.success){
      getFollowers()
      toast({
        title: "Following back"
      })
    }
  }

  //use effects
  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  useEffect(() => {
    getMyInfo();
  }, [getMyInfo]);
  

  return (
    <div className="max-w-[170px] w-full bg-[#eee] h-[220px] border rounded-md overflow-hidden relative shadow-md group">
      <Image src={userInfo?.image!} height={200} width={170} alt="user" />
      <h1 className="absolute top-0 left-0 text-wrap text-white opacity-0 transition-all bg-black/50 w-full group-hover:opacity-100">
        {userInfo?.name}
      </h1>
      <div className="flex flex-col absolute w-full bottom-0 left-0">
        <button className="w-full bg-indigo-500 text-white transition-all hover:bg-indigo-600 py-1" onClick={handleFollow}>
          Follow back
        </button>
        <Link
          href={`/userprofile/${userInfo?.id}`}
          className="w-full bg-white text-indigo-500 transition-all hover:bg-slate-200 rounded py-1 flex items-center justify-center"
        >
          Profile
        </Link>
      </div>
    </div>
  );
};

export default MyFollowers;
