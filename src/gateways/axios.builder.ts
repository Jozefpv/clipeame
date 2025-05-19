import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export function buildAxiosInstance(): AxiosInstance {
  const instance = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  } as AxiosRequestConfig);


  return instance;
}