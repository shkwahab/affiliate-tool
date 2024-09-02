import axios from 'axios';

export const BASE_API_URL = import.meta.env.VITE_BASE_URL;
export const API_KEY = import.meta.env.VITE_API_KEY;

export const baseApi = axios.create({
    baseURL: BASE_API_URL,
});

// Request interceptor to include token
baseApi.interceptors.request.use(
    (config) => {
        config.headers["api-key"] = API_KEY;
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor to handle errors
baseApi.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error:", error);
        return Promise.reject(error);
    }
);

// API endpoints
export const GetAffilate = "/affiliate";
export const SaveAffilate = "/affiliate";
export const EstimateRevenue = "/affiliate/estimate-revenue";
