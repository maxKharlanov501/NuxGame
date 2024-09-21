import { AxiosRequestConfig, AxiosResponse } from 'axios';
import axiosInstance from '@/plugins/axios.plugin';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export function useApi() {
  const request = async <T>(
    method: HttpMethod,
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    try {
      const response: AxiosResponse<T> = await axiosInstance.request<T>({ method, url, data, ...config });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return {
    get: <T>(url: string, config?: AxiosRequestConfig): Promise<T> => request<T>('GET', url, undefined, config),
    post: <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => request<T>('POST', url, data, config),
    put: <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => request<T>('PUT', url, data, config),
    delete: <T>(url: string, config?: AxiosRequestConfig): Promise<T> => request<T>('DELETE', url, undefined, config),
    patch: <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => request<T>('PATCH', url, data, config)
  };
}
