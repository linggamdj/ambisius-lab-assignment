import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ambisius Coding Assignment",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="p-5 w-[650px]">
          <div className="header mb-4">
            <p className="text-3xl text-black-400 font-medium">
              Sistem Restoran
            </p>
          </div>
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  );
}