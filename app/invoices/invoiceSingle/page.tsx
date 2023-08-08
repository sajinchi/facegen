"use client";
import Link from "next/link";

import Topbar from "@/components/topbar/page";
import Navbar from "@/components/sideNavbar/page";
import Authorization from "@/hocs/withAuth.hoc";
import InvoiceSinglePage from "@/components/invoice/InvoiceSinglePage";

const ProductView = () => {
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
                Invoice
              </div>
              {/* <div className=" grow ">
                <input type="text" placeholder="Search"className="pl-3 grow border-2 border-searchbordercolor rounded-100px outline-none"/>
              </div> */}
              {/* <div className="">
                <Link href="./productCreate"><button className="bg-orange1 text-white h-46 w-148 rounded-5px">Add Product</button></Link>
              </div> */}
            </div>
            <InvoiceSinglePage></InvoiceSinglePage>
          </div>
        </div>
        </div>
      </div>
    </Authorization>
  );
};

export default ProductView;