import { FriendsType, UserProfileType } from "@/lib/types";
import { Avatar, Skeleton } from "@mui/material";
import axios from "axios";
import React, { Dispatch, useCallback, useEffect, useState,memo } from "react";

const ChatUsers = ({
  item,
  setCurrentChat,
  currentChat,
}: {
  item: FriendsType;
  setCurrentChat: Dispatch<React.SetStateAction<string>>;
  currentChat?: string;
}) => {
  const [user, setUser] = useState<UserProfileType | null>(null);

  const getAuthor = useCallback(async () => {
    const { data } = await axios.post("/api/getauthordetails", {
      authorId: item.friendId,
    });

    setUser(data?.authorInfo && data?.authorInfo);
  }, [item]);

  useEffect(() => {
    getAuthor();
  }, [getAuthor]);
  if (!user) {
    return <Skeleton className="w-full h-full" />;
  }
  return (
    <div
      className={`p-2 border w-full rounded-md border-[#bbbbbb5b] flex items-center gap-3 relative cursor-pointer ${
        currentChat === item.friendId && "bg-[#bbb]"
      }`}
      onClick={() => setCurrentChat(item.friendId)}
    >
      <Avatar src={user?.image} />
      <h1 className="text-lg hidden md:block font-bold">{user?.name}</h1>
      <span className="h-3 w-3 rounded-full bg-green-600 animate-pulse absolute top-2 right-2"></span>
    </div>
  );
};

export default memo(ChatUsers);
