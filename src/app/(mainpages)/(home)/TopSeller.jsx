"use client";

import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import BookCard from "@/components/BookCard";
import booksData from "@/data/blog.json";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

const categories = ["Choose a genre", "Business", "Fiction", "Horror", "Adventure"];

const TopSellers = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [filteredBooks, setFilteredBooks] = useState(booksData);

  useEffect(() => {
    const filtered =
      selectedCategory === "Choose a genre"
        ? booksData
        : booksData.filter((book) => book.category.toLowerCase() === selectedCategory.toLowerCase());

    setFilteredBooks(filtered);
  }, [selectedCategory]);

  return (
    <section className="py-10">
      <div className="mb-8 flex items-center">
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="border w-[200px] border-gray-300 rounded-md px-4 py-2 focus:ring-0 focus:outline-none">
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
          1180: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
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
    </section>
  );
};

export default TopSellers;
