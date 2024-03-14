import { NotificationType } from "@/lib/types";
import axios from "axios";
import { BellIcon } from "lucide-react";
import moment from "moment";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const NotificationToast = ({
  item,
  getMyNotifications,
}: {
  item: NotificationType;
  getMyNotifications: () => void;
}) => {
  const [formattedDate, setFormattedDate] = useState("");
  const router = useRouter();

  useEffect(() => {
    updateFormattedDate(item.createdAt); // Replace with your actual date string
  }, [item.createdAt]);
  //functions
  const updateFormattedDate = (newDate: any) => {
    if (newDate) {
      const parsedDate = moment(newDate);
      if (parsedDate.isValid()) {
        setFormattedDate(parsedDate.fromNow());
      } else {
        console.error("Invalid date format:", newDate);
      }
    }
  };

  useEffect(() => {
    console.log();
  }, []);

  //
  const handleNotify = async () => {
    router.push(item.redirectUrl);
    //seen functionality
    const { data } = await axios.post("/api/seennotifics", {
      notificsId: item.id,
    });
    getMyNotifications();
  };
  return (
    <div
      className={`  flex items-center  w-full border p-3 rounded-md ${
        item.seen ? "bg-slate-white" : "bg-[#ebebebcb]"
      } cursor-pointer`}
      key={item.id}
      onClick={handleNotify}
    >
      <div className=" h-full w-[20%] flex items-center justify-center">
        <BellIcon size={"28px"} />
      </div>
      <div className="w-full flex flex-col items-start justify-start">
        <p className=" text-start">{item.notification}</p>
        <span className="text-[#aaa] text-sm font-light">{formattedDate}</span>
      </div>
    </div>
  );
};

export default NotificationToast;
