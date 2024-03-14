"use client";
import { UserProfileType } from "@/lib/types";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const MyConnections = ({ userId }: { userId: string }) => {
  const [userInfo, setUserInfo] = useState<UserProfileType | null>(null);

  //functions
  const getUserInfo = useCallback(async () => {
    const { data } = await axios.post("/api/getauthordetails", {
      authorId: userId,
    });
    setUserInfo(data?.authorInfo);
  }, [userId]);

  //use effects
  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);
  return (
    <div className="max-w-[170px] w-full bg-[#eee] h-[220px] border rounded-md overflow-hidden relative shadow group">
      <Image src={userInfo?.image!} height={200} width={170} alt="user" />
      <h1 className="absolute top-0 left-0 text-wrap text-white opacity-0 transition-all bg-black/50 w-full group-hover:opacity-100">
        {userInfo?.name}
      </h1>
      <div className="flex flex-col absolute w-full bottom-0 left-0">
        <Link
          href={`/userprofile/${userInfo?.id}`}
          className="w-full flex items-center justify-center bg-white text-indigo-500 transition-all hover:bg-slate-200 rounded py-1"
        >
          Profile
        </Link>
      </div>
    </div>
  );
};

export default MyConnections;
