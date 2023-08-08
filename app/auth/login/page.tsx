"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import LoginForm from "@/components/auth/LoginForm";
import { RootState } from "@/store";

const Login = () => {
  const router = useRouter();
  const authState = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (authState.status == "SUCCESS") {
      router.push("/product/productView");
    }
  }, [authState]);

  return (
    <div className=" bg-bg h-full w-full">
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
          Sign in to your account
        </div>
        <LoginForm></LoginForm>
      </div>
    </div>
  );
};

export default Login;
