export interface Campaign {
  id: string
  title: string
  description: string
  imageUrl: string
  budget: number
  paid: number
  reward: number
  type: string
  socialMedia: string
  requirements: string[]
  category: string
  files: string[]
  status: number
  creationDate: Date
  startDate:    Date
  endDate:      Date
  authorId:     string
  authorName:   string
  authorAvatar: string
  maxPayment: number
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
