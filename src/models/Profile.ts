export interface Profile {
    id: string;
    profileName: string;
    email: string
    avatarUrl: string;
    createdAt: Date;
    campaigns: string[];
}


export const emptyProfile: Profile = {
    id: '',
    profileName: '',
    email: "",
    avatarUrl: "",
    createdAt: new Date(),
    campaigns: []
}