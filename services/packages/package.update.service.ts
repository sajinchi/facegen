import { PACKAGE_UPDATE_URL } from "@/constants/server.url";
import { INetwortRequestResponseState } from "@/store/types/states/INetworkRequestResponseState";
import axios from "@/utils/axios";

export const UpdatePackageService = async (id: string, description: string, amount: number ) => {
    try {
      let response = await axios.put(PACKAGE_UPDATE_URL + id, { description, amount });
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
  };
  