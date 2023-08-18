"use client";
import Topbar from "@/components/topbar/page";
import React, { useEffect } from "react";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  IGetPurchaseResponse,
  StripePaymentService,
} from "@/services/purchase/purchase.service";
import { useRouter } from "next/navigation";

const PaymentSelection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart);
  const router = useRouter();

  const idAndQuantityArray = cartItems.data.map((product) => ({
    product: product.id,
    quantity: product.quantity,
  }));

  const pay = async () => {
    const payment_gateway = "Str";
    let response: IGetPurchaseResponse = await StripePaymentService(
      payment_gateway,
      idAndQuantityArray
    );
    console.log(response);
    if (response.status == 200) {
      router.push(response.data!);
    }
  };

  return (
    <div className="bg-slate-50 h-screen w-screen">
      <Topbar></Topbar>
      <div className="bg-white m-5">
        <div className="text-lg font-semibold m-5">
          Select your payment method
        </div>
        <button className="hover:border" onClick={() => setIsOpen(true)}>
          <Image
            src={"/stripe-icon-23.jpg"}
            height={100}
            width={200}
            alt={"Stripe"}
          ></Image>
        </button>
        <div>
          <Transition appear show={isOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-10"
              onClose={() => setIsOpen(false)}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-100"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        Stripe
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          You will be redirected to your Stripe account to
                          complete your payment:
                        </p>
                      </div>

                      <div className="mt-4 space-x-2">
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-orange-100 px-4 py-2 text-sm font-medium hover:text-orange-500 hover:bg-orange-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
                          onClick={() => pay()}
                        >
                          Pay Now
                        </button>
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium hover:text-orange-500 hover:bg-orange-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                          onClick={() => setIsOpen(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </div>
      </div>
    </div>
  );
};

export default PaymentSelection;
