import React from 'react';
import { createPortal } from 'react-dom';
import { X, Calendar, User, Phone, MapPin, DollarSign, FileText, Bed, Users } from 'lucide-react';

export default function ViewDetailsModal({ showModal, setShowModal, booking }) {
  if (!showModal || !booking) return null;

  // Formatting helpers to display values gracefully
  const formatCurrency = (amount) => {
    if (typeof amount === 'string') return amount;
    return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(amount || 0);
  };

  // Safe fallback properties extracted from dynamic booking configurations
  const guestName = booking.guest || booking.guestName || 'N/A';
  const roomLabel = booking.room || `Room ${booking.roomNumber}` || 'N/A';
  const contactNo = booking.contact || booking.details?.contact || 'N/A';
  const addressLoc = booking.address || 'No address provided';
  const notesText = booking.notes || 'No special requests or additional administrative notes.';
  
  // Handling dynamic structure mapping for billing or static fallback arrays
  const checkInDate = booking.checkIn || booking.details?.checkIn || 'N/A';
  const checkOutDate = booking.checkOut || booking.details?.checkOut || 'N/A';
  const totalNights = booking.nights || (booking.stay ? 0 : 1);
  const baseRate = booking.rate || 0;
  const extraCharges = booking.extra || 0;
  
  const totalPaidAmount = booking.total || booking.details?.totalPaid || parseFloat(String(booking.dp || '0').replace(/[^0-9.-]+/g,"")) || 0;
  const balanceRemaining = booking.balance || parseFloat(String(booking.bal || '0').replace(/[^0-9.-]+/g,"")) || 0;

  // Status Badge thematic configuration profiles
  const status = booking.status || 'Ongoing';
  const getStatusStyles = (statusType) => {
    switch (statusType) {
      case 'Ongoing': 
        return 'bg-rose-50 text-rose-600 border-rose-100';
      case 'Upcoming': 
        return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'Checked Out': 
      case 'Completed':
        return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      default: 
        return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  };

  return createPortal(
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 select-none animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col overflow-hidden border border-gray-100 max-h-[90vh]">
        
        {/* Modal Header Panel */}
        <div className="flex items-center justify-between px-6 py-4 bg-brand-burgundy text-white flex-none">
          <div className="flex items-center gap-2.5">
            <span className="bg-white/10 text-white font-mono text-xs px-2.5 py-1 rounded border border-white/20 font-bold">
              {booking.id || 'BK-DETAIL'}
            </span>
            <h2 className="text-lg font-bold tracking-wide">Reservation Details</h2>
          </div>
          <button 
            onClick={() => setShowModal(false)}
            className="p-1 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body Scroll Container */}
        <div className="p-6 overflow-y-auto space-y-6 bg-white text-sm">
          
          {/* Main Context Status Banner Row */}
          <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#7A1C31]/5 text-[#7A1C31] border border-[#7A1C31]/10 flex items-center justify-center">
                <Bed size={20} />
              </div>
              <div>
                <span className="text-base font-black text-gray-800 tracking-tight">{roomLabel}</span>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Assigned Suite</p>
              </div>
            </div>

            <div className="text-right">
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyles(status)}`}>
                {status}
              </span>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mt-1.5">Booking Status</p>
            </div>
          </div>

          {/* Section 1: Guest Information Profile */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
              <User size={14} className="text-gray-400" /> Primary Guest Profile
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white border border-gray-100 p-4 rounded-xl shadow-sm">
              <div>
                <span className="text-[11px] font-bold text-gray-400 uppercase block">Full Name</span>
                <span className="font-bold text-gray-800 text-base">{guestName}</span>
                <p className="text-xs text-gray-400 font-medium mt-0.5">{booking.pax || `${booking.guests || 1} Guests Max`}</p>
              </div>
              <div>
                <span className="text-[11px] font-bold text-gray-400 uppercase block">Contact Number</span>
                <span className="font-semibold text-gray-700 flex items-center gap-1.5 mt-1">
                  <Phone size={13} className="text-gray-400" /> {contactNo}
                </span>
              </div>
              <div className="md:col-span-2 border-t border-gray-50 pt-2">
                <span className="text-[11px] font-bold text-gray-400 uppercase block">Billing Address</span>
                <span className="font-medium text-gray-600 flex items-center gap-1.5 mt-1">
                  <MapPin size={13} className="text-gray-400" /> {addressLoc}
                </span>
              </div>
            </div>
          </div>

          {/* Section 2: Stay Duration Parameters */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
              <Calendar size={14} className="text-gray-400" /> Stay Timeline Interval
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-white border border-gray-100 p-4 rounded-xl shadow-sm">
              <div>
                <span className="text-[11px] font-bold text-gray-400 uppercase block">Check-In Date</span>
                <span className="font-bold text-gray-700 mt-1 block">{checkInDate}</span>
              </div>
              <div>
                <span className="text-[11px] font-bold text-gray-400 uppercase block">Check-Out Date</span>
                <span className="font-bold text-gray-700 mt-1 block">{checkOutDate}</span>
              </div>
              <div className="col-span-2 md:col-span-1 bg-gray-50/70 rounded-lg p-2 flex flex-col justify-center items-center border border-gray-100">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Total Duration</span>
                <span className="text-lg font-black text-[#7A1C31]">{totalNights} Nights</span>
              </div>
            </div>
          </div>

          {/* Section 3: Detailed Financial Accounting Receipt Ledger */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
              <DollarSign size={14} className="text-gray-400" /> Financial Accounting Summary
            </h3>
            <div className="border border-gray-100 rounded-xl overflow-hidden shadow-sm bg-white">
              <div className="p-4 space-y-2.5 text-xs font-medium border-b border-gray-100">
                {baseRate > 0 && (
                  <div className="flex justify-between text-gray-600">
                    <span>Room Rate Subtotal ({totalNights} nights)</span>
                    <span>{formatCurrency(baseRate * (totalNights || 1))}</span>
                  </div>
                )}
                {extraCharges > 0 && (
                  <div className="flex justify-between text-gray-600">
                    <span>Extra charges</span>
                    <span>{formatCurrency(extraCharges)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Downpayment</span>
                  <span className="text-emerald-600 font-semibold">-{formatCurrency(totalPaidAmount)}</span>
                </div>
              </div>
              
              {/* Closing Outstanding Calculation Summary Block */}
              <div className="bg-gray-50/80 px-4 py-3 flex justify-between items-center text-sm">
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase block">Remaining Balance</span>
                  <span className={`font-black text-base ${balanceRemaining > 0 ? 'text-rose-500' : 'text-emerald-600'}`}>
                    {formatCurrency(balanceRemaining)}
                  </span>
                </div>
                <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                  balanceRemaining > 0 ? 'bg-rose-50 text-rose-600 border border-rose-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                }`}>
                  {balanceRemaining > 0 ? 'Collect Balance' : 'Settled Full'}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Action Control Footer Block */}
        <div className="px-6 py-3.5 bg-gray-50 border-t border-gray-100 flex justify-end gap-2 flex-none">
          <button 
            onClick={() => setShowModal(false)}
            className="bg-white hover:bg-gray-100 text-gray-700 text-xs font-bold py-2 px-4 rounded-xl border border-gray-200 transition-colors"
          >
            Close Sheet
          </button>
        </div>

      </div>
    </div>,
    document.body
  );
}