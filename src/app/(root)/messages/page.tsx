"use client";
import React, { useCallback, useEffect, useState, memo, useMemo } from "react";
import ChatList from "./_components/ChatList";
import Chat from "./_components/Chat";
import axios from "axios";
import { FriendsType, UserProfileType } from "@/lib/types";
import { useSession } from "next-auth/react";

const MessagePage = () => {
  const [currentChat, setCurrentChat] = useState("");
  const [allFriends, setAllFriends] = useState<FriendsType[] | null>([]);
  const [userInfo, setUserInfo] = useState<UserProfileType | null>(null);

  const {data: userData} = useSession();

  const getUserInfo = useCallback(async () => {
    const {data} = await axios.post('/api/getuser', {
      userEmail: userData?.user?.email,
    });
    setUserInfo(data?.userInfo);
  }, [userData]);

  const getMyFriends = useCallback(async () => {
    const {data} = await axios.post('/api/getfriends', {
      userId: userInfo?.id,
    });
    setAllFriends(data?.friends);
  }, [userInfo]);

  // Use useMemo to sort friends
  const sortedFriends = useMemo(() => {
    if (!Array.isArray(allFriends)) return [];
    // Assuming `index` is a property you want to sort by
    return [...allFriends].sort((a, b) => b.index - a.index);
  }, [allFriends]);

  // Effects
  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  useEffect(() => {
    getMyFriends();
  }, [getMyFriends]);

  return (
    <div className="w-full flex h-[91vh] md:h-[93.5vh]">
      <div className="w-[25%] p-3">
        <ChatList allFriends={sortedFriends} setCurrentChat={setCurrentChat} currentChat={currentChat} />
      </div>
      <div className="w-full flex h-[91vh] md:h-[93.5vh]">
        <Chat currentChat={currentChat} userInfo={userInfo} />
      </div>
    </div>
  );
};

export default memo(MessagePage);
