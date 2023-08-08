import axios from "@/utils/axios";

import { PRODUCT_UPDATE_URL } from "@/constants/server.url";
import { IImage } from "@/components/product/ProductCreatePage";
import { INetwortRequestResponseState } from "@/store/types/states/INetworkRequestResponseState";

export const UpdateProductService = async (
  id: string,
  name: string,
  amount: number,
  discount_amount: number,
  inventory: number,
  description: string,
  images: IImage[],
) => {
  try {
    let response = await axios.put(PRODUCT_UPDATE_URL + id, { name, amount, discount_amount, inventory, description, images });
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
