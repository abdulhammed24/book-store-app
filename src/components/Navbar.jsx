"use client";

import { useEffect, useState } from "react";
import { HiMiniBars3CenterLeft, HiOutlineHeart, HiOutlineShoppingCart } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";

import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { toggleBodyScroll } from "@/utils/scrollLock";

const Cart = dynamic(() => import("./Cart"), { ssr: false });

const navigation = [
  { name: "Dashboard", href: "/user-dashboard" },
  { name: "Orders", href: "/orders" },
  // { name: "Cart Page", href: "/cart" },
  { name: "Check Out", href: "/checkout" },
];

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cart = useSelector((state) => state.cart);
  const currentUser = true;

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  const toggleCart = (e) => {
    e.preventDefault();
    setIsCartOpen(!isCartOpen);
  };

  useEffect(() => {
    toggleBodyScroll(isCartOpen);
    return () => toggleBodyScroll(false);
  }, [isCartOpen]);

  return (
    <>
      <header className="mx-auto max-w-screen-2xl px-4 py-6">
        <nav className="flex items-center justify-between">
          {/* left side */}
          <div className="flex items-center gap-4 md:gap-16">
            <Link href="/">
              <HiMiniBars3CenterLeft className="size-6" />
            </Link>

            {/* search input */}
            <div className="relative w-40 space-x-2 sm:w-72">
              <IoSearchOutline className="absolute inset-y-2 left-3 inline-block" />
              <input
                type="text"
                placeholder="Search here"
                className="w-full rounded-md bg-[#EAEAEA] px-6 py-1 focus:outline-none md:px-8"
              />
            </div>
          </div>

          {/* rigth side */}
          <div className="relative flex items-center space-x-2 md:space-x-3">
            <div>
              {currentUser ? (
                <>
                  <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                    <Image
                      src="/assets/avatar.png"
                      alt="User avatar"
                      width={28}
                      height={28}
                      className={`size-7 rounded-full ${currentUser ? "ring-2 ring-blue-500" : ""}`}
                    />
                  </button>
                  {/* show dropdowns */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 z-40 mt-2 w-48 rounded-md bg-white shadow-lg">
                      <ul className="py-2">
                        {navigation.map((item) => (
                          <li key={item.name} onClick={() => setIsDropdownOpen(false)}>
                            <Link
                              href={item.href}
                              className="block px-4 py-2 text-sm hover:bg-gray-100"
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                        <li>
                          <button className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100">
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <Link href="/login">
                  <HiOutlineUser className="size-6" />
                </Link>
              )}
            </div>

            <button className="hidden sm:block">
              <HiOutlineHeart className="size-6" />
            </button>

            <button
              onClick={toggleCart}
              className="flex items-center rounded-sm bg-primary p-1 px-2 sm:px-6"
            >
              <HiOutlineShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 ? (
                <span className="w-6 text-sm font-semibold sm:ml-1">
                  {cartItemsCount > 9 ? "9+" : cartItemsCount}
                </span>
              ) : (
                <span className="text-sm font-semibold sm:ml-1">0</span>
              )}
            </button>
          </div>
        </nav>
      </header>

      {isCartOpen && (
        <>
          <div className="fixed right-0 top-0 z-50 h-full w-96 translate-x-0 transform overflow-y-auto bg-white shadow-lg transition-transform duration-300 ease-in-out">
            <Cart onClose={() => setIsCartOpen(false)} cartItems={cart} />
          </div>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-50"
            onClick={() => setIsCartOpen(false)}
          ></div>
        </>
      )}
    </>
  );
};

export default Navbar;
