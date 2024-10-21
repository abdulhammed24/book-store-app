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
  const totalPrice = cartItems.reduce((total, item) => total + item.newPrice * item.quantity, 0).toFixed(2);
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
    });

    dispatch(clearCart());

    router.push("/order-confirmation");
  };

  return (
    <section className="min-h-screen p-6 bg-gray-100">
      <div className="container max-w-screen-xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="font-semibold text-xl text-gray-600 mb-4">Order Summary</h2>
            <div className="bg-white rounded shadow-lg p-6 mb-6">
              {cartItems.map((item) => (
                <div key={item._id} className="flex items-center mb-4 pb-4 border-b last:border-b-0">
                  <div className="w-16 h-16 mr-4">
                    <Image src={item.coverImage} alt={item.title} width={64} height={64} className="rounded" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                    <p className="text-gray-600">${(item.newPrice * item.quantity).toFixed(2)} USD</p>
                  </div>
                </div>
              ))}
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${totalPrice} USD</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-semibold text-xl text-gray-600 mb-4">Shipping Information</h2>
            <div className="bg-white rounded shadow-lg p-6">
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
                  {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
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
                  {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
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
                  {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}
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
                  {errors.address && <span className="text-red-500 text-sm">{errors.address.message}</span>}
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
                    {errors.city && <span className="text-red-500 text-sm">{errors.city.message}</span>}
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
                    {errors.zipcode && <span className="text-red-500 text-sm">{errors.zipcode.message}</span>}
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
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
                  className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
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
