"use client";
import React from 'react'
import Link from 'next/link';
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';

import { AppDispatch } from '@/store';
import { forgorpassword } from '@/store/slices/auth/forgotPassword.slice';

export interface ForgotPasswordData {
    email: string;
}

const ForgotPasswordForm = () => {

    const {register, formState:{errors}, handleSubmit} = useForm<ForgotPasswordData>({mode:"all"});
    const dispatch = useDispatch<AppDispatch>();
    
    const onSubmit = (data:ForgotPasswordData) => {
        dispatch(forgorpassword(data.email));
    }


  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="pl-43 ">
          <label className=" font-Poppins">
            <h4 className=" pb-2">Email Address</h4>
          </label>
          <input
          {...register('email',{required:{value:true,message:'*Email Address is required'},
          pattern: {value:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,message:"*Invalid email pattern"}})}
            type="text"
            placeholder="Enter Email Address"
            className="pl-4 w-376  h-43 rounded-5px border"
          />
          <div className=" text-red-500 italic text-sm ">{errors.email?.message}</div>
        <div>
          <button className=" h-52 w-376 bg bg-orange1 rounded-5px text-white mt-30px">
            Reset Link
          </button>
        </div>
        </div>
        <div className="flex pt-3.5 items-center justify-center space-x-1">
          <div>Remembered it?</div>
          <button className=" text-orange1 underline underline-offset-2">
          <Link href={"../auth/login"}>Sign in</Link>
          </button>
        </div>
      </form>
    </div>
  );
}

export default ForgotPasswordForm;
