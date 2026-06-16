import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout Components
import Sidebar from './components/Sidebar';
import Header from './components/Header';

// Pages
import DashboardPage from './pages/Dashboard';
import BookingsPage from './pages/Bookings';

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      <Sidebar />
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header />
        <div className="flex-1 overflow-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/bookings" element={<BookingsPage />} />
          {/* Add other routes similarly as you build them */}
        </Routes>
      </Layout>
    </Router>
  );
}