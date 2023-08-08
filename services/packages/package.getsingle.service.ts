import axios from "@/utils/axios";

import { PACKAGES_GET_URL } from "@/constants/server.url"
import { INetwortRequestResponseState } from "@/store/types/states/INetworkRequestResponseState";
import { IPackage } from "@/types/packages";

export interface IPackageResponse extends INetwortRequestResponseState {
    data?: IPackage;
  }
export const GetSinglePackage = async(id:string) => {
    try {
        let response = await axios.get(PACKAGES_GET_URL + id )
        let result:IPackageResponse = {
            status: response.status,
            message: response.statusText,
            data: response.data,
        }
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