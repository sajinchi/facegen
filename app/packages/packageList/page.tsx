"use client";
import Navbar from '@/components/sideNavbar/page'
import Topbar from '@/components/topbar/page'
import PackageListPage from '@/components/packages/PackageListPage';
import Authorization from '@/hocs/withAuth.hoc'
import React from 'react'
import Link from 'next/link';

const PackageList = () => {
  return (
    <div>
      <Authorization>
      <div className=" bg-tablecolor1 h-screen">
        <div className="flex flex-row">
        <Navbar></Navbar>
        <div className="grow flex flex-col">
          <Topbar></Topbar>
          <div className=" mt-10 w-1166 h-auto shadow-md m-auto  bg-white">
            <div className="flex flex-row items-center h-20 p-6 space-x-5">
              <div className="font-Poppins text-xl font-extrabold">
                Packages
              </div>
              <div className="grow items-center text-right">
                <Link href="./packageCreate"><button className="bg-orange1 text-white h-46 w-148 rounded-5px">Add Package</button></Link>
              </div>
            </div>
            <PackageListPage/>
          </div>
        </div>
        </div>
      </div>
    </Authorization>
    </div>
  )
}

export default PackageList
