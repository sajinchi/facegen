import axios from "@/utils/axios";

import { PRODUCT_GET_URL } from "@/constants/server.url";
import { IProduct } from "@/types/IProductState";
import { INetwortRequestResponseState } from "@/store/types/states/INetworkRequestResponseState";

export interface IGetSingleProductsResponse extends INetwortRequestResponseState {
    data?: IProduct,
}

export const GetSingleProduct = async(id:string) => {
    try {
        const response = await axios.get(PRODUCT_GET_URL + id)
        let result: IGetSingleProductsResponse = {
            status: response.status,
            message: response.statusText,
            data: response.data,
        }
        return result;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const result: IGetSingleProductsResponse = {
                status: error.response!.status,
                message: error.response!.data.detail,
            };
            return result;    
        } else {
            const result: IGetSingleProductsResponse = {
                status: 400,
                message: 'Unknown Error',
            };
            return result;
        }
    }
}