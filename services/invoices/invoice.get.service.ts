import axios from "@/utils/axios";

import { INVOICE_GET_URL } from "@/constants/server.url";
import { INetwortRequestResponseState } from "@/store/types/states/INetworkRequestResponseState";

export const getInvoice = async(token:string) => {
    try {
        let response = await axios.get(INVOICE_GET_URL,{
            headers:{
                Authorization: "Bearer " + token,
            }
        })
        const result:INetwortRequestResponseState ={
            status: response.status,
            message: response.statusText,
            data: response.data,
        }
        return result;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const result:INetwortRequestResponseState = {
                status: error.response!.status,
                message: error.response!.data.detail,
            };
            return result;    
        }else {
            const result:INetwortRequestResponseState = {
                status: 400,
                message: 'Unknown Error',
            };
            return result;
        }
    }
}