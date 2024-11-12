import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import ReduxProvider from "@/rtk/ReduxProvider";

export const metadata = {
  title: {
    text: "Book Store App",
    template: "%s | Book Store",
    absolute: "Book Store App",
  },
  description: "Explore a wide selection of books and more.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          {children}
          <Toaster />
        </ReduxProvider>
      </body>
    </html>
  );
}
