const env = import.meta.env;
import { isDomain } from "@/utils/url";
import axios from "axios";

export const API_BASE_URL = env.VITE_API_KEY;

const PUBLISHER_DOMAIN = env.VITE_PUBLISHER_DOMAIN;
const SENTINEL_DOMAIN = env.VITE_SENTINEL_DOMAIN;

export default class Request {
    static axiosInstance() {
        const instance = axios.create({
            baseURL: `${API_BASE_URL}/${
                isDomain(SENTINEL_DOMAIN) ? "admin/" : ""
            }`,
            headers: Request.getHeaders(),
        });

        // response interceptor for confirming authorization
        instance.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response.status === 401) {
                    window.location.assign("/login");
                }
                return Promise.reject(error);
            }
        );
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

    /* -------------------------------------------------------------------------- */
    /*                     REFACTOR TO USE AXIOS INSTANCE LATER                    */
    /* -------------------------------------------------------------------------- */

    static async get(path: string, config?: { [key: string]: any }) {
        const response = await Request.axiosInstance().get(path);
        return response.data;
    }

    static async post(
        path: string,
        body: { [key: string]: string } | FormData = {},
        config?: { [key: string]: any }
    ) {
        const response = await Request.axiosInstance().post(path, body);
        return response.data;
    }

    static async patch(
        path: string,
        body: { [key: string]: string } | FormData = {},
        config?: { [key: string]: any }
    ) {
        const response = await Request.axiosInstance().patch(path, body);
        return response.data;
    }

    static async put(
        path: string,
        body: { [key: string]: string } | FormData = {},
        config?: { [key: string]: any }
    ) {
        const response = await Request.axiosInstance().put(path, body);
        return response.data;
    }

    static async delete(path: string) {
        const response = await Request.axiosInstance().delete(path);
        return response.data;
    }
}

export const axiosInstance = Request.axiosInstance();
