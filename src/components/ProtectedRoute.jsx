import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [showPopup, setShowPopup] = useState(true);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner" />
      </div>
    );
  }

  // ✅ Not logged in → show popup first
  if (!user) {
    if (showPopup) {
      return (
        <div className="popup-overlay">
          <div className="popup-box">
            <div className="popup-icon">🔒</div>
            <h2 className="popup-title">Login Required</h2>
            <p className="popup-message">
              You need to be logged in to access the dashboard. Please sign in
              to continue.
            </p>
            <div className="popup-actions">
              <button
                className="popup-btn-primary"
                onClick={() => setShowPopup(false)}
              >
                Go to Login
              </button>
            </div>
          </div>
        </div>
      );
    }

    // After clicking → redirect to login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
