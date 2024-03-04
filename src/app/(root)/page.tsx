"use client";

import { Button } from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data } = useSession();
  return (
    <main className="">
      {!data?.user ? (
        <Button variant="outlined" onClick={() => signIn("google")}>
          signIn
        </Button>
      ) : (
        <Button variant="outlined" onClick={() => signOut()}>
          signOut
        </Button>
      )}
    </main>
  );
}
