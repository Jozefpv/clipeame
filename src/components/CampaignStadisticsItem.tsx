import React from 'react';
import { Campaign } from '../models/CampingModel';
import { useNavigate } from 'react-router-dom';

interface Props {
  campaign: Campaign;
  getAnalytics: (c: Campaign) => number;
  getVisits: (c: Campaign) => number;
  getEarnings: (c: Campaign) => number;
  getCPM: (c: Campaign) => number;
}

export const CampaignStadisticsItem: React.FC<Props> = ({
  campaign,
  getAnalytics,
  getVisits,
  getEarnings,
  getCPM,
}) => {
  const navigate = useNavigate();
  const analytics = getAnalytics(campaign);
  const visits = getVisits(campaign);
  const earnings = getEarnings(campaign);
  const cpm = getCPM(campaign);
  const progress = Math.min(100, (analytics / campaign.budget) * 100);

  const day   = new Date(campaign.creationDate).getDate().toString().padStart(2, '0');
  const month = (new Date(campaign.creationDate).getMonth() + 1).toString().padStart(2, '0');
  const year  = new Date(campaign.creationDate).getFullYear();

  return (
    <div
      className="group flex justify-between bg-zinc-800 rounded-2xl overflow-hidden shadow-lg hover:bg-zinc-700 transition cursor-pointer"
      onClick={() => navigate(`/campaign/${campaign.id}`, { state: { campaign } })}
    >
      <div className='flex flex-row justify-between w-full'>
          <div className="w-50 h-30 ml-2 my-2 overflow-hidden rounded-xl">
      <img
        src={campaign.imageUrl}
        alt={campaign.title}
        className="
          w-full h-full 
          object-cover 
          transform transition-transform duration-400 ease-out 
          group-hover:scale-110
        "
      />
    </div>

        <div className="flex-1 px-4 py-3">
          <h3 className="text-white text-lg font-semibold truncate">
            {campaign.title}
          </h3>
          <p className="text-white/70 text-sm truncate mt-1">
            {campaign.description}
          </p>
          <div className="flex items-center text-xs text-white/70 mt-2">
            <img
              src={campaign.authorAvatar}
              alt={campaign.authorName}
              className="w-5 h-5 rounded-full mr-2"
            />
            <span>
              Publicado por {campaign.authorName} · {day}/{month}/{year}
            </span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2 mt-3">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="w-1/6 flex justify-center px-4 py-3 text-right text-white/70 text-xs space-y-2">
          <div>
            <span className="mt-1 inline-block bg-gray-700 text-white text-[10px] px-2 py-1 rounded-lg">
                  {campaign.status === 0 && <p className="text-sm text-yellow-400">Pendiente</p>}
                  {campaign.status === 1 && <p className="text-sm text-green-400">Activa</p>}
                  {campaign.status === 2 && <p className="text-sm text-red-400">Finalizada</p>}
            </span>
          </div>
        
        </div>
      </div>

      <div className="w-1/6 px-4 py-3 text-right text-white/70 text-xs space-y-2">
        <div>
          <span className="font-medium text-white">Analytics</span>
          <span className="ml-1">{analytics.toLocaleString()}</span>
        </div>
        <div>
          <span className="font-medium text-white">Visitas</span>
          <span className="ml-1">{visits.toLocaleString()}</span>
        </div>
        <div>
          <span className="font-medium text-white">Ganancias</span>
          <span className="ml-1">€{earnings.toFixed(2)}</span>
        </div>
        <div>
          <span className="font-medium text-white">CPM</span>
          <span className="ml-1">€{cpm.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};