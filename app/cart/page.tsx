import CartPage from '@/components/cart/cartPage'
import Navbar from '@/components/sideNavbar/page'
import Topbar from '@/components/topbar/page'
import Authorization from '@/hocs/withAuth.hoc'
import React from 'react'

const Cart = () => {
  return (
    <Authorization>
      <div className=" bg-tablecolor1 h-full w-full">
        <div className="flex flex-row">
        <Navbar></Navbar>
        <div className="grow flex flex-col">
          <Topbar></Topbar>
          <div className=" mt-10 w-1166 h-auto shadow-md m-auto  bg-white">
            <div className="font-Poppins text-xl font-extrabold">
            <div className="flex flex-row items-center h-20 p-6 space-x-5">
              Cart
          </div>
            </div>
            <CartPage></CartPage>
          </div>
        </div>
        </div>
      </div>
    </Authorization>
  )
}

export default Cart
