import React, { createContext, useState, ReactNode } from 'react';
import { Campaign } from '../models/CampingModel';

interface CampaignContextType {
  campaigns: Campaign[];
  setCampaigns: (campaigns: Campaign[]) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const CampaignContext = createContext<CampaignContextType>({
  campaigns: [],
  setCampaigns: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const CampaignProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  return (
    <CampaignContext.Provider value={{ campaigns, setCampaigns }}>
      {children}
    </CampaignContext.Provider>
  );
};