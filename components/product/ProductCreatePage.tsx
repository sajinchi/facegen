"use client";
import React from "react";
import Link from "next/link";
import mime from 'mime-types';
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { CreateProductService } from "@/services/product/product.create.service";
import { RootState } from "@/store";
import { handleFileUpload } from "@/services/product/product.imageupload.service";


export interface ProductCreateData {
  name: string;
  amount: number;
  discount_amount: number;
  inventory: number;
  description: string;
  images:FileList;
  token:string;
}
export interface IImage {
  image_url :string;
}


const ProductCreatePage = () => {
  const {
    register,
    handleSubmit, 
    formState: { errors },
  } = useForm<ProductCreateData>({ mode: "all" });
  let router = useRouter();
  
  const token = useSelector((state:RootState) => state.auth.accessToken );

  const validateFile = (fileList: FileList) => {
    const file = fileList;
    if (!file) {
      return '*Please select a file.';
    }
    
    const mimeType = mime.lookup(file[0]?.name);
    if (mimeType !== 'image/jpeg') {
      
      return '*Please select a JPEG image file.';
    }
    
    // return true;
  };
  
  const onSubmit = async(data: ProductCreateData) => {
    let res = await handleFileUpload(data.images);
    console.log(res);
    if( res.status == 200){
        let images:IImage[] = [];
        res.data.detial.forEach((image: string) => {
            let obj:IImage = {
                image_url : image
            }
            images.push(obj);
        });
        let resp = await CreateProductService(data.name,data.amount,data.discount_amount,data.inventory,data.description,images);
        console.log(resp?.status);
        if (resp?.status == 201){
            router.push('./productView');
        }
    }
    
  };

  return (
    <form className="bg-white" onSubmit={handleSubmit(onSubmit)}>
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
                pattern: {value:/^[0-9-]/,message:"*Enter number only"}
              })}
              type="text"
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
                max:100,
                pattern: {value:/^[0-9-]/,message:"*Enter number only"}
              })}
              type="text"
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
                pattern: {value:/^[0-9-]/,message:"*Enter number only"}
              })}
              type="text"
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
            className={`pl-3 w-1089  h-20 rounded-5px border outline-none ${
              errors.description &&
              "focus:border-red-500 focus:ring-red-500 border-red-500"
            }`}
          />
          <div className=" text-red-500 italic text-sm ">
            {errors.description?.message}
          </div>
        </div>
          <div><label className=" font-Poppins">Images</label></div>
          <input type="file" multiple {...register('images', { validate: validateFile })} />
          <div className=" text-red-500 italic text-sm ">
            {errors.images?.message}
          </div>
        </div>
      <div className="flex flex-row p-9 space-x-1 justify-end">
        <Link href="./productView"><button className=" h-46 w-99 hover:bg-slate-200 hover:text-slate-600 rounded-md">
          Cancel
        </button></Link>
        <button className=" h-46 w-148 bg-orange1 rounded-md text-white">
          Submit
        </button>
      </div>
    </form>
  );
};

export default ProductCreatePage;