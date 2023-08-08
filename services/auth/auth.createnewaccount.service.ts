import axios,{isAxiosError} from "axios";

import { AUTH_CREATE_NEW_ACCOUNT_URL } from "@/constants/server.url";

export interface CreateNewAccountResponse {
    status: number;
    message: string;
}

export const CreateNewAccountService = async( first_name:string, last_name:string, username:string, email:string, password:string, login_method:string) => {
    console.log(login_method);
    try {
        const response = await axios.post(AUTH_CREATE_NEW_ACCOUNT_URL,{
            first_name,
            last_name,
            username,    
            email,
            password,
            login_method
            },{
                headers:{
                    'Content-Type': 'application/json'
                }
            });
            console.log(response);
            let result: CreateNewAccountResponse = {
                status: response.status,
                message: response.statusText,
            }
            return result;
        
    } catch (error) {
        if (isAxiosError(error)) {
            const result:CreateNewAccountResponse = {
                status: error.response!.status,
                message: error.response!.data.detail,
                
            };
            return result;    
        }else {
            const result:CreateNewAccountResponse = {
                status: 400,
                message: 'Unknown Error',
            };
            return result;
        }
    }
}