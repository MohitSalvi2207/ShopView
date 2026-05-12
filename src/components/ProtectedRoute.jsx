import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Still reading localStorage — don't redirect yet
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner" />
      </div>
    );
  }

  // ✅ Not logged in → redirect to /login
  // ✅ Saves current URL so user returns here after login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // ✅ Logged in → render the actual page
  return children;
};

export default ProtectedRoute;
