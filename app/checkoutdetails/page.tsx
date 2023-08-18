"use client";
import Topbar from '@/components/topbar/page';
import { RootState } from '@/store';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useSelector } from 'react-redux';

const CheckoutDetail = () => {
    const cartitems = useSelector((state:RootState)=>state.cart);
    const router = useRouter();
    console.log(cartitems);
  return (
    <div className='bg-slate-100 h-screen w-full'>
        <Topbar></Topbar>
        <div className='bg-white m-5 shadow-md'>
        Checkout details
        <div className="grow items-center text-right p-6">
          <button className="bg-orange1 text-white h-46 w-148 rounded-5px" onClick={()=>router.push('../paymentSelection')}>
            Place order
          </button>
      </div>
        </div>
    </div>
  );
}

export default CheckoutDetail;