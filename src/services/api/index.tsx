import axios from "axios";

const API_BASE_URL: string = "https://api.hellotioo.com/admin";

// const token: string | null = localStorage.getItem('token');
// const token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyZGF0YSI6eyJpZCI6MzQsImVtYWlsIjoiYWRtaW5AcHJheGV1bS5haSIsImFjY291bnRfdHlwZSI6ImFkbWluIn0sImlhdCI6MTY5MTk0NDE5MywiZXhwIjoxNjkyMjAzMzkzfQ.dKIex209L41wQ_Y6Pd7Lqvmd7sBYY2LvqnGgO_cNzoc"

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  // headers:{
  //   common: { 
  //     'Authorization': `Bearer ${token}`,
  //     'Content-Type': 'application/json',
  //   }
  // }
})

// request interceptor for adding bearer tokens
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if(token)
      config.headers['Authorization'] = `Bearer ${token}`;
  
    return config
  },
  error => {
    return Promise.reject(error);
  }
)

// response interceptor for confirming authorization
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if(error.response.status === 401){
      alert("you need to login to continue");
    }
    return Promise.reject(error);
  }
)

export const fetchUser = () => {
  return axiosInstance.get('/user');
}


export const fetchPricing = () => {
  return axiosInstance.get('/settings/pricing');
}

export const authUser = (data: any) => {
  return axiosInstance.post('/login', data);
}


export default axiosInstance;