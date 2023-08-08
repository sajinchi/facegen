import axios from "@/utils/axios";

import { PAYMENT_GETSINGLE_URL } from "@/constants/server.url"
import { INetwortRequestResponseState } from "@/store/types/states/INetworkRequestResponseState";
import { IPackage } from "@/types/packages";

export interface IPaymentResponse extends INetwortRequestResponseState {
    data?: IPackage;
  }
export const GetSinglePayment = async(id:string) => {
    try {
        let response = await axios.get(PAYMENT_GETSINGLE_URL + id +'/' )
        console.log(response);
        // let result:IPaymentResponse = {
        //     status: response.status,
        //     message: response.statusText,
        //     data: response.data,
        // }
        // return result;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const result:IPaymentResponse = {
                status: error.response!.status,
                message: error.response!.data.detail,
            };
            return result;    
        }else {
            const result:IPaymentResponse = {
                status: 400,
                message: 'Unknown Error',
            };
            return result;
        }
    }
}