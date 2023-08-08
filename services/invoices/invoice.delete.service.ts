import axios from "@/utils/axios";

import { INVOICE_DELETE_URL } from "@/constants/server.url";
import { INetwortRequestResponseState } from "@/store/types/states/INetworkRequestResponseState";

export const DeleteInvoice = async(id:String,token:string) => {
    try {
        let response:INetwortRequestResponseState = await axios.delete(INVOICE_DELETE_URL+id+'/',{
            headers:{
                'Authorization': 'Bearer ' + token
            }
        })
        let result:INetwortRequestResponseState = {
            status: response.status,
            message: response.message,
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