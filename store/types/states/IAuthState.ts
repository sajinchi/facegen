import { StoreStatusEnum } from "../commons/StoreStatusEnum";

export interface ITokenInfo {
    accessToken: string;
    refreshToken: string;
    accessExpiresIn: number;
    refreshExpiresIn: number;
    userId: string;
}

export default interface IAuthState extends ITokenInfo{
    status: StoreStatusEnum;
    message: string;
}

export interface LoginFormData {
    username: string;
    password: string;
  }