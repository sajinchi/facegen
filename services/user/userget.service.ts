import axios from "@/utils/axios";

import { USER_ME_GET_URL } from "@/constants/server.url";
import { IUserData } from "@/types/IUserData";
import { INetwortRequestResponseState } from "@/store/types/states/INetworkRequestResponseState";

export interface IUserDataResponse extends INetwortRequestResponseState {
  data? : IUserData;
}
export const UserMeService = async () => {
  try {
    let response = await axios.get(USER_ME_GET_URL);
    let result: IUserDataResponse = {
      status: response.status,
      message: response.statusText,
      data: response.data,
    };
    return result;
  } catch (error) {
    if (axios.isAxiosError(error)) {
        const result:IUserDataResponse = {
            status: error.response!.status,
            message: error.response!.data.detail,
        };
        return result;    
    }else {
        const result:IUserDataResponse = {
            status: 400,
            message: 'Unknown Error',
        };
        return result;
    }
  }
};


