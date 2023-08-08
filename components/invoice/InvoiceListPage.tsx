"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { AiOutlineEye } from "react-icons/ai";
import { GrDocumentDownload } from "react-icons/gr";

import { AppDispatch, RootState } from "@/store";
import { InvoiceData } from "@/store/types/states/IInvoiceState";
import { getinvoice } from "@/store/slices/invoice/invoice.slice";
import { StoreStatusEnum } from "@/store/types/commons/StoreStatusEnum";
import { DeleteInvoice } from "@/services/invoices/invoice.delete.service";
import { DownloadInvoice } from "@/services/invoices/invoice.download.service";
import { UserSingle } from "@/services/user/usergetsingle.service";

const InvoiceList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.auth.accessToken);
  const data: InvoiceData = useSelector((state: RootState) => state.invoice);
  useEffect(() => {
    dispatch(getinvoice(token));
  }, [token]);

  const deleteInvoice = async(id: string) => {
   let res = await DeleteInvoice(id, token);
   if (res.status = 200){
    dispatch(getinvoice(token));
   }
  };

  const downloadInvoice = async (id: string) => {
    const file = await DownloadInvoice(id);
    if (file?.status == 200) {
      let url = window.URL || window.webkitURL;
      const link = url.createObjectURL(file.data);
      var a = document.createElement("a");
      a.setAttribute("download", id + '.pdf');
      a.setAttribute("href", link);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const userdata = async(id:string) => {
    let user = await UserSingle(id);
    console.log(userdata);
    return user.data?.username;
  }
  return (
    <div>
      <table className="align-middle text-left w-full ">
        <thead>
          <tr className=" bg-white font-medium h-14 w-max dark:bg-tablecolor1">
            <th className="px-6 py-3">ID</th>
            <th className="px-6 py-3">Created At</th>
            <th className="px-6 py-3">Updated At</th>
            <th className="px-6 py-3">Is Paid</th>
            <th className="px-6 py-3">User</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {Boolean(data.status == StoreStatusEnum.SUCCESS) && (
            <>
              {data.data.map((data, index) => {
                return (
                  <tr
                    key={index}
                    className="font-medium odd:bg-white even:dark:bg-tablecolor1 h-14"
                  >
                    <td className="px-6 py-3">{data.id}</td>
                    <td className="px-6 py-3">{data.created_at}</td>
                    <td className="px-6 py-3">{data.updated_at}</td>
                    <td className="px-6 py-3">
                      {Boolean(data.is_paid == true) && <>Paid</>}
                      {Boolean(data.is_paid == false) && <>Not Paid</>}
                    </td>
                    <td className="px-6 py-3">{data.user}</td>
                    <td className="px-6 py-3">
                      <span className="flex flex-row items-center space-x-3 text-xl">
                        <div>
                          <Link
                            href={{
                              pathname: "./invoiceSingle",
                              query: "id=" + data.id,
                            }}
                          >
                            <button>
                              <AiOutlineEye />
                            </button>
                          </Link>
                        </div>
                        <div>
                          <button onClick={() => downloadInvoice(data.id)}>
                            <GrDocumentDownload />
                          </button>
                        </div>
                        <div>
                          <button onClick={() => deleteInvoice(data.id)}>
                            <MdOutlineDeleteOutline />
                          </button>
                        </div>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </>
          )}
        </tbody>
      </table>
      {Boolean(data.status == StoreStatusEnum.IDLE) && <>{data.status}</>}
      {Boolean(data.status == StoreStatusEnum.LOADING) && (
        <>
          <div className=" py-5">
            <span className=" text-center">
              <span role="status">
                <svg
                  aria-hidden="true"
                  className="inline w-full h-8 mr-2 text-gray-200 animate-spin dark:text-gray-200 fill-orange1"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </span>
            </span>
          </div>
        </>
      )}
      {Boolean(data.status == StoreStatusEnum.ERROR) && <>{data.status}</>}
    </div>
  );
};

export default InvoiceList;