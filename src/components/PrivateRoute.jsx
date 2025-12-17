import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ adminOnly = false, customerOnly = false }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Memverifikasi otorisasi...</p>
      </div>
    );
  }

  // Redirect ke login yang sesuai jika belum login
  if (!user) {
    if (adminOnly) {
      return <Navigate to="/admin/login" replace state={{ from: location }} />;
    }
    return <Navigate to="/customer/login" replace state={{ from: location }} />;
  }

  // Redirect berdasarkan role
  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/customer/home" replace />;
  }

  if (customerOnly && user.role !== 'customer') {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;