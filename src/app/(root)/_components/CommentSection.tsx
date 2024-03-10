"use client";
import axios from "axios";
import { VerifiedIcon } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

interface CommentSectionProps {
  content: string;
  createdAt: Date;
  authorId: string;
}

interface UserType {
  id: string;
  name: string;
  email: string;
  password: null | string; // Assuming password can be null or a string
  image: string;
  emailVerified: null | boolean; // Assuming emailVerified can be null or a boolean
  createdAt: string | Date;
  verified?: boolean;
}

const CommentSection = ({
  content,
  createdAt,
  authorId,
}: CommentSectionProps) => {
  const [formattedDate, setFormattedDate] = useState("");
  const [userInfo, setUserInfo] = useState<UserType | null>(null);

  useEffect(() => {
    updateFormattedDate(createdAt); // Replace with your actual date string
  }, [createdAt]);
  //functions
  const updateFormattedDate = (newDate: any) => {
    if (newDate) {
      const parsedDate = moment(newDate);
      if (parsedDate.isValid()) {
        setFormattedDate(parsedDate.fromNow());
      } else {
        console.error("Invalid date format:", newDate);
      }
    }
  };

  const getUser = useCallback(async () => {
    const { data } = await axios.post("/api/getcommentuser", {
      userId: authorId,
    });
    if (data) {
      setUserInfo(data.user);
    }
  }, [authorId]);

  useEffect(() => {
    getUser();
  }, [getUser]);
  return (
    <div className="w-full border border-[#aaaaaa54] p-3 rounded-md">
      <div className="flex  items-center gap-2">
        <div>
          <Image
            src={userInfo?.image!}
            alt="user"
            height={40}
            width={40}
            className="rounded-full"
          />
        </div>
        <div>
          <h1 className="font-bold flex items-center gap-2">
            {userInfo?.name}{" "}
            {userInfo?.verified && (
              <VerifiedIcon className="" fill="#00FFFF90" />
            )}
          </h1>
          <span className="text-[#aaa]">{formattedDate}</span>
        </div>
      </div>
      <div className="ml-12 p-3 rounded-md bg-gray-200">{content}</div>
    </div>
  );
};

export default CommentSection;
