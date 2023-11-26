import React from 'react';
import { Outlet } from 'react-router-dom';
import AsideNav from '../components/AsideNav';

const MainLayout = () => {
  return (
    <div>
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <AsideNav />
          {/* <!-- Layout container --> */}
          <div className="layout-page">
            {/* <!-- Content wrapper --> */}
            <div className="content-wrapper">
              <div className="container-xxl flex-grow-1 container-p-y">
                <Outlet />
              </div>
              <div className="content-backdrop fade"></div>
            </div>
            {/* <!-- Content wrapper --> */}
          </div>
          {/* <!-- / Layout page --> */}
        </div>

        {/* <!-- Overlay --> */}
        <div className="layout-overlay layout-menu-toggle"></div>
      </div>
    </div>
  )
}

export default MainLayout;