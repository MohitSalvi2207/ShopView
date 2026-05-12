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
          <Route path="/login" element={<Login />} />

          {/* ✅ Dashboard is now PUBLIC */}
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Navigate to="products" replace />} />

            {/* ✅ Products — no login needed */}
            <Route path="products" element={<Products />} />
            <Route path="products/:id" element={<ProductDetail />} />

            {/* 🔒 Profile ONLY — requires login */}
            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route
            path="*"
            element={<Navigate to="/dashboard/products" replace />}
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
