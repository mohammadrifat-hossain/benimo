"use client";
import React, { useCallback, useEffect, useState, memo, useMemo } from "react";
import ChatList from "./_components/ChatList";
import Chat from "./_components/Chat";
import axios from "axios";
import { FriendsType, SocketMessageType, SocketUserType, UserProfileType } from "@/lib/types";
import { useSession } from "next-auth/react";
import io from 'socket.io-client';

const MessagePage = () => {
  const [currentChat, setCurrentChat] = useState("");
  const [allFriends, setAllFriends] = useState<FriendsType[] | null>([]);
  const [userInfo, setUserInfo] = useState<UserProfileType | null>(null);
  const [allUsers, setAllUsers] = useState<SocketUserType[] | null>(null)
  const [newMessage, setNewMessage] = useState<SocketMessageType | null>(null)
  const {data: userData} = useSession();

  useEffect(() => {
    const socket = io('https://networknestbackend.onrender.com');

    // Event listeners
    socket.on('connect', () => {
      console.log('Connected to socket server');
    });

    socket.emit('add_user', userInfo?.id, userInfo);
    socket.on('activeUsers', (allUsers) => {
      // Handle active users update
      setAllUsers(allUsers);
    });

    socket.on('user_message', (msg) => {
      // Handle incoming messages
      setNewMessage(msg)
    });
    

    // Clean up on component unmount
    return () => {
      socket.disconnect();
    };
  }, [userInfo]);




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
        <ChatList allFriends={sortedFriends} setCurrentChat={setCurrentChat} currentChat={currentChat} allUsers={allUsers!}/>
      </div>
      <div className="w-full flex h-[91vh] md:h-[93.5vh]">
        <Chat currentChat={currentChat} userInfo={userInfo} newMessage={newMessage!} />
      </div>
    </div>
  );
};

export default memo(MessagePage);
