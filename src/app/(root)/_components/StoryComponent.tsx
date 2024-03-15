"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FreeMode, Pagination } from "swiper/modules";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Avatar } from "@mui/material";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import PostStory from "@/components/PostStory";
import axios from "axios";
import { useSession } from "next-auth/react";
import { StoryType } from "@/lib/types";
import moment from "moment";
import StorySection from "./StorySection";

const StoryComponent = () => {
  const [storyImage, setStoryImage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [stories, setStories] = useState<StoryType[] | null>(null);
  const [myStory, setMyStory] = useState<StoryType | null>(null);

  const { data: userData } = useSession();

  //functions
  const getFriendsStory = useCallback(async () => {
    const { data } = await axios.post("/api/getstory", {
      userEmail: userData?.user?.email,
    });
    setStories(data?.stories && data?.stories.reverse());
  }, [userData]);

  const getMyStory = useCallback(async () => {
    const { data } = await axios.post("/api/getmystory", {
      userEmail: userData?.user?.email,
    });
    setMyStory(data?.myStory[0]);
  }, [userData]);

  useEffect(() => {
    getFriendsStory();
  }, [getFriendsStory]);

  useEffect(() => {
    getMyStory();
  }, [getMyStory]);

  return (
    <div className="max-w-[800px] w-full flex items-center justify-center mx-auto">
      <PostStory
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        storyImage={storyImage}
        setStoryImage={setStoryImage}
        getMyStory={getMyStory}
      />
      <Swiper
        slidesPerView={7}
        spaceBetween={10}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper w-full"
      >
        {!myStory && (
          <SwiperSlide>
            <button
              onClick={() => setIsOpen(true)}
              className=" p-3 flex items-center justify-center border rounded-full border-indigo-500"
            >
              <Plus />
            </button>
          </SwiperSlide>
        )}
        {myStory && (
          <SwiperSlide>
            <Dialog>
              <DialogTrigger className="border-[3px] border-indigo-500 rounded-full transition-all hover:bg-[#dddddd63] ">
                <Avatar src={myStory?.userImage} />
              </DialogTrigger>
              <DialogContent className="p-2 pb-16">
                <StorySection item={myStory} myStory />
              </DialogContent>
            </Dialog>
          </SwiperSlide>
        )}
        {stories?.map((item, i) => (
          <SwiperSlide key={i}>
            <Dialog>
              <DialogTrigger className="border-[3px] border-indigo-500 rounded-full transition-all hover:bg-[#dddddd63] ">
                <Avatar src={item.userImage} />
              </DialogTrigger>
              <DialogContent className="p-2 pb-16">
                <StorySection item={item} />
              </DialogContent>
            </Dialog>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default StoryComponent;
