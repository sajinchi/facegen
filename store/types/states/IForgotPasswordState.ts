import { StoreStatusEnum } from "../commons/StoreStatusEnum";

export interface IForgotPasswordState {
    status: StoreStatusEnum;
    message: string;
}