import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Ayaan Syed | Portfolio",
  description: "Senior Front-End Engineer & Designer",
};

import Background from "@/components/Background";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans bg-[#030014] overflow-y-scroll overflow-x-hidden`}>
        <Background />
        {children}
      </body>
    </html>
  );
}



