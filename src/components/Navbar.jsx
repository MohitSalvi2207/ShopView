import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/dashboard/products">
          <span className="brand-icon">◈</span>
          <span className="brand-name">ShopView</span>
        </Link>
      </div>

      <div className="navbar-links">
        <Link
          to="/dashboard/products"
          className={`nav-link ${isActive('/dashboard/products') ? 'active' : ''}`}
        >
          Products
        </Link>
        <Link
          to="/dashboard/profile"
          className={`nav-link ${isActive('/dashboard/profile') ? 'active' : ''}`}
        >
          Profile
        </Link>
      </div>

      <div className="navbar-user">
        {user?.image && (
          <img src={user.image} alt={user.firstName} className="avatar" />
        )}
        <span className="user-name">{user?.firstName} {user?.lastName}</span>
        <button className="btn-logout" onClick={handleLogout}>
          Sign out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
