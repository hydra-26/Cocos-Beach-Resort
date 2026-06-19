import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronLeft, ChevronRight, Calendar as CalendarIcon, Bed, Users } from 'lucide-react';

export default function CalendarViewModal({ showModal, setShowModal, room }) {
  if (!showModal || !room) return null;

  // Track the navigated calendar month/year viewport
  const [currentDate, setCurrentDate] = useState(new Date(2026, 5, 1)); // Default to June 2026
  const [selectedDate, setSelectedDate] = useState(null);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  // Mock booking data setup tailored to match records context
  const mockBookings = [
    { id: 1, guestName: 'Jennifer', status: 'Checked Out', start: '2026-06-03', end: '2026-06-06', details: { guests: 2, contact: '0912-345-6789', checkIn: '2026-06-03', checkOut: '2026-06-06', totalPaid: 4500 } },
    { id: 2, guestName: 'Reyes', status: 'Ongoing', start: '2026-06-12', end: '2026-06-15', details: { guests: 4, contact: '0987-654-3210', checkIn: '2026-06-12', checkOut: '2026-06-15', totalPaid: 6000 } }
  ];

  // Helper date utility strings
  const formatDateString = (year, month, day) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  // Generate complete sequence of calendar tiles (including prefix offset padding days)
  const getDaysInMonth = () => {
    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
    const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    const elements = [];
    // Render blank prefixes for grid alignment
    for (let i = 0; i < firstDayIndex; i++) {
      elements.push({ day: null, dateString: null });
    }
    // Append actual numeric month days
    for (let day = 1; day <= totalDays; day++) {
      elements.push({ day, dateString: formatDateString(currentYear, currentMonth, day) });
    }
    return elements;
  };

  const calendarDays = getDaysInMonth();

  // Month navigation handshakes
  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  // Summarize statistical totals for footer row metrics
  const totalBookings = mockBookings.length;
  const ongoingCount = mockBookings.filter(b => b.status === 'Ongoing').length;
  const upcomingCount = mockBookings.filter(b => b.status === 'Upcoming').length;
  const checkedOutCount = mockBookings.filter(b => b.status === 'Checked Out').length;

  // Retrieve active selected target info state context to render in sidebar panel
  const getSelectedDayDetails = () => {
    if (!selectedDate) return null;
    return mockBookings.find(b => selectedDate >= b.start && selectedDate <= b.end);
  };

  const activeBookingDetail = getSelectedDayDetails();

  return createPortal(
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 select-none animate-fade-in">
      {/* Container is fixed at 85vh and hidden overflows prevent outer breaks */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl flex overflow-hidden border border-gray-100 h-[85vh]">
        
        {/* Main Left Section: Interactive Booking Calendar Interface */}
        <div className="flex-1 flex flex-col bg-white border-r border-gray-100 h-full">
          
          {/* Header Title Information Context Area */}
          <div className="p-5 border-b border-gray-100 flex justify-between items-start flex-none">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-[#1E74D4] font-bold text-xs uppercase tracking-wider">
                <Bed size={14} />
                <span>Room {room.roomNumber}</span>
              </div>
              <h3 className="font-extrabold text-gray-900 text-xl tracking-tight">Booking Calendar</h3>
              <div className="flex items-center gap-2 pt-0.5">
                <div className="flex items-center gap-1 text-xs font-bold text-gray-400">
                  <Users size={12} />
                  <span>Max {room.maxGuests} guests</span>
                </div>
                <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#E6F7ED] text-[#15803D] uppercase tracking-wide scale-90">
                  {room.type}
                </span>
              </div>
            </div>
            
            <button 
              onClick={() => setShowModal(false)} 
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Subheader: View Options Navigation Row Bar Controls */}
          <div className="px-5 py-3 flex items-center justify-between border-b border-gray-50 bg-white flex-none">
            <div className="flex items-center gap-2">
              <button onClick={handlePrevMonth} className="p-1 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors">
                <ChevronLeft size={16} />
              </button>
              <span className="font-bold text-gray-800 text-sm min-w-[100px] text-center">
                {monthNames[currentMonth]} {currentYear}
              </span>
              <button onClick={handleNextMonth} className="p-1 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors">
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Explanatory Status Indicators Badge Context Legend */}
            <div className="flex items-center gap-4 text-xs font-bold text-gray-500">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1E74D4]" />
                <span>Ongoing</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#EA580C]" />
                <span>Upcoming</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-gray-400" />
                <span>Checked Out</span>
              </div>
            </div>
          </div>

          {/* Core Monthly Layout Matrix Grid Canvas Area - Completely Unscrollable */}
          <div className="p-5 flex-1 flex flex-col justify-between overflow-hidden bg-white">
            <div className="grid grid-cols-7 gap-x-2 gap-y-2 text-center h-full auto-rows-fr">
              {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(dayLabel => (
                <span key={dayLabel} className="text-[10px] font-black text-gray-400 tracking-widest uppercase self-center">
                  {dayLabel}
                </span>
              ))}

              {calendarDays.map((tile, idx) => {
                if (!tile.day) return <div key={`empty-${idx}`} className="w-full h-full" />;

                const activeBooking = mockBookings.find(b => tile.dateString >= b.start && tile.dateString <= b.end);
                const isSelected = selectedDate === tile.dateString;
                
                let dayWrapperClass = "border border-gray-200 bg-white hover:border-gray-400 text-gray-800";
                let tagBadgeClass = "";
                let isDotMarkerVisible = false;

                if (activeBooking) {
                  if (activeBooking.status === 'Ongoing') {
                    dayWrapperClass = `border border-[#1E74D4]/30 bg-[#F2F8FD] text-[#1E74D4] ${tile.dateString === activeBooking.start ? 'rounded-l-xl' : ''} ${tile.dateString === activeBooking.end ? 'rounded-r-xl' : ''}`;
                    tagBadgeClass = "bg-[#1E74D4] text-white";
                    if (tile.dateString === activeBooking.end) isDotMarkerVisible = true;
                  } else if (activeBooking.status === 'Checked Out') {
                    dayWrapperClass = "border border-gray-200 bg-gray-50 text-gray-500";
                    tagBadgeClass = "bg-gray-400 text-white";
                    if (tile.dateString === activeBooking.end) isDotMarkerVisible = true;
                  }
                }

                if (isSelected) {
                  dayWrapperClass += " ring-2 ring-brand-burgundy border-transparent";
                }

                return (
                  <button 
                    key={`day-${tile.day}`}
                    onClick={() => setSelectedDate(tile.dateString)}
                    className={`w-full h-full min-h-[56px] rounded-xl p-1.5 flex flex-col justify-between items-start transition-all relative outline-none ${dayWrapperClass}`}
                  >
                    <span className="text-xs font-bold leading-none">{tile.day}</span>
                    
                    {activeBooking && (
                      <div className="w-full flex items-center justify-between mt-auto">
                        <span className={`text-[9px] font-extrabold px-1 py-0.5 rounded-md truncate max-w-full block transform scale-95 origin-left ${tagBadgeClass}`}>
                          {activeBooking.guestName}
                        </span>
                        {isDotMarkerVisible && (
                          <span className={`w-1 h-1 rounded-full absolute bottom-1.5 right-1.5 ${activeBooking.status === 'Ongoing' ? 'bg-[#22C55E]' : 'bg-gray-400'}`} />
                        )}
                      </div>
                    )}
                    
                    {!activeBooking && (tile.day === 7 || tile.day === 16) && (
                      <span className="w-1 h-1 rounded-full bg-gray-400 absolute bottom-1.5 right-1.5 opacity-60" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footnote Stats Row Summary Counter Block */}
          <div className="px-5 py-3 bg-gray-50/50 border-t border-gray-100 flex items-center gap-4 text-xs font-bold text-gray-500 flex-none">
            <span><strong className="text-gray-800 font-extrabold">{totalBookings}</strong> bookings total</span>
            <span><strong className="text-[#1E74D4] font-extrabold">{ongoingCount}</strong> ongoing</span>
            <span><strong className="text-[#EA580C] font-extrabold">{upcomingCount}</strong> upcoming</span>
            <span><strong className="text-gray-500 font-extrabold">{checkedOutCount}</strong> checked out</span>
          </div>

        </div>

        {/* Dynamic Sidebar Status Details Panel Context Row View */}
        <div className="w-80 bg-gray-50 p-5 flex flex-col items-center justify-center border-l border-gray-100 text-center h-full flex-none">
          {selectedDate ? (
            activeBookingDetail ? (
              <div className="w-full h-full flex flex-col justify-between text-left">
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-0.5">Selected Date</span>
                    <h4 className="text-base font-black text-gray-800">{new Date(selectedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</h4>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm space-y-3">
                    <div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide block">Guest Name</span>
                      <span className="font-black text-gray-800 text-sm">{activeBookingDetail.guestName}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide block">Check-In</span>
                        <span className="font-bold text-xs text-gray-700">{activeBookingDetail.details.checkIn}</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide block">Check-Out</span>
                        <span className="font-bold text-xs text-gray-700">{activeBookingDetail.details.checkOut}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide block">Status</span>
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full inline-block uppercase tracking-wider mt-1 ${
                        activeBookingDetail.status === 'Ongoing' ? 'bg-[#E6F7ED] text-[#15803D]' : 'bg-gray-200 text-gray-600'
                      }`}>
                        {activeBookingDetail.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-3">
                  <button className="w-full bg-brand-burgundy hover:bg-[#631425] text-white text-xs font-bold py-2 px-4 rounded-xl shadow-sm transition-all text-center">
                    View Complete Details
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-400">
                  <CalendarIcon size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-xs">No Booking Record</h4>
                  <p className="text-[11px] text-gray-400 mt-0.5 max-w-[180px] mx-auto">
                    There are no registered bookings for this selected date.
                  </p>
                </div>
              </div>
            )
          ) : (
            <div className="space-y-2">
              <div className="w-10 h-10 bg-[#E6F0FA] text-[#1E74D4] rounded-full flex items-center justify-center mx-auto">
                <CalendarIcon size={18} />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 text-xs">Select a date</h4>
                <p className="text-[11px] text-gray-400 mt-0.5 max-w-[180px] mx-auto">
                  Click any day to see booking details for Room {room.roomNumber}
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>,
    document.body
  );
}