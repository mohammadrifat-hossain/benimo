"use client";

import { Button } from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";
import MidSide from "./_components/MidSide";

export default function Home() {
  const { data } = useSession();
  return (
    <main className="flex ">
      {/* left side */}
      <div className=" h-[91.5vh] md:h-[93.5vh] w-2/5 hidden md:block"></div>
      {/* middle */}
      <div className=" h-[91.5vh] md:h-[93.5vh] w-full border shadow-md">
        <MidSide />
      </div>
      {/* {right} */}
      <div className=" h-[91.5vh] md:h-[93.5vh] w-2/5 hidden md:block"></div>
    </main>
  );
}
