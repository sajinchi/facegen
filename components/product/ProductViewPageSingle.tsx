"use client";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { GetSingleProduct, IGetSingleProductsResponse } from "@/services/product/product.getSingle.service";
import { RootState } from "@/store";
import { IProduct } from "@/types/IProductState";
import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";

const ProductViewPageSingle = () => {
  const [product, setProduct] = useState<IProduct>();
  const searchParams = useSearchParams();
  const data = searchParams.get("id");

  const getSingle = async (data: string) => {
    const pro = await GetSingleProduct(data);
    const prod: IProduct = pro.data!;
    setProduct(prod);
  };
  
  useEffect(()=>{
    if (data) {
      getSingle(data);
    }
  },[]);

  return (
    <div className="p-6 bg-white">
      <div className="flex flex-row items-center space-x-5" >
        <div><Link href="./productView"><AiOutlineArrowLeft></AiOutlineArrowLeft></Link></div>
      <div>Single Product</div>
      </div>
      <div className="flex flex-row items-center">
        <div className="px-6 py-3 border">
          <Image
            src={product?.images[0].image_url}
            height={150}
            width={150}
            alt={""}
          />
        </div>
        <div>
          <div className="px-6 py-3">Name: {product?.name}</div>
          <div className="px-6 py-3">Inventory: {product?.inventory}</div>
          <div className="px-6 py-3">Discount Amount: {product?.discount_amount}</div>
          <div className="px-6 py-3">Description: {product?.description}</div>
          <div className="px-6 py-3">Amount: {product?.amount}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductViewPageSingle;
