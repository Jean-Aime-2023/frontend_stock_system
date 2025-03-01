import axios, { AxiosInstance } from "axios";
import { Cookies } from 'react-cookie';
import { toast } from "sonner";

const cookies = new Cookies();

const API_URL = process.env.API_URL

const commonHeaders = {
    'Content-Type': 'application/json',
};

const unauthorizedAxiosInstance: AxiosInstance = axios.create({
    baseURL: API_URL,
    headers: commonHeaders,
    withCredentials: true,
});

const authorizedAxiosInstance: AxiosInstance = axios.create({
    baseURL: API_URL,
    headers: commonHeaders,
    withCredentials: true,
});


authorizedAxiosInstance.interceptors.request.use(
    async (config) => {
        const token = await cookies.get('access_token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

authorizedAxiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async function (error) {
        if (error.response.status === 403 && error.response.data.message === "Token has expired") {
            try {
                const response = await generateAccessToken();
                if(response?.data.success){
                    error.config.headers.authorization = `Bearer ${response.data.accessToken}`
                    return authorizedAPI.request(error.config);
                }
            } catch (refreshError) {
                console.error("Token refresh failed:", refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export const generateAccessToken = async () => {
    try {
        const response = await unauthorizedAPI.get(`/auth/generate-token`, {
            withCredentials: true,
        });
        return response
    } catch (error: any) {
        console.error(error);
        toast.error(error?.response?.data?.error?.message);
    }
};

export const unauthorizedAPI = unauthorizedAxiosInstance;
export const authorizedAPI = authorizedAxiosInstance;