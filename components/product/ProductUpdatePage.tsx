"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form'
import { useRouter, useSearchParams } from 'next/navigation';

import { IImage } from './ProductCreatePage';
import { IProduct } from '@/types/IProductState';
import { UpdateProductService } from '@/services/product/product.update.service';
import { handleFileUpload } from '@/services/product/product.imageupload.service';
import { GetSingleProduct, IGetSingleProductsResponse } from '@/services/product/product.getSingle.service';


export interface ProductUpdateData {
    name: string;
    amount: number;
    discount_amount: number;
    inventory: number;
    description: string;
    images:FileList;
    token:string;
  }

const ProductUpdatePage = () => {
    const router = useRouter();
    const [product, setProduct] = useState<IProduct>();
    const{register, handleSubmit, formState:{errors} } = useForm<ProductUpdateData>({mode:"all"});

    // const token = useSelector((state:RootState)=> state.auth.accessToken);
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
   
    
    const getSingle = async (id: string) => {
        const pro: IGetSingleProductsResponse = await GetSingleProduct(id);
        const prod: IProduct = pro.data!;
        setProduct(prod);
    };
    useEffect(()=>{
        if (id) {
        getSingle(id);
    }
    },[id]); 
    
        
    const onSubmit = async(updatedata:ProductUpdateData) => {
        let res = await handleFileUpload(updatedata.images);
        if( res.status == 200){
            let images:IImage[] = [];
            res.data.detial.forEach((image: string) => {
                let obj:IImage = {
                    image_url : image
                }
                images.push(obj);
            });
            let resp = await UpdateProductService(id!,updatedata.name,updatedata.amount,updatedata.discount_amount,updatedata.inventory,updatedata.description,images);
            console.log(resp);
            if(resp?.status == 200){
                router.push('./productView');
            }
        }
    }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <div className="p-9 space-y-4">
      <div className="flex flex-row space-x-6">
        <div className="flex flex-col">
          <label className=" font-Poppins">Name</label>
          <input
            {...register("name", {
              required: { value: true, message: "*Name is required." },
              min: 1,
              max: 150,
            })}
            type="text"
            defaultValue={product?.name}
            placeholder="Enter name of the product"
            className={`pl-3 w-376  h-43 rounded-5px border outline-none ${
              errors.name &&
              "focus:border-red-500 focus:ring-red-500 border-red-500"
            }`}
          />
          <div className=" text-red-500 italic text-sm ">
            {errors.name?.message}
          </div>
        </div>
        <div className="flex flex-col">
          <label className=" font-Poppins">Amount</label>
          <input
            {...register("amount", {
              required: { value: true, message: "*Amount is required." },
            })}
            type="text"
            defaultValue={product?.amount}
            placeholder="Enter the price"
            className={`pl-3 w-692  h-43 rounded-5px border outline-none ${
              errors.amount &&
              "focus:border-red-500 focus:ring-red-500 border-red-500"
            }`}
          />
          <div className=" text-red-500 italic text-sm ">
            {errors.amount?.message}
          </div>
        </div>
      </div>
      <div className="flex flex-row space-x-6">
        <div className="flex flex-col">
          <label className=" font-Poppins">Discount Amount</label>
          <input
            {...register("discount_amount", {
              required: {
                value: true,
                message: "*Discount amount is required.",
              },
              max:100
            })}
            type="text"
            defaultValue={product?.discount_amount}
            placeholder="Enter the Discount amount"
            className={`pl-3 w-376  h-43 rounded-5px border outline-none ${
              errors.discount_amount &&
              "focus:border-red-500 focus:ring-red-500 border-red-500"
            }`}
          />
          <div className=" text-red-500 italic text-sm ">
            {errors.discount_amount?.message}
          </div>
        </div>
        <div className="flex flex-col">
          <label className=" font-Poppins">Inventory</label>
          <input
            {...register("inventory", {
              required: { value: true, message: "*Inventory is required." },
            })}
            type="text"
            defaultValue={product?.inventory}
            placeholder="Enter the inventory"
            className={`pl-3 w-692  h-43 rounded-5px border outline-none ${
              errors.inventory &&
              "focus:border-red-500 focus:ring-red-500 border-red-500"
            }`}
          />
          <div className=" text-red-500 italic text-sm ">
            {errors.inventory?.message}
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <label className=" font-Poppins">Description</label>
        <textarea
          {...register("description", {
            required: { value: true, message: "Description is required" },
            min: 1,
            max: 500,
          })}
          defaultValue={product?.description}
          className={`pl-3 w-1089  h-20 rounded-5px border outline-none ${
            errors.description &&
            "focus:border-red-500 focus:ring-red-500 border-red-500"
          }`}
        />
        <div className=" text-red-500 italic text-sm ">
          {errors.description?.message}
        </div>
      </div>
      {/* <div className="flex flex-col"> */}
        {/* <div><label className=" font-Poppins">Images</label></div>
        <input
          type="file"
          multiple
          {...register("images")}
          defaultValue={product?.images}
        />
        <div className=" text-red-500 italic text-sm ">
        </div> */}
      </div>
    {/* </div> */}
    <div className="flex flex-row p-9 space-x-1 justify-end">
      <Link href="./productView"><button className=" h-46 w-99 hover:bg-slate-200 hover:text-slate-600 rounded-md">
        Cancel
      </button></Link>
      <button className=" h-46 w-148 bg-orange1 rounded-md text-white">
        Update
      </button>
    </div>
  </form>
  )
}

export default ProductUpdatePage;
