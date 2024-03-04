"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, Button } from "@mui/material";
import { LogIn, LogOut, Settings, User, Users } from "lucide-react";
import Link from "next/link";

const MenuPage = () => {
  const { data } = useSession();
  return (
    <Popover>
      <PopoverTrigger>
        <Avatar src={data?.user?.image!} />
      </PopoverTrigger>
      <PopoverContent className="max-w-[200px] p-0">
        <h1 className="w-full text-center py-2 border-b">My Account</h1>
        {data?.user ? (
          <div>
            <Link href={"/"}>
              <button className="flex items-center justify-center gap-4 hover: px-6 py-2 w-full hover:bg-slate-100 text-slate-500">
                <span>
                  <User className="" />
                </span>
                <span className="text-base">Profile</span>
              </button>
            </Link>
            <Link href={"/"}>
              <button className="flex items-center justify-center gap-4 hover: px-6 py-2 w-full hover:bg-slate-100 text-slate-500">
                <span>
                  <Users className="" />
                </span>
                <span className="text-base">Friends</span>
              </button>
            </Link>
            <Link href={"/"}>
              <button className="flex items-center justify-center gap-4 hover: px-6 py-2 w-full hover:bg-slate-100 text-slate-500">
                <span>
                  <Settings className="" />
                </span>
                <span className="text-base">Setting</span>
              </button>
            </Link>
            <div>
              <button
                className="flex items-center justify-center gap-4 hover: px-6 py-2 w-full hover:bg-slate-100 text-slate-500"
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
            <button className="flex items-center justify-center gap-4 hover: px-6 py-2 w-full hover:bg-slate-100 rounded-md text-slate-500">
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
