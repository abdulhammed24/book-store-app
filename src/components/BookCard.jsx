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
    });
  };

  return (
    <div className="rounded-lg transition-shadow duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center sm:h-72 sm:justify-center gap-4">
        <div className="sm:h-72 sm:flex-shrink-0 border rounded-md">
          <Image
            src={book.coverImage}
            alt={book?.title || "Book cover"}
            width={200}
            height={300}
            className="w-full h-auto bg-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
          />
        </div>

        <div>
          <h3 className="text-lg font-secondary font-semibold hover:text-blue-600 mb-3">{book?.title}</h3>
          <p className="text-gray-600 text-sm mb-5">
            {book?.description?.length > 60 ? `${book.description.slice(0, 60)}...` : book?.description}
          </p>
          <p className="font-medium text-sm mb-5">
            ${book?.newPrice} <span className="line-through font-normal ml-2">${book?.oldPrice}</span>
          </p>

          <button onClick={() => handleAddToCart(book)} className="btn-primary !px-3 space-x-1 flex items-center gap-1">
            <ShoppingCart className="w-5 h-5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
