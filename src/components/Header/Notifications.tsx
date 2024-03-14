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
import { NotificationType, UserProfileType } from "@/lib/types";
import { Badge } from "@mui/material";
import axios from "axios";
import { Bell, BellIcon } from "lucide-react";
import moment from "moment";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import NotificationToast from "./NotificationToast";

const Notifications = () => {
  const { data: userData } = useSession();

  const [userInfo, setUserInfo] = useState<UserProfileType | null>(null);
  const [notifications, setNotifications] = useState<NotificationType[] | null>(
    null
  );
  const [allNotifications, setAllNotifications] = useState<number | null>(0)

  //functions
  const getUserInfo = useCallback(async () => {
    const { data } = await axios.post("/api/getuser", {
      userEmail: userData?.user?.email,
    });
    setUserInfo(data?.userInfo);
  }, [userData]);

  const getMyNotifications = useCallback(async () => {
    const { data } = await axios.post("/api/getnotifications", {
      userId: userInfo?.id,
    });
    setNotifications(data?.myNotifications?.reverse());
  }, [userInfo]);

  //effects
  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  useEffect(() => {
    getMyNotifications();
  }, [getMyNotifications]);

  useEffect(()=>{
    const unseenNotifics = notifications?.filter((item)=> item.seen === false)
    
    setAllNotifications(unseenNotifics?.length!)
    
  },[notifications])

  return (
    <Sheet>
      <SheetTrigger>
        <Badge badgeContent={allNotifications} color="primary">
          <Bell size={"30px"} />
        </Badge>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="border-b pb-2">
          <SheetTitle>Notifications</SheetTitle>
        </SheetHeader>
        <div className="w-full flex items-center justify-center flex-col gap-1 mt-3 overflow-y-scroll">
          {notifications?.map((item, i) => (
            <SheetClose key={item.id} className="w-full">
              <NotificationToast item={item} getMyNotifications={getMyNotifications} />
            </SheetClose>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Notifications;
