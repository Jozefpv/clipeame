import { useContext } from 'react'

import FooterBar from '../../components/navbars/FooterBar';
import MainSideBar from '../../components/navbars/MainSideBar';
import { Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function Home() {
  const { profile } = useContext(AuthContext);
    
  return (
    <div className="h-screen w-full flex overflow-x-hidden">
      <div className="relative w-22 flex-none">
        <MainSideBar profile={profile}/>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
        <FooterBar />
      </div>
    </div>
  )
}