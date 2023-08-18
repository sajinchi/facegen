import axios from "axios";
import { store } from "@/store";
import { BASE_URL } from "@/constants/server.url";
import { API_REQUEST_TIMEOUT } from "@/constants/config";


// export default axios;

//  export const axios1 = axios.create({
//          baseURL: BASE_URL,
//          timeout: API_REQUEST_TIMEOUT,
// });

// axios1.interceptors.request.use((config) => {
//     const token = store.getState().auth.accessToken;
    
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     config.headers["Content-Type"] = 'multipart/formdata';
//     return config;
// });

