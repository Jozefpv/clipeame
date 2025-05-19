import React from 'react'

import FooterBar from '../../components/navbars/FooterBar';
import MainSideBar from '../../components/navbars/MainSideBar';
import { Outlet } from 'react-router-dom';

export default function Home() {
  return (
    <div className="h-screen w-full flex overflow-x-hidden">
      <div className="relative w-22 flex-none">
        <MainSideBar />
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