import axios from "axios";

export const client = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL
});

client.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
    return config
  }
)

client.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
   const originalRequest = {...error.config};
   originalRequest._isRetry = true; 
    if (
      error.response.status === 401 && 
      error.config &&
      !error.config._isRetry
    ) {
      try {
        const resp = await instance.get("/refresh", {refresh: localStorage.getItem("refresh")});
        localStorage.setItem("access", resp.data.access);
        localStorage.setItem("refresh", resp.data.refresh);
        return client.request(originalRequest);
      } catch (error) {
        console.log("AUTH ERROR");
      }
    }
    throw error;
  }
);