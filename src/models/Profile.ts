export interface Profile {
    id: string;
    profileName: string;
    profileUsername: string;
    email: string
    avatarUrl: string;
    createdAt: Date;
    phone?: number;
    campaigns: string[];
}


export const emptyProfile: Profile = {
    id: '',
    profileName: '',
    profileUsername: '',
    email: '',
    avatarUrl: '',
    createdAt: new Date(),
    campaigns: []
}