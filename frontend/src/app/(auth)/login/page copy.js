"use client";

import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useLoginMutation } from "@/rtk/features/user/userApi";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { login } from "@/rtk/features/user/userSlice";

const Login = () => {
  const [message, setMessage] = useState("");
  const { toast } = useToast();
  const [loginMutation, { isLoading, error }] = useLoginMutation();
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const response = await loginMutation(data).unwrap();
      toast({
        title: "Login Successful",
        description: "You have logged in successfully!",
        duration: 1200,
      });

      dispatch(login({ email: data.email }));

      router.push("/");
    } catch (err) {
      setMessage(error?.data?.message || "An error occurred");
      toast({
        title: "Login Failed",
        description: error?.data?.message || "An error occurred",
        duration: 1200,
      });
    }
  };

  return (
    <div className="flex h-[calc(100vh-120px)] items-center justify-center">
      <div className="mx-auto mb-4 w-full max-w-sm rounded bg-white px-8 pb-8 pt-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold">Please Login</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              name="email"
              id="email"
              placeholder="Email Address"
              className="w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:shadow focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              {...register("password", { required: true })}
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:shadow focus:outline-none"
            />
          </div>
          {message && <p className="mb-3 text-xs italic text-red-500">{message}</p>}
          <div>
            <button
              type="submit"
              className={`rounded bg-blue-500 px-8 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none ${isLoading ? "cursor-not-allowed opacity-50" : ""}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="mr-3 h-5 w-5 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
        <p className="mt-4 align-baseline text-sm font-medium">
          Haven&apos;t an account? Please{" "}
          <Link href="/register" className="text-blue-500 hover:text-blue-700">
            Register
          </Link>
        </p>

        {/* Google sign in */}
        <div className="mt-4">
          <button
            // onClick={handleGoogleSignIn}
            className="flex w-full flex-wrap items-center justify-center gap-1 rounded bg-secondary px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
          >
            <FaGoogle className="mr-2" />
            Sign in with Google
          </button>
        </div>

        <p className="mt-5 text-center text-xs text-gray-500">
          ©2025 Book Store. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
