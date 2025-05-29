import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export function buildAxiosInstance(): AxiosInstance {
  const instance = axios.create({
    baseURL: 'https://backclipeame.onrender.com',
    timeout: 30000,
  } as AxiosRequestConfig);

  return instance;
}
