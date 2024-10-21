"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Link from "next/link";
import { news } from "@/data/news";
import Image from "next/image";

const News = () => {
  return (
    <section className="py-16">
      <h2 className="text-3xl font-semibold mb-6">News </h2>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        navigation={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
        }}
        modules={[Navigation]}
        className="mySwiper"
      >
        {news.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-12">
              <div className="py-4">
                <Link href="/">
                  <h3 className="text-lg font-medium hover:text-blue-500 mb-4">{item.title}</h3>
                </Link>
                <div className="w-12 h-[4px] bg-primary mb-5"></div>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
              <div className="relative w-full overflow-hidden bg-[#fcf8f7] pt-[35%]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
export default News;