"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { store } from "@/rtk/store";
import { Provider } from "react-redux";

export default function MainPagesLayout({ children }) {
  return (
    <>
      <Provider store={store}>
        <Navbar />
        {children}
        <Footer />
      </Provider>
    </>
  );
}
