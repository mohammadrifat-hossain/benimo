"use client";
import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Controller, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const ConnectionPage = () => {
  return (
    <div className="w-full">
      <div className="m-3">
        <div>
          <h2 className="text-xl font-bold">Followers:</h2>
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
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 45, 6, 7].map(
                  (item, i) => (
                    <SwiperSlide key={i}>
                      <div className="max-w-[170px] w-full bg-[#eee] h-[220px] border rounded-md overflow-hidden relative shadow-md">
                        <Image
                          src={
                            "https://res.cloudinary.com/dgbf3zt5b/image/upload/v1710077118/adpcb8wzw0r5lunujvgk.webp"
                          }
                          height={200}
                          width={170}
                          alt="user"
                        />
                        <div className="flex flex-col absolute w-full bottom-0 left-0">
                          <button className="w-full bg-indigo-500 text-white transition-all hover:bg-indigo-600 py-1">
                            Follow back
                          </button>
                          <button className="w-full bg-white text-indigo-500 transition-all hover:bg-slate-200 rounded py-1">
                            Profile
                          </button>
                        </div>
                      </div>
                    </SwiperSlide>
                  )
                )}
              </Swiper>
            </div>
            {/* mobile */}
            <div className="w-full block md:hidden">
              <Swiper
                slidesPerView={2}
                spaceBetween={10}
                freeMode={true}
                pagination={{
                  clickable: true,
                }}
                modules={[FreeMode, Pagination, Navigation]}
                navigation={true}
                className="mySwiper w-full"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 45, 6, 7].map(
                  (item, i) => (
                    <SwiperSlide key={i}>
                      <div className="max-w-[170px] w-full bg-[#eee] h-[220px] border rounded-md overflow-hidden relative shadow-md">
                        <Image
                          src={
                            "https://res.cloudinary.com/dgbf3zt5b/image/upload/v1710077118/adpcb8wzw0r5lunujvgk.webp"
                          }
                          height={200}
                          width={170}
                          alt="user"
                        />
                        <div className="flex flex-col absolute w-full bottom-0 left-0">
                          <button className="w-full bg-indigo-500 text-white transition-all hover:bg-indigo-600 py-1">
                            Follow back
                          </button>
                          <button className="w-full bg-white text-indigo-500 transition-all hover:bg-slate-200 rounded py-1">
                            Profile
                          </button>
                        </div>
                      </div>
                    </SwiperSlide>
                  )
                )}
              </Swiper>
            </div>
            {/* mobile */}
          </div>
        </div>
        {/* connected */}
        <div className="mt-3">
          <h2 className="text-xl font-bold">Connected:</h2>
          <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-5 lg:grid-cols-7 ">
            {[
              1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 4, 5, 6, 78, 2, 3, 4, 5,
            ].map((item, i) => (
              <div
                className="max-w-[170px] w-full bg-[#eee] h-[220px] border rounded-md overflow-hidden relative shadow"
                key={i}
              >
                <Image
                  src={
                    "https://res.cloudinary.com/dgbf3zt5b/image/upload/v1710077118/adpcb8wzw0r5lunujvgk.webp"
                  }
                  height={200}
                  width={170}
                  alt="user"
                />
                <div className="flex flex-col absolute w-full bottom-0 left-0">
                  <button className="w-full bg-white text-indigo-500 transition-all hover:bg-slate-200 rounded py-1">
                    Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionPage;
