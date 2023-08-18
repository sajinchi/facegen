"use client";
import { AppDispatch, RootState } from "@/store";
import { ICartState, addtocart, removefromcart, subtractfromcart } from "@/store/slices/cart/cart.slice";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Image from "next/image";

import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

const CartPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const cartitems: ICartState = useSelector((state: RootState) => state.cart);
  let totalAmount:number = 0;

  cartitems.data.forEach((product) => {
    totalAmount += product.product.amount * product.quantity;
  });

  return (
    <div className=" items-center py-6">
      <table className="align-middle text-left w-full  ">
        <thead>
          <tr className=" bg-white font-medium h-14 w-max dark:bg-tablecolor1">
            <th className="px-6 py-3 text-center" colSpan={2}>Items</th>
            <th className="px-6 py-3 text-center">ID</th>
            <th className="px-6 py-3 text-center">Quantity</th>
            <th className="px-6 py-3 text-center">Price</th>
            <th className="px-6 py-3 text-center">Amount</th>
            <th className="px-6 py-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {cartitems.data.map((product, index) => {
            return (
              <tr className=" odd:bg-white even:dark:bg-tablecolor1">
                <td className="px-6 py-3 text-center">
                  {product?.product.images.map((image) => {
                    return (
                      <div className=" flex flex-row">
                        <Image
                          src={image.image_url}
                          height={100}
                          width={100}
                          alt={""}
                          className="p-3 border"
                        />
                      </div>
                    );
                  })}
                </td>
                <td className="px-6 py-3 text-center">{product.product.name}</td>
                <td className="px-6 py-3 text-center">{product.id}</td>
                <td className="px-6 py-3 text-center">
                  <button
                    className="mx-2 px-3 py-1 bg-slate-200 hover:bg-slate-300 rounded-md"
                    onClick={() => dispatch(subtractfromcart(product.product))}
                  >
                    -
                  </button>
                  {product.quantity}
                  <button
                    className="mx-2 px-3 py-1 bg-slate-200 hover:bg-slate-300 rounded-md"
                    onClick={() => dispatch(addtocart(product.product))}
                  >
                    +
                  </button>
                </td>
                <td className="px-6 py-3 text-center">{product.product.amount}</td>
                <td className="px-6 py-3 text-center">
                  {product.product.amount * product.quantity}
                </td>
                <td className="px-6 py-3 text-center">
                  <button onClick={() => dispatch(removefromcart(product.id))}>
                    <AiFillDelete></AiFillDelete>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="font-medium items-center text-center m-8">
        Total: {totalAmount}
      </div>
      <div className="grow items-center text-right p-6">
          <button className="bg-orange1 text-white h-46 w-148 rounded-5px" onClick={()=>router.push('../checkoutdetails')}>
            Checkout
          </button>
      </div>
    </div>
  );
};

export default CartPage;
