import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Receipt, DoorOpen, CalendarDays, Users, Calendar, Palmtree } from 'lucide-react';
import logo from '../assets/sidebar.svg';

const SidebarItem = ({ to, icon: Icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <div className="relative mb-1">
      {isActive && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 h-7 w-1 rounded-full bg-orange-300" />
      )}
      <Link
        to={to}
        className={`flex items-center gap-3 ml-2 px-4 py-3 rounded-xl transition-colors ${
          isActive
            ? 'bg-brand-light/10 text-brand-light font-semibold'
            : 'text-blue-100 hover:bg-brand-light/5 hover:text-brand-light'
        }`}
      >
        <Icon size={20} />
        <span>{label}</span>
      </Link>
    </div>
  );
};

export default function Sidebar() {
  return (
    <aside className="w-64 bg-brand-burgundy text-white flex flex-col">
      <div className="px-6 py-2 flex items-center justify-center border-b border-white/10">
        <img src={logo} alt="Cocos Beach Resort" className="h-20 object-contain" />
      </div>

      <nav className="relative flex-1 px-4 mt-4 overflow-hidden text-brand-light">
        <Palmtree
          size={220}
          strokeWidth={1.5}
          className="absolute -bottom-8 -right-12 text-brand-light/5 pointer-events-none rotate-6"
        />
        <div className="relative z-10">
          <SidebarItem to="/" icon={LayoutDashboard} label="Dashboard" />
          <SidebarItem to="/bookings" icon={Receipt} label="Bookings" />
          <SidebarItem to="/rooms" icon={DoorOpen} label="Rooms" />
          <SidebarItem to="/calendar" icon={CalendarDays} label="Calendar" />
          <SidebarItem to="/customers" icon={Users} label="Customers" />
          <SidebarItem to="/billings" icon={Calendar} label="Billing" />
        </div>
      </nav>

      <div className="p-4 flex items-center gap-3 mt-auto border-t border-white/10">
        <div className="w-10 h-10 rounded-full bg-orange-300 flex items-center justify-center text-brand-burgundy font-bold">
          ST
        </div>
        <div>
          <div className="font-medium text-sm text-brand-light">Ms. Sidney</div>
          <div className="text-xs text-blue-200">Admin</div>
        </div>
      </div>
    </aside>
  );
}