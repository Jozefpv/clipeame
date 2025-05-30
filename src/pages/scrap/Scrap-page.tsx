import { useContext, useEffect, useState } from 'react';
import { DashboardGateway } from '../../gateways/dashboard.gateway';
import { Spinner } from 'flowbite-react';
import CampaignScrapingItem from '../../components/CampaignScrapingItem';
import { ScrapGateway } from '../../gateways/scrap.gateway';
import { CampaignContext } from '../../context/CampaignContext';

const ScrapPage = () => {
  const gateway = new DashboardGateway();
  const scrapGateway = new ScrapGateway();
  const { campaigns, setCampaigns } = useContext(CampaignContext);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    const allCampaigns = await gateway.getAllCampaigns();
    setCampaigns(allCampaigns);
    setLoading(false);
  };
  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScrap = async (campaignId: string) => {
    const updated = await scrapGateway.participate(campaignId);
    if (updated) {
      const updatedCampaign = await gateway.getCampaignById(campaignId);
      const newCampaigns = campaigns.map(c =>
        c.id === campaignId ? updatedCampaign : c,
      );
      setCampaigns(newCampaigns);
    }
  };

  return (
    <div className="h-full w-full bg-zinc-900 flex flex-col justify-start py-8 px-4 sm:px-6 lg:px-8">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-3xl font-bold text-white">Master scraping</h2>
        </div>
        <p className="text-white/70 mb-6">
          Dispara los procesos de scraping de tus campañas.
        </p>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-6 w-2/3">
          {campaigns.map(c => (
            <CampaignScrapingItem
              key={c.id}
              campaign={c}
              onScrap={handleScrap}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ScrapPage;
