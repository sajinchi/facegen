import { SUBSCRIPTION_CREATE_URL } from "@/constants/server.url";
import axios from "@/utils/axios";


export const SubscribeService = async(id:string) => {
    try {
        let response = await axios.post(SUBSCRIPTION_CREATE_URL,{id});
        console.log(response);
    } catch (error) {
        
    }
}