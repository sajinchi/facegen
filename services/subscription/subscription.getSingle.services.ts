import { SUBSCRIPTION_GET_URL } from "@/constants/server.url";
import { INetwortRequestResponseState } from "@/store/types/states/INetworkRequestResponseState";
import { ISubscription } from "@/types/ISubscriptionState";
import axios from "@/utils/axios";

export interface IGetSingleSubscriptionResponse
  extends INetwortRequestResponseState {
  data?: ISubscription[];
}

export const GetSingleSubscription = async (id: string) => {
  try {
    let response = await axios.get(SUBSCRIPTION_GET_URL + id + "/");
    let result: IGetSingleSubscriptionResponse = {
      status: response.status,
      message: response.statusText,
      data: response.data,
    };
    return result.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const result: IGetSingleSubscriptionResponse = {
        status: error.response!.status,
        message: error.response!.data.detail,
      };
      return result;
    } else {
      const result: IGetSingleSubscriptionResponse = {
        status: 400,
        message: "Unknown Error",
      };
      return result;
    }
  }
};
