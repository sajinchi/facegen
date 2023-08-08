import axios from "@/utils/axios";

import { AUTH_FORGOT_PASSWORD_URL } from "@/constants/server.url";

export interface ForgotPasswordResponse {
    status: number;
    message: string;
}

export const ForgotPasswordService = async( email: string ) => {
    try {
        const response = await axios.post(AUTH_FORGOT_PASSWORD_URL,{
                email
            },{
                headers:{
                    'Content-Type': 'application/json'
                
                }
            });
            let result: ForgotPasswordResponse = {
                status: response.status,
                message: ""
            }
            return result;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const result:ForgotPasswordResponse = {
                status: error.response!.status,
                message: error.response!.data.detail,
            };
            return result;    
        }else {
            const result:ForgotPasswordResponse = {
                status: 400,
                message: 'Unknown Error',
            };
            return result;
        }
    }
}