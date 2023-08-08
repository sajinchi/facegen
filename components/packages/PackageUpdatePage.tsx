"use client";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import { IPackage } from "@/types/packages";
import { GetSinglePackage } from "@/services/packages/package.getsingle.service";
import { UpdatePackageService } from "@/services/packages/package.update.service";

interface PackageUpdateData {
  description: string;
  amount: number;
}

const PackageUpdatePage = () => {
  const router = useRouter();
  const [pack, setPack] = useState<IPackage>();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const getSinglePackage = async (id: string) => {
    const res = await GetSinglePackage(id);
    let result: IPackage = {
      amount: res.data?.amount!,
      description: res.data?.description!,
      id: res.data?.id!,
      name: res.data?.name!,
      paymentTypes: res.data?.paymentTypes!,
      type: res.data?.type!,
    };
    setPack(result);
  };

  useEffect(() => {
    if (id) {
      getSinglePackage(id);
    }
  }, []);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ mode: "all" });

  const onSubmit = async (data: PackageUpdateData) => {
    let resp = await UpdatePackageService(id!, data.description, data.amount);
    console.log(resp);
    if (resp?.status == 200) {
      router.push("./packageList");
    }
  };
  return (
    <div className="p-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className=" font-Poppins">
          <h4 className=" py-2">Description</h4>
        </label>
        <input
          {...register("description", {
            required: { value: true, message: "*Description is required" },
          })}
          type="text"
          placeholder="Enter new description"
          defaultValue={pack?.description}
          className="pl-4 w-full  h-43 rounded-5px border outline-none"
        />
        <label className=" font-Poppins">
          <h4 className=" py-2">Amount</h4>
        </label>
        <input
          {...register("amount", {
            required: { value: true, message: "*Amount is required" },
            min: 1,
          })}
          type="text"
          placeholder="Enter new amount"
          defaultValue={pack?.amount}
          className={`pl-4 w-376  h-43 rounded-5px border outline-none ${
            errors.amount &&
            "focus:border-red-500 focus:ring-red-500 border-red-500"
          }`}
        />
        <div className="flex flex-row p-9 space-x-1 justify-end">
          <button className=" h-46 w-148 bg-orange1 rounded-md text-white">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default PackageUpdatePage;
