"use client";
import { Skeleton } from "@mui/material";
import { ImagePlus, LogIn, LogOut, Settings, User, Users } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HiHome } from "react-icons/hi";

const RightSide = () => {
  const { data } = useSession();
  const router = useRouter();

  //functions
  const handleLogout = () => {
    signOut();
    router.push("/login");
  };
  return (
    <div className="h-full">
      {data?.user ? (
        <div className="w-full flex flex-col gap-1 h-full p-2">
          <Link href={"/"}>
            <button className="flex items-center justify-start gap-3 text-lg  font-bold  w-full px-5 py-2 rounded-md bg-[#eee] hover:bg-[#d8d8d8] transition-all">
              <HiHome className="text-[24px]" />
              Home
            </button>
          </Link>
          <Link href={"/profile"}>
            <button className="flex items-center justify-start gap-3 text-lg  font-bold  w-full px-5 py-2 rounded-md bg-[#eee] hover:bg-[#d8d8d8] transition-all">
              <User />
              Profile
            </button>
          </Link>
          <Link href={"/createpost"}>
            <button className="flex items-center justify-start gap-3 text-lg  font-bold  w-full px-5 py-2 rounded-md bg-[#eee] hover:bg-[#d8d8d8] transition-all">
              <ImagePlus />
              Post
            </button>
          </Link>
          <Link href={"/connections"}>
            <button className="flex items-center justify-start gap-3 text-lg  font-bold  w-full px-5 py-2 rounded-md bg-[#eee] hover:bg-[#d8d8d8] transition-all">
              <Users />
              Connections
            </button>
          </Link>
          <Link href={"/mysetting"}>
            <button className="flex items-center justify-start gap-3 text-lg  font-bold  w-full px-5 py-2 rounded-md bg-[#eee] hover:bg-[#d8d8d8] transition-all">
              <Settings />
              Setting
            </button>
          </Link>
          <div>
            <button
              className="flex items-center justify-start gap-3 text-lg  font-bold  w-full px-5 py-2 rounded-md bg-[#eee] hover:bg-[#d8d8d8] transition-all"
              onClick={handleLogout}
            >
              <LogOut />
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div className="">
          <Skeleton className="w-[260px] ml-4" animation="wave" />
        </div>
      )}
    </div>
  );
};

export default RightSide;
