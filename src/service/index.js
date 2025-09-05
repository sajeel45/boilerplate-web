import axios from "axios";
import { basePath } from "../constants.js";
import { ApiRequests } from "./ApiRequests.js";
import { toast } from "react-toastify";

function clearCookies() {
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    const [name] = cookie.split("=");
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
}

const apiService = axios.create({
  baseURL: basePath,
  timeout: 350000,
  withCredentials: true,
});

// Track refresh token state to prevent multiple simultaneous refresh attempts
let isRefreshing = false;
let failedQueue = [];

// Add request interceptor
apiService.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem("access-token");
    // Set headers with token
    config.headers = {
      Accept: "application/json, text/plain, */*",
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Helper function to process queued requests
const processQueue = (error, token = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });
  
  failedQueue = [];
};

// Add response interceptor to handle 401 errors
apiService.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Check if the request URL includes login or register, if so, don't refresh the token
    const loginRegisterEndpoints = [
      "/login",
      "/register",
      "/refresh-tokens",
      "/logout",
    ];
    const isLoginOrRegisterRequest = loginRegisterEndpoints.some((endpoint) =>
      originalRequest.url.includes(endpoint)
    );

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      !isLoginOrRegisterRequest
    ) {
      // If we're already refreshing, queue this request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers['Authorization'] = `Bearer ${token}`;
          return apiService(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Get the refresh token
        const refreshToken = localStorage.getItem("refresh-token");

        // Check if refreshToken exists to avoid null or undefined refresh attempts
        if (!refreshToken || refreshToken === "null") {
          isRefreshing = false;
          processQueue(error, null);
          localStorage.clear();
          sessionStorage.clear();
          clearCookies();
          if (!window.location.pathname.startsWith("/new-password")) {
            window.location.href = "/creator/sign-in";
          }
          return Promise.reject(error);
        }

        // Use the existing ApiRequests to refresh the token
        const response = await ApiRequests.refreshToken({ refreshToken });
        const newAccessToken = response.data.access.token;
        const newRefreshToken = response.data.refresh.token;
        
        localStorage.setItem("access-token", newAccessToken);
        localStorage.setItem("refresh-token", newRefreshToken);

        // Update the authorization header with the new token
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        // Process queued requests with new token
        processQueue(null, newAccessToken);
        isRefreshing = false;

        // Retry the original request with the new token
        return apiService(originalRequest);
      } catch (refreshError) {
        // Handle the case where refresh token fails (e.g., redirect to login)
        console.error("Token refresh failed: ", refreshError);
        isRefreshing = false;
        processQueue(refreshError, null);
        
        // Only show toast and clear storage after refresh definitely fails
        toast.error(refreshError.message || "Session expired. Please login again.");
        
        // Add a small delay to ensure all pending requests are handled
        setTimeout(() => {
          localStorage.clear();
          sessionStorage.clear();
          clearCookies();
          if (!window.location.pathname.startsWith("/new-password")) {
            window.location.href = "/creator/sign-in";
          }
        }, 100);
        
        return Promise.reject(refreshError);
      }
    }

    // If error response status is 401 and retry failed, or any other error status
    return Promise.reject(error);
  }
);

export default apiService;
