import { USER_GET_URL } from "@/constants/server.url";
import { INetwortRequestResponseState } from "@/store/types/states/INetworkRequestResponseState";
import { IUserListData } from "@/types/IUserListData";
import axios from "@/utils/axios";

/* 
email:"johny@example.com"
first_name:"Roshina"
image:""
is_active:false
is_subscribed:false
last_name:"Chaudhary"
login_method:"E"
otp_auth_url:""
otp_base32:""
otp_enabled:false
otp_verified:false
username:"Roshina"
 */

export interface IUserDataResponse extends INetwortRequestResponseState {
    data? : IUserListData[];
}
export const UserGetService = async () => {
  try {
    const response = await axios.get(USER_GET_URL);
    console.log(response);
    const result:IUserDataResponse={
        status: response.status,
        message: response.statusText,
        data: response.data,
    }
    return (result);
  } catch (error) {}
};
