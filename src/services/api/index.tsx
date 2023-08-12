import axios from "axios";

const API_BASE_URL: string = "https://api.hellotioo.com/admin";


const api = axios.create({
    baseURL: API_BASE_URL
})

export const fetchUser = () => {
    // const token = localStorage.getItem('token');
    return api.get('/user')
}

export const authUser = (data: any) => {
    return api.post('/login',data);
}
