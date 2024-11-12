"use client";

import { useDispatch } from "react-redux";
import { ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";
import { useGetBookBySlugQuery } from "@/rtk/features/books/booksApi";
import { addToCart } from "@/rtk/features/cart/cartSlice";
import { shimmer, toBase64 } from "@/utils/imageUtils";

const BookDetail = ({ slug }) => {
  const { data: response = {}, isLoading, isError, error } = useGetBookBySlugQuery(slug);

  // Since response now contains a single book object, adjust to response.book
  const book = response.book || {};

  console.log(book);

  const { toast } = useToast();

  const dispatch = useDispatch();

  const handleAddToCart = (book) => {
    dispatch(addToCart(book));
    toast({
      title: "Added to Cart",
      description: `${book.title} has been added to your cart.`,
      duration: 1200,
    });
  };

  return (
    <>
      {isLoading ? (
        <LoadingSkeleton />
      ) : isError ? (
        <ErrorMessage message={error.message} />
      ) : (
        <div className="max-w-lg p-5 shadow-md">
          <h1 className="mb-6 text-2xl font-bold">{book.title}</h1>

          <div className="">
            <div className="relative mb-2 w-full overflow-hidden pt-[100%]">
              <Image
                src={book.coverImage}
                alt={book?.title || "Book cover"}
                fill
                placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="h-auto w-full cursor-pointer rounded-md object-center p-2 transition-all duration-200 hover:scale-105"
              />
            </div>

            <div className="mb-5">
              {/* <p className="mb-2 text-gray-700">
              <strong>Author:</strong> {book.author || "admin"}
            </p> */}
              <p className="mb-4 text-gray-700">
                <strong>Published:</strong>{" "}
                {new Date(book?.createdAt || book?.updatedAt).toLocaleDateString()}
              </p>

              <p className="mb-4 capitalize text-gray-700">
                <strong>Category:</strong> {book?.category}
              </p>
              <p className="text-gray-700">
                <strong>Description:</strong> {book.description}
              </p>
            </div>

            <button
              onClick={() => handleAddToCart(book)}
              className="btn-primary flex items-center gap-1 space-x-1 !px-3"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

function LoadingSkeleton() {
  return (
    <div className="max-w-lg">
      <div className="flex flex-col gap-4">
        <Skeleton className="h-[300px] w-full rounded-md" />
        <Skeleton className="h-6 w-36" />
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
  );
}

function ErrorMessage({ message }) {
  return (
    <div className="text-red-500">
      <p>Something went wrong. Try reloading. {message}</p>
    </div>
  );
}

export default BookDetail;
