import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { usePathname } from "next/navigation";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useDispatch } from "react-redux";

import { AppDispatch } from "@/store";
import { resetpassword } from "@/store/slices/auth/resetpassword.slice";

export interface ResetPasswordData {
  password: string;
  repassword: string;
  token: string;
  uid: string;
}

const ResetPasswordForm = () => {
  const [passwordEye, setPasswordEye] = useState(false);
  const [rePasswordEye, setRePasswordEye] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const handlepasswordeyeclick = () => {
    setPasswordEye(!passwordEye);
  };
  const handlerepasswordeyeclick = () => {
    setRePasswordEye(!rePasswordEye);
  };

  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm<ResetPasswordData>({ mode: "all" });

  const password = watch("password");

  const path = usePathname();
  const onSubmit = (data: ResetPasswordData) => {
    const patharr = path.split("/");
    let arrlen: number = patharr.length;
    const token = patharr[arrlen - 1];
    const uid = patharr[arrlen - 2];
    const newdata = { ...data, token, uid };
    dispatch(resetpassword(newdata));
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="pl-43 ">
          <label className=" font-Poppins">
            <h4 className=" pb-2">Password</h4>
          </label>
          <div
            className={`flex  w-376  h-43 rounded-5px border relative items-center ${
              errors.password &&
              "focus:border-red-500 focus:ring-red-500 border-red-500"
            }`}
          >
            <input
              {...register("password", {
                required: { value: true, message: "*Password is required" },
                pattern: {
                  value: /^.{8,20}$/,
                  message: "Password should be at least 8 characters.",
                },
              })}
              type={passwordEye === false ? "password" : "text"}
              placeholder="Enter Password"
              className="outline-none h-10 flex-grow bg-transparent pl-2"
            />
            <div className="text-2xl opacity-30 absolute top-2 right-5">
              {passwordEye === false ? (
                <AiFillEyeInvisible onClick={() => handlepasswordeyeclick()} />
              ) : (
                <AiFillEye onClick={() => handlepasswordeyeclick()} />
              )}
            </div>
          </div>
          <div className=" text-red-500 italic text-sm mb-6">
            {errors.password?.message}
          </div>
          <label className=" font-Poppins ">
            <h4 className=" pb-2 mt-6">Re-enter Password</h4>
          </label>
          <div
            className={`flex  w-376  h-43 rounded-5px border relative items-center ${
              errors.repassword &&
              "focus:border-red-500 focus:ring-red-500 border-red-500"
            }`}
          >
            <input
              {...register("repassword", {
                required: { value: true, message: "*Password is required" },
                validate: (value) =>
                  value == password || "*Password do not match",
              })}
              type={rePasswordEye === false ? "password" : "text"}
              placeholder="Re-enter password "
              className="outline-none h-10 flex-grow bg-transparent pl-2"
            />
            <div className="text-2xl opacity-30 absolute top-2 right-5">
              {rePasswordEye === false ? (
                <AiFillEyeInvisible
                  onClick={() => handlerepasswordeyeclick()}
                />
              ) : (
                <AiFillEye onClick={() => handlerepasswordeyeclick()} />
              )}
            </div>
          </div>
          <div className=" text-red-500 italic text-sm mb-6">
            {errors.repassword?.message}
          </div>
          <div>
            <button className=" h-52 w-376 bg bg-orange1 rounded-5px text-white mt-30px">
              Reset Password
            </button>
          </div>
          <div className="flex flex-row w-376 font-Poppins font-normal italic text-xs pt-2 space-x-1">
            <div className="text-orange1">*</div>
            <div>
              Password must contain at least 8 characters with one small letter,
              one capital letter and a symbol.
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
