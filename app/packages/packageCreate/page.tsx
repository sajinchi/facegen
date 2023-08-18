"use client";
import PackageCreatePage from '@/components/packages/PackageCreatePage'
import Navbar from '@/components/sideNavbar/page'
import Topbar from '@/components/topbar/page'
import Authorization from '@/hocs/withAuth.hoc'
import React from 'react'

const PackageACreate = () => {
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
              Package Create
            </div>
            <div className="grow items-center text-right">
              
            </div>
          </div>
          <PackageCreatePage/>
        </div>
      </div>
      </div>
    </div>
  </Authorization>
  </div>
  )
}

export default PackageACreate
