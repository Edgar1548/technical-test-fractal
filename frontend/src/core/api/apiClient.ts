import axios from "axios";
import type { AxiosInstance } from "axios";

export const apiClient: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 3500,
    headers: {
        'Content-Type': 'application/json',
    }
})  