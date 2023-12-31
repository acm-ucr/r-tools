/* eslint-disable new-cap */
import Navigation from "@/components/Navigation";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Montserrat } from "next/font/google";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import DataWrapper from "@/components/DataWrapper";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "R'Tools",
  description: "Your one-stop shop for all CS helpers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className} bg-rtools-blue-400 min-h-screen text-white flex flex-col`}
      >
        <DataWrapper>
          <Toaster />
          <Navigation />
          <div className="flex flex-col flex-grow w-full pt-[8vh] items-center justify-center overflow-x-hidden">
            {children}
          </div>
          <Footer />
        </DataWrapper>
      </body>
    </html>
  );
}
