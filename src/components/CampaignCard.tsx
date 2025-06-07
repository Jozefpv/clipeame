import React from 'react';
import { Campaign } from '../models/CampingModel';
import { FaYoutube, FaTwitch } from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';
import { useNavigate } from 'react-router-dom';
import { mapCampaignSocialmedia, mapCampaignType } from '../utils/mappers';

interface Props {
  campaign: Campaign;
}

export const CampaignCard: React.FC<Props> = ({ campaign }) => {
  const navigate = useNavigate();
  const progress = Math.min(
    100,
    ((campaign.budget - campaign.budgetRemaining) / campaign.budget) * 100,
  );
  const day = new Date(campaign.creationDate)
    .getDate()
    .toString()
    .padStart(2, '0');
  const month = (new Date(campaign.creationDate).getMonth() + 1)
    .toString()
    .padStart(2, '0');
  const year = new Date(campaign.creationDate).getFullYear();

  return (
    <div
      className="group bg-zinc-800 rounded-2xl cursor-pointer overflow-hidden shadow-lg flex flex-col hover:bg-zinc-700 transition"
      onClick={() =>
        navigate(`/campaign/${campaign.id}`, {
          state: { campaign },
        })
      }
    >
      <div className="px-4 py-3 flex items-center gap-2">
        <img
          src={campaign.authorAvatar}
          alt={campaign.authorName}
          className="w-6 h-6 rounded-full object-cover"
        />
        <span className="text-sm text-white/70">
          Publicado por{' '}
          <strong className="text-white">{campaign.authorName}</strong> el{' '}
          {`${day}/${month}/${year}`}
        </span>
      </div>

      <div className="px-4">
        <div className="w-full aspect-video overflow-hidden rounded-xl">
          <img
            src={campaign.imageUrl}
            alt={campaign.title}
            className="w-full h-full object-cover transform transition-transform duration-400 ease-out group-hover:scale-110"
          />
        </div>
      </div>

      <div className="px-4 py-3 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-white text-xl font-semibold">{campaign.title}</h3>
          <p className="text-white/70 text-sm mt-1 truncate">
            {campaign.description}
          </p>
        </div>

        <div className="mt-4">
          <div className="w-full bg-white/10 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-white/70 text-xs mt-1">
            <span>
              {(campaign.budget - campaign.budgetRemaining).toFixed(2)}€ de{' '}
              {campaign.budget}€ pagados
            </span>
            <span>{progress.toFixed(0)}%</span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-4 text-xs text-white/70">
          <div className="flex flex-col items-start">
            <span className="font-medium text-white">Tipo</span>
            <span className="mt-1">{mapCampaignType(campaign.typeId)}</span>
          </div>

          <div className="flex flex-col items-center">
            <span className="font-medium text-white">Plataformas</span>
            <div className="mt-1 flex items-center gap-2">
              {mapCampaignSocialmedia(campaign.socialMediaId).includes(
                'YOUTUBE',
              ) && <FaYoutube className="w-5 h-5" />}
              {mapCampaignSocialmedia(campaign.socialMediaId).includes(
                'TIKTOK',
              ) && <SiTiktok className="w-5 h-5" />}
              {mapCampaignSocialmedia(campaign.socialMediaId).includes(
                'INSTAGRAM',
              ) && <FaTwitch className="w-5 h-5" />}
            </div>
          </div>

          <div className="flex flex-col items-end">
            <span className="font-medium text-white">Recompensas</span>
            <span className="mt-1 inline-block bg-blue-500 text-white text-[10px] px-2 py-1 rounded-full">
              €{campaign.reward} / 1K
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
