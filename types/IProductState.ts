import { StoreStatusEnum } from "../store/types/commons/StoreStatusEnum";

export interface IProduct {
    id: string;
    name: string;
    amount: number;
    discount_amount: number;
    inventory: number;
    description: string;
    images:string;
}

export interface IProductState {
    status: StoreStatusEnum;
    data: IProduct[];
}