"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import { LoginFormData } from "@/store/types/states/IAuthState";
import { login } from "@/store/slices/auth/auth.slice";
import { AppDispatch } from "@/store";

const LoginForm = () => {
  const [passwordEye, setPasswordEye ] =useState(false);

  const handlepasswordeyeclick = () => {
    setPasswordEye(!passwordEye);
  }
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ mode: "all" });
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = (data: LoginFormData) => {
    dispatch(login(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="pl-43 ">
        <div>
          <label className=" font-Poppins">
            <h4 className=" pb-2">Username</h4>
          </label>
          <input
            {...register("username", {
              required: { value: true, message: "*Username is required" },
              min: 1,
              pattern: {value:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,message:"Invalid email pattern"}
            })}
            type="text"
            placeholder="Enter your email"
            className={`pl-2 w-376  h-43 rounded-5px border ${errors.username && "focus:border-red-500 focus:ring-red-500 border-red-500"}`}
          />
          <div className=" text-red-500 italic text-sm ">{errors.username?.message}</div>
          <label className=" font-Poppins">
            <h4 className="pt-6 pb-2">Password</h4>
          </label>
          <div className={`" flex  w-376  h-43 rounded-5px border relative items-center ${errors.password && "focus:border-red-500 focus:ring-red-500 border-red-500"}"`}>
          <input
          {...register('password',{required:{value:true,message:'*Password is required'}})}
            type={(passwordEye === false)? 'password' : 'text'}
            placeholder="Enter Password"
            className='outline-none h-10 flex-grow bg-transparent pl-2'
          />
          <div className='text-2xl opacity-30 absolute top-2 right-5'>
            {
              (passwordEye === false )? <AiFillEyeInvisible onClick={()=>handlepasswordeyeclick()}/> : <AiFillEye onClick={()=>handlepasswordeyeclick()}/>
            }
          </div>
          </div>
          <div className=" text-red-500 italic text-sm ">{errors.password?.message}</div>
        </div>
        <div className=" flex flex-row  pt-5 pb-23">
          <div className="grow items-center">
            <input type="checkbox" /> Remember me
          </div>
          <div className="grow">
            <button>
              <Link href={"../auth/forgotPassword"}>Forgot Password?</Link>
            </button>
          </div>
        </div>
        <div>
          <button className=" h-52 w-376 bg bg-orange1 rounded-5px text-white">
            Sign me in
          </button>
        </div>
        <div className="flex pt-3.5 items-center justify-center space-x-1">
          <div>Don't have an account?</div>
          <button className=" text-orange1 underline underline-offset-2">
            <Link href={"../auth/register"}>Sign up</Link>
          </button>
        </div>
        <div className="flex flex-row items-center space-x-5 justify-center pt-88 ">
          <div>Continue with</div>
          <div>
            <Image
              src="/Google.png"
              width={32}
              height={32}
              alt=""
              className=" items-center"
            />
          </div>
          <div>
            <Image
              src="/Facebook.png"
              width={32}
              height={32}
              alt=""
              className=" items-center"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
