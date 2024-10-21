"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { clearCart } from "@/rtk/features/cartSlice";

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart);
  const totalPrice = cartItems
    .reduce((total, item) => total + item.newPrice * item.quantity, 0)
    .toFixed(2);
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Order data:", { ...data, cartItems, totalPrice });

    toast({
      title: "Order Placed",
      description: "Your order has been successfully placed!",
      duration: 1200,
    });

    dispatch(clearCart());

    router.push("/order");
  };

  return (
    <section className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto max-w-screen-xl">
        <h1 className="mb-6 text-3xl font-bold">Checkout</h1>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-xl font-semibold text-gray-600">Order Summary</h2>
            <div className="mb-6 rounded bg-white p-6 shadow-lg">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="mb-4 flex items-center border-b pb-4 last:border-b-0"
                >
                  <div className="mr-4 h-16 w-16">
                    <Image
                      src={item.coverImage}
                      alt={item.title}
                      width={64}
                      height={64}
                      className="rounded"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                    <p className="text-gray-600">
                      ${(item.newPrice * item.quantity).toFixed(2)} USD
                    </p>
                  </div>
                </div>
              ))}
              <div className="mt-4 border-t pt-4">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${totalPrice} USD</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-semibold text-gray-600">Shipping Information</h2>
            <div className="rounded bg-white p-6 shadow-lg">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    {...register("name", { required: "Full name is required" })}
                    type="text"
                    id="name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  {errors.name && (
                    <span className="text-sm text-red-500">{errors.name.message}</span>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
                    })}
                    type="email"
                    id="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  {errors.email && (
                    <span className="text-sm text-red-500">{errors.email.message}</span>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    {...register("phone", { required: "Phone number is required" })}
                    type="tel"
                    id="phone"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  {errors.phone && (
                    <span className="text-sm text-red-500">{errors.phone.message}</span>
                  )}
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    {...register("address", { required: "Address is required" })}
                    type="text"
                    id="address"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  {errors.address && (
                    <span className="text-sm text-red-500">{errors.address.message}</span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                      City
                    </label>
                    <input
                      {...register("city", { required: "City is required" })}
                      type="text"
                      id="city"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                    {errors.city && (
                      <span className="text-sm text-red-500">{errors.city.message}</span>
                    )}
                  </div>
                  <div>
                    <label htmlFor="zipcode" className="block text-sm font-medium text-gray-700">
                      Zipcode
                    </label>
                    <input
                      {...register("zipcode", { required: "Zipcode is required" })}
                      type="text"
                      id="zipcode"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                    {errors.zipcode && (
                      <span className="text-sm text-red-500">{errors.zipcode.message}</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                    I agree to the{" "}
                    <Link href="/terms" className="text-indigo-600 hover:text-indigo-500">
                      Terms and Conditions
                    </Link>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={!isChecked}
                  className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
                >
                  Place Order
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
