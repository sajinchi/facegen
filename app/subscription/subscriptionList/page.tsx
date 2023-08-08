"use client";
import Navbar from '@/components/sideNavbar/page'
import SubscriptionViewPage from '@/components/subscription/subscriptionViewPage'
import Topbar from '@/components/topbar/page'
import Authorization from '@/hocs/withAuth.hoc'
import React from 'react'

const SubscriptionList = () => {
  return (
    <Authorization>
    <div className=" bg-tablecolor1 h-full w-full">
      <div className="flex flex-row">
        <Navbar></Navbar>
        <div className="grow flex flex-col">
          <Topbar></Topbar>
          <div className=" w-1166 h-auto shadow-md m-auto mt-5 bg-white">
            <div className="flex flex-row items-center h-20 p-6">
              <div className="grow font-Poppins text-xl">Subscriptions</div>
            </div>
            <SubscriptionViewPage></SubscriptionViewPage>
          </div>
        </div>
      </div>
    </div>
  </Authorization>
  )
}

export default SubscriptionList
