import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const [showPopup, setShowPopup] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard/products";

  useEffect(() => {
    if (location.state?.requireLogin) {
      setShowPopup(true);
      // Clear the state so it doesn't show again on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const validate = () => {
    const e = {};
    if (!username.trim()) e.username = "Username is required";
    if (!password) e.password = "Password is required";
    else if (password.length < 4)
      e.password = "Password must be at least 4 characters";
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setApiError("");
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      await login(username, password);
      navigate(from, { replace: true });
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        "Invalid credentials. Please try again.";
      setApiError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-bg">
        <div className="bg-shape shape-1" />
        <div className="bg-shape shape-2" />
        <div className="bg-shape shape-3" />
      </div>

      <div className="login-card">
        <div className="login-header">
          <span className="brand-icon-lg">◈</span>
          <h1 className="login-title">ShopView</h1>
          <p className="login-subtitle">Sign in to your account</p>
        </div>

        {apiError && (
          <div className="alert alert-error">
            <span className="alert-icon">⚠</span>
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="login-form">
          <div className={`form-group ${errors.username ? "has-error" : ""}`}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setErrors((p) => ({ ...p, username: "" }));
              }}
              autoComplete="username"
            />
            {errors.username && (
              <span className="field-error">{errors.username}</span>
            )}
          </div>

          <div className={`form-group ${errors.password ? "has-error" : ""}`}>
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <input
                id="password"
                type={showPass ? "text" : "password"}
                placeholder="Your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors((p) => ({ ...p, password: "" }));
                }}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="toggle-pass"
                onClick={() => setShowPass((p) => !p)}
                aria-label="Toggle password visibility"
              >
                {showPass ? "🙈" : "👁"}
              </button>
            </div>
            {errors.password && (
              <span className="field-error">{errors.password}</span>
            )}
          </div>

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? <span className="btn-spinner" /> : "Sign In"}
          </button>
        </form>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <div className="popup-icon">🔒</div>
            <h2 className="popup-title">Login Required</h2>
            <p className="popup-message">
              You need to be logged in to access this page. Please sign in to
              continue.
            </p>
            <div className="popup-actions">
              <button
                className="popup-btn-primary"
                onClick={() => setShowPopup(false)}
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
