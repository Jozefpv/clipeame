import { CampaignParticipants } from "./CampaignParticipants"

export interface Campaign {
  id: string
  title: string
  description: string
  imageUrl: string
  budget: number
  paid: number
  reward: number
  typeId: number
  socialMediaId: number
  requirements: string[]
  categoryId: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  files: any[]
  status: number
  creationDate: Date
  startDate:    Date
  endDate:      Date
  authorId:     string
  authorName:   string
  authorAvatar: string
  maxPayment: number
  participants: CampaignParticipants[]
  onParticipate: () => void
}


// export interface Campaign {
//   id: string;
//   title: string;
//   description: string;
//   imageUrl: string;
//   author: string;
//   authorAvatar: string;
//   timeAgo: string;
//   paid: number;
//   goal: number;
//   type: string;
//   platforms: Array<'youtube' | 'tiktok' | 'twitch'>;
//   reward: string;
// }
