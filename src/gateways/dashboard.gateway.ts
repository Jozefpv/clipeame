import { AxiosInstance } from 'axios';
import { buildAxiosInstance } from './axios.builder';

export class DashboardGateway {
  private axios: AxiosInstance;

  constructor() {
    this.axios = buildAxiosInstance();
  }

  async getAllCampaigns() {
    const res = await this.axios.get('/dashboard/campaigns', {
      withCredentials: true,
    });
    return res.data.campaigns;
  }

  async getCampaignById(campaignId: string) {
    const res = await this.axios.get(`/dashboard/campaigns/${campaignId}`, {
      withCredentials: true,
    });
    return res.data.campaign;
  }

  async getMyCampaignById(prolileId: string) {
    const res = await this.axios.get(`/dashboard/mycampaigns/${prolileId}`, {
      withCredentials: true,
    });
    return res.data.campaigns;
  }

  async participate(campaignId: string, postLink: string) {
    const res = await this.axios.post(
      '/dashboard/participate',
      { campaignId, postLink },
      { withCredentials: true },
    );
    return res.data.participation;
  }

  async addCampaign(formData: FormData) {
    const res = await this.axios.post('/dashboard/add', formData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data.checkoutUrl;
  }
}
