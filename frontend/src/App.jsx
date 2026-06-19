import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout Components
import Sidebar from './components/Sidebar';
import Header from './components/Header';

// Pages
import DashboardPage from './pages/Dashboard';
import BookingsPage from './pages/Bookings';
import CalendarPage from './pages/Calendar';
import RoomsPage from './pages/Rooms';
import CustomersPage from './pages/Customers';
import BillingsPage from './pages/Billings';

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
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/rooms" element={<RoomsPage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/billings" element={<BillingsPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}