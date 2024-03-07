import { LogIn, LogOut, Settings, User, Users } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const RightSide = () => {
  const { data } = useSession();
  
  return (
    <div className="h-full">
      {data?.user ? (
        <div className="w-full flex flex-col gap-1 h-full p-2">
          <Link href={"/profile"}>
            <button className="flex items-center justify-start gap-3 text-lg  font-bold  w-full px-5 py-2 rounded-md bg-[#eee] hover:bg-[#d8d8d8] transition-all">
              <User />
              Profile
            </button>
          </Link>
          <Link href={"/profile"}>
            <button className="flex items-center justify-start gap-3 text-lg  font-bold  w-full px-5 py-2 rounded-md bg-[#eee] hover:bg-[#d8d8d8] transition-all">
              <Users />
              Connections
            </button>
          </Link>
          <Link href={"/profile"}>
            <button className="flex items-center justify-start gap-3 text-lg  font-bold  w-full px-5 py-2 rounded-md bg-[#eee] hover:bg-[#d8d8d8] transition-all">
              <Settings />
              Setting
            </button>
          </Link>
          <div>
            <button
              className="flex items-center justify-start gap-3 text-lg  font-bold  w-full px-5 py-2 rounded-md bg-[#eee] hover:bg-[#d8d8d8] transition-all"
              onClick={() => signOut()}
            >
              <LogOut />
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div>
          <Link href={"/login"}>
            <button className="flex items-center justify-start gap-3 text-lg  font-bold  w-full px-5 py-2 rounded-md bg-[#eee] hover:bg-[#d8d8d8] transition-all">
              <LogIn />
              Login
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default RightSide;
