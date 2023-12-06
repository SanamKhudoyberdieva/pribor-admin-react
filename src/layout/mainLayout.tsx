import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import AsideNav from '../components/AsideNav';
import Header from '../components/Header';
import { getAdmin } from '../api';
import { useDispatch } from 'react-redux';
import { logOut, setMe } from '../store/slices/loginSlice';

const MainLayout = () => {
  const dispatch = useDispatch()
  const fetchAdmin = async () => {
    try {
      let res = await getAdmin()
      dispatch(setMe(res.data))
    } catch (error) {
      dispatch(logOut())
      console.log("error getAdmin", error)
    }
  }
  useEffect(() => {
    fetchAdmin()
  }, [])
  return (
    <div>
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <AsideNav />
          {/* <!-- Layout container --> */}
          <div className="layout-page">
            {/* Header */}
            <Header />
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