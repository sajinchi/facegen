import { StoreStatusEnum } from "@/store/types/commons/StoreStatusEnum";
import IAuthState from "@/store/types/states/IAuthState";


export const parseJwt = (token:string) => {
    let tokenarr : string[] = token.split(".");
    if (tokenarr.length != 3) {
        return null;
    }
    let base64Url = tokenarr[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

export const timeIsValid = (time:number) => Date.now() < time*1000 ? true : false;



export const authStoreToLocalStorage = ( access : string, refresh : string ) :void => {
    localStorage.setItem('access',access);
    localStorage.setItem('refresh',refresh);
}

export const authGetFromLocalStorage = () :IAuthState => {
   let initialState:IAuthState = {
       status: StoreStatusEnum.IDLE,
       message: "",
       accessToken: "",
       refreshToken: "",
       accessExpiresIn: 0,
       refreshExpiresIn: 0,
       userId: ""
   };
   
   let access = localStorage.getItem('access');
   let refresh = localStorage.getItem('refresh');
   
   if ( !access || !refresh ) {
    return initialState;
   }

   let accessobj = parseJwt(access);
   let refreshobj = parseJwt(refresh);
   
   if ( !accessobj || !refreshobj ) {
    return initialState;
   }
   
   initialState.status = StoreStatusEnum.SUCCESS;
   initialState.accessToken = access;
   initialState.refreshToken = refresh;
   initialState.accessExpiresIn = accessobj.exp;
   initialState.refreshExpiresIn = refreshobj.exp;
   initialState.userId = accessobj.user_id;

   return initialState;
}