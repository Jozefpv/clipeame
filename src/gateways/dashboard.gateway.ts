import { AxiosInstance } from 'axios';
import { buildAxiosInstance } from './axios.builder';

export class DashboardGateway {

    private axios: AxiosInstance;

    constructor(){
        this.axios = buildAxiosInstance();
    }

    async getAllCampaigns(){
      const res = await this.axios.get('/dashboard/campaigns', {
        withCredentials: true
      });
      return res.data.campaigns;
    }

    async getCampaignById(campaignId: string){
      const res = await this.axios.get(
        `/dashboard/campaigns/${campaignId}`,
        { withCredentials: true }
      );
      return res.data.campaign;
  }

  async participate(campaignId: string, postLink: string) {
    const res = await this.axios.post(
      '/dashboard/participate',
      { campaignId, postLink },
      { withCredentials: true }
    );
    return res.data.participation;
  }

}