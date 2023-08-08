"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import { AppDispatch } from "@/store";
import { createNewAccount } from "@/store/slices/auth/createNewAccount.slice";

export interface CreateNewAccountData {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  login_method :string;
}

const CreateNewAccountForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateNewAccountData>({ mode: "all" });

  const onSubmit = (data:CreateNewAccountData) => {
    dispatch(createNewAccount(data));
  }

  useEffect(()=>{
    console.log(errors);
  },[errors]);

  const [passwordEye, setPasswordEye ] = useState(false);

  const handlepasswordeyeclick = () => {
    setPasswordEye(!passwordEye);
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="pl-43 ">
          <label className=" font-Poppins">
            <h4 className=" pb-2">First name</h4>
          </label>
          <input
            {...register("first_name", {
              required: { value: true, message: "*First name is required." },
              min:1,
              max:100
            })}
            type="text"
            placeholder="Enter First name"
            className={`pl-4 w-376  h-43 rounded-5px border ${errors.first_name && "focus:border-red-500 focus:ring-red-500 border-red-500"}`} 
          />
          <div className=" text-red-500 italic text-sm ">{errors.first_name?.message}</div>
          <label className=" font-Poppins">
            <h4 className=" pb-2 mt-6">Last name</h4>
          </label>
          <input
            {...register("last_name", {
              required: { value: true, message: "*Last name is required." },
              min:1,
              max:100
            })}
            type="text"
            placeholder="Enter Last name"
            className={`pl-4 w-376  h-43 rounded-5px border ${errors.last_name && "focus:border-red-500 focus:ring-red-500 border-red-500"}`}
          />
          <div className=" text-red-500 italic text-sm ">{errors.last_name?.message}</div>
          <label className=" font-Poppins">
            <h4 className=" pb-2 mt-6">Username</h4>
          </label>
          <input
            {...register("username", {
              required: { value: true, message: "*Username is required." },
              pattern: /^[\w.@+-]+$/,
              max: 150,
              minLength: 1
            })}
            type="text"
            placeholder="Enter Username"
            className={`pl-4 w-376  h-43 rounded-5px border ${errors.username && "focus:border-red-500 focus:ring-red-500 border-red-500"}`}
          />
          <div className=" text-red-500 italic text-sm ">{errors.username?.message}</div>
          <label className=" font-Poppins ">
            <h4 className=" pb-2 mt-6">Email Address</h4>
          </label>
          <input
            {...register("email", {
              required: { value: true, message: "*Email is required." },
              min: 8,
              max:254,
              pattern: {value:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,message:"*Invalid email pattern"}
            })}
            type="text"
            placeholder="Enter Email Address"
            className={`pl-4 w-376  h-43 rounded-5px border ${errors.email && "focus:border-red-500 focus:ring-red-500 border-red-500"}`}
          />
          <div className=" text-red-500 italic text-sm mb-6">{errors.email?.message}</div>
          {/* <label className=" font-Poppins ">Picture:</label>
                    <input
                      {...register("image")}
                      type="file"
                    /> */}
          <label className=" font-Poppins">
            <h4 className=" pb-2 mt-6">Password</h4>
          </label>
          <div className={`flex  w-376  h-43 rounded-5px border relative items-center ${errors.password && "focus:border-red-500 focus:ring-red-500 border-red-500"}`}>
          <input
            {...register("password", {
              required: { value: true, message: "*Password is required." },
              pattern: {value:/^.{8,20}$/,message:"Password should be at least 8 characters."}
            })}
            type={(passwordEye === false)? 'password' : 'text'}
            placeholder="Enter Password"
            className='outline-none h-10 flex-grow bg-transparent pl-4'
          />
          <div className='text-2xl opacity-30 absolute top-2 right-5'>
            {
              (passwordEye === false )? <AiFillEyeInvisible onClick={()=>handlepasswordeyeclick()}/> : <AiFillEye onClick={()=>handlepasswordeyeclick()}/>
            }
          </div>
          </div>
          <div className=" text-red-500 italic text-sm ">{errors.password?.message}</div>
          <div className=" font-Poppins mt-6">
                    <select
                      {...register("login_method", { required: {value:true, message:"*Choose Login method." }})}
                      defaultValue="">
                      <option value="" disabled>Select Login method</option>
                      <option value="E">E</option>
                      <option value="G">G</option>
                      <option value="F">F</option>
                    </select>
            </div>
            <div className=" text-red-500 italic text-sm mb-6">{errors.login_method?.message}</div>

          <div>
            <button className=" h-52 w-376 bg bg-orange1 rounded-5px text-white mt-30px">
              Create Account
            </button>
          </div>
        </div>
        <div className="flex pt-3.5 items-center justify-center space-x-1">
          <div>Have an account??</div>
          <button className=" text-orange1 underline underline-offset-2">
            <Link href={"../auth/login"}>Sign in</Link>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNewAccountForm;
