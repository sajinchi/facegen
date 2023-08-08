"use client";
import React from "react";
import Image from "next/image";
import { useSelector } from "react-redux";

import { RootState } from "@/store";

const Topbar = () => {
  const user = useSelector((state: RootState) => state.userdata);
  return (
    <div className="flex flex-row h-104 p-10 items-center bg-white">
      <span className="grow font-Poppins text-2xl">FaceGen</span>
        <div className="flex flex-row px-5 space-x-5">
          <Image src="/notificationbell_icon.png" height={22.45} width={19.64} alt={""}></Image>
          <Image src="/messages_icon.png" height={20.25} width={23.37} alt={""}></Image>
        </div>
        <div className="flex flex-row items-center space-x-5">
          <span>{user.username}</span>
          <Image src={user.image} height={45} width={45} alt={""} className="rounded-full"></Image>
        </div>
    </div>
  );
};

export default Topbar;
