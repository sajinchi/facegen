import axios from "@/utils/axios";

import { PRODUCT_GET_URL } from "@/constants/server.url";
import { IProduct } from "@/types/IProductState";
import { INetwortRequestResponseState } from "@/store/types/states/INetworkRequestResponseState";

export interface IGetProductsResponse extends INetwortRequestResponseState {
    data?: IProduct[],
}

export const GetProducts = async() => {
    try {
        const response = await axios.get(PRODUCT_GET_URL);
        let result: IGetProductsResponse = {
            status: response.status,
            message: response.statusText,
            data: Object.values(response.data),
        }
        return result;
        
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const result:IGetProductsResponse = {
                status: error.response!.status,
                message: error.response!.data.detail,
            };
            return result;    
        }else {
            const result:IGetProductsResponse = {
                status: 400,
                message: 'Unknown Error',
            };
            return result;
        }
    }
}