"use client";
import Link from "next/link";

import Navbar from "@/components/sideNavbar/page";
import Topbar from "@/components/topbar/page";
import Authorization from "@/hocs/withAuth.hoc";
import UsersUpdatePage from "@/components/users/UsersUpdatePage";

const UserUpdate = () => {

  return (
    <Authorization>
      <div className=" bg-tablecolor1 h-full w-full">
        <div className="flex flex-row">
        <Navbar></Navbar>
        <div className="grow flex flex-col">
          <Topbar></Topbar>
          <div className=" mt-10 w-1166 h-auto shadow-md m-auto  bg-white">
            <div className="flex flex-row items-center h-20 p-6 space-x-5">
              <div className="font-Poppins text-xl font-extrabold">
                Users Update
              </div>
            </div>
            <UsersUpdatePage></UsersUpdatePage>
          </div>
        </div>
        </div>
      </div>
    </Authorization>
  );
};

export default UserUpdate;