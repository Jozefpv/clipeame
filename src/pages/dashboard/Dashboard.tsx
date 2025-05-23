import React, { useContext, useEffect } from 'react';
import { CampaignCard } from '../../components/CampaignCard';
import { FiDollarSign } from 'react-icons/fi';
import { DashboardGateway } from '../../gateways/dashboard.gateway';
import { CampaignContext } from '../../context/CampaignContext';
import { AuthContext } from '../../context/AuthContext';

export default function Dashboard() {
  const gateway = new DashboardGateway();
  const { campaigns, setCampaigns } = useContext(CampaignContext);
  const { profile } = useContext(AuthContext);


  useEffect(() => {
    (async () => {
      if(campaigns.length === 0){
        const allCampaigns = await gateway.getAllCampaigns();
        setCampaigns(allCampaigns);
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(profile)

  return (
    <div className="h-full w-full bg-zinc-900 flex flex-col items-center justify-start py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full">
        <div className="flex items-center gap-2 mb-2">
          <FiDollarSign className="w-6 h-6 text-blue-500" />
          <h2 className="text-3xl font-bold text-white">Campañas activas</h2>
        </div>
        <p className="text-white/70 mb-6">
          Genera ingresos por crear contenido.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
          {campaigns.length > 0 && campaigns.map((camp) => (
            <CampaignCard key={camp.id} campaign={camp} />
          ))}
        </div>
      </div>
    </div>
  );
}
