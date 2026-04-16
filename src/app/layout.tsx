import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rahul Kumar Singh — Motion & Graphics Designer",
  description: "Crafting Fluid Brand Stories through Motion & Graphics Design",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="bg-[#0a0a0a] text-white selection:bg-[#00ff88] selection:text-black">
        <Preloader />
        <CustomCursor />
        <Navbar />
        <SmoothScroll>
          <main>{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}