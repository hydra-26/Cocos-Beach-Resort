import React, { useMemo } from 'react';
import { ArrowUpRight, ArrowDownRight, Check, Clock, LayoutDashboard, Receipt, DoorOpen, CalendarDays, Users, Calendar } from 'lucide-react';

export default function Dashboard() {
  const roomsData = [
    { id: 1, status: 'Available', pax: 4, guest: '' },
    { id: 2, status: 'Occupied', pax: 4, guest: 'Maria' },
    { id: 3, status: 'Available', pax: 4, guest: '' },
    { id: 4, status: 'Reserved', pax: 4, guest: 'Pedro' },
    { id: 5, status: 'Available', pax: 4, guest: '' },
    { id: 6, status: 'Occupied', pax: 4, guest: 'Ana' },
    { id: 7, status: 'Occupied', pax: 8, guest: 'Garcia' },
    { id: 8, status: 'Available', pax: 8, guest: '' },
    { id: 9, status: 'Reserved', pax: 6, guest: 'Lopez' },
    { id: 10, status: 'Available', pax: 6, guest: '' },
    { id: 11, status: 'Occupied', pax: 6, guest: 'Roberto' },
    { id: 12, status: 'Available', pax: 6, guest: '' },
    { id: 13, status: 'Available', pax: 6, guest: '' },
    { id: 14, status: 'Occupied', pax: 6, guest: 'Chen' },
    { id: 15, status: 'Available', pax: 6, guest: '' },
    { id: 16, status: 'Reserved', pax: 4, guest: 'Sarah' },
  ];

  const activities = [
    { name: 'Lopez Group', detail: 'Rm 9 • 5 pax', status: 'Check In', type: 'in', initial: 'LG' },
    { name: 'Ana Reyes', detail: 'Rm 6 • 4 pax', status: 'Check Out', type: 'out', initial: 'AR' },
    { name: 'Chen Family', detail: 'Rm 14 • 6 pax', status: 'Check Out', type: 'out', initial: 'CF' },
    { name: 'Maria Santos', detail: 'Rm 2 • 3 pax', status: 'Staying', type: 'stay', initial: 'MS' },
    { name: 'Garcia Family', detail: 'Rm 7 • 7 pax', status: 'Staying', type: 'stay', initial: 'GF' },
    { name: 'Roberto Tan', detail: 'Rm 11 • 4 pax', status: 'Staying', type: 'stay', initial: 'RT' },
  ];

  // Dynamically compute today's date format cleanly
  const todayDateFormatted = useMemo(() => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }, []);

  return (
    <div className="space-y-6">
      {/* Top Banner - Custom Burgundy Gradient matched to Sidebar Theme */}
      <div className="bg-gradient-to-r from-brand-burgundy via-[#8E223A] to-[#A32D47] rounded-2xl p-8 text-white flex justify-between items-center shadow-md relative overflow-hidden">
        <div className="z-10">
          {/* Dynamic real-time date injection */}
          <p className="text-white/70 text-sm font-medium mb-1">{todayDateFormatted}</p>
          <h2 className="text-3xl font-bold mb-1">Good morning, Ms. Sidney 👋</h2>
          <p className="text-white/80 opacity-90">Here's what's happening at Cocos Beach Resort today.</p>
        </div>

        {/* Occupancy Card Glassmorphism Element */}
        <div className="bg-white/10 backdrop-blur-md p-5 rounded-xl border border-white/20 text-center min-w-[160px] z-10">
          <p className="text-xs font-semibold tracking-wider uppercase text-white/70 mb-1">Occupancy</p>
          <p className="text-4xl font-extrabold text-brand-light">50%</p>
          <div className="w-full bg-brand-burgundy/40 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-orange-300 h-full w-1/2 rounded-full"></div>
          </div>
          <p className="text-[11px] text-white/70 mt-1.5">8 of 16 rooms</p>
        </div>

        {/* Brand Faint Silhouette Element */}
        <div className="absolute right-0 bottom-0 text-white/[0.04] pointer-events-none translate-x-10 translate-y-10">
          <span className="text-[200px] select-none">🌴</span>
        </div>
      </div>

      {/* KPI Highlight Rows */}
      <div className="grid grid-cols-5 gap-4">
        {[
          { title: 'Checking In', val: '1', trend: '+20%', up: true },
          { title: 'Ongoing Stays', val: '7', trend: '+8%', up: true },
          { title: 'Checking Out', val: '2', trend: '-5%', up: false },
          { title: 'Pending Balance', val: '₱98,500', trend: '-12%', up: false },
          { title: 'Total Collected', val: '₱106,100', trend: '+18%', up: true },
        ].map((kpi, idx) => (
          <div key={idx} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">{kpi.title}</span>
              <span className="text-2xl font-bold text-gray-800">{kpi.val}</span>
            </div>
            <div className={`text-xs font-semibold mt-3 flex items-center gap-1 ${kpi.up ? 'text-green-600' : 'text-red-500'}`}>
              {kpi.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              {kpi.trend} <span className="text-gray-400 font-normal">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Multi-Column Panel split */}
      <div className="grid grid-cols-4 gap-6">
        {/* Left Side: Room status visualization grid */}
        <div className="col-span-3 space-y-6">
          {/* Stacked Progress Breakdown */}
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div className="flex-1 max-w-md">
              <span className="text-xs font-bold text-gray-700 block mb-2">Room Status Overview</span>
              <div className="flex h-3 rounded-full overflow-hidden w-full bg-gray-100">
                <div className="bg-green-500 w-[50%]"></div>
                <div className="bg-red-500 w-[31%]"></div>
                <div className="bg-amber-500 w-[19%]"></div>
              </div>
              <div className="flex gap-4 mt-3 text-xs text-gray-500 font-medium">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span> 8 Available</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-red-500 rounded-full"></span> 5 Occupied</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-amber-500 rounded-full"></span> 3 Reserved</span>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="border rounded-xl px-4 py-2.5 text-center bg-gray-50/50">
                <span className="text-green-600 bg-green-50 p-1 rounded-full inline-block mb-1"><Check size={14} /></span>
                <p className="text-lg font-bold text-gray-800">4</p>
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wide">Fully Paid</p>
              </div>
              <div className="border rounded-xl px-4 py-2.5 text-center bg-gray-50/50">
                <span className="text-amber-500 bg-amber-50 p-1 rounded-full inline-block mb-1"><Clock size={14} /></span>
                <p className="text-lg font-bold text-gray-800">15</p>
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wide">Pending Pay</p>
              </div>
            </div>
          </div>

          {/* Complete 16-Room Configuration Display */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-800 text-lg mb-4">All Rooms</h3>
            <div className="grid grid-cols-4 gap-4">
              {roomsData.map((rm) => (
                <div 
                  key={rm.id} 
                  className={`p-4 rounded-xl border transition-all ${
                    rm.status === 'Available' ? 'bg-green-50/40 border-green-200/70' :
                    rm.status === 'Occupied' ? 'bg-red-50/40 border-red-200/70' :
                    'bg-amber-50/40 border-amber-200/70'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xl font-bold text-gray-800">{rm.id}</h4>
                      <span className={`text-[11px] font-bold tracking-wide ${
                        rm.status === 'Available' ? 'text-green-600' :
                        rm.status === 'Occupied' ? 'text-red-600' :
                        'text-amber-600'
                      }`}>{rm.status}</span>
                    </div>
                    <span className={`w-2 h-2 rounded-full mt-1.5 ${
                      rm.status === 'Available' ? 'bg-green-500' :
                      rm.status === 'Occupied' ? 'bg-red-500' :
                      'bg-amber-500'
                    }`}></span>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-1 font-medium">👥 {rm.pax} pax</span>
                    <span className="font-bold text-gray-700 truncate max-w-[80px]">{rm.guest}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Activity log container panel */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm h-full flex flex-col">
          <div className="mb-4">
            <h3 className="font-bold text-gray-800 text-base">Today's Activity</h3>
            <p className="text-xs text-gray-400">6 guests active</p>
          </div>
          <div className="space-y-3 flex-1 overflow-y-auto pr-1">
            {activities.map((act, i) => (
              <div key={i} className="flex items-center justify-between p-2.5 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                <div className="flex items-center gap-3">
                  {/* Avatars updated to warm brand background tints instead of cool blue */}
                  <div className="w-9 h-9 rounded-full bg-brand-burgundy/5 text-brand-burgundy font-bold text-xs flex items-center justify-center border border-brand-burgundy/10">
                    {act.initial}
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-gray-800">{act.name}</h5>
                    <p className="text-xs text-gray-400">{act.detail}</p>
                  </div>
                </div>
                <div>
                  {act.type === 'in' && <span className="bg-brand-burgundy/5 text-brand-burgundy border border-brand-burgundy/20 px-2.5 py-0.5 rounded-full text-[11px] font-bold">Check In</span>}
                  {act.type === 'out' && <span className="bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-full text-[11px] font-medium">Check Out</span>}
                  {act.type === 'stay' && <span className="text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full text-[11px] font-semibold">Staying</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}