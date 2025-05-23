import React, { createContext, useState, ReactNode } from 'react';
import { emptyProfile, Profile } from '../models/Profile';

interface AuthContextType {
  user: string;
  profile: Profile
  setProfile: (profile: Profile) => void;
  setUser: (user: string) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType>({
  user: '',
  profile: emptyProfile,
  setUser: () => {},
  setProfile: () => {}
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<string>('');
  const [profile, setProfile] = useState<Profile>(emptyProfile);
  return (
    <AuthContext.Provider value={{ user, profile, setUser, setProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
