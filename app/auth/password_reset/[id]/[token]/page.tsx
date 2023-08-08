"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

import ResetPasswordForm from '@/components/auth/ResetPasswordForm';

const ResetPassword = () => {
  const [successModal,setSuccessModal] = useState(false);
  const resetresponse = useSelector((state:RootState)=> state.resetpassword);
  
  useEffect(()=>{
    if (resetresponse.status == "ERROR") {
      setSuccessModal(!successModal);
    } 
  },[resetresponse])
  return (
    <div className=" bg-bg h-full w-full">
        {successModal ? (
      <div className="flex justify-right items-start overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className=' flex flex-row  space-x-3 p-2 bg-red-400 rounded-md'>
                <div>Password reset unsuccessful</div> 
                <button onClick={()=>setSuccessModal(!successModal)}>x</button>
                </div>
              </div>
              </div>
            </div>
      ): null}
      <div className=" w-463 h-680 shadow-md m-auto mt-5 bg-white">
        <div className="flex items-center justify-center pt-12 ">
          <Image
            src="/logo.png"
            width={144.31}
            height={46}
            alt=""
            className=" items-center"
          />
        </div>
        <div className=" font-Poppins text-xl pl-43 pt-42 pb-23">
          Reset Password
        </div>
        <ResetPasswordForm></ResetPasswordForm>
      </div>
    </div>
  );
}

export default ResetPassword;
