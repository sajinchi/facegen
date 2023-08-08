import axios from "@/utils/axios";

import { AUTH_REFRESH_URL } from "@/constants/server.url";
import { LoginResponse } from "@/store/types/auth/LoginResponse";

export const RefreshService = async( refresh:string) => {
    try {
        const response = await axios.post(AUTH_REFRESH_URL,{
                refresh
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