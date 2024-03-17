import React, { useCallback, useEffect, useRef, useState, memo } from "react";
import { Avatar } from "@mui/material";
import { CircleUser, Send } from "lucide-react";
import { MessageType, UserProfileType } from "@/lib/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

interface ChatProps {
  currentChat?: string;
  userInfo: UserProfileType;
}

const Chat = ({ currentChat, userInfo: userData }: ChatProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const [message, setMessage] = useState("");
  const [userInfo, setUserInfo] = useState<UserProfileType | null>(null);
  const [allMessages, setAllMessages] = useState<MessageType[] | null>(null);

  const [user, setUser] = useState<UserProfileType | null>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getUserInfo = useCallback(async () => {
    const { data } = await axios.post("/api/getauthordetails", {
      authorId: currentChat,
    });
    setUserInfo(data?.authorInfo);
  }, [currentChat]);

  const getMessages = useCallback(async () => {
    const { data } = await axios.post("/api/getmessages", {
      senderId: userData?.id,
      receiverId: currentChat,
    });
    setAllMessages(data?.messages);
  }, [currentChat, userData]);

  useEffect(() => {
    scrollToBottom();
  }, []);

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  useEffect(() => {
    if (currentChat) {
      getMessages();
    }
  }, [getMessages, currentChat]);

  //functions
  const handleRedirect = useCallback(() => {
    if (currentChat) {
      router.push(`/userprofile/${currentChat}`);
    }
  }, [currentChat, router]);

  const handleMessageSend = async () => {
    if (message) {
      const { data } = await axios.post("/api/messagesend", {
        senderId: userData?.id,
        receiverId: userInfo?.id,
        senderName: userData?.name,
        text: message,
      });
      if(data?.success){
        setMessage('')
        getMessages( )
      }
    } else {
      toast({
        title: "Enter message!",
      });
    }
  };

  return (
    <div className="w-full h-full ">
      {/* top */}
      <div>
        <div className="w-full  p-2 bg-[#aaaaaa27] rounded-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar src={userInfo?.image} />
            <h1 className="text-lg font-bold">{userInfo?.name}</h1>
            <span className="h-3 w-3 rounded-full bg-green-600 animate-pulse"></span>
          </div>
          <div className="mr-4">
            <CircleUser
              size={"28px"}
              className="cursor-pointer"
              onClick={handleRedirect}
            />
          </div>
        </div>
      </div>
      {/* mid */}
      <div className="max-h-[83%] h-full border overflow-y-auto">
        {allMessages?.length! > 0 ? (
          allMessages?.map((item, i) => (
            <React.Fragment key={i}>
              {/* received */}
              <div
                className={`flex items-start gap-1 m-1 my-3 ${
                  item.receiverId === currentChat && "flex-row-reverse"
                }`}
              >
                <Avatar
                  src={
                    item.receiverId === currentChat
                      ? userData?.image
                      : userInfo?.image
                  }
                />
                <div>
                  <p
                    className={`bg-[#ccc] p-2 rounded-md ${
                      item.receiverId === currentChat && "bggradient text-white"
                    }`}
                  >
                    {item.text}
                  </p>
                </div>
              </div>
            </React.Fragment>
          ))
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <h1>No messages found</h1>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      {/* bottom */}
      <div
        className={`w-full p-1  items-center gap-1 md:gap-3 ${
          !currentChat ? "hidden" : "flex"
        }`}
      >
        <input
          type="text"
          className="px-5 py-2 rounded-full outline-none bg-white border focus:shadow-lg transition-all w-full"
          placeholder="Enter your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="px-5 py-2 rounded-full outline-none bg-indigo-400 border hover:shadow-lg transition-all text-white flex items-center gap-2"
          onClick={handleMessageSend}
        >
          Send
          <Send />
        </button>
      </div>
    </div>
  );
};

export default memo(Chat);
