import React from 'react';
import { X, User, Bed, CalendarDays, Coins } from 'lucide-react';

export default function DailyViewModal({ isOpen, onClose, selectedDate, dayBookings = [], totalRooms = 16 }) {
  if (!isOpen || !selectedDate) return null;

  // Format the date title (e.g., "Tuesday, June 9, 2026")
  const formattedDate = selectedDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Calculate quick metrics for the date view
  const totalCheckIns = dayBookings.filter(b => b.isCheckIn).length;
  const uniqueRoomsBookedCount = new Set(dayBookings.map(b => b.roomNumber)).size;
  const roomsAvailable = totalRooms - uniqueRoomsBookedCount;

  // Helper styles matching the booking badge colors
  const getStatusBadgeStyle = (status) => {
    switch (status?.toLowerCase()) {
      case 'ongoing':
        return 'bg-[#FDF2F2] text-[#9C3A4E] border border-rose-100'; // Soft burgundy-tinted badge
      case 'upcoming':
        return 'bg-[#FEF6EE] text-[#F2994A] border border-orange-100';
      case 'checked-out':
        return 'bg-gray-100 text-gray-600 border border-gray-200';
      default:
        return 'bg-gray-50 text-gray-500';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fadeIn">
      {/* Modal Backdrop Interceptor */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Modal Box Card */}
      <div className="relative bg-white w-full max-w-xl rounded-2xl shadow-xl flex flex-col overflow-hidden max-h-[85vh]">
        
        {/* Header Block */}
        <div className="p-6 border-b border-gray-100 relative">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-50 transition-colors"
          >
            <X size={20} />
          </button>
          
          <h2 className="text-xl font-bold text-gray-900 pr-8 tracking-tight">
            {formattedDate}
          </h2>

          {totalCheckIns > 0 && (
            <span className="inline-flex items-center mt-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#E1F0FF] text-[#0052B4]">
              {totalCheckIns} Check-in{totalCheckIns > 1 ? 's' : ''}
            </span>
          )}
        </div>

        {/* Scrollable Booking Stack List */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4 bg-gray-50/40">
          <span className="text-[11px] font-bold tracking-wider text-gray-400 uppercase block">
            Staying ({dayBookings.length})
          </span>

          {dayBookings.length === 0 ? (
            <div className="text-center py-8 text-gray-400 text-sm italic bg-white rounded-xl border border-dashed border-gray-200">
              No active room stays booked for this date.
            </div>
          ) : (
            dayBookings.map((booking, idx) => (
              <div 
                key={booking.id || idx} 
                className={`bg-white rounded-xl border p-5 transition-all relative ${
                  booking.isCheckIn ? 'border-blue-200 ring-1 ring-blue-100/50' : 'border-gray-200/80'
                }`}
              >
                {/* Booking Summary Flex Line */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-base text-gray-800">
                      {booking.guestName}
                    </h3>
                    <p className="text-xs font-mono text-gray-400 mt-0.5">
                      {booking.bookingReference || 'BK-XXXX-XXX'}
                    </p>
                  </div>

                  <div className="flex gap-2 items-center">
                    {booking.isCheckIn && (
                      <span className="text-[10px] font-extrabold px-1.5 py-0.5 bg-[#E1F0FF] text-[#0052B4] rounded border border-[#B3D7FF]">
                        CHECK IN
                      </span>
                    )}
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-md ${getStatusBadgeStyle(booking.status)}`}>
                      {booking.status || 'Ongoing'}
                    </span>
                  </div>
                </div>

                {/* Sub-Metrics Parameters Grid Layout */}
                <div className="grid grid-cols-2 gap-y-2 gap-x-4 pt-2 border-t border-gray-50 text-xs font-medium text-gray-500">
                  <div className="flex items-center gap-2">
                    <Bed size={15} className="text-gray-400" />
                    <span>Room {booking.roomNumber}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User size={15} className="text-gray-400" />
                    <span>{booking.guestCount} guest{booking.guestCount > 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarDays size={15} className="text-gray-400" />
                    <span>{booking.nightsCount} nights</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Coins size={15} className="text-gray-400" />
                    <span className="font-semibold text-gray-700">
                      ₱{booking.amountDue?.toLocaleString()} due
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Metric Block Segment */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center text-xs font-semibold text-gray-500 select-none">
          <span>{uniqueRoomsBookedCount} of {totalRooms} rooms occupied</span>
          <span>{roomsAvailable} available</span>
        </div>
      </div>
    </div>
  );
}