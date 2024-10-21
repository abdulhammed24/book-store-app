"use client";

import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/rtk/features/cartSlice";
import { useToast } from "@/hooks/use-toast";

const BookCard = ({ book }) => {
  const dispatch = useDispatch();

  const { toast } = useToast();

  const handleAddToCart = (book) => {
    dispatch(addToCart(book));

    toast({
      title: "Added to Cart",
      description: `${book.title} has been added to your cart.`,
      duration: 1200,
    });
  };

  return (
    <div className="rounded-lg transition-shadow duration-300">
      <div className="flex flex-col gap-4 sm:h-72 sm:flex-row sm:items-center sm:justify-center">
        <div className="rounded-md border sm:h-72 sm:flex-shrink-0">
          <Image
            src={book.coverImage}
            alt={book?.title || "Book cover"}
            width={200}
            height={300}
            className="h-auto w-full cursor-pointer rounded-md bg-cover p-2 transition-all duration-200 hover:scale-105"
          />
        </div>

        <div>
          <h3 className="mb-3 font-secondary text-lg font-semibold hover:text-blue-600">
            {book?.title}
          </h3>
          <p className="mb-5 text-sm text-gray-600">
            {book?.description?.length > 60
              ? `${book.description.slice(0, 60)}...`
              : book?.description}
          </p>
          <p className="mb-5 text-sm font-medium">
            ${book?.newPrice}{" "}
            <span className="ml-2 font-normal line-through">${book?.oldPrice}</span>
          </p>

          <button
            onClick={() => handleAddToCart(book)}
            className="btn-primary flex items-center gap-1 space-x-1 !px-3"
          >
            <ShoppingCart className="h-5 w-5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
