import axios from "@/utils/axios";
import { INetwortRequestResponseState } from "@/store/types/states/INetworkRequestResponseState";
import { SUBSCRIPTION_GET_URL } from "@/constants/server.url";
import { ISubscription } from "@/types/ISubscriptionState";

export interface IGetSubscriptionResponse extends INetwortRequestResponseState {
    data?: ISubscription[],
}

export const subscriptiongetservice = async() => {
    try {
        const response = await axios.get(SUBSCRIPTION_GET_URL);
        let result: IGetSubscriptionResponse = {
            status: response.status,
            message: response.statusText,
            data: response.data
        }
        return result;
        
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const result:IGetSubscriptionResponse = {
                status: error.response!.status,
                message: error.response!.data.detail,
            };
            return result;    
        }else {
            const result:IGetSubscriptionResponse = {
                status: 400,
                message: 'Unknown Error',
            };
            return result;
        }
    }
}