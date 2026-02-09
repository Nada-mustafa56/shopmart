"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

export default function HomeSlider() {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-8">
        <Swiper
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3000 }}
          modules={[Autoplay]}
        >
          <SwiperSlide>
            <div className="w-full h-[500px] bg-gray-300 flex items-center justify-center text-gray-700 font-bold rounded-lg">
              SLIDE 1
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full h-[500px] bg-gray-300 flex items-center justify-center text-gray-700 font-bold rounded-lg">
              SLIDE 2
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full h-[500px] bg-gray-300 flex items-center justify-center text-gray-700 font-bold rounded-lg">
              SLIDE 3
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="col-span-4 flex flex-col gap-3">
        <div className="w-full h-[245px] bg-gray-300 flex items-center justify-center text-gray-700 font-bold rounded-lg">
          SIDE 1
        </div>
        <div className="w-full h-[245px] bg-gray-300 flex items-center justify-center text-gray-700 font-bold rounded-lg">
          SIDE 2
        </div>
      </div>
    </div>
  );
}
