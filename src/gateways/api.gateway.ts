import { AxiosInstance } from 'axios';
import { buildAxiosInstance } from './axios.builder';

export class ApiGateway {

    private axios: AxiosInstance;

    constructor(){
        this.axios = buildAxiosInstance();
    }

    async checkAuth(){
      const res = await this.axios.get('/api/check-auth', {
        withCredentials: true
      });
      return res;
  }

}