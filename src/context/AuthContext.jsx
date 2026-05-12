import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { loginUser } from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // 👈 true until localStorage is read

  useEffect(() => {
    // On app start, check if a session already exists
    const stored = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (stored && token) {
      setUser(JSON.parse(stored)); // ✅ Restore session
    }

    setLoading(false); // ✅ Done checking — allow routing to proceed
  }, []);

  const login = useCallback(async (username, password) => {
    const data = await loginUser(username, password);
    const userData = {
      id: data.id,
      username: data.username,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      image: data.image,
    };
    localStorage.setItem("token", data.accessToken);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData); // ✅ Sets user → ProtectedRoute now allows access
    return userData;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null); // ✅ Clears user → ProtectedRoute will redirect to /login
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
