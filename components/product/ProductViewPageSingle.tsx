"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { GetSingleProduct } from "@/services/product/product.getSingle.service";
import { AppDispatch, RootState } from "@/store";
import { IProduct } from "@/types/IProductState";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { addtocart, subtractfromcart } from "@/store/slices/cart/cart.slice";
import { useDispatch, useSelector } from "react-redux";

export interface PurchaseData {
  id: string;
}

const ProductViewPageSingle = () => {
  const [product, setProduct] = useState<IProduct>();
  const [quantity, setQuantity] = useState(0);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const dispatch = useDispatch<AppDispatch>()
  const cart = useSelector((state:RootState)=>state.cart);
  
  const getquantity = () => {
    cart.data.forEach((datum)=>{
      if (datum.id == id) {
        setQuantity(datum.quantity);
      }
    })
  }

  const getSingle = async (data: string) => {
    const pro = await GetSingleProduct(data);
    const prod: IProduct = pro.data!;
    setProduct(prod);
  };

  useEffect(() => {
    if (id) {
      getSingle(id);
    }
  }, []);

  useEffect(()=>{
    if(product !== null){
      getquantity();
    }
  },[product]);

  useEffect(()=>{
      getquantity();
 },[cart.data]);


  return (
    <div className="p-6 bg-white">
      <div className="flex flex-row items-center space-x-5">
        <div>
          <Link href="./productView">
            <AiOutlineArrowLeft></AiOutlineArrowLeft>
          </Link>
        </div>
        <div>Single Product</div>
      </div>
      <div className="flex flex-row items-center">
        <div className="px-6 py-3 border">
          {product?.images.map((image) => {
            return (
              <div>
                <Image
                  src={image.image_url}
                  height={150}
                  width={150}
                  alt={""}
                  className="p-3 border"
                />
              </div>
            );
          })}
        </div>
        <div>
          <div className="px-6 py-3">Name: {product?.name}</div>
          <div className="px-6 py-3">Inventory: {product?.inventory}</div>
          <div className="px-6 py-3">Discount Amount: {product?.discount_amount}</div>
          <div className="px-6 py-3">Description: {product?.description}</div>
          <div className="px-6 py-3">Amount: {product?.amount}</div>
          <div className="px-6 py-3">Quantity: 
            <button className="mx-2 px-3 py-1 bg-slate-200 hover:bg-slate-300 rounded-md" onClick={()=>dispatch(subtractfromcart( product ))}>-</button>
            <span className="p-3 border rounded-md">{quantity}</span>
            <button className="mx-2 px-3 py-1 bg-slate-200 hover:bg-slate-300 rounded-md"  onClick={()=>dispatch(addtocart( product ))} >+</button>
          </div>
        </div>
      </div>
      {/* <div className="grow items-center text-right">
          <button onClick={()=>add(product!.id)}className="bg-orange1 text-white h-46 w-148 rounded-5px">
          Add to Cart
        </button>
        
      </div> */}
    </div>
  );
};

export default ProductViewPageSingle;
