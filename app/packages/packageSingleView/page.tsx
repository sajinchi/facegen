"use client";
import Navbar from '@/components/sideNavbar/page'
import Topbar from '@/components/topbar/page'
import PackageSinglePage from '@/components/packages/PackageSinglePage'
import Authorization from '@/hocs/withAuth.hoc'
import Link from 'next/link'
import React from 'react'

const PackageSingle = () => {
  return (
    <div>
      <Authorization>
      <div className=" bg-tablecolor1 h-full w-full">
        <div className="flex flex-row">
        <Navbar></Navbar>
        <div className="grow flex flex-col">
          <Topbar></Topbar>
          <div className=" mt-10 w-1166 h-auto shadow-md m-auto  bg-white">
            <div className="flex flex-row items-center h-20 p-6 space-x-5">
              <div className="font-Poppins text-xl font-extrabold">
                Packages
              </div>
            </div>
            <PackageSinglePage></PackageSinglePage>
          </div>
        </div>
        </div>
      </div>
    </Authorization>
    </div>
  )
}

export default PackageSingle
