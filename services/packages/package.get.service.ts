import axios from "@/utils/axios";

import { PACKAGES_GET_URL } from "@/constants/server.url";
import { INetwortRequestResponseState } from "@/store/types/states/INetworkRequestResponseState";
import { IPackage } from "@/types/packages";


  interface IPackageResponse extends INetwortRequestResponseState {
    data?: IPackage[];
  }

export const packagegetservice = async() => {
    try {
        let response = await axios.get(PACKAGES_GET_URL)
        const result:IPackageResponse = {
            status: response.status,
            message: response.statusText,
            data: response.data,
        }
        console.log(result);
        return result;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const result:IPackageResponse = {
                status: error.response!.status,
                message: error.response!.data.detail,
            };
            return result;    
        }else {
            const result:IPackageResponse = {
                status: 400,
                message: 'Unknown Error',
            };
            return result;
        }
    }
}