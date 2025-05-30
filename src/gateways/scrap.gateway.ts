import { AxiosInstance } from 'axios';
import { buildAxiosInstance } from './axios.builder';

export class ScrapGateway {
  private axios: AxiosInstance;

  constructor() {
    this.axios = buildAxiosInstance();
  }

  async participate(campaignId: string): Promise<boolean> {
    const res = await this.axios.post(
      '/scrap/tiktok',
      { campaignId },
      { withCredentials: true },
    );
    return res.data.status;
  }
}
