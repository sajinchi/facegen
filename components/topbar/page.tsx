"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Menu } from '@headlessui/react';
import { useDispatch, useSelector } from "react-redux";
import { TbLogout } from "react-icons/tb";


import { AppDispatch, RootState } from "@/store";
import { logout } from "@/store/slices/auth/auth.slice";
import { useRouter } from "next/navigation";

const Topbar = () => {
  const user = useSelector((state: RootState) => state.myuserdata);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
 

  return (
    <div className="flex flex-row h-104 p-10 items-center bg-white ">
      <span className="grow font-Poppins text-2xl">FaceGen</span>
        <div className="flex flex-row px-5 space-x-5">
          <Image src="/notificationbell_icon.png" height={22.45} width={19.64} alt={""}></Image>
          <Image src="/messages_icon.png" height={20.25} width={23.37} alt={""}></Image>
        </div>
        <Menu as="div" className="flex flex-col">
        <Menu.Button className="flex flex-row items-center space-x-5 relative">
          <span>{user.username}</span>
          <Image src={user.image} height={45} width={45} alt={""} className="rounded-full"></Image>
        </Menu.Button>
              <Menu.Items className="origin-right absolute right-0 mt-16 mr-10 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <Menu.Item>
                  <button
                    onClick={()=>router.push("../users/userUpdate")}
                    className="flex items-center px-4 py-2 w-full text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                  >
                    Edit Profile
                  </button>
                  </Menu.Item>
                  
                  <Menu.Item>
                  <button
                    className="flex flex-row items-center px-4 py-2 space-x-1 w-full text-gray-700 hover:bg-gray-100 hover:text-gray-900 "
                    role="menuitem"
                    onClick={()=>dispatch(logout())}
                  >
                    <TbLogout></TbLogout>
                    <span>Logout</span>
                  </button>
                  </Menu.Item>
                </div>
              </Menu.Items>
      </Menu>
    </div>
  );
};

export default Topbar;
