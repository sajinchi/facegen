import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

import { IPackage } from "@/types/packages";
import { GetSinglePackage, IPackageResponse } from "@/services/packages/package.getsingle.service";
import { SubscribeService } from "@/services/subscription/subscription.create.service";

// interface PackagePaymentData {
//   created_at: string;
//   deleted_at: null;
//   id: string;
//   is_up_to_date: boolean;
//   package: string;
//   payment_portal_id: string;
//   payment_portal_price_id: string;
//   type: string;
//   updated_at: string;
// }
// interface IPackageData extends PackagePaymentData {
//   id: string;
//   name: string;
//   amount: number;
//   description: string;
//   paymentType: PackagePaymentData[];
// }
const PackageSinglePage = () => {
  const [pack, setPack] = useState<IPackage>();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const getSinglePackage = async (id: string) => {
    const res: IPackageResponse = await GetSinglePackage(id);
    let result: IPackage = {
      amount: res.data?.amount!,
      description: res.data?.description!,
      id: res.data?.id!,
      name: res.data?.name!,
      paymentTypes: res.data?.paymentTypes!,
      type: res.data?.type!
    };
    setPack(result);
  };

  useEffect(() => {
    if (id) {
      getSinglePackage(id);
    }
  }, []);
  const subscribe = () => {
    let response = SubscribeService(pack?.id!);
  }

  return (
    <div className="p-6 bg-white">
      <div className="flex flex-row items-center space-x-2">
        <div>
          <Link href="./packageList">
            <AiOutlineArrowLeft></AiOutlineArrowLeft>
          </Link>
        </div>
        <div className=" font-Poppins text-xl">Single Package</div>
      </div>
      <div className="flex  items-center font-Poppins500">
        <div>
          <div className="px-6 py-3 text-lg"><span className="font-bold">Name:</span> {pack?.name}</div>
          <div className="px-6 py-3 text-lg"><span className="font-bold">Amount:</span> {pack?.amount}</div>
          <div className="px-6 py-3 text-lg"><span className="font-bold">Description:</span> {pack?.description}</div>
          <div className="px-6 py-3 text-lg"><span className="font-bold">ID:</span> {pack?.id}</div>
          <div className="px-6 py-3 text-lg"><span className="font-bold">Type:</span> {pack?.type}</div>
          <div className="px-6 py-3 text-lg">
            <span className="font-bold">Payment Type:</span>
            {pack?.paymentTypes.map((pay, index) => {
              return (
                <div key={index}>
                  <div><span className="font-bold">Created at:</span> {pay.created_at}</div>
                  <div><span className="font-bold">Payment ID:</span> {pay.id}</div>
                  <div><span className="font-bold">Payment Portal:</span> {pay.payment_portal_id}</div>
                  <div><span className="font-bold">Payment Type:</span> {pay.type}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
        <button className=" h-46 w-148 bg-orange1 rounded-md text-white" onClick={()=>subscribe()}>Subscribe</button>
    </div>
  );
};

export default PackageSinglePage;
