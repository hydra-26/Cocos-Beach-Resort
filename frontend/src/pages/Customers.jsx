import React, { useState, useMemo } from 'react';
import { 
  Users, 
  UserCheck, 
  Wallet, 
  Search, 
  SlidersHorizontal, 
  ChevronDown, 
  Eye, 
  ArrowUpRight, 
  ArrowDownRight 
} from 'lucide-react';

export default function Customers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');

  // Customer guest records extracted from your directory references
  const initialGuests = [
    { name: 'Maria Santos', contact: '0917-123-4567', address: 'Manila, Metro Manila', bookings: 3, lastStay: '2026-06-10', totalSpent: '₱38,500', initial: 'MS' },
    { name: 'Garcia Family', contact: '0920-456-7890', address: 'Makati City, Metro Manila', bookings: 2, lastStay: '2026-06-09', totalSpent: '₱72,000', initial: 'GF' },
    { name: 'Ana Reyes', contact: '0919-345-6789', address: 'Baguio City, Benguet', bookings: 1, lastStay: '2026-06-11', totalSpent: '₱4,800', initial: 'AR' },
    { name: 'Roberto Tan', contact: '0922-678-9012', address: 'Cebu City, Cebu', bookings: 4, lastStay: '2026-06-08', totalSpent: '₱96,400', initial: 'RT' },
    { name: 'Pedro Cruz', contact: '0918-234-5678', address: 'Quezon City, Metro Manila', bookings: 1, lastStay: '2026-06-12', totalSpent: '₱4,000', initial: 'PC' },
    { name: 'Chen Family', contact: '0923-789-0123', address: 'Davao City, Davao del Sur', bookings: 2, lastStay: '2026-06-11', totalSpent: '₱13,000', initial: 'CF' },
    { name: 'David Villanueva', contact: '0925-901-2345', address: 'Angeles City, Pampanga', bookings: 2, lastStay: '2026-06-05', totalSpent: '₱14,200', initial: 'DV' },
    { name: 'Jennifer Aquino', contact: '0926-012-3456', address: 'Iloilo City, Iloilo', bookings: 1, lastStay: '2026-06-03', totalSpent: '₱8,600', initial: 'JA' },
  ];

  // Enhanced KPI dataset mirroring Dashboard KPI high-fidelity styles
  const kpis = [
    { 
      title: 'Total Customers', 
      val: '8', 
      trend: '+5%', 
      up: true, 
      icon: Users, 
      color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    },
    { 
      title: 'Total Bookings', 
      val: '16', 
      trend: '+12%', 
      up: true, 
      icon: UserCheck, // Substituted contextually fitting dashboard icons
      color: 'text-indigo-600 bg-indigo-50 border-indigo-100',
    },
    { 
      title: 'Repeat Guests', 
      val: '5', 
      trend: '+8%', 
      up: true, 
      icon: UserCheck, 
      color: 'text-amber-600 bg-amber-50 border-amber-100',
    },
    { 
      title: 'Avg Spend', 
      val: '₱31,438', 
      trend: '+15%', 
      up: true, 
      icon: Wallet, 
      color: 'text-cyan-600 bg-cyan-50 border-cyan-100',
    },
  ];

  // Filtering Logic
  const filteredGuests = useMemo(() => {
    return initialGuests.filter(guest => {
      const matchesSearch = guest.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            guest.address.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (statusFilter === 'Repeat Only') {
        return matchesSearch && guest.bookings > 1;
      }
      if (statusFilter === 'Single Booking') {
        return matchesSearch && guest.bookings === 1;
      }
      
      return matchesSearch;
    });
  }, [searchQuery, statusFilter]);

  return (
    <div className="space-y-6">
      
      {/* KPI Highlight Rows (Dashboard UI Card Mapping Structure) */}
      <div className="grid grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => {
          const IconComponent = kpi.icon;
          return (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md hover:border-gray-200 transition-all duration-300">
              
              {/* Header section with Icon Frame */}
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                    {kpi.title}
                  </span>
                  <span className="text-2xl font-extrabold text-gray-800 tracking-tight block">
                    {kpi.val}
                  </span>
                </div>
                
                {/* Dynamic context badge icon wrap */}
                <div className={`p-2.5 rounded-xl border ${kpi.color} shadow-sm group-hover:scale-105 transition-transform duration-300`}>
                  <IconComponent size={18} strokeWidth={2.2} />
                </div>
              </div>

              {/* Footer row displaying sparkline graph layout and numeric percentage offsets */}
              <div className="flex items-center justify-between mt-5 pt-2 border-t border-gray-50">
                <div className={`text-xs font-bold flex items-center gap-0.5 ${kpi.up ? 'text-emerald-600' : 'text-rose-500'}`}>
                  {kpi.up ? <ArrowUpRight size={14} strokeWidth={2.5} /> : <ArrowDownRight size={14} strokeWidth={2.5} />}
                  {kpi.trend} <span className="text-gray-400 font-normal ml-1">vs last month</span>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Search Filter Header Interface Block (Bookings Header Layout) */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <button className="flex items-center gap-2 border px-3 py-2 rounded-lg text-sm text-gray-600 bg-gray-50 font-medium hover:bg-gray-100 transition-colors">
            <SlidersHorizontal size={16} /> Filters
          </button>
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guest name or location..." 
              className="pl-10 pr-4 py-2 border rounded-lg w-full text-sm outline-none focus:border-[#7A1C31]" 
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none bg-gray-50 border pl-4 pr-10 py-2 rounded-lg text-sm font-medium text-gray-700 outline-none cursor-pointer hover:bg-gray-100 transition-colors"
            >
              <option value="All Status">All Types</option>
              <option value="Repeat Only">Repeat Guests</option>
              <option value="Single Booking">Single Booking</option>
            </select>
            <ChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" size={14} />
          </div>
        </div>
      </div>

      {/* Main Records Presentation Grid Panel Container (Bookings Table Layout) */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b flex justify-between items-center">
          <h3 className="font-bold text-gray-800">Guest Directory</h3>
          <span className="text-xs font-bold text-gray-400 tracking-wider">
            {filteredGuests.length} RECORDS
          </span>
        </div>
        
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/70 text-[11px] font-bold text-gray-400 tracking-wider border-b">
              <th className="p-4">GUEST</th>
              <th className="p-4">CONTACT</th>
              <th className="p-4">ADDRESS</th>
              <th className="p-4 text-center">BOOKINGS</th>
              <th className="p-4">LAST STAY</th>
              <th className="p-4">TOTAL SPENT</th>
              <th className="p-4 text-center">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {filteredGuests.map((guest, i) => (
              <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                
                {/* Guest Profile and Initials Frame Layout */}
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#7A1C31]/5 text-[#7A1C31] font-bold text-xs flex items-center justify-center border border-[#7A1C31]/10">
                      {guest.initial}
                    </div>
                    <p className="font-bold text-gray-800">{guest.name}</p>
                  </div>
                </td>
                
                <td className="p-4 text-gray-600 text-xs font-medium">{guest.contact}</td>
                
                <td className="p-4 text-gray-500 text-xs max-w-[200px] truncate">{guest.address}</td>
                
                {/* Room code matching layout repurposed for historical booking counts */}
                <td className="p-4 text-center">
                  <span className="text-[#7A1C31] bg-[#7A1C31]/5 font-semibold px-2.5 py-0.5 rounded text-xs border border-[#7A1C31]/10">
                    {guest.bookings}
                  </span>
                </td>
                
                <td className="p-4 text-gray-600 text-xs font-medium">{guest.lastStay}</td>
                
                <td className="p-4 font-bold text-gray-800">{guest.totalSpent}</td>
                
                <td className="p-4 text-center">
                  <div className="flex items-center justify-center gap-2 text-gray-400">
                    <button className="hover:text-[#7A1C31] p-1 transition-colors">
                      <Eye size={16} />
                    </button>
                  </div>
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}