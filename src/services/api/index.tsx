import axios from "axios";

const API_BASE_URL: string = "https://api.hellotioo.com/admin";

const token: string | null = localStorage.getItem('token');
// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyZGF0YSI6eyJpZCI6MzQsImVtYWlsIjoiYWRtaW5AcHJheGV1bS5haSIsImFjY291bnRfdHlwZSI6ImFkbWluIn0sImlhdCI6MTY5MTk0NDE5MywiZXhwIjoxNjkyMjAzMzkzfQ.dKIex209L41wQ_Y6Pd7Lqvmd7sBYY2LvqnGgO_cNzoc"

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers:{
    common: { 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  }
})


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