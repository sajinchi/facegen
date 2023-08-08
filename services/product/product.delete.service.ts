import axios from "@/utils/axios";

import { PRODUCT_DELETE_URL } from "@/constants/server.url";
import { INetwortRequestResponseState } from "@/store/types/states/INetworkRequestResponseState";

export const DeleteProduct = async(id:String) => {
    try {
        let response = await axios.delete(PRODUCT_DELETE_URL+id+'/')
        let result:INetwortRequestResponseState ={
            status: response.status,
            message: response.statusText,
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