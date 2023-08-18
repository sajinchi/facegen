import { PAYMENT_GETSINGLE_URL } from "@/constants/server.url";
import { INetwortRequestResponseState } from "@/store/types/states/INetworkRequestResponseState";
import { IPackage } from "@/types/packages";
import axios from "@/utils/axios";

export interface IPaymentResponse extends INetwortRequestResponseState {
     data?: IPackage;
  }

export const GetPaymentType = async() => {
    try {
        let response = await axios.get(PAYMENT_GETSINGLE_URL);
        console.log(response);

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