"use client";
import { Avatar } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";

const MidSide = () => {
  const { data } = useSession();
  const router = useRouter()

  const [inputValue, setInputValue] = useState('')

  //functions

  const handlePush = ()=>{
    router.push(`/createpost/?inputValue=${inputValue}`)
  }

  return (
    <div className="w-full">
      <div>
        <div className="flex items-center justify-between m-3 gap-3 border-b pb-5 border-b-[#6666664b]">
          <Avatar src={data?.user?.image!} />
          <input
            type="text"
            className="w-full px-5 py-2 rounded-full focus:shadow-sm outline-none transition-all hover:shadow-sm bg-transparent border-[#bbbbbb91] border"
            placeholder="What's on your mind?"
            value={inputValue}
            onChange={(e)=> setInputValue(e.target.value)}
          />
          <FaPlusCircle className="text-4xl cursor-pointer" onClick={handlePush} />
        </div>
      </div>
    </div>
  );
};

export default MidSide;
