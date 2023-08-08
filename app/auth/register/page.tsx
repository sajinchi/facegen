"use client";
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';

import CreateNewAccountForm from '@/components/auth/CreateNewAccountForm';

const CreateNewAccount = () => {

  const [successModal, setSuccessModal] = useState(false);

  const newuserdata = useSelector((state:RootState) => state.newaccount);
  
  console.log(newuserdata.status);

  useEffect(()=>{
    if (newuserdata.status == "SUCCESS") {
      setSuccessModal(!successModal);
    } 
  },[newuserdata])
  return (

      <div className=" bg-bg h-full w-full">
        {successModal ? (
      <div className="flex justify-right items-start overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className=' flex flex-row  space-x-3 p-2 bg-green-400 rounded-md'>
                <div>New Account created</div> 
                <button onClick={()=>setSuccessModal(!successModal)}>x</button>
                </div>
              </div>
              </div>
            </div>
      ): null}
      <div className=" w-463 h-auto shadow-md m-auto mt-5 bg-white">
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
          Create new account
        </div>
        <CreateNewAccountForm></CreateNewAccountForm>
      </div>
    </div>
  );
}

export default CreateNewAccount;
