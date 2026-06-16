import React, { useState, useRef } from 'react';
import * as htmlToImage from 'html-to-image';
import { Eye, Edit, Printer, Search, SlidersHorizontal, ChevronDown, Download, X } from 'lucide-react';

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
          <button className="flex items-center gap-2 border px-3 py-2 rounded-lg text-sm text-gray-600 bg-gray-50 font-medium">
            <SlidersHorizontal size={16} /> Filters
          </button>
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input type="text" placeholder="Search guest name or booking ID..." className="pl-10 pr-4 py-2 border rounded-lg w-full text-sm outline-none focus:border-blue-500" />
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <select className="appearance-none bg-gray-50 border pl-4 pr-10 py-2 rounded-lg text-sm font-medium text-gray-700 outline-none">
              <option>All Status</option>
            </select>
            <ChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" size={14} />
          </div>
          <div className="relative">
            <select className="appearance-none bg-gray-50 border pl-4 pr-10 py-2 rounded-lg text-sm font-medium text-gray-700 outline-none">
              <option>All Rooms</option>
            </select>
            <ChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" size={14} />
          </div>
          <button onClick={() => setShowModal(true)} className="bg-blue-700 hover:bg-blue-800 text-white font-medium px-4 py-2 rounded-lg text-sm">
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
                <td className="p-4"><span className="text-blue-700 bg-blue-50 font-semibold px-2.5 py-0.5 rounded text-xs border border-blue-100">{bk.room}</span></td>
                <td className="p-4 text-gray-600 text-xs font-medium">{bk.stay}</td>
                <td className="p-4 text-gray-700 font-medium">{bk.dp}</td>
                <td className={`p-4 font-bold ${bk.balType === 'success' ? 'text-green-600' : 'text-red-500'}`}>{bk.bal}</td>
                <td className="p-4">
                  <span className={`px-3 py-0.5 rounded-full text-xs font-semibold ${
                    bk.status === 'Ongoing' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-amber-50 text-amber-600 border border-amber-100'
                  }`}>
                    {bk.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-center gap-2 text-gray-400">
                    <button className="hover:text-blue-600 p-1"><Eye size={16} /></button>
                    <button className="hover:text-amber-500 p-1"><Edit size={16} /></button>
                    <button className="hover:text-gray-700 p-1"><Printer size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Creation Wizard Screen Modal Block */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl flex overflow-hidden border border-gray-100">
            <div className="flex-1 flex flex-col">
              <div className="p-4 border-b flex justify-between items-center bg-gray-50">
                <h3 className="font-bold text-gray-800 text-lg">New Booking</h3>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
              </div>
              <form onSubmit={executeSave} className="p-6 space-y-6 overflow-y-auto max-h-[75vh]">
                {/* Guest Block */}
                <div>
                  <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Guest Information</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1">
                      <label className="text-xs font-bold text-gray-600">Full Name *</label>
                      <input required type="text" onChange={(e) => handleInputChange('name', e.target.value)} className="w-full border rounded-lg p-2 text-sm mt-1 outline-none focus:border-blue-500" placeholder="e.g. Maria Santos" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-600">Contact *</label>
                      <input required type="text" onChange={(e) => handleInputChange('contact', e.target.value)} className="w-full border rounded-lg p-2 text-sm mt-1 outline-none focus:border-blue-500" placeholder="09XX-XXX-XXXX" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-600">No. of Guests *</label>
                      <input required type="number" onChange={(e) => handleInputChange('guests', parseInt(e.target.value) || 0)} className="w-full border rounded-lg p-2 text-sm mt-1 outline-none focus:border-blue-500" placeholder="e.g. 4" />
                    </div>
                    <div className="col-span-3">
                      <label className="text-xs font-bold text-gray-600">Address *</label>
                      <input required type="text" onChange={(e) => handleInputChange('address', e.target.value)} className="w-full border rounded-lg p-2 text-sm mt-1 outline-none focus:border-blue-500" placeholder="City, Province" />
                    </div>
                  </div>
                </div>

                {/* Stay Configuration Info */}
                <div>
                  <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Booking Details</h4>
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <label className="text-xs font-bold text-gray-600">Room *</label>
                      <select onChange={(e) => handleInputChange('room', e.target.value)} className="w-full border rounded-lg p-2 text-sm mt-1 outline-none">
                        <option>Room 1</option>
                        <option>Room 2</option>
                        <option>Room 3</option>
                      </select>
                    </div>
                    <div className="col-span-1">
                      <label className="text-xs font-bold text-gray-600">Check-in *</label>
                      <input required type="date" onChange={(e) => handleInputChange('checkIn', e.target.value)} className="w-full border rounded-lg p-2 text-sm mt-1 outline-none" />
                    </div>
                    <div className="col-span-1">
                      <label className="text-xs font-bold text-gray-600">Check-out *</label>
                      <input required type="date" onChange={(e) => handleInputChange('checkOut', e.target.value)} className="w-full border rounded-lg p-2 text-sm mt-1 outline-none" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-600">Notes / Requests</label>
                      <input type="text" onChange={(e) => handleInputChange('notes', e.target.value)} className="w-full border rounded-lg p-2 text-sm mt-1 outline-none" placeholder="Optional" />
                    </div>
                  </div>
                </div>

                {/* Rates Block */}
                <div>
                  <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Billing</h4>
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <label className="text-xs font-bold text-gray-600">Room Rate (₱) *</label>
                      <input required type="number" onChange={(e) => handleInputChange('rate', parseFloat(e.target.value) || 0)} className="w-full border rounded-lg p-2 text-sm mt-1 outline-none" placeholder="0" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-600">Extra Charges (₱)</label>
                      <input type="number" onChange={(e) => handleInputChange('extra', parseFloat(e.target.value) || 0)} className="w-full border rounded-lg p-2 text-sm mt-1 outline-none" placeholder="0" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-600">Downpayment (₱)</label>
                      <input type="number" onChange={(e) => handleInputChange('downpayment', parseFloat(e.target.value) || 0)} className="w-full border rounded-lg p-2 text-sm mt-1 outline-none" placeholder="0" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-600">Payment Status</label>
                      <select onChange={(e) => handleInputChange('paymentStatus', e.target.value)} className="w-full border rounded-lg p-2 text-sm mt-1 outline-none">
                        <option>Unpaid</option>
                        <option>Partial</option>
                        <option>Fully Paid</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2 pt-4 border-t">
                  <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-lg text-sm text-gray-600 font-medium hover:bg-gray-50">Cancel</button>
                  <button type="submit" className="px-5 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-sm font-medium">Save Booking</button>
                </div>
              </form>
            </div>

            {/* Live Synchronized Summary Sidebar Block */}
            <div className="w-72 bg-blue-900 text-white p-6 flex flex-col justify-between border-l border-blue-950">
              <div className="space-y-5 text-sm">
                <h4 className="text-xs font-bold tracking-widest opacity-60 uppercase">Summary</h4>
                <div><span className="text-[11px] opacity-50 block tracking-wide uppercase">Guest Name</span><span className="font-bold text-base block truncate">{form.name || '—'}</span></div>
                <div className="grid grid-cols-2 gap-2">
                  <div><span className="text-[11px] opacity-50 block tracking-wide uppercase">Room</span><span className="font-semibold text-gray-200">{form.room}</span></div>
                  <div><span className="text-[11px] opacity-50 block tracking-wide uppercase">Guests</span><span className="font-semibold text-gray-200">{form.guests} pax</span></div>
                </div>
                <div><span className="text-[11px] opacity-50 block tracking-wide uppercase">Contact</span><span className="font-mono text-xs text-gray-200">{form.contact || '—'}</span></div>
                <div><span className="text-[11px] opacity-50 block tracking-wide uppercase">Address</span><span className="text-xs text-gray-200 block truncate">{form.address || '—'}</span></div>
                <div className="grid grid-cols-2 gap-2 border-t border-white/10 pt-3">
                  <div><span className="text-[11px] opacity-50 block tracking-wide uppercase">Check-In</span><span className="text-xs font-mono text-gray-200">{form.checkIn || '—'}</span></div>
                  <div><span className="text-[11px] opacity-50 block tracking-wide uppercase">Check-Out</span><span className="text-xs font-mono text-gray-200">{form.checkOut || '—'}</span></div>
                </div>
              </div>

              <div className="border-t border-white/20 pt-4 mt-6 space-y-2 text-xs">
                <div className="flex justify-between opacity-80"><span>Room Rate</span><span>₱{form.rate.toLocaleString()}</span></div>
                <div className="flex justify-between opacity-80"><span>Extra</span><span>₱{form.extra.toLocaleString()}</span></div>
                <div className="flex justify-between font-bold text-sm border-t border-white/10 pt-2 text-white"><span>Total</span><span>₱{totalBaseAmount.toLocaleString()}</span></div>
                <div className="flex justify-between opacity-80"><span>Downpayment</span><span>- ₱{form.downpayment.toLocaleString()}</span></div>
                <div className="flex justify-between font-extrabold text-base border-t border-white/20 pt-2 text-yellow-400"><span>Balance</span><span>₱{balanceDue.toLocaleString()}</span></div>
              </div>
          </div>
        </div>
      </div>
      )}

      {/* Snapshot Document Generation Modal Popup Display Block */}
      {showReceipt && activeReceipt && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-5 rounded-2xl flex flex-col gap-4 max-w-sm w-full shadow-2xl border border-gray-100">
            {/* Captured Element Canvas Frame Wrapper */}
            <div className="overflow-hidden rounded-xl border border-gray-100 shadow-sm">
              <div ref={receiptCaptureRef} className="w-[360px] bg-white text-gray-800 p-0 font-sans mx-auto">
                {/* Brand Banner Block Header area */}
                <div className="bg-blue-700 text-white p-6 text-center relative">
                  <h2 className="text-lg font-bold flex items-center justify-center gap-1.5">🌴 Cocos Beach Resort</h2>
                  <p className="text-[10px] opacity-75 mt-0.5">Brgy. Ilog Malino, Bolinao, Pangasinan - 0917-486-1902</p>
                  <div className="mt-5">
                    <p className="text-[10px] opacity-60 uppercase tracking-widest font-bold">Booking Receipt</p>
                    <p className="text-xl font-mono font-black tracking-wide my-0.5">{activeReceipt.id}</p>
                    <p className="text-[10px] opacity-75">Issued {activeReceipt.date}</p>
                  </div>
                </div>

                {/* Statement Ledger Sheet Area */}
                <div className="p-5 space-y-4 text-xs">
                  <div>
                    <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Guest Information</h5>
                    <div className="grid grid-cols-2 gap-x-2 gap-y-1.5">
                      <div><p className="text-[10px] text-gray-400">Name</p><p className="font-bold text-gray-700 truncate">{activeReceipt.name}</p></div>
                      <div><p className="text-[10px] text-gray-400">Contact</p><p className="font-mono text-gray-700">{activeReceipt.contact}</p></div>
                      <div><p className="text-[10px] text-gray-400">No. of Guests</p><p className="font-medium text-gray-700">{activeReceipt.guests} person(s)</p></div>
                      <div><p className="text-[10px] text-gray-400">Room</p><p className="font-semibold text-gray-700">{activeReceipt.room} ({activeReceipt.guests} pax max)</p></div>
                      <div className="col-span-2"><p className="text-[10px] text-gray-400">Address</p><p className="font-medium text-gray-600 truncate">{activeReceipt.address}</p></div>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-3">
                    <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Stay Details</h5>
                    <div className="grid grid-cols-3 gap-1">
                      <div><p className="text-[10px] text-gray-400">Check-in</p><p className="font-medium text-gray-700 font-mono text-[11px]">{activeReceipt.checkIn}</p></div>
                      <div><p className="text-[10px] text-gray-400">Check-out</p><p className="font-medium text-gray-700 font-mono text-[11px]">{activeReceipt.checkOut}</p></div>
                      <div><p className="text-[10px] text-gray-400">Duration</p><p className="font-bold text-gray-700">{activeReceipt.nights} nights</p></div>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-3 space-y-1.5">
                    <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Billing Summary</h5>
                    <div className="flex justify-between text-gray-500 font-medium"><span>Room Rate</span><span className="font-mono">₱{activeReceipt.rate.toLocaleString()}</span></div>
                    <div className="flex justify-between text-gray-500 font-medium"><span>Extra Charges</span><span className="font-mono">₱{activeReceipt.extra.toLocaleString()}</span></div>
                    <div className="flex justify-between font-bold text-gray-800 border-t border-gray-100 pt-1.5"><span>Total</span><span className="font-mono">₱{activeReceipt.total.toLocaleString()}</span></div>
                    <div className="flex justify-between text-gray-400"><span>Downpayment</span><span className="font-mono">- ₱{activeReceipt.downpayment.toLocaleString()}</span></div>
                    
                    <div className="bg-gray-50 p-2.5 rounded-lg flex justify-between items-center font-black text-sm mt-2 border border-gray-100">
                      <span className="text-gray-700">Balance Due</span>
                      <span className="text-red-500 font-mono">₱{activeReceipt.balance.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Payment Status</span>
                      <span className="bg-red-50 text-red-600 border border-red-100 font-bold px-2 py-0.5 rounded text-[10px] tracking-wide uppercase">{activeReceipt.paymentStatus}</span>
                    </div>
                  </div>

                  <div className="border-t border-dashed pt-4 text-center space-y-0.5 text-[10px] text-gray-400 font-medium">
                    <p className="text-gray-600 font-semibold flex items-center justify-center gap-1">Thank you for choosing Cocos Beach Resort! 🌴</p>
                    <p>Ms. Sidney Tombaga - Admin - 0917-486-1902</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2 w-full">
              <button onClick={() => setShowReceipt(false)} className="flex-1 py-2 border rounded-xl text-xs font-semibold text-gray-500 hover:bg-gray-50">Close</button>
              <button onClick={handleDownloadPng} className="flex-1 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-colors">
                <Download size={14} /> Download PNG
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}