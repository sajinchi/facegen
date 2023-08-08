import axios from "@/utils/axios";

import { PRODUCT_CREATE_URL } from "@/constants/server.url";
import { IImage } from "@/components/product/ProductCreatePage";

export const CreateProductService = async (
  name: string,
  amount: number,
  discount_amount: number,
  inventory: number,
  description: string,
  images: IImage[]
) => {
  try {
    const response = await axios.post(PRODUCT_CREATE_URL, {
      name,
      amount,
      discount_amount,
      inventory,
      description,
      images,
    });
    return response;
  } catch (error) {}
};
