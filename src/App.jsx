import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import "./styles/global.css";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* ✅ Public — anyone can visit */}
          <Route path="/login" element={<Login />} />

          {/* 🔒 Protected — ProtectedRoute checks login before rendering */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                {" "}
                {/* 👈 Guard is applied HERE */}
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="products" replace />} />
            <Route path="products" element={<Products />} />{" "}
            {/* 🔒 Protected */}
            <Route path="products/:id" element={<ProductDetail />} />{" "}
            {/* 🔒 Protected */}
            <Route path="profile" element={<Profile />} /> {/* 🔒 Protected */}
          </Route>

          {/* Any unknown URL → login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
