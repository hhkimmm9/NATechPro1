import React from "react";
import classNames from "classnames";
import { Text } from "@nextui-org/react";
import Image from "next/image";

function UserTopNavbar() {
  return (
    <nav
      className={classNames({
        "bg-white": true,
        "flex items-center": true,
        "w-full z-10 px-5": true,
        "min-h-[64px]": true,
        fixed: true,
      })}
    >
      <div className="text-green-900 text-xl p-1 font-bold">mosPic</div>
      <div style={{ display: "flex ", marginLeft: "auto" }}>
        <div className="flex gap-4 items-right">
          <Image
            src={
              "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg"
            }
            height={36}
            width={36}
            alt="profile image"
            className="rounded-full"
          />
          <div className="flex flex-col text-lg justify-center">
            <Text>Username</Text>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default UserTopNavbar;
