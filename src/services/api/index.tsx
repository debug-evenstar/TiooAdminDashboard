import axios from "axios";

const API_BASE_URL: string = "https://api.hellotioo.com/admin";


const axiosInstance = axios.create({
    baseURL: API_BASE_URL
})

axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
);

export const fetchUser = () => {
    // const token = localStorage.getItem('token');
    return axiosInstance.get('/user')
}

export const authUser = (data: any) => {
    return axiosInstance.post('/login',data);
}

export default axiosInstance;