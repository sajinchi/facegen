import axios from "@/utils/axios";

import { AUTH_LOGIN_URL } from "@/constants/server.url";
import { LoginResponse } from "@/store/types/auth/LoginResponse";


export const LoginService = async( email:string, password:string) => {
    try {
        const response = await axios.post(AUTH_LOGIN_URL,{
                email,
                password
            },{
                headers:{
                    'Content-Type': 'application/json'
                }
            });
        let result: LoginResponse = {
            status: response.status,
            message: '',
            access: response.data.access,
            refresh: response.data.refresh,
        }
        return result;  
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const result:LoginResponse = {
                status: error.response!.status,
                message: error.response!.data.detail,
            };
            return result;    
        }else {
            const result:LoginResponse = {
                status: 400,
                message: 'Unknown Error',
            };
            return result;
        }
    }
}