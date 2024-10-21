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
      <header className="max-w-screen-2xl mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          {/* left side */}
          <div className="flex items-center md:gap-16 gap-4">
            <Link href="/">
              <HiMiniBars3CenterLeft className="size-6" />
            </Link>

            {/* search input */}
            <div className="relative sm:w-72 w-40 space-x-2">
              <IoSearchOutline className="absolute inline-block left-3 inset-y-2" />
              <input
                type="text"
                placeholder="Search here"
                className="bg-[#EAEAEA] w-full py-1 md:px-8 px-6 rounded-md focus:outline-none"
              />
            </div>
          </div>

          {/* rigth side */}
          <div className="relative flex items-center md:space-x-3 space-x-2">
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
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40">
                      <ul className="py-2">
                        {navigation.map((item) => (
                          <li key={item.name} onClick={() => setIsDropdownOpen(false)}>
                            <Link href={item.href} className="block px-4 py-2 text-sm hover:bg-gray-100">
                              {item.name}
                            </Link>
                          </li>
                        ))}
                        <li>
                          <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Logout</button>
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

            <button onClick={toggleCart} className="bg-primary p-1 sm:px-6 px-2 flex items-center rounded-sm">
              <HiOutlineShoppingCart className="w-6 h-6" />
              {cartItemsCount > 0 ? (
                <span className="text-sm font-semibold sm:ml-1">{cartItemsCount}</span>
              ) : (
                <span className="text-sm font-semibold sm:ml-1">0</span>
              )}
            </button>
          </div>
        </nav>
      </header>

      {isCartOpen && (
        <>
          <div className="fixed top-0 right-0 h-full w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 translate-x-0 overflow-y-auto">
            <Cart onClose={() => setIsCartOpen(false)} cartItems={cart} />
          </div>
          {/* Overlay */}
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsCartOpen(false)}></div>
        </>
      )}
    </>
  );
};

export default Navbar;
