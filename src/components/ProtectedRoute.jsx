import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner" />
      </div>
    );
  }

  if (!user) {
    // Redirect to login but tell it to show the "Login Required" message
    return <Navigate to="/login" state={{ from: location, requireLogin: true }} replace />;
  }

  return children;
};

export default ProtectedRoute;
