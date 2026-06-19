import React, { useState, useRef } from 'react';
import * as htmlToImage from 'html-to-image';
import {
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  CreditCard,
  Check,
  Clock,
  SlidersHorizontal,
  Search,
  ChevronDown,
  FileText
} from 'lucide-react';

// Modular Component Import
import Receipts from '../components/Receipts';

export default function Billings() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal Interactions and Snapshot Canvas Elements
  const [showReceipt, setShowReceipt] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const receiptCaptureRef = useRef(null);

  // 1. KPI Cards State matching Dashboard UI Style
  const kpis = [
    {
      title: 'Total Collected',
      val: '₱106,100',
      trend: '+18%',
      up: true,
      icon: Wallet,
      color: 'text-cyan-600 bg-cyan-50 border-cyan-100',
    },
    {
      title: 'Pending Balance',
      val: '₱98,500',
      trend: '-10%',
      up: false,
      icon: CreditCard,
      color: 'text-amber-600 bg-amber-50 border-amber-100',
    },
    {
      title: 'Fully Paid',
      val: '4',
      trend: '+25%',
      up: true,
      icon: Check,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    },
    {
      title: 'Partial Payment',
      val: '14',
      trend: '-5%',
      up: false,
      icon: Clock,
      color: 'text-rose-600 bg-rose-50 border-rose-100',
    },
  ];

  // 2. Billing Dataset Mock Setup
  const billingRecords = [
    { id: 'BK-2024-001', guest: 'Maria Santos', pax: '3 pax', room: 'Rm 2', total: 13500, rate: 13000, extra: 500, downpayment: 5000, balance: 8500, status: 'Partial', checkIn: '2026-06-10', checkOut: '2026-06-15', notes: 'Late checkout requested' },
    { id: 'BK-2024-002', guest: 'Pedro Cruz', pax: '2 pax', room: 'Rm 4', total: 4000, rate: 4000, extra: 0, downpayment: 2000, balance: 2000, status: 'Partial', checkIn: '2026-06-12', checkOut: '2026-06-14', notes: '' },
    { id: 'BK-2024-003', guest: 'Ana Reyes', pax: '4 pax', room: 'Rm 6', total: 4800, rate: 4500, extra: 300, downpayment: 4800, balance: 0, status: 'Paid', checkIn: '2026-06-11', checkOut: '2026-06-13', notes: 'Paid via GCash' },
    { id: 'BK-2024-004', guest: 'Garcia Family', pax: '7 pax', room: 'Rm 7', total: 37500, rate: 35000, extra: 2500, downpayment: 15000, balance: 22500, status: 'Partial', checkIn: '2026-06-09', checkOut: '2026-06-16', notes: 'Pool access added' },
  ];

  // Triggers structured row assignment match into modal schema parameters
  const handleOpenReceipt = (record) => {
    setSelectedReceipt({
      id: record.id,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      name: record.guest,
      room: record.room,
      checkIn: record.checkIn,
      checkOut: record.checkOut,
      notes: record.notes,
      rate: record.rate,
      extra: record.extra,
      downpayment: record.downpayment,
      paymentStatus: record.status === 'Paid' ? 'Fully Paid' : 'Unpaid'
    });
    setShowReceipt(true);
  };

  const handleDownloadPng = () => {
    if (receiptCaptureRef.current) {
      htmlToImage.toPng(receiptCaptureRef.current, { style: { transform: 'scale(1)' } })
        .then((dataUrl) => {
          const downloadLink = document.createElement('a');
          downloadLink.download = `${selectedReceipt?.id || 'Receipt'}.png`;
          downloadLink.href = dataUrl;
          downloadLink.click();
        })
        .catch(err => console.error('Image capture failed', err));
    }
  };

  return (
    <div className="space-y-6">
      
      {/* KPI Highlight Rows - Replicated Dashboard Grid UI */}
      <div className="grid grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => {
          const IconComponent = kpi.icon;
          return (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md hover:border-gray-200 transition-all duration-300">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                    {kpi.title}
                  </span>
                  <span className="text-2xl font-extrabold text-gray-800 tracking-tight block">
                    {kpi.val}
                  </span>
                </div>
                <div className={`p-2.5 rounded-xl border ${kpi.color} shadow-sm group-hover:scale-105 transition-transform duration-300`}>
                  <IconComponent size={18} strokeWidth={2.2} />
                </div>
              </div>
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

      {/* Filter and Search Action Header Panel */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <button className="flex items-center gap-2 border px-3 py-2 rounded-lg text-sm text-gray-600 bg-gray-50 font-medium hover:bg-gray-100 transition-colors">
            <SlidersHorizontal size={16} /> Filters
          </button>
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search billing by guest or ID..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg w-full text-sm outline-none focus:border-[#7A1C31]" 
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <select className="appearance-none bg-gray-50 border pl-4 pr-10 py-2 rounded-lg text-sm font-medium text-gray-700 outline-none cursor-pointer hover:bg-gray-100 transition-colors">
              <option>All Statuses</option>
              <option>Paid</option>
              <option>Partial</option>
            </select>
            <ChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" size={14} />
          </div>
        </div>
      </div>

      {/* Main Table Presentation Container - Styled exactly like Bookings.jsx */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b flex justify-between items-center">
          <h3 className="font-bold text-gray-800">Billing Records</h3>
          <span className="text-xs font-bold text-gray-400 tracking-wider">4 RECORDS</span>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/70 text-[11px] font-bold text-gray-400 tracking-wider border-b">
              <th className="p-4">BOOKING ID</th>
              <th className="p-4">GUEST</th>
              <th className="p-4">ROOM</th>
              <th className="p-4">TOTAL BILL</th>
              <th className="p-4">DOWNPAYMENT</th>
              <th className="p-4">BALANCE</th>
              <th className="p-4">STATUS</th>
              <th className="p-4 text-center">RECEIPT</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {billingRecords
              .filter(rec => rec.guest.toLowerCase().includes(searchQuery.toLowerCase()) || rec.id.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((rec, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4">
                    <span className="bg-gray-100 font-mono text-xs text-gray-600 px-2 py-1 rounded font-bold">
                      {rec.id}
                    </span>
                  </td>
                  <td className="p-4">
                    <p className="font-bold text-gray-800">{rec.guest}</p>
                    <p className="text-xs text-gray-400">{rec.pax}</p>
                  </td>
                  <td className="p-4">
                    <span className="text-[#7A1C31] bg-[#7A1C31]/5 font-semibold px-2.5 py-0.5 rounded text-xs border border-[#7A1C31]/10">
                      {rec.room}
                    </span>
                  </td>
                  <td className="p-4 text-gray-800 font-bold">₱{rec.total.toLocaleString()}</td>
                  <td className="p-4 text-gray-600 font-medium">₱{rec.downpayment.toLocaleString()}</td>
                  <td className={`p-4 font-bold ${rec.status === 'Paid' ? 'text-emerald-600' : 'text-rose-500'}`}>
                    ₱{rec.balance.toLocaleString()}
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-0.5 rounded-full text-xs font-semibold ${
                      rec.status === 'Paid' 
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                        : 'bg-amber-50 text-amber-600 border border-amber-100'
                    }`}>
                      {rec.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center">
                      <button 
                        onClick={() => handleOpenReceipt(rec)}
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-1 font-medium text-xs transition-colors border border-blue-100 hover:border-blue-200 bg-blue-50/50 px-2.5 py-1 rounded-lg"
                      >
                        <FileText size={14} /> View
                      </button>
                    </div>
                  </td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Extracted Receipt Canvas Component Modal portal references */}
      <Receipts
        showReceipt={showReceipt}
        setShowReceipt={setShowReceipt}
        activeReceipt={selectedReceipt}
        receiptCaptureRef={receiptCaptureRef}
        handleDownloadPng={handleDownloadPng}
      />
    </div>
  );
}