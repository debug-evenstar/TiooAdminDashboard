import axios from "axios";

const env = import.meta.env;
export const API_BASE_URL = (env.VITE_API_KEY);
// export const API_BASE_URL: string = "https://api.hellotioo.com/admin";

// const token: string | null = localStorage.getItem('token');
// const token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyZGF0YSI6eyJpZCI6MzQsImVtYWlsIjoiYWRtaW5AcHJheGV1bS5haSIsImFjY291bnRfdHlwZSI6ImFkbWluIn0sImlhdCI6MTY5MTk0NDE5MywiZXhwIjoxNjkyMjAzMzkzfQ.dKIex209L41wQ_Y6Pd7Lqvmd7sBYY2LvqnGgO_cNzoc"

const axiosInstance = axios.create({
  baseURL: `${API_BASE_URL}admin`,
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
      window.location.assign('/login');
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

// lesson endpoint service
// lesson endpoint service

export const getSchoolSubjects = (id: string) => {
  return axiosInstance.get(`/school/dashboard/subjects/?school_id=${id}`)
}

export const getLessonGroup = (id:string) => {
  return axiosInstance.get(`/management/subject/groups?subject_id=${id}`)
}

export const getSchoolLesson = (id:any) => {
  return axiosInstance.get(`/management/lesson/check?subject_id=${id}`)
}
export const downloadLessonFile = (id:any) => {
  return axiosInstance.get(`/management/lesson/${id}/download`, {responseType: "blob"})
}
export const publishLesson = (id:string, status:string) => {
  return axiosInstance.put(`/management/lesson/${id}/status?status=${status}`)
}
export const uploadTemplate = (id:number, payload:FormData) => {
  return axiosInstance.post(`/management/lessons/${id}/template`, payload)
}


export default axiosInstance;