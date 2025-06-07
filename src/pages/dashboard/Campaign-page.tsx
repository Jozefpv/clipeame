import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { CampaignDetail } from '../../components/CampaignDetail';
import { DashboardGateway } from '../../gateways/dashboard.gateway';
import { Campaign } from '../../models/CampingModel';

export const emptyCampaign: Campaign = {
  id: '',
  title: '',
  description: '',
  imageUrl: '',
  budget: 0,
  budgetRemaining: 0,
  paid: 0,
  reward: 0,
  typeId: 0,
  socialMediaId: 0,
  requirements: [],
  categoryId: 0,
  files: [],
  status: 0,
  creationDate: new Date(),
  startDate: new Date(),
  endDate: new Date(),
  authorId: '',
  authorName: '',
  authorAvatar: '',
  maxPayment: 0,
  participants: [],
  onParticipate: () => {},
};

export default function CampaignPage() {
  const { campaignId } = useParams<{ campaignId: string }>();
  const location = useLocation();
  const stateCampaign = (location.state as { campaign?: Campaign })?.campaign;

  const [campaign, setCampaign] = useState<Campaign>(
    stateCampaign ?? emptyCampaign,
  );
  const gateway = new DashboardGateway();

  useEffect(() => {
    if (!stateCampaign && campaignId) {
      (async () => {
        const fetched = await gateway.getCampaignById(campaignId);
        setCampaign(fetched);
      })();
    }
    setCampaign(prev => ({
      ...prev,
      requirements: [
        'Los clips no pueden dejar mal a Pedro Buerbaum (edición, subtítulos, título, etc.)',
        'Debe etiquetar a @PedroBuerbaum en cada publicación en Twitter y en Instagram Reels.',
        'Debe incluir el hashtag #Emprendimiento en TODAS las plataformas.',
        'El vídeo debe tener al menos 30 segundos de duración.',
      ],
      files: [
        {
          name: 'Instrucciones.pdf',
          url: 'https://example.com/instrucciones.pdf',
        },
        { name: 'Assets.zip', url: 'https://example.com/assets.zip' },
      ],
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <CampaignDetail {...campaign} />
    </>
  );
}
