"use client";
import Link from "next/link";

import Navbar from "@/components/sideNavbar/page";
import Topbar from "@/components/topbar/page";
import Authorization from "@/hocs/withAuth.hoc";
import HomePage from "@/components/home/HomePage";

const Home = () => {

  return (
    <Authorization>
      <div className=" bg-tablecolor1 h-full w-full">
        <div className="flex flex-row">
        <Navbar></Navbar>
        <div className="grow flex flex-col">
          <Topbar></Topbar>
          <div className=" mt-10 w-1166 h-auto shadow-md m-auto  bg-white">
            <HomePage></HomePage>
          </div>
        </div>
        </div>
      </div>
    </Authorization>
  );
};

export default Home;
