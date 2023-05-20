import React from "react";
import {
  MdOutlineSpaceDashboard,
  MdOutlineDashboardCustomize,
  MdTag,
  MdOutlineImage,
  // MdOutlineSettings,
  // MdOutlineLogout,
} from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import Link from 'next/link'

// different option for creating side nav items
// export type NavItem = {
//   label: string;
//   href: string;
//   icon: React.ReactNode;
// };

// type Props = {
//   open: boolean;
//   navItems?: NavItem[];
//   setOpen(open: boolean): void;
// };

function UserSidebar() {
  return (
    <div className="flex flex-col justify-between bg-white md: h-full w-[240x] border-r-2">
      <nav className="md:sticky md:top-16">
        {/* side nav items */}
        {/* gallery */}
        <Link href='/user/gallery'>
          <div className="flex mb-2 justify-start items center gap-4 px-5 hover:bg-blue-900 p-2 rounded-sm group cursor-pointer hover:shadow-lg m-auto">
            <MdOutlineSpaceDashboard className="text-2xl text-gray-600 group-hover:text-white" />
            <h3 className="text-base text-gray-800 group-hover:text-white font-semibold">
              My Gallery
            </h3>
          </div>
        </Link>

        {/* editor */}
        <Link href='/user/editor'>
          <div className="flex mb-2 justify-start items center gap-4 px-5 hover:bg-blue-900 p-2 rounded-sm group cursor-pointer hover:shadow-lg m-auto">
            <BiEdit className="text-2xl text-gray-600 group-hover:text-white" />
            <h3 className="text-base text-gray-800 group-hover:text-white font-semibold">
              Editor
            </h3>
          </div>
        </Link>

        {/* canvas */}
        <Link href='/user/canvas'>
          <div className="flex mb-2 justify-start items center gap-4 px-5 hover:bg-blue-900 p-2 rounded-sm group cursor-pointer hover:shadow-lg m-auto">
            <MdOutlineDashboardCustomize className="text-2xl text-gray-600 group-hover:text-white" />
            <h3 className="text-base text-gray-800 group-hover:text-white font-semibold">
              Canvas
            </h3>
          </div>
        </Link>

        {/* tags */}
        <Link href='#'>
          <div className="flex mb-2 justify-start items center gap-4 px-5 hover:bg-blue-900 p-2 rounded-sm group cursor-pointer hover:shadow-lg m-auto">
            <MdTag className="text-2xl text-gray-600 group-hover:text-white" />
            <h3 className="text-base text-gray-800 group-hover:text-white font-semibold">
              Tags
            </h3>
          </div>
        </Link>

        {/* background */}
        <Link href='#'>
          <div className="flex mb-2 justify-start items center gap-4 px-5 hover:bg-blue-900 p-2 rounded-sm group cursor-pointer hover:shadow-lg m-auto">
            <MdOutlineImage className="text-2xl text-gray-600 group-hover:text-white" />
            <h3 className="text-base text-gray-800 group-hover:text-white font-semibold">
              Background
            </h3>
          </div>
        </Link>
      </nav>
    </div>
  );
}

export default UserSidebar;
