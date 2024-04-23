import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_KEY,
});

let isPublicRequest = false;

const refreshAccessToken = async () => {
  try {
    // Make a request to your server to refresh the access token
    const response = await axiosInstance.post("/auth/refresh", {
      refreshToken: localStorage.getItem("refreshToken"),
    });
    const newToken = response.data?.data?.token;

    // Update the original request headers with the new access token
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${newToken}`;

    // Return the new access token
    return newToken;
  } catch (error) {
    // Handle token refresh failure (e.g., redirect to login)
    console.error("Failed to refresh access token:", error);
    throw error;
  }
};

axiosInstance.interceptors.request.use(
  (config) => {
    if (!isPublicRequest) {
      const accessToken = localStorage.getItem("token");

      if (accessToken) {
        config.headers.Accept = "application/json";
        config.headers["Content-Type"] = "application/json";
        config.headers.Authorization = `Bearer ${accessToken}`;
    
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is due to an expired access token
    if (
      (error?.response?.status === 403 || error?.response?.status === 401) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      if (localStorage.getItem("refreshToken")) {
        try {
          const newAccessToken = await refreshAccessToken();

          // Retry the original request with the new access token
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          // If refreshing fails, redirect to login or handle accordingly
          return Promise.reject(refreshError);
        }
      }
      else{
        originalRequest._retry = false;

      }
    }

    // If the error is not due to an expired token or refresh failure, return the error
    return Promise.reject(error);
  }
);

export default axiosInstance;
