import axios from "axios";
import router from '../router'
import { userStore } from '../stores/user'

const store = userStore()

export const client = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL
});

client.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("access")}`
    return config
  }
)

client.interceptors.response.use(
  (config) => {
    console.log('config')
    return config
  },
  async (error) => {
    console.log('error')
   const originalRequest = {...error.config};
   originalRequest._isRetry = true; 
    if (
      error.response.status === 401 && 
      error.config &&
      !error.config._isRetry
    ) {
      try {
        const resp = await client.post("/refresh", {refresh: localStorage.getItem("refresh")});
        localStorage.setItem("access", resp.data.access);
        localStorage.setItem("refresh", resp.data.refresh);
        return client.request(originalRequest);
      } catch (error) {
        console.log("authentication error");
        store.username = 'Guest'
        localStorage.removeItem('username');
        router.push({ path: 'login' })
      }
    }
    console.log("authentication error");
    store.username = 'Guest'
    localStorage.removeItem('username');
    router.push({ path: 'login' })
  }
);