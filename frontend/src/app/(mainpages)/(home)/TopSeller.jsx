"use client";

import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import BookCard from "@/components/BookCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllBooksQuery } from "@/rtk/features/books/booksApi";
import { TopSellersSkeleton } from "./Skeleton";

const categories = ["Choose a genre", "Business", "Fiction", "Horror", "Adventure"];

const TopSellers = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const { data: booksData = {}, isLoading, isError, error } = useGetAllBooksQuery();

  const books = booksData.books || [];

  // console.log(books);

  const filteredBooks =
    selectedCategory === "Choose a genre"
      ? books
      : books.filter((book) => book.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <section className="py-10">
      {isLoading ? (
        <TopSellersSkeleton />
      ) : isError ? (
        <ErrorMessage message={error.message} />
      ) : (
        <>
          <div className="mb-8 flex items-center">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[200px] rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-0">
                <SelectValue placeholder="Choose a genre" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category, index) => (
                  <SelectItem key={index} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

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
            {filteredBooks.length > 0 &&
              filteredBooks.map((book, index) => (
                <SwiperSlide key={index}>
                  <BookCard book={book} />
                </SwiperSlide>
              ))}
          </Swiper>
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

export default TopSellers;
