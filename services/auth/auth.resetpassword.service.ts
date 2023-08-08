import axios from "@/utils/axios";

import { AUTH_RESET_PASSWORD_URL } from "@/constants/server.url";

interface ResetPasswordResponse {
    status: number;
    message: string;
}

export const ResetPasswordService = async( uid:string, token:string, new_password:string) => {
    try {
        const response = await axios.post(AUTH_RESET_PASSWORD_URL,{
                uid,
                token,
                new_password
            },{
                headers:{
                    'Content-Type': 'application/json'
                }
            });
            console.log(response);
            let result: ResetPasswordResponse = {
                status: response.status,
                message: ""
            }
            return result;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const result:ResetPasswordResponse = {
                status: error.response!.status,
                message: error.response!.data.detail,
            };
            return result;    
        }else {
            const result: ResetPasswordResponse = {
                status: 400,
                message: 'Unknown Error',
            };
            return result;
        }
    }
}