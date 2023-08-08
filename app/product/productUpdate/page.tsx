"use client";
import React from "react";

import ProductUpdatePage from "@/components/product/ProductUpdatePage";
import Authorization from "@/hocs/withAuth.hoc";
import Navbar from "@/components/sideNavbar/page";
import Topbar from "@/components/topbar/page";

const ProductUpdate = () => {
  return (
    <Authorization>
      <div className=" bg-tablecolor1">
        <div className="flex flex-row">
          <Navbar></Navbar>
          <div className="grow flex flex-col">
            <Topbar></Topbar>
            <div className=" w-1166 h-auto shadow-md m-auto mt-5 bg-white">
              <div className="flex flex-row items-center h-20 p-6">
                <div className=" font-Poppins text-xl pl-43 pt-42 pb-23">
                  Create Product
                </div>
              </div>
              <ProductUpdatePage></ProductUpdatePage>
            </div>
          </div>
        </div>
      </div>
    </Authorization>
  );
};

export default ProductUpdate;
