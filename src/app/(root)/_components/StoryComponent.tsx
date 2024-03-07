"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FreeMode, Pagination } from "swiper/modules";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Avatar } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import PostStory from "@/components/PostStory";

const StoryComponent = () => {
  const [storyImage, setStoryImage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  //functions

  return (
    <div className="max-w-[800px] w-full flex items-center justify-center mx-auto">
      <PostStory
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        storyImage={storyImage}
        setStoryImage={setStoryImage}
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
        <SwiperSlide>
          <button
            onClick={() => setIsOpen(true)}
            className=" p-3 flex items-center justify-center border rounded-full border-indigo-500"
          >
            <Plus />
          </button>
        </SwiperSlide>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 5, 4, 2, 2].map((item, i) => (
          <SwiperSlide key={i}>
            <Dialog>
              <DialogTrigger className="border-[4px] border-indigo-500 rounded-full transition-all hover:bg-[#dddddd63] ">
                <Avatar />
              </DialogTrigger>
              <DialogContent className="pt-10">
                <Image
                  alt="story"
                  src={
                    "https://img.freepik.com/free-vector/ramadan-kareem-decorative-religious-card-background_1035-18787.jpg?w=1380&t=st=1709710586~exp=1709711186~hmac=59bfce3b9c6d546ef5c29de5553f4b14ee6f366d9c4e67fbde9d2bed8873f25a"
                  }
                  placeholder="blur"
                  height={1000}
                  width={1000}
                  blurDataURL="https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fgifs%2Floading-balls-balls-bounce-4802%2F&psig=AOvVaw0tZbCiDzQ9qn7Bj1oWMEwb&ust=1709870906460000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCIDOi_Wj4YQDFQAAAAAdAAAAABAx"
                />
              </DialogContent>
            </Dialog>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default StoryComponent;
