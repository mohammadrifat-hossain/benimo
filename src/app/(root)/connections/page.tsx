"use client";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { UserProfileType } from "@/lib/types";
import axios from "axios";
import { useSession } from "next-auth/react";
import MyFollowers from "../_components/MyFollowers";
import MyConnections from "../_components/MyConnections";

const ConnectionPage = () => {
  const [userInfo, setUserInfo] = useState<UserProfileType | null>(null);
  const [followers, setFollowers] = useState<string[] | null>(null);
  const [connected, setConnected] = useState<string[] | null>(null);

  const { data: userData } = useSession();

  const getMyInfo = useCallback(async () => {
    const { data } = await axios.post("/api/getuser", {
      userEmail: userData?.user?.email,
    });

    setUserInfo(data?.userInfo);
  }, [userData]);

  const getFollowers = useCallback(async () => {
    const { data } = await axios.post("/api/getmyfollowes", {
      userId: userInfo?.id,
    });
    setFollowers(data?.followers);
    setConnected(data?.connected);
  }, [userInfo]);

  //effects
  useEffect(() => {
    getMyInfo();
  }, [getMyInfo]);

  useEffect(() => {
    getFollowers();
  }, [getFollowers]);

  return (
    <div className="w-full">
      <div className="m-3">
        <div>
          <h2 className="text-xl font-bold">{followers?.length!} Followers:</h2>
          <div className="my-2 w-full flex">
            {/* desktop */}
            <div className="w-full hidden md:block">
              <Swiper
                slidesPerView={6}
                spaceBetween={10}
                freeMode={true}
                pagination={{
                  clickable: true,
                }}
                modules={[FreeMode, Pagination, Navigation]}
                navigation={true}
                className="mySwiper w-full"
              >
                {followers?.length! > 0 ? (
                  followers?.map((item, i) => (
                    <SwiperSlide key={i}>
                      <MyFollowers userId={item} getFollowers={getFollowers}/>
                    </SwiperSlide>
                  ))
                ) : (
                  <SwiperSlide>
                    <div className="max-w-[170px] w-full bg-[#eee] h-[220px] flex items-center justify-center">
                      <h1 className="text-xl font-bold">No new followers</h1>
                    </div>
                  </SwiperSlide>
                )}
              </Swiper>
            </div>
            {/* mobile */}
            <div className="w-full block md:hidden">
              <Swiper className="mySwiper w-full">
                {followers?.length! > 0 ? (
                  followers?.map((item, i) => (
                    <SwiperSlide key={i}>
                      <MyFollowers userId={item} getFollowers={getFollowers}/>
                    </SwiperSlide>
                  ))
                ) : (
                  <SwiperSlide>
                    <div className="max-w-[170px] w-full bg-[#eee] h-[220px] flex items-center justify-center">
                      <h1 className="text-xl font-bold">No new followers</h1>
                    </div>
                  </SwiperSlide>
                )}
              </Swiper>
            </div>
            {/* mobile */}
          </div>
        </div>
        {/* connected */}
        <div className="mt-3">
          <h2 className="text-xl font-bold">
            {connected?.length!} Connections:
          </h2>
          <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-5 lg:grid-cols-7 ">
            {connected?.length! > 0 ? (
              connected?.map((item, i) => (
                <MyConnections userId={item} key={item} />
              ))
            ) : (
              <SwiperSlide>
                <div className="max-w-[170px] w-full bg-[#eee] h-[220px] flex items-center justify-center">
                  <h1 className="text-xl font-bold">No Connections yet</h1>
                </div>
              </SwiperSlide>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionPage;
