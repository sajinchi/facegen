import { PURCHASE_URL } from "@/constants/server.url";
import { INetwortRequestResponseState } from "@/store/types/states/INetworkRequestResponseState";
import axios from "@/utils/axios";


interface items{
    product:string;
    quantity:number;
}

export interface IGetPurchaseResponse extends INetwortRequestResponseState {
    data?: string,
}

export const StripePaymentService = async(payment_gateway:string, items:items[]) => {
    try {
        let response = await axios.post(PURCHASE_URL,{
            payment_gateway,
            items
        }) 
        let result:IGetPurchaseResponse ={
            status: response.status,
            message: response.statusText,
            data: response.data.detail.checkout_session_url,
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