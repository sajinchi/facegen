import { StoreStatusEnum } from "../store/types/commons/StoreStatusEnum";
import { IPackage } from "./packages";

export interface ISubscription {
    created_at: string;
    current_period_end: string;
    current_period_start: string;
    id: string;
    package: IPackage;
    purchase_date: string;
    status: string;
    subscription_id: string;
    type: string;
    updated_at: string; 
}

export interface ISubscriptionState {
    status: StoreStatusEnum;
    data: ISubscription[];
}