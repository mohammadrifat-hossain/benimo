"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { signIn, signOut, useSession } from "next-auth/react";
import { ImagePlus, LogIn, LogOut, Settings, User, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { HiHome } from "react-icons/hi";

const MenuPage = () => {
  const { data } = useSession();
  return (
    <Popover>
      <PopoverTrigger>
        <Image
          src={
            data?.user?.image
              ? data.user.image
              : "https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?t=st=1709793783~exp=1709797383~hmac=1eb331173ed3f1b60b281adfa47fc12c20d1839130ecf9b7e5fb9f961a1bc8a5&w=826"
          }
          alt="profile"
          height={40}
          width={40}
          className="rounded-full"
        />
      </PopoverTrigger>
      <PopoverContent className="max-w-[200px] p-0">
        <h1 className="w-full text-center py-2 border-b">My Account</h1>
        {data?.user ? (
          <div>
            <Link href={"/"}>
              <button className="flex items-center justify-start gap-4 hover: px-6 py-2 w-full hover:bg-slate-100 text-slate-500">
                <span>
                  <HiHome className="text-[24px]" />
                </span>
                <span className="text-base">Home</span>
              </button>
            </Link>
            <Link href={"/profile"}>
              <button className="flex items-center justify-start gap-4 hover: px-6 py-2 w-full hover:bg-slate-100 text-slate-500">
                <span>
                  <User className="" />
                </span>
                <span className="text-base">Profile</span>
              </button>
            </Link>
            <Link href={"/createpost"}>
              <button className="flex items-center justify-start gap-4 hover: px-6 py-2 w-full hover:bg-slate-100 text-slate-500">
                <span>
                  <ImagePlus className="" />
                </span>
                <span className="text-base">Post</span>
              </button>
            </Link>
            <Link href={"/"}>
              <button className="flex items-center justify-start gap-4 hover: px-6 py-2 w-full hover:bg-slate-100 text-slate-500">
                <span>
                  <Users className="" />
                </span>
                <span className="text-base">Connections</span>
              </button>
            </Link>
            <Link href={"/"}>
              <button className="flex items-center justify-start gap-4 hover: px-6 py-2 w-full hover:bg-slate-100 text-slate-500">
                <span>
                  <Settings className="" />
                </span>
                <span className="text-base">Setting</span>
              </button>
            </Link>
            <div>
              <button
                className="flex items-center justify-start gap-4 hover: px-6 py-2 w-full hover:bg-slate-100 text-slate-500"
                onClick={() => signOut()}
              >
                <span>
                  <LogOut />
                </span>
                <span className="text-base">Logout</span>
              </button>
            </div>
          </div>
        ) : (
          <Link href={"/login"}>
            <button className="flex items-center justify-start gap-4 hover: px-6 py-2 w-full hover:bg-slate-100 rounded-md text-slate-500">
              <span>
                <LogIn />
              </span>
              <span className="text-base">Login</span>
            </button>
          </Link>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default MenuPage;
