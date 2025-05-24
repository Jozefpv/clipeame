import { AxiosInstance } from 'axios';
import { buildAxiosInstance } from './axios.builder';
import { Profile, ProfileConfig } from '../models/Profile';

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

    async register(email: string, password: string) {
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
      return res.data.profile; 
    }

    async logOut() {
        const response = await this.axios.post(
            '/auth/logout',
            {},
            { withCredentials: true }
        );
        return response;
    }

    async uploadAvatar(file: File): Promise<string> {
        const formData = new FormData();
        formData.append('avatar', file);

        const response = await this.axios.post(
            '/auth/profile/avatar',
            formData,
            { withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' } }
        );
        return response.data.avatarUrl;
    }

    async saveProfileConfig(form: Partial<Profile>): Promise<boolean> {
        const response = await this.axios.post(
            '/auth/profile/config',
            { form },
            { withCredentials: true }
        );
        return response.data;
    }
}