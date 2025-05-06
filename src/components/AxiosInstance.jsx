import axios from "axios";

const baseURL = "http://localhost:8000";

const access_token = localStorage.getItem("access_token");

const AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    ...(access_token && { Authorization: `Bearer ${access_token}` }),
  },
});



// Add Interceptor

AxiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // if token expired and request was not retried either

    if (
      error.response?.status === 401 &&
      error.response.data?.code === "token_not_valid" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refresh = localStorage.getItem("refresh_token");
        const response = await axios.post(`${baseURL}/api/token/refresh/`, {
          refresh,
        });

        localStorage.setItem("access_token", response.data.access);


        // Create new retry for header

        originalRequest.headers["Authorization"] = `Bearer ${response.data.access}`;
        AxiosInstance.defaults.headers["Authorization"] = `Bearer ${response.data.access}`;
        return AxiosInstance(originalRequest);
      } catch (err) {

        console.error("refresh_token expired or invalid.");

        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default AxiosInstance;
