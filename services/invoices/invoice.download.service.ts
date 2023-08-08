import axios from "axios";

import { INVOICE_DOWNLOAD_URL } from "@/constants/server.url";
import { INetwortRequestResponseState } from "@/store/types/states/INetworkRequestResponseState";


export const DownloadInvoice = async( id:string )=> {
    // try {
        let response = await axios.get(INVOICE_DOWNLOAD_URL+id+'/download/',{
            timeout:5000,
            headers:{
                'Content-Type': 'multipart/form-data',
            },
            responseType: 'blob',
        })
        return response.data;
    // } catch (error) {
        // if (axios.isAxiosError(error)) {
        //     const result:INetwortRequestResponseState = {
        //         status: error.response!.status,
        //         message: error.response!.data.detail,
        //     };
        //     return result;    
        // }else {
        //     const result:INetwortRequestResponseState = {
        //         status: 400,
        //         message: 'Unknown Error',
        //     };
        //     return result;
        // }
    // }
}