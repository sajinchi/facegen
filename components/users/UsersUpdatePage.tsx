import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { RootState } from "@/store";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import mime from 'mime-types';

import { handleFileUpload } from "@/services/product/product.imageupload.service";
import { userUpdateService } from "@/services/user/userUpdate.service";

interface IUserUpdateData {
  firstname: string;
  lastname: string;
  username: string;
  image?: FileList;
}

const UsersUpdatePage = () => {
  const userdata = useSelector((state: RootState) => state.myuserdata);
  const [image_url,setImage_url] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm<IUserUpdateData>({ mode: "all" });
  let router = useRouter();

  const validateFile = (fileList: any) => {
    const file = fileList;
    if (!file) {
      return '*Please select a file.';
    }
    
    const mimeType = mime.lookup(file[0]?.name);
    if (mimeType !== 'image/jpeg') {
      
      return '*Please select a JPEG image file.';
    }   
  };

  const onSubmit = async(data:IUserUpdateData) => {
    console.log(data.image?.length);
    if(data.image?.length !== 0){
    let res = await handleFileUpload(data.image!);
    setImage_url(res.data.detial[0]);
    }
    console.log(image_url);
    let resp = await userUpdateService(data.firstname,data.lastname,data.username,image_url);
            if(resp?.status == 200){
                router.push('../home');
            }
  }
  return (
    <div className="p-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-row">
          <div>
            <label className=" font-Poppins">
              <h4 className=" pb-2">First Name</h4>
            </label>
            <input
              type="text"
              defaultValue={userdata.first_name}
              {...register("firstname", {
                required: { value: true, message: "*First Name is required." },
                min: 1,
                max: 100,
              })}
              className={`pl-2 w-376  h-43 rounded-5px border outline-none ${
                errors.firstname &&
                "focus:border-red-500 focus:ring-red-500 border-red-500"
              }`}
            />
            <div className=" text-red-500 italic text-sm ">
              {errors.firstname?.message}
            </div>
            <label className=" font-Poppins">
              <h4 className=" pt-6 pb-2">Last Name</h4>
            </label>
            <input
              type="text"
              defaultValue={userdata.last_name}
              {...register("lastname", {
                required: { value: true, message: "*Last Name is required." },
                min: 1,
                max: 100,
              })}
              className={`pl-2 w-376  h-43 rounded-5px border outline-none ${
                errors.lastname &&
                "focus:border-red-500 focus:ring-red-500 border-red-500"
              }`}
            />
            <div className=" text-red-500 italic text-sm ">
              {errors.lastname?.message}
            </div>
            <label className=" font-Poppins">
              <h4 className="pt-6 pb-2">Username</h4>
            </label>
            <input
              type="text"
              defaultValue={userdata.username}
              {...register("username", {
                required: { value: true, message: "*Username is required." },
                min: 1,
                max: 150,
                pattern:{value:/^[\w.@+-]+$/,message:"*Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only."}
              })}
              className={`pl-2 w-376  h-43 rounded-5px border outline-none ${
                errors.username &&
                "focus:border-red-500 focus:ring-red-500 border-red-500"
              }`}
            />
            <div className=" text-red-500 italic text-sm ">
              {errors.username?.message}
            </div>
          </div>
          <div className="p-6 grow items-center">
            <label className=" font-Poppins">
              <h4 className=" pb-2">Image</h4>
            </label>
            <Image
              src={userdata.image}
              height={40}
              width={40}
              alt={""}
            ></Image>
            <input type="file" {...register('image', { validate: validateFile })} />
            <div className=" text-red-500 italic text-sm ">
            {errors.image?.message}
          </div>
          </div>
        </div>
        <div className="flex flex-row p-9 space-x-1 justify-end">
          <Link href="../home">
            <button className=" h-46 w-99 hover:bg-slate-200 hover:text-slate-600 rounded-md">
              Cancel
            </button>
          </Link>
          <button className=" h-46 w-148 bg-orange1 rounded-md text-white">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UsersUpdatePage;
