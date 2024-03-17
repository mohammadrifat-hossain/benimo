import { FriendsType } from "@/lib/types";
import { Avatar } from "@mui/material";
import React, { Dispatch,memo } from "react";
import ChatUsers from "./ChatUsers";

interface ChatListProps {
  allFriends?: FriendsType[];
  setCurrentChat: Dispatch<React.SetStateAction<string>>;
  currentChat?: string
}

const ChatList = ({ allFriends,setCurrentChat, currentChat }: ChatListProps) => {
  return (
    <div className="w-full  h-full overflow-y-scroll">
      <div className="w-full flex flex-col items-start justify-start gap-2">
        {allFriends?.length && allFriends?.length > 0 ? (
          allFriends?.map((item, i) => <ChatUsers key={item.id} item={item} setCurrentChat={setCurrentChat} currentChat={currentChat}/>)
        ) : (
          <div className="w-full">
            <h1 className="text-xl">No friends found</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(ChatList);
