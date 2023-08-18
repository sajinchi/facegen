import React from 'react';
import { useForm } from 'react-hook-form';

const PackageCreatePage = () => {
    const { handleSubmit, register, formState: { errors } } = useForm({ mode: "all" });

    const onSubmit = () => {

    }

    return (
    <div className="p-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className=" font-Poppins">
          <h4 className=" py-2">Type</h4>
        </label>
        <input
          {...register("type", {
            required: { value: true, message: "*Type is required" },
          })}
          type="text"
          placeholder="Enter Type"
          className={`pl-4 w-376  h-43 rounded-5px border outline-none ${
            errors.type &&
            "focus:border-red-500 focus:ring-red-500 border-red-500"
          }`}
        />
        <label className=" font-Poppins">
          <h4 className=" py-2">Description</h4>
        </label>
        <input
          {...register("description", {
            required: { value: true, message: "*Description is required" },
          })}
          type="text"
          placeholder="Enter new description"
          className={`pl-4 w-376  h-43 rounded-5px border outline-none ${
            errors.description &&
            "focus:border-red-500 focus:ring-red-500 border-red-500"
          }`}
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
  )
}

export default PackageCreatePage
