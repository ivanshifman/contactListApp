import axios from "axios";
import {
  responseInterceptor,
  successResponseInterceptor,
} from "./interceptors/response";
import { requestInterceptor } from "./interceptors/request";

const BASE_URL = import.meta.env.VITE_API || "http://localhost:5000/api/v1";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

apiClient.defaults.validateStatus = () => true;
apiClient.interceptors.request.use(requestInterceptor);
apiClient.interceptors.response.use(
  successResponseInterceptor,
  responseInterceptor
);
