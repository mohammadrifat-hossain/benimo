"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@mui/material";
import { Bell, BellIcon, MessageCircle } from "lucide-react";
import { IconType } from "react-icons/lib";

const Notifications = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Badge badgeContent={1} color="primary">
          <Bell size={"30px"} />
        </Badge>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="border-b pb-2">
          <SheetTitle>Notifications</SheetTitle>
        </SheetHeader>
        <div className="w-full flex items-center justify-center flex-col gap-1 mt-3">
          {[1, 3, 4, 5, 6].map((item, i) => (
            <div
              className=" flex items-center  w-full border p-3 rounded-md bg-[#bbbbbb63]"
              key={i}
            >
              <div className=" h-full w-[20%] flex items-center justify-center">
                <BellIcon size={"28px"} />
              </div>
              <div>
                <p>Someone liked your photo</p>
                <span className="text-[#aaa] text-sm font-light">3day ago</span>
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Notifications;
