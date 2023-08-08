"use client";
import Navbar from "@/components/sideNavbar/page";
import Topbar from "@/components/topbar/page";
import ProductViewPageSingle from "@/components/product/ProductViewPageSingle";
import Authorization from "@/hocs/withAuth.hoc";

const ProductView = () => {
  return (
    <Authorization>
      <div className=" bg-tablecolor1 h-full w-full">
        <div className="flex flex-row">
          <Navbar></Navbar>
          <div className="grow flex flex-col">
            <Topbar></Topbar>
            <div className=" w-1166 h-auto shadow-md m-auto mt-5 bg-white">
              <div className="flex flex-row items-center h-20 p-6">
                <div className="grow font-Poppins text-xl">Product</div>
              </div>
              <ProductViewPageSingle></ProductViewPageSingle>
            </div>
          </div>
        </div>
      </div>
    </Authorization>
  );
};

export default ProductView;
