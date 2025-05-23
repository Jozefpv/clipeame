import { AxiosInstance } from 'axios';
import { buildAxiosInstance } from './axios.builder';
import { Profile } from '../models/Profile';

export class AuthGateway {

    private axios: AxiosInstance;

    constructor(){
        this.axios = buildAxiosInstance();
    }

    async login(email: string, password: string) {
        const response = await this.axios.post(
        '/auth/login',
        { email, password },
        { withCredentials: true }
        );
        return response.data;
    }

    async register(email: string, password: string){
        const response = await this.axios.post(
        '/auth/register',
        { email, password },
        { withCredentials: true }
        );
        return response;
    }

    async verifyOtp(email: string, token: string): Promise<boolean> {
        const response = await this.axios.post(
        '/auth/verify-otp',
        { email, token },
        { withCredentials: true }
        );
        return response.data.verify
    }

    getGoogleAuthUrl(): string {
        return `${this.axios.defaults.baseURL}/auth/google`;
    }

    async getProfile(profileId: string): Promise<Profile> {
        const res = await this.axios.get(
        `auth/profile/${profileId}`,
        { withCredentials: true }
      );
      return res.data;
    }
}