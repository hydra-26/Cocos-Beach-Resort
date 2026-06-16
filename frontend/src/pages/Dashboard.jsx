import React, { useMemo } from 'react';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Check, 
  Clock, 
  UserCheck, 
  DoorOpen, 
  LogOut, 
  CreditCard, 
  Wallet 
} from 'lucide-react';

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

  // Enhanced KPI dataset mapped with contextual icons, color states, and custom graph path trends
  const kpis = [
    { 
      title: 'Checking In', 
      val: '1', 
      trend: '+20%', 
      up: true, 
      icon: UserCheck, 
      color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    },
    { 
      title: 'Ongoing Stays', 
      val: '7', 
      trend: '+8%', 
      up: true, 
      icon: DoorOpen, 
      color: 'text-indigo-600 bg-indigo-50 border-indigo-100',
    },
    { 
      title: 'Checking Out', 
      val: '2', 
      trend: '-5%', 
      up: false, 
      icon: LogOut, 
      color: 'text-rose-600 bg-rose-50 border-rose-100',
    },
    { 
      title: 'Pending Balance', 
      val: '₱98,500', 
      trend: '-12%', 
      up: false, 
      icon: CreditCard, 
      color: 'text-amber-600 bg-amber-50 border-amber-100',
    },
    { 
      title: 'Total Collected', 
      val: '₱106,100', 
      trend: '+18%', 
      up: true, 
      icon: Wallet, 
      color: 'text-cyan-600 bg-cyan-50 border-cyan-100',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner - Custom Burgundy Theme with Layered Vector Bubble UI */}
      <div className="bg-[#7A1C31] rounded-2xl p-8 text-white flex justify-between items-center shadow-md relative overflow-hidden h-[180px]">
        
        {/* BACKGROUND BUBBLE/CIRCLE UI ELEMENTS */}
        <div className="absolute right-[-40px] top-[-30px] w-[320px] h-[320px] rounded-full bg-white/[0.03] pointer-events-none" />
        <div className="absolute right-[40px] bottom-[-90px] w-[260px] h-[260px] rounded-full bg-white/[0.04] pointer-events-none" />
        <div className="absolute right-[180px] top-[20px] w-[110px] h-[110px] rounded-full bg-white/[0.02] pointer-events-none" />
        <div className="absolute right-[240px] bottom-[10px] w-[70px] h-[70px] rounded-full bg-white/[0.03] pointer-events-none" />

        {/* Banner Texts */}
        <div className="z-10 select-none">
          <p className="text-white/60 text-xs font-normal mb-1.5">{todayDateFormatted}</p>
          <h2 className="text-3xl font-bold mb-1.5 tracking-tight flex items-center gap-2">
            Good morning, Ms. Sidney <span className="animate-pulse">👋</span>
          </h2>
          <p className="text-white/70 text-sm font-normal">Here's what's happening at Cocos Beach Resort today.</p>
        </div>

        {/* Occupancy Card - High Fidelity Glassmorphic UI */}
        <div className="relative z-10 bg-white/[0.08] backdrop-blur-md px-6 py-5 rounded-2xl border border-white/10 text-center w-[180px] shadow-lg flex flex-col justify-between h-[132px]">
          <div>
            <p className="text-[10px] font-bold tracking-widest uppercase text-white/60 mb-1">Occupancy</p>
            <p className="text-4xl font-extrabold text-white tracking-tight">50%</p>
          </div>
          
          <div className="space-y-2">
            <div className="w-full bg-black/20 h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#F5A623] h-full w-1/2 rounded-full"></div>
            </div>
            <p className="text-[11px] text-white/60 font-medium">8 of 16 rooms</p>
          </div>
        </div>
      </div>

      {/* KPI Highlight Rows - IMPROVED HIGH FIDELITY CARD COMPONENT GRID */}
      <div className="grid grid-cols-5 gap-4">
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
                
                {/* Trend values styling */}
                <div className={`text-xs font-bold flex items-center gap-0.5 ${kpi.up ? 'text-emerald-600' : 'text-rose-500'}`}>
                  {kpi.up ? <ArrowUpRight size={14} strokeWidth={2.5} /> : <ArrowDownRight size={14} strokeWidth={2.5} />}
                  {kpi.trend}
                </div>
              </div>

            </div>
          );
        })}
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
                  <div className="w-9 h-9 rounded-full bg-[#7A1C31]/5 text-[#7A1C31] font-bold text-xs flex items-center justify-center border border-[#7A1C31]/10">
                    {act.initial}
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-gray-800">{act.name}</h5>
                    <p className="text-xs text-gray-400">{act.detail}</p>
                  </div>
                </div>
                <div>
                  {act.type === 'in' && <span className="bg-[#7A1C31]/5 text-[#7A1C31] border border-[#7A1C31]/20 px-2.5 py-0.5 rounded-full text-[11px] font-bold">Check In</span>}
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