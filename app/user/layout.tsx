"use client";

import "../globals.css";
import { Inter } from "next/font/google";
import UserTopNavbar from "./components/UserTopNavbar";
import UserSidebar from "./components/UserSidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "mosPic",
  description: "Generated by create next app",
};

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${inter.className} h-screen flex flex-col`}>
      <UserTopNavbar />
      <div className="grow flex flex-row">
        <UserSidebar />
        <div className="flex flex-col w-full bg-white">{children}</div>
      </div>
    </div>
  );
}
