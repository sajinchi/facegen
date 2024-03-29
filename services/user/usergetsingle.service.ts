import axios from "@/utils/axios";

import { USER_GETSINGLE_URL } from "@/constants/server.url";
import { IUserData } from "@/types/IUserData";
import { INetwortRequestResponseState } from "@/store/types/states/INetworkRequestResponseState";

interface IUserDataResponse extends INetwortRequestResponseState {
  data? : IUserData;
}

export const UserSingle = async ( id:string ) => {
  try {
    let response = await axios.get(USER_GETSINGLE_URL + id + '/');
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
