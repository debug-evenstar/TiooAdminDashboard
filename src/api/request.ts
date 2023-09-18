import { BASE_URL } from "../services/url";
import axios from "axios";


export default class Request {
    
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
    const url = `${BASE_URL}${path}` + (params ?? "");
    const response = await axios.get(url, {
      headers: Request.getHeaders(),
    });
    return response.data;
  }

  static async post(path: string, body?: { [key: string]: string }) {
    const url = `${BASE_URL}${path}`;
    const response = await axios.post(url, body, {
      headers: Request.getHeaders(),
    });
    return response.data;
  }

  static async patch(path: string, body?: { [key: string]: string }) {
    const url = `${BASE_URL}${path}`;
    const response = await axios.patch(url, body, {
      headers: Request.getHeaders(),
    });
    return response.data;
  }

  static async put(path: string, body?: { [key: string]: string }) {
    const url = `${BASE_URL}${path}`;
    const response = await axios.put(url, body, {
      headers: Request.getHeaders(),
    });
    return response.data;
  }

  static async delete(path: string) {
    const url = `${BASE_URL}${path}`;
    const response = await axios.delete(url, {
      headers: Request.getHeaders(),
    });
    return response.data;
  }
}
