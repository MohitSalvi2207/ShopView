import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Dashboard = () => (
  <div className="dashboard-layout">
    <Navbar />
    <main className="dashboard-main">
      <Outlet />
    </main>
  </div>
);

export default Dashboard;
