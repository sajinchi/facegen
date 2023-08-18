import axios from "@/utils/axios";

import { INVOICE_GET_URL } from "@/constants/server.url";
import { INetwortRequestResponseState } from "@/store/types/states/INetworkRequestResponseState";
import { IInvoiceData } from "@/store/types/states/IInvoiceState";

export interface IGetSingleInvoiceResponse extends INetwortRequestResponseState {
    data?: IInvoiceData[],
}

export const getInvoice = async() => {
    try {
        let response = await axios.get(INVOICE_GET_URL)
        const result:IGetSingleInvoiceResponse ={
            status: response.status,
            message: response.statusText,
            data: response.data,
        }
        return result;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const result:IGetSingleInvoiceResponse = {
                status: error.response!.status,
                message: error.response!.data.detail,
            };
            return result;    
        }else {
            const result:IGetSingleInvoiceResponse = {
                status: 400,
                message: 'Unknown Error',
            };
            return result;
        }
    }
}