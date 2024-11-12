"use client";

import BookCard from "@/components/BookCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useGetAllBooksQuery } from "@/rtk/features/books/booksApi";
import { RecommendLoadingSkeleton } from "./Skeleton";

const Recommend = () => {
  const { data: response = {}, isLoading, isError, error } = useGetAllBooksQuery();

  const books = response.books || [];

  // console.log(books);

  return (
    <section className="py-10">
      {isLoading ? (
        <RecommendLoadingSkeleton />
      ) : isError ? (
        <ErrorMessage message={error.message} />
      ) : (
        <>
          {books.length > 0 && (
            <Swiper
              slidesPerView={1}
              spaceBetween={30}
              navigation={true}
              breakpoints={{
                640: { slidesPerView: 1, spaceBetween: 20 },
                768: { slidesPerView: 2, spaceBetween: 40 },
                1024: { slidesPerView: 2, spaceBetween: 50 },
                1180: { slidesPerView: 3, spaceBetween: 50 },
              }}
              modules={[Navigation]}
              className="mySwiper"
            >
              {books.slice(8, 18).map((book, index) => (
                <SwiperSlide key={book.slug || index}>
                  <BookCard book={book} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </>
      )}
    </section>
  );
};

function ErrorMessage({ message }) {
  return (
    <div className="text-red-500">
      <p>Something went wrong. Try reloading. {message}</p>
    </div>
  );
}

export default Recommend;
