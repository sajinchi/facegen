import { USER_UPDATE_ME_URL } from "@/constants/server.url";
import { INetwortRequestResponseState } from "@/store/types/states/INetworkRequestResponseState";
import axios from "@/utils/axios";

export const userUpdateService = async(first_name:string,last_name:string,username:string,image:string) => {
    console.log(image);
    try {
        let response = await axios.put( USER_UPDATE_ME_URL, { first_name,last_name,username,image});
        return response;
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