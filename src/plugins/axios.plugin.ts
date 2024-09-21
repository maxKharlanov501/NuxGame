import axios, { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';

// used this just to wrap apis with baseURl :)

const baseURL = import.meta.env.VITE_BASE_URL
const axiosInstance: AxiosInstance = axios.create({ baseURL })

// Request Interceptor to add the Authorization header
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // here usually handling accessToken inside config
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
);

// Response Interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.error('Unauthorized access - redirecting to login.')
          // Handle unauthorized access (e.g., redirect to login)
          break
        case 403:
          console.error('Forbidden access.')
          break
        case 500:
          console.error('Server error.')
          break
        default:
          console.error('An error occurred.')
      }
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
