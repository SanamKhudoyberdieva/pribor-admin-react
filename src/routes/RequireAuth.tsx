import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const RequireAuth = () => {
  const accessToken = localStorage.getItem("accessToken")
  console.log("accessToken", accessToken)
  const location = useLocation();
  return accessToken ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default RequireAuth