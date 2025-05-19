import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CampaignDetail } from '../../components/CampaignDetail'
import { DashboardGateway } from '../../gateways/dashboard.gateway';
import { Campaign } from '../../models/CampingModel';
export const emptyCampaign: Campaign = {
  id: '',
  title: '',
  description: '',
  imageUrl: '',
  budget: 0,
  paid: 0,
  reward: 0,
  type: '',
  socialMedia: '',
  requirements: [],
  category: '',
  files: [],
  status: 0,
  creationDate: new Date(),
  startDate: new Date(),
  endDate: new Date(),
  authorId: '',
  authorName: '',
  authorAvatar: '',
  maxPayment: 0,
  onParticipate: () => {}
}
export default function CampaignPage() {
    const { campaignId } = useParams()

    const [campaign, setCampaign] = useState(emptyCampaign);
      const gateway = new DashboardGateway();
    
      useEffect(() => {
        (async () => {
          if(campaignId){
            const campaign = await gateway.getCampaignById(campaignId);
            console.log(campaign)
            campaign.requirements= [
                'Los clips no pueden dejar mal a Pedro Buerbaum (edición, subtítulos, título, etc.)',
                'Debe etiquetar a @PedroBuerbaum en cada publicación en Twitter y en Instagram Reels.',
                'Debe incluir el hashtag #Emprendimiento en TODAS las plataformas.',
                'El vídeo debe tener al menos 30 segundos de duración.',
            ]
            campaign.files = [
                { name: 'Instrucciones.pdf', url: 'https://example.com/instrucciones.pdf' },
                { name: 'Assets.zip', url: 'https://example.com/assets.zip' },
            ]
            campaign.onParticipate = () => {
                    console.log('¡Me apunto a la campaña!', campaignId)
                }
            setCampaign(campaign);
            }})
        ()
    
      }, []);

// const sampleCampaign: CampaignDetailProps = {
//   authorName: 'Pedro Buerbaum',
//   authorAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
//   title: 'Entrevista con Pedro Buerbaum',
//   contentType: 'Clips',
//   campaignImage: 'https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2025/02/18/17398910234738.jpg',
//   paid: 476.41,
//   budget: 1000,
//   reward: 1.5,
//   maxPayment: 250,
//   category: 'Creador',

// }

//   requirements: [
//     'Los clips no pueden dejar mal a Pedro Buerbaum (edición, subtítulos, título, etc.)',
//     'Debe etiquetar a @PedroBuerbaum en cada publicación en Twitter y en Instagram Reels.',
//     'Debe incluir el hashtag #Emprendimiento en TODAS las plataformas.',
//     'El vídeo debe tener al menos 30 segundos de duración.',
//   ],
//   files: [
//     { name: 'Instrucciones.pdf', url: 'https://example.com/instrucciones.pdf' },
//     { name: 'Assets.zip', url: 'https://example.com/assets.zip' },
//   ],
//   onPcipate: () => {
//     consolartie.log('¡Me apunto a la campaña!', campaignId)
//   },
console.log(campaign)
  return (
      <>
       <CampaignDetail {...campaign} />
      </>
  )
}