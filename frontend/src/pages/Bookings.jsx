import React, { useState, useRef } from 'react';
import * as htmlToImage from 'html-to-image';
import { Eye, Edit, Printer, Search, SlidersHorizontal, ChevronDown } from 'lucide-react';

// Modular Component Custom Imports
import AddBookingModal from '../components/modals/AddBookingModal';
import Receipts from '../components/Receipts';

export default function Bookings() {
  const [showModal, setShowModal] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  
  // Interactive Form States
  const [form, setForm] = useState({
    name: '', contact: '', guests: 4, address: '',
    room: 'Room 1', checkIn: '', checkOut: '', notes: '',
    rate: 0, extra: 0, downpayment: 0, paymentStatus: 'Unpaid'
  });

  const [activeReceipt, setActiveReceipt] = useState(null);
  const receiptCaptureRef = useRef(null);

  // Computed Billing Calculations
  const calculatedNights = () => {
    if (!form.checkIn || !form.checkOut) return 0;
    const diffTime = Math.abs(new Date(form.checkOut) - new Date(form.checkIn));
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 0;
  };
  
  const totalBaseAmount = form.rate + form.extra;
  const balanceDue = totalBaseAmount - form.downpayment;

  const initialBookings = [
    { id: 'BK-2024-001', guest: 'Maria Santos', pax: '3 pax', room: 'Rm 2', stay: '2026-06-10 → 2026-06-15', dp: '₱5,000', bal: '₱8,500', status: 'Ongoing', balType: 'danger' },
    { id: 'BK-2024-002', guest: 'Pedro Cruz', pax: '2 pax', room: 'Rm 4', stay: '2026-06-12 → 2026-06-14', dp: '₱2,000', bal: '₱2,000', status: 'Upcoming', balType: 'danger' },
    { id: 'BK-2024-003', guest: 'Ana Reyes', pax: '4 pax', room: 'Rm 6', stay: '2026-06-11 → 2026-06-13', dp: '₱4,800', bal: '₱0', status: 'Ongoing', balType: 'success' },
    { id: 'BK-2024-004', guest: 'Garcia Family', pax: '7 pax', room: 'Rm 7', stay: '2026-06-09 → 2026-06-16', dp: '₱15,000', bal: '₱22,500', status: 'Ongoing', balType: 'danger' },
    { id: 'BK-2024-005', guest: 'Lopez Group', pax: '5 pax', room: 'Rm 9', stay: '2026-06-13 → 2026-06-14', dp: '₱0', bal: '₱3,000', status: 'Upcoming', balType: 'danger' },
    { id: 'BK-2024-006', guest: 'Roberto Tan', pax: '4 pax', room: 'Rm 11', stay: '2026-06-08 → 2026-06-15', dp: '₱10,000', bal: '₱14,200', status: 'Ongoing', balType: 'danger' },
  ];

  const handleInputChange = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const executeSave = (e) => {
    e.preventDefault();
    setActiveReceipt({
      id: `BK-2026-${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      ...form,
      nights: calculatedNights(),
      total: totalBaseAmount,
      balance: balanceDue
    });
    setShowModal(false);
    setShowReceipt(true);
  };

  const handleDownloadPng = () => {
    if (receiptCaptureRef.current) {
      htmlToImage.toPng(receiptCaptureRef.current, { style: { transform: 'scale(1)' } })
        .then((dataUrl) => {
          const downloadLink = document.createElement('a');
          downloadLink.download = `${activeReceipt?.id || 'Receipt'}.png`;
          downloadLink.href = dataUrl;
          downloadLink.click();
        })
        .catch(err => console.error('Image capture failed', err));
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Filter Header Interface Block */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <button className="flex items-center gap-2 border px-3 py-2 rounded-lg text-sm text-gray-600 bg-gray-50 font-medium hover:bg-gray-100 transition-colors">
            <SlidersHorizontal size={16} /> Filters
          </button>
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input type="text" placeholder="Search guest name or booking ID..." className="pl-10 pr-4 py-2 border rounded-lg w-full text-sm outline-none focus:border-[#7A1C31]" />
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <select className="appearance-none bg-gray-50 border pl-4 pr-10 py-2 rounded-lg text-sm font-medium text-gray-700 outline-none cursor-pointer hover:bg-gray-100 transition-colors">
              <option>All Status</option>
            </select>
            <ChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" size={14} />
          </div>
          <div className="relative">
            <select className="appearance-none bg-gray-50 border pl-4 pr-10 py-2 rounded-lg text-sm font-medium text-gray-700 outline-none cursor-pointer hover:bg-gray-100 transition-colors">
              <option>All Rooms</option>
            </select>
            <ChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" size={14} />
          </div>
          <button onClick={() => setShowModal(true)} className="bg-[#7A1C31] hover:bg-[#631425] text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors">
            + New Booking
          </button>
        </div>
      </div>

      {/* Main Records Presentation Grid Panel Container */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b flex justify-between items-center">
          <h3 className="font-bold text-gray-800">All Bookings</h3>
          <span className="text-xs font-bold text-gray-400 tracking-wider">19 RECORDS</span>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/70 text-[11px] font-bold text-gray-400 tracking-wider border-b">
              <th className="p-4">BOOKING ID</th>
              <th className="p-4">GUEST</th>
              <th className="p-4">ROOM</th>
              <th className="p-4">STAY</th>
              <th className="p-4">DOWNPAYMENT</th>
              <th className="p-4">BALANCE</th>
              <th className="p-4">STATUS</th>
              <th className="p-4 text-center">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {initialBookings.map((bk, i) => (
              <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                <td className="p-4"><span className="bg-gray-100 font-mono text-xs text-gray-600 px-2 py-1 rounded font-bold">{bk.id}</span></td>
                <td className="p-4">
                  <p className="font-bold text-gray-800">{bk.guest}</p>
                  <p className="text-xs text-gray-400">{bk.pax}</p>
                </td>
                {/* Room code badges matched to soft burgundy layout */}
                <td className="p-4">
                  <span className="text-[#7A1C31] bg-[#7A1C31]/5 font-semibold px-2.5 py-0.5 rounded text-xs border border-[#7A1C31]/10">
                    {bk.room}
                  </span>
                </td>
                <td className="p-4 text-gray-600 text-xs font-medium">{bk.stay}</td>
                <td className="p-4 text-gray-700 font-medium">{bk.dp}</td>
                <td className={`p-4 font-bold ${bk.balType === 'success' ? 'text-emerald-600' : 'text-rose-500'}`}>{bk.bal}</td>
                <td className="p-4">
                  <span className={`px-3 py-0.5 rounded-full text-xs font-semibold ${
                    bk.status === 'Ongoing' ? 'bg-rose-50 text-rose-600 border border-rose-100' : 'bg-amber-50 text-amber-600 border border-amber-100'
                  }`}>
                    {bk.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-center gap-2 text-gray-400">
                    <button className="hover:text-[#7A1C31] p-1 transition-colors"><Eye size={16} /></button>
                    <button className="hover:text-amber-500 p-1 transition-colors"><Edit size={16} /></button>
                    <button className="hover:text-gray-700 p-1 transition-colors"><Printer size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Extracted Form Input Wizard Component Rendering */}
      <AddBookingModal 
        showModal={showModal}
        setShowModal={setShowModal}
        form={form}
        handleInputChange={handleInputChange}
        executeSave={executeSave}
        calculatedNights={calculatedNights}
        totalBaseAmount={totalBaseAmount}
        balanceDue={balanceDue}
      />

      {/* Extracted PNG Snapshot Capture Receipt Canvas */}
      <Receipts 
        showReceipt={showReceipt}
        setShowReceipt={setShowReceipt}
        activeReceipt={activeReceipt}
        receiptCaptureRef={receiptCaptureRef}
        handleDownloadPng={handleDownloadPng}
      />
    </div>
  );
}