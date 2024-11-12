<div className="relative overflow-hidden rounded-lg pt-[70%]">
  <Image
    src="/assets/banner.png"
    alt="banner"
    width={500}
    height={500}
    priority
    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
    className="absolute left-0 top-0 h-full w-full object-cover"
    placeholder="blur"
    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx0cHBwcHy4lJyctLzkyMi8nLy0wO0BCPzhLPS0yRWFFS1NWW1xfOUNXY2NfXF9LWVP/2wBDARUXFygdIR0hPSgnKD1FQUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUX/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
  />
</div>;

// 2. Let Next.js generate it automatically for static images by importing the image:

```tsx
import bannerImg from '@/public/assets/banner.png'

// Then in your component:
<Image
  src={bannerImg}
  alt="banner"
  width={500}
  height={500}
  priority
  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
  className="absolute left-0 top-0 h-full w-full object-cover"
  placeholder="blur"
/>
```;
import bannerImg from "@/public/assets/banner.png";

// Then in your component:
<Image
  src={bannerImg}
  alt="banner"
  width={500}
  height={500}
  priority
  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
  className="absolute left-0 top-0 h-full w-full object-cover"
  placeholder="blur"
/>;

// The second approach with static imports is recommended as Next.js will automatically generate the optimal blur placeholder during build time. However, if you're using dynamic images or images from an external URL, you'll need to provide the `blurDataURL` manually.

("use client");

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Link from "next/link";
import { news } from "@/data/news";
import Image from "next/image";

const News = () => {
  // Common blur data URL for all images
  const shimmer = (w, h) => `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient id="g">
          <stop stop-color="#f6f7f8" offset="20%" />
          <stop stop-color="#edeef1" offset="50%" />
          <stop stop-color="#f6f7f8" offset="70%" />
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="#f6f7f8" />
      <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    </svg>`;

  const toBase64 = (str) => (typeof window === "undefined" ? Buffer.from(str).toString("base64") : window.btoa(str));

  return (
    <section className="py-16">
      <h2 className="mb-6 text-3xl font-semibold">News </h2>
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
            <div className="flex flex-col items-center gap-12 sm:flex-row sm:justify-between">
              <div className="py-4">
                <Link href="/">
                  <h3 className="mb-4 text-lg font-medium hover:text-blue-500">{item.title}</h3>
                </Link>
                <div className="mb-5 h-[4px] w-12 bg-primary"></div>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
              <div className="relative w-full overflow-hidden bg-[#fcf8f7] pt-[35%]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
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
