import { UserProfileType } from "@/lib/types";
import { Avatar, Skeleton } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { Verified, VerifiedIcon } from "lucide-react";

interface UserDetailsProps {
  authorInfo: UserProfileType;
  createdAt?: any;
}

const UserDetails = ({ authorInfo, createdAt }: UserDetailsProps) => {
  const [formattedDate, setFormattedDate] = useState("");

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

  return (
    <div>
      {authorInfo ? (
        <div className="flex items-center justify-start gap-2">
          <Image
            src={
              authorInfo?.image
                ? authorInfo?.image
                : "https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?t=st=1709793783~exp=1709797383~hmac=1eb331173ed3f1b60b281adfa47fc12c20d1839130ecf9b7e5fb9f961a1bc8a5&w=826"
            }
            alt="profile"
            height={40}
            width={40}
            className="rounded-full"
          />
          <div>
            <Link
              href={`/userprofile/42434`}
              className="text-lg font-bold flex items-center gap-2"
            >
              {authorInfo.name}{" "}
              {authorInfo?.verified && (
                <VerifiedIcon className="" fill="#00FFFF90" />
              )}
            </Link>
            <p className="text-sm text-[#aaa] -mt-1">{formattedDate}</p>
          </div>
        </div>
      ) : (
        <Skeleton variant="circular" className="my-[2px]">
          <Avatar />
        </Skeleton>
      )}
    </div>
  );
};

export default UserDetails;
