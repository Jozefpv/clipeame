import React, { useContext, useEffect, useState } from 'react';
import { CampaignCard } from '../../components/CampaignCard';
import { FiDollarSign } from 'react-icons/fi';
import { DashboardGateway } from '../../gateways/dashboard.gateway';
import { CampaignContext } from '../../context/CampaignContext';
import { AiOutlinePlus } from 'react-icons/ai';
import { CreateCampaignModal } from '../../components/modals/AddCampaignModal';
import { Spinner } from 'flowbite-react';

export default function Dashboard() {
  const gateway = new DashboardGateway();
  const { campaigns, setCampaigns } = useContext(CampaignContext);
  const [openNewCampaign, setOpenNewCampaign] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddCampaign = () => {
    setOpenNewCampaign(true);
  };

  const handleCloseAddCampaign = async () => {
    const newCampaigns = await gateway.getAllCampaigns();
    setCampaigns(newCampaigns);
    setOpenNewCampaign(false);
  };

  useEffect(() => {
    (async () => {
      if (campaigns.length === 0) {
        setLoading(true);
        const allCampaigns = await gateway.getAllCampaigns();
        setCampaigns(allCampaigns);
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-full w-full bg-zinc-900 flex flex-col items-center justify-start py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full">
        <div className="w-full flex justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FiDollarSign className="w-6 h-6 text-blue-500" />
              <h2 className="text-3xl font-bold text-white">
                Campañas activas
              </h2>
            </div>
            <p className="text-white/70 mb-6">
              Genera ingresos por crear contenido.
            </p>
          </div>
          <div>
            <button
              type="button"
              className="flex items-center w-full p-2 bg-green-800/40 text-green-400 cursor-pointer hover:bg-green-400/30 rounded-lg transition"
              onClick={handleAddCampaign}
            >
              <AiOutlinePlus className="mr-3 mt-1" />
              <p>Añadir campaña</p>
            </button>
          </div>
        </div>

        {loading ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
            {campaigns.length > 0 &&
              campaigns.map(camp => (
                <CampaignCard key={camp.id} campaign={camp} />
              ))}
          </div>
        )}
      </div>
      <CreateCampaignModal
        isOpen={openNewCampaign}
        onClose={handleCloseAddCampaign}
        onCreated={() => {}}
      />
    </div>
  );
}
