import { useContext, useEffect, useState } from 'react';
import { Campaign } from '../../models/CampingModel';
import { CampaignStadisticsItem } from '../../components/CampaignStadisticsItem';
import { DashboardGateway } from '../../gateways/dashboard.gateway';
import { AuthContext } from '../../context/AuthContext';
import { emptyCampaign } from '../dashboard/Campaign-page';
import { Spinner } from 'flowbite-react';

export const StadisticsPage = () => {
  const gateway = new DashboardGateway();
  const [myCampaings, setMyCampaigns] = useState<Campaign[]>([emptyCampaign]);
  const { profile } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const calcAnalytics = (c: Campaign) =>
    Math.floor(Math.random() * (c.budget * 1.5));
  const calcVisits = (c: Campaign) => Math.floor(calcAnalytics(c) * 0.8);
  const calcEarnings = (c: Campaign) =>
    parseFloat(((calcVisits(c) / 1000) * c.reward).toFixed(2));
  const calcCPM = (c: Campaign) =>
    parseFloat(((calcEarnings(c) / calcVisits(c)) * 1000).toFixed(2));

  useEffect(() => {
    (async () => {
      setLoading(true);
      const allMyCampaigns = await gateway.getMyCampaignById(profile.id);
      setMyCampaigns(allMyCampaigns);
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-full w-full bg-zinc-900 flex flex-col justify-start py-8 px-4 sm:px-6 lg:px-8">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-3xl font-bold text-white">Mis participaciones</h2>
        </div>
        <p className="text-white/70 mb-6">Obtenes métricas de tu contenido.</p>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-6 w-2/3">
          {myCampaings.map(c => (
            <CampaignStadisticsItem
              key={c.id}
              campaign={c}
              getAnalytics={calcAnalytics}
              getVisits={calcVisits}
              getEarnings={calcEarnings}
              getCPM={calcCPM}
            />
          ))}
        </div>
      )}
    </div>
  );
};
