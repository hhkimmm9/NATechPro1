"use client";

import "../css/globals.css";
import UserTopNavbar from "./components/UserTopNavbar";
import UserSidebar from "./components/UserSidebar";


export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='h-screen flex flex-col'>
      <UserTopNavbar />
      <div className="grow flex flex-row">
        <UserSidebar />
        <div className="flex flex-col w-full bg-white">{children}</div>
      </div>
    </div>
  );
}
