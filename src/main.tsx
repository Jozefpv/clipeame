import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext.tsx';
import { CampaignProvider } from './context/CampaignContext.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename="/clipeame">
    <AuthProvider>
      <CampaignProvider>
        <App />
      </CampaignProvider>
    </AuthProvider>
  </BrowserRouter>,
)
