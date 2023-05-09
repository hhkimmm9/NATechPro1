'use client';

import { Disclosure } from "@headlessui/react";
import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import {
    MdOutlineSpaceDashboard,
    MdOutlineDashboardCustomize,
    MdTag,
    MdOutlineImage,
    MdOutlineSettings,
    MdOutlineLogout,
} from "react-icons/md";
import { BiEdit } from 'react-icons/bi';

function SideNavBar() {
    return <div>
        <Disclosure as="nav">
            {/*Sidebar container*/}
            <div className="p-6 w-1/2 h-screen bg-white z-20 fixed top-0 -left-96 lg:w-60 lg:left-0 peer-focus:left-0 peer:transition ease-out delay-150 duration-200">
                {/* this is to collapse/expand the side nav bar */}
                {/* <Disclosure.Button className="absolute top-4 right-4 inline-flex items-center peer justify-center rounded-md p-2 text:gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:rind-white group hover:bg-gray-900">
                    <GiHamburgerMenu 
                        className="block md:hidden h-6 w-6"
                        aria-hidden="true"
                    />
                </Disclosure.Button> */}
                <div className="flex flex-col justify-start items-center">
                    <h1 className="text-base top-0 text-center cursor-pointer font-bold text-blue-900 border-b border-gray-100 pb-4 w-full">
                        mosaic
                    </h1>

                    {/* Sidenav section */}
                    <div className="my-4 border-b border-gray-100 pb-4 w-full">
                        <div className="flex mb-2 justify-start items center gap-4 px-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                            <MdOutlineSpaceDashboard className="text-2xl text-gray-600 group-hover:text-white"/>
                            <h3 className="text-base text-gray-800 group-hover:text-white font-semibold">
                                My Gallery
                            </h3>
                        </div>
                        <div className="flex mb-2 justify-start items center gap-4 px-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                            <BiEdit className="text-2xl text-gray-600 group-hover:text-white"/>
                            <h3 className="text-base text-gray-800 group-hover:text-white font-semibold">
                                Editor
                            </h3>
                        </div>
                        <div className="flex mb-2 justify-start items center gap-4 px-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                            <MdOutlineDashboardCustomize className="text-2xl text-gray-600 group-hover:text-white"/>
                            <h3 className="text-base text-gray-800 group-hover:text-white font-semibold">
                                Canvas
                            </h3>
                        </div>
                        <div className="flex mb-2 justify-start items center gap-4 px-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                            <MdTag className="text-2xl text-gray-600 group-hover:text-white"/>
                            <h3 className="text-base text-gray-800 group-hover:text-white font-semibold">
                                Tags
                            </h3>
                        </div>
                        <div className="flex mb-2 justify-start items center gap-4 px-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                            <MdOutlineImage className="text-2xl text-gray-600 group-hover:text-white"/>
                            <h3 className="text-base text-gray-800 group-hover:text-white font-semibold">
                                Background
                            </h3>
                        </div>
                    </div>

                    {/* settings section */}
                    <div className="my-4 border-b border-gray-100 pb-4 w-full">
                        <div className="flex mb-2 justify-start items center gap-4 px-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                            <MdOutlineSettings className="text-2xl text-gray-600 group-hover:text-white"/>
                            <h3 className="text-base text-gray-800 group-hover:text-white font-semibold">
                                Settings
                            </h3>
                        </div>
                    </div>

                    {/* logout section */}
                    <div className="my-4">
                        <div className="flex mb-2 justify-start items center gap-4 px-5 border border-gray-200 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                            <MdOutlineLogout className="text-2xl text-gray-600 group-hover:text-white"/>
                            <h3 className="text-base text-gray-800 group-hover:text-white font-semibold">
                                Logout
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </Disclosure>
    </div>;
}

export default SideNavBar;