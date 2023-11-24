import React from "react";
import {
  MdOutlineSpaceDashboard,
  MdOutlineDashboardCustomize,
  MdOutlineImage,
  MdOutlineCollections,
  // MdOutlineSettings,
  // MdOutlineLogout,
} from "react-icons/md";
import { BiEdit } from "react-icons/bi";;
import Link from "next/link";


function UserSidebar() {
  return (
    <div className="h-full px-4  border-r-2 bg-white">
      <nav className="pt-4">
        {/* gallery */}
        <Link href="/gallery">
          <div className="flex mb-2 pt-2 justify-start items center gap-4 px-5 hover:bg-blue-900 py-1 rounded-sm group cursor-pointer">
            <MdOutlineSpaceDashboard className="text-2xl text-gray-600 group-hover:text-white" />
            <h3 className="whitespace-nowrap font-semibold text-base text-gray-800 group-hover:text-white">
              My Gallery
            </h3>
          </div>
        </Link>

        {/* asset */}
        <Link href="/gallery/assets">
          <div className="flex mb-2 pt-2 justify-start items center gap-4 px-5 hover:bg-blue-900 py-1 rounded-sm group cursor-pointer">
            <MdOutlineCollections className="text-2xl text-gray-600 group-hover:text-white" />
            <h3 className="whitespace-nowrap font-semibold text-base text-gray-800 group-hover:text-white">
              Assets
            </h3>
          </div>
        </Link>

        {/* background images */}
        <Link href='/gallery/background-images'>
          <div className="flex mb-2 justify-start items center gap-4 px-5 hover:bg-blue-900 p-2 rounded-sm group cursor-pointer hover:shadow-lg m-auto">
            <MdOutlineImage className="text-2xl text-gray-600 group-hover:text-white" />
            <h3 className="whitespace-nowrap font-semibold text-base text-gray-800 group-hover:text-white">
              Background Images
            </h3>
          </div>
        </Link>

        {/* canvas */}
        <Link href="/gallery/canvas">
          <div className="flex mb-2 pt-2 justify-start items center gap-4 px-5 hover:bg-blue-900 py-1 rounded-sm group cursor-pointer">
            <MdOutlineDashboardCustomize className="text-2xl text-gray-600 group-hover:text-white" />
            <h3 className="whitespace-nowrap font-semibold text-base text-gray-800 group-hover:text-white">
              Canvas
            </h3>
          </div>
        </Link>

        {/* editor */}
        <Link href="/gallery/editor">
          <div className="flex mb-2 pt-2 justify-start items center gap-4 px-5 hover:bg-blue-900 py-1 rounded-sm group cursor-pointer">
            <BiEdit className="text-2xl text-gray-600 group-hover:text-white" />
            <h3 className="whitespace-nowrap font-semibold text-base text-gray-800 group-hover:text-white">
              Editor
            </h3>
          </div>
        </Link>
      </nav>
    </div>
  );
}

export default UserSidebar;