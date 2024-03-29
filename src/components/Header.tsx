import Link from "next/link";
import React from "react";
import MenuPage from "./Menu";
import { Badge } from "@mui/material";
import { MessageCircle } from "lucide-react";
import SearchDrawer from "./Search";
import Notifications from "./Header/Notifications";

const Header = () => {
  return (
    <div className="fixed top-0 left-0 w-full px-2  md:px-10 py-2 backdrop-blur-sm z-50 shadow-sm flex items-center justify-between">
      <div>
        <Link href={"/"} className="flex items-center justify-center relative">
          <h1 className="text-3xl font-[800] linear_text">Benimo</h1>
        </Link>
      </div>
      <div className="flex  items-center justify-center gap-5">
        <SearchDrawer />
        <Link href={"/messages"}>
          <Badge badgeContent={0} color="primary">
            <MessageCircle size={"30px"} />
          </Badge>
        </Link>
        <Notifications />
        <MenuPage />
      </div>
    </div>
  );
};

export default Header;
