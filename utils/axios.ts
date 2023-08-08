import axios from "axios";
import { store } from "@/store";
import { BASE_URL } from "@/constants/server.url";
import { API_REQUEST_TIMEOUT } from "@/constants/config";


axios.interceptors.request.use((config) => {
    const token = store.getState().auth.accessToken;
    config.baseURL = BASE_URL;
    config.timeout = API_REQUEST_TIMEOUT;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers["Content-Type"] = 'application/json';
    return config;
});

export default axios;