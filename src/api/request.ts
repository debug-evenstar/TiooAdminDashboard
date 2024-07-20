const env = import.meta.env;
import axios from "axios";

export const API_BASE_URL = (env.VITE_API_KEY);


// export const fetchUser = () => {
//   return axiosInstance.get('/user');
// }


// export const fetchPricing = () => {
//   return axiosInstance.get('/settings/pricing');
// }

// export const authUser = (data: any) => {
//   return axiosInstance.post('/login', data);
// }

// // lesson endpoint service
// // lesson endpoint service

// export const getSchoolSubjects = (id: string) => {
//   return axiosInstance.get(`/school/dashboard/subjects/?school_id=${id}`)
// }

// export const getLessonGroup = (id: string) => {
//   return axiosInstance.get(`/management/subject/groups?subject_id=${id}`)
// }

// export const getSchoolLesson = (id: any) => {
//   return axiosInstance.get(`/management/lesson/check?subject_id=${id}`)
// }
// export const downloadLessonFile = (id: any) => {
//   return axiosInstance.get(`/management/lesson/${id}/download`, { responseType: "blob" })
// }
// export const publishLesson = (id: string, status: string) => {
//   return axiosInstance.put(`/management/lesson/${id}/status?status=${status}`)
// }
// export const uploadTemplate = (id: number, payload: FormData) => {
//   return axiosInstance.post(`/management/lessons/${id}/template`, payload)
// }


export default class Request {

  static axiosInstance() {
    const instance = axios.create({
      baseURL: `${API_BASE_URL}`,
      headers: Request.getHeaders()
    })

    // response interceptor for confirming authorization
    instance.interceptors.response.use(
      response => response,
      error => {
        if (error.response.status === 401) {
          window.location.assign('/login');
        }
        return Promise.reject(error);
      }
    )
    return instance;
  }
    
  static getHeaders() {
    const token = localStorage.getItem("token");

    return token
      ? {
          Authorization: "Bearer " + token,
        }
      : {};
  }

  static parseParams(params: { [key: string]: string }) {
    let paramsString = "?";
    Object.keys(params).forEach((param) => {
      paramsString += `${param}=${params[param]}`;
    });
    return paramsString;
  }

  static async get(path: string, params?: { [key: string]: string }) {
    const url = `${API_BASE_URL}${path}` + (params ?? "");
    const response = await axios.get(url, {
      headers: Request.getHeaders(),
    });
    return response.data;
  }

  static async post(path: string, body?: { [key: string]: string }) {
    const url = `${API_BASE_URL}${path}`;
    const response = await axios.post(url, body, {
      headers: Request.getHeaders(),
    });
    return response.data;
  }

  static async patch(path: string, body?: { [key: string]: string }) {
    const url = `${API_BASE_URL}${path}`;
    const response = await axios.patch(url, body, {
      headers: Request.getHeaders(),
    });
    return response.data;
  }

  static async put(path: string, body?: { [key: string]: string }) {
    const url = `${API_BASE_URL}${path}`;
    const response = await axios.put(url, body, {
      headers: Request.getHeaders(),
    });
    return response.data;
  }

  static async delete(path: string) {
    const url = `${API_BASE_URL}${path}`;
    const response = await axios.delete(url, {
      headers: Request.getHeaders(),
    });
    return response.data;
  }
}
