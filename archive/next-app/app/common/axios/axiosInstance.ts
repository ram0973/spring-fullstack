import axios from "axios";

export const axiosInstance = axios.create(
  {
    baseURL: 'http://localhost:8008/',
    withCredentials: true,
    withXSRFToken: true,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
  },
);
