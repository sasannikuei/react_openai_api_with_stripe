import axios from "axios";

const baseURL = "http://localhost:8000";

const AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// افزودن interceptor
// adding interceptor

AxiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // اگر خطای توکن منقضی بود و درخواست قبلاً retry نشده
    // if token was expried and request was also not retry 

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

        // هدر جدید بزن برای retry
        // create new retry for header

        originalRequest.headers["Authorization"] = `Bearer ${response.data.access}`;
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
