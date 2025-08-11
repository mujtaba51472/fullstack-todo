// services/apiService.js
import axios from "axios";
import { destroyToken, getToken } from "./authservice";

const ApiService = {
  instance: null,

  init(baseURL = process.env.NEXT_PUBLIC_API_BASE_URL) {
    if (!this.instance) {
      this.instance = axios.create({
        baseURL,
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Request Interceptor (attach token)
      this.instance.interceptors.request.use(
        (config) => {
          const token = getToken();
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
          return config;
        },
        (error) => Promise.reject(error)
      );

      // Response Interceptor (handle 401)
      this.instance.interceptors.response.use(
        (response) => response,
        (error) => {
          if (error?.response?.status === 401) {
            destroyToken();
            if (typeof window !== "undefined") {
              window.location.href = "/login";
            }
          }
          return Promise.reject(error?.response || error);
        }
      );
    }
  },

  setHeader(header, value) {
    this.instance.defaults.headers[header] = value;
  },

  setAuthToken(token) {
    this.instance.defaults.headers["Authorization"] = `Bearer ${token}`;
  },

  setBaseUrl(url) {
    this.instance.defaults.baseURL = url;
  },

  get(resource, params = {}, slug = "") {
    return this.instance.get(`${resource}${slug ? `/${slug}` : ""}`, { params }).then(res => res.data);
  },

  post(resource, data = {}, slug = "", isFormData = false) {
    const headers = isFormData
      ? { "Content-Type": "multipart/form-data" }
      : { "Content-Type": "application/json" };

    return this.instance.post(`${resource}${slug ? `/${slug}` : ""}`, data, { headers })
      .then(res => res.data);
  },

  put(resource, data = {}, slug = "", isFormData = false) {
    const headers = isFormData
      ? { "Content-Type": "multipart/form-data" }
      : { "Content-Type": "application/json" };

    return this.instance.put(`${resource}${slug ? `/${slug}` : ""}`, data, { headers })
      .then(res => res.data);
  },

  delete(resource, slug = "", params = {}) {
    return this.instance.delete(`${resource}${slug ? `/${slug}` : ""}`, { data: params })
      .then(res => res.data);
  }
};

export default ApiService;
