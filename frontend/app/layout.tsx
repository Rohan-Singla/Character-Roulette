import type { Metadata } from "next";
import {  Poppins } from "next/font/google";
import "./globals.css";
import RainbowProvider from "@/components/providers/rainbow";

const geistSans = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});


export const metadata: Metadata = {
  title: "Character Roulette",
  description: "Create your own character with random, unbiased stats.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${geistSans.className} antialiased`}
      >
        <RainbowProvider>
          {children}
        </RainbowProvider>
      </body>
    </html>
  );
}
