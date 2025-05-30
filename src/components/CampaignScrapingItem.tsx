import React, { useState } from 'react';
import { Campaign } from '../models/CampingModel';
import { Spinner } from './Spinner';

interface Props {
  campaign: Campaign;
  onScrap: (campaignId: string) => Promise<void>;
}

const CampaignScrapingItem: React.FC<Props> = ({ campaign, onScrap }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loadingScrap, setLoadingScrap] = useState(false);

  const totalViews = campaign.participants.reduce((acc, p) => acc + p.views, 0);

  const created = new Date(campaign.creationDate);
  const day = created.getDate().toString().padStart(2, '0');
  const month = (created.getMonth() + 1).toString().padStart(2, '0');
  const year = created.getFullYear();

  const handleScrap = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setLoadingScrap(true);
    await onScrap(campaign.id);
    setLoadingScrap(false);
  };
  const containerClass = `group flex justify-between bg-zinc-800 overflow-hidden shadow-lg hover:bg-zinc-700 transition cursor-pointer ${isOpen ? 'rounded-t-2xl' : 'rounded-2xl'}`;

  return (
    <div>
      <div className={containerClass} onClick={() => setIsOpen(o => !o)}>
        <div className="flex flex-row justify-between w-full">
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
              {campaign.title}{' '}
              <span className="mt-1 ml-2 inline-block bg-gray-700 text-white text-[10px] px-2 py-1 rounded-lg">
                {campaign.status === 0 && (
                  <p className="text-sm text-yellow-400">Pendiente</p>
                )}
                {campaign.status === 1 && (
                  <p className="text-sm text-green-400">Activa</p>
                )}
                {campaign.status === 2 && (
                  <p className="text-sm text-red-400">Finalizada</p>
                )}
              </span>
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
          </div>
        </div>

        <div className="w-3/6 px-4 py-3 text-right text-white/70 text-xs space-y-2">
          <div>
            <span className="font-medium text-white">Visitas totales:</span>
            <span className="ml-1">{totalViews.toLocaleString()}</span>
          </div>
          <button
            className="bg-blue-600 hover:bg-blue-400 text-white font-semibold rounded-full transition cursor-pointer h-9 min-w-[80px]"
            onClick={handleScrap}
          >
            {loadingScrap ? (
              <div className="w-full flex items-center justify-center">
                <Spinner />
              </div>
            ) : (
              <p>Scrap</p>
            )}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="bg-zinc-700 px-4 py-3 transition-all border-t-1 border-black duration-300 ease-in-out rounded-b-2xl ">
          <ul className="space-y-1 text-white/80 text-sm">
            {campaign.participants.length > 0 ? (
              campaign.participants.map(p => (
                <li key={p.postLink} className="flex justify-between">
                  <span className="truncate max-w-xs">{p.postLink}</span>
                  <span>{p.views.toLocaleString()}</span>
                </li>
              ))
            ) : (
              <li className="text-center text-white/50">
                Sin participantes registrados
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CampaignScrapingItem;
