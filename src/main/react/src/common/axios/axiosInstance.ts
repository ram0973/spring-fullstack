import axios from "axios";

export const axiosInstance = axios.create(
  {
    baseURL: 'http://localhost:8008/',
    withCredentials: true,
    //withXSRFToken: true,
    xsrfCookieName: 'XSRF-TOKEN',
    //xsrfHeaderName: 'X-XSRF-TOKEN',
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');
      try {
        const { data } = await axiosInstance.post('/auth/refresh-token', { token: refreshToken });
        localStorage.setItem('accessToken', data.accessToken);
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Handle token refresh error (e.g., redirect to login)
      }
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;

// import { Service } from 'axios-middleware';
//
// const service = new Service(axios);
//
// service.register({
//   onRequest(config) {
//     console.log('onRequest');
//     return config;
//   },
//   onSync(promise) {
//     console.log('onSync');
//     return promise;
//   },
//   onResponse(response) {
//     console.log('onResponse');
//     return response;
//   }
// });
