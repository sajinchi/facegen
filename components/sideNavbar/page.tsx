"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { logout } from "@/store/slices/auth/auth.slice";
import { CLIENT_AUTH_LOGIN_URL } from "@/constants/client.url";
import { StoreStatusEnum } from "@/store/types/commons/StoreStatusEnum";

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [navstate,setNavstate] = useState(true);

  const auth = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  }
  useEffect(()=>{
    if (auth.status == StoreStatusEnum.IDLE) {
      router.push(CLIENT_AUTH_LOGIN_URL);
   }
  },[auth]);
  return (
    <div className="flex flex-col w-auto h-screen bg-white">
      <div className="flex flex-row p-6 items-center space-x-12">
      {Boolean(navstate == true) && (<div><Image src="/Logo.png" height={41} width={129.18} alt={""} className="h-auto w-auto"></Image></div>)}
        <button onClick={()=>setNavstate(!navstate)} className=" rounded-md hover:bg-navbarcolor1/50"><Image src="/Hamburger Icon.png" height={34.1} width={37.62} alt={""}></Image></button>
      </div>
      <div className="space-y-3">
      <div className=" font-Poppins500 text-base font-medium items-center text-center">
        <div className={`flex flex-row items-center  h-71 p-6 space-x-3 w-full ${Boolean(navstate == false) && ('justify-center')}`}>
          <Image src="/dashboard_icon.png" height={16} width={16} alt={""}></Image>
          {Boolean(navstate == true) && (<div>Dashboard</div>)}
        </div>
        <button className={`flex flex-row w-full items-center h-71 p-6  hover:bg-navbarcolor1/20 space-x-3 ${Boolean(navstate == false) && ('justify-center')}`} onClick={()=>router.push('../product/productView')}>
          <Image src="/items_icon.png" height={11} width={17} alt={""}></Image>
          {Boolean(navstate == true) && (<div>Products</div>)}
        </button>
        <button className={`flex flex-row w-full items-center h-71 p-6  hover:bg-navbarcolor1/20 space-x-3 ${Boolean(navstate == false) && ('justify-center')}`} onClick={()=>router.push('../invoices/invoiceList')}>
          <Image src="/items_icon.png" height={11} width={17} alt={""}></Image>
          {Boolean(navstate == true) && (<div>Invoices</div>)}
        </button>
        <button className={`flex flex-row w-full items-center h-71 p-6  hover:bg-navbarcolor1/20 space-x-3 ${Boolean(navstate == false) && ('justify-center')}`} onClick={()=>router.push('../packages/packageList')}>
          <Image src="/kitchen_icon.png" height={17} width={16} alt={""}></Image>
          {Boolean(navstate == true) && (<div>Packages</div>)}
        </button>
        <button className={`flex flex-row w-full items-center h-71 p-6  hover:bg-navbarcolor1/20 space-x-3 ${Boolean(navstate == false) && ('justify-center')}`} onClick={()=>router.push('../subscription/subscriptionList')}>
          <Image src="/kitchen_icon.png" height={17} width={16} alt={""}></Image>
          {Boolean(navstate == true) && (<div>Subscription</div>)}
        </button>
      </div>
        <div className="pb-5">
      {Boolean(navstate == false) && (
      <button 
      onClick={()=>handleLogout()} 
      className="flex flex-row w-full items-center justify-center h-71 p-6">
      <Image src="/logout_icon.png" height={18} width={15} alt={""}></Image>
      </button>
      )}
      {Boolean(navstate == true) && (
      <div className="pl-11 ">
        <button 
        onClick={()=>handleLogout()} 
        className=" flex flex-row  h-50 w-173 items-center justify-center space-x-2 border-2 rounded-md border-orange1  hover:bg-orange1/20 hover:border-none">
          <Image src="/logout_icon.png" height={18} width={15} alt={""}></Image>
          <div className="text-orange1" >Logout</div>
        </button>
      </div>
      )}
      </div>
      </div>
    </div>
  );
};

export default Navbar;
