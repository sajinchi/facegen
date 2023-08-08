import Image from "next/image";
import { format, parseISO } from "date-fns";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import { SingleInvoice } from "@/services/invoices/invoice.getsingle.service";
import { IInvoice } from "@/types/IInvoiceState";
import { UserSingle } from "@/services/user/usergetsingle.service";
import { IUserData } from "@/types/IUserData";
import { GetSinglePackage } from "@/services/packages/package.getsingle.service";
import { IPackage } from "@/types/packages";
import { GetSinglePayment } from "@/services/payment/payment.getsingle.service";

const InvoiceSinglePage = () => {
  const [invoice, setInvoice] = useState<IInvoice>();
  const [invoiceState, setInvoiceState] = useState(false);
  const [user, setUser] = useState<IUserData>();
  const [pack, setPack] = useState<IPackage>();

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const getSingle = async (id: string) => {
    const res = await SingleInvoice(id);
    setInvoice(res.data);
    if (res) {
      setInvoiceState(true);

      let userres = await UserSingle(res.data?.user!);
      setUser(userres.data);
      
      let packageres = await GetSinglePackage(res.data?.subscription_invoice_item.package!);
      setPack(packageres.data);
      console.log(packageres);

      let paymentres = await GetSinglePayment(packageres.data?.paymentTypes[0].id!);
      // console.log(paymentres.data);
    }
  };

  const dateExtract = (data: string) => {
    const date = parseISO(data);
    const extractedDate = format(date, "MMMM dd, yyyy");
    return extractedDate;
  };

  useEffect(() => {
    if (id) {
      getSingle(id);
    }
  }, []);
  return (
    <div className="p-6 space-y-9">
       {Boolean(invoiceState == true) && (<>
      <div className="flex items-center">
        <div className="grow">
          <Image src="" height={41} width={129.18} alt={"logo"}></Image>
        </div>
        <span className="text-3xl text-red-600">Facegen</span>
      </div>
      <div className="flex ">
        <div className="grow">
          <div>Hello, {user?.username}</div>
          <div>Thank you for Subscribing</div>
        </div>
        <div>
          <div>Order no:</div>
          <div>
            {dateExtract(invoice?.created_at!)}
            </div>
        </div>
      </div>
      <div>{invoice?.subscription_invoice_item.description}</div>
      <table className=" text-left w-full ">
        <thead>
          <tr className=" bg-white font-medium h-14 w-max dark:bg-tablecolor1">
            <th className="px-6 py-3">Package</th>
            <th className="px-6 py-3">Subscription Start Date</th>
            <th className="px-6 py-3">Subscription End Date</th>
            <th className="px-6 py-3">Unit Amount</th>
            <th className="px-6 py-3">Sub Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-6 py-3 text-red-500">{pack?.name}</td>
            <td className="px-6 py-3">
              {dateExtract(invoice?.subscription_invoice_item.current_period_start!)}
            </td>
            <td className="px-6 py-3">
              {dateExtract(invoice?.subscription_invoice_item.current_period_end!)}
            </td>
            <td className="px-6 py-3">{invoice?.subscription_invoice_item.monthly_amount}</td>
            <td className="px-6 py-3"></td>
          </tr>
              
        </tbody>
      </table>
      <div className="text-right">Total</div>
      <div>
        <div className="">PAYMENT METHOD</div>
        <div className="">Type: {pack?.paymentTypes[0].type}</div>
        <div className=""></div>
      </div>
      {/* <div>ID: {invoice?.id}</div>
      <div>Is Paid: {invoice?.is_paid}</div>
      <div>Products Invoice Items: {invoice?.products_invoice_items}</div>
      <div>Updated at: {invoice?.updated_at}</div>
      <div>User: {user?.username}</div>
      <div className="p-5">
        Subscription Invoice Item:
        <div> Created at: {invoice?.subscription_invoice_item.created_at}</div>
        <div> Name: {invoice?.subscription_invoice_item.name}</div>
        
        <div>
          {" "}
          Description: {invoice?.subscription_invoice_item.description}
        </div>
        <div>
          {" "}
          Monthly Amount: {invoice?.subscription_invoice_item.monthly_amount}
        </div>
        <div> Package: {invoice?.subscription_invoice_item.package}</div>
        <div> Updated at: {invoice?.subscription_invoice_item.updated_at}</div>
      </div> */}
     </>)}
    </div>
  );
};

export default InvoiceSinglePage;
