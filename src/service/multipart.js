import axios from "axios";
import { basePath } from "../constants.js";

const apiService = axios.create({
  baseURL: basePath,
  timeout: 600000, // accept 10 minutes timeout
  withCredentials: true,  // This line enables credentials
});

// Add request interceptor
apiService.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem("access-token");

    config.headers = {
      Accept: "application/json, text/plain, */*",
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
      "access-control-allow-headers": "*",
      "access-control-allow-methods": "*",
      "access-control-allow-origin": "*",
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiService;
