import axios from "@/utils/axios";

import { INVOICE_GET_URL } from "@/constants/server.url";
import { INetwortRequestResponseState } from "@/store/types/states/INetworkRequestResponseState";
import { IInvoice } from "@/types/IInvoiceState";

export interface IGetInvoiceResponse extends INetwortRequestResponseState {
    data?: IInvoice,
}

export const SingleInvoice = async(id:String) => {
    try {
        let response = await axios.get(INVOICE_GET_URL+id+'/');
        let result:IGetInvoiceResponse ={
            status: response.status,
            message: response.statusText,
            data: response.data,
        }
        return result;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const result:IGetInvoiceResponse = {
                status: error.response!.status,
                message: error.response!.data.detail,
            };
            return result;    
        }else {
            const result:IGetInvoiceResponse = {
                status: 400,
                message: 'Unknown Error',
            };
            return result;
        }
    }

}