'use server'
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

interface ApiResponse<T> {
  data: T;
  ok: boolean;
}

class ApiService {
  private static instance: AxiosInstance;

  private static getInstance(): AxiosInstance {
    if (!ApiService.instance) {
      ApiService.instance = axios.create({
        baseURL: import.meta.env.VITE_API_URL,
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': import.meta.env.VITE_API_KEY,
        },
      });
    }
    return ApiService.instance;
  }

  public static async request<T, P>(
    method: 'get' | 'post' | 'put' | 'delete',
    url: string,
    payload?: P,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const { data }: AxiosResponse<{ data: T }> =
        await ApiService.getInstance().request({
          method,
          url,
          data: payload,
          ...config,
        });

      return {
        data: data as T,
        ok: true,
      };
    } catch (error) {

      return {
        data: (error as AxiosError).response?.config as T,
        ok: false,
      };
    }
  }
}

export default ApiService;
