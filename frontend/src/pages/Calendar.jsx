import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import DailyViewModal from '../components/modals/DailyViewModal'; // Imports the new UI Modal file

export default function Calendar({ bookings = [] }) {
  // Dynamically defaults to the current system month, day, and year
  const [currentDate, setCurrentDate] = useState(() => new Date());
  
  // Modal Visibility Controls States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDateObject, setSelectedDateObject] = useState(null);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Calendar Math Helpers
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const todayDate = new Date().getDate();
  const todayMonth = new Date().getMonth();
  const todayYear = new Date().getFullYear();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  // Step Months
  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  // Helper to format date strings for comparison (YYYY-MM-DD)
  const formatDateString = (y, m, d) => {
    return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
  };

  // Filter bookings based on date schedules
  const getDayBookings = (day) => {
    const currentStr = formatDateString(year, month, day);
    
    // Original exact fallback structured mockup data
    const mockData = {
      3: [{ id: 'b1', guestName: 'John Doe', bookingReference: 'BK-2026-001', roomNumber: '1', guestCount: 2, nightsCount: 3, amountDue: 4500, room: 'R1', status: 'checked-out', isCheckIn: true }],
      4: [{ id: 'b1', guestName: 'John Doe', bookingReference: 'BK-2026-001', roomNumber: '1', guestCount: 2, nightsCount: 3, amountDue: 0, room: 'R1', status: 'checked-out' }],
      5: [{ id: 'b2', guestName: 'Jane Smith', bookingReference: 'BK-2026-002', roomNumber: '3', guestCount: 1, nightsCount: 2, amountDue: 1200, room: 'R3', status: 'checked-out' }, { id: 'b3', guestName: 'Alex Mercer', bookingReference: 'BK-2026-003', roomNumber: '1', guestCount: 2, nightsCount: 4, amountDue: 8000, room: 'R1', status: 'checked-out', isCheckIn: true }],
      6: [{ id: 'b2', guestName: 'Jane Smith', bookingReference: 'BK-2026-002', roomNumber: '3', guestCount: 1, nightsCount: 2, amountDue: 0, room: 'R3', status: 'checked-out' }, { id: 'b3', guestName: 'Alex Mercer', bookingReference: 'BK-2026-003', roomNumber: '1', guestCount: 2, nightsCount: 4, amountDue: 4000, room: 'R1', status: 'checked-out' }],
      7: [{ id: 'b2', guestName: 'Jane Smith', bookingReference: 'BK-2026-002', roomNumber: '3', guestCount: 1, nightsCount: 2, amountDue: 0, room: 'R3', status: 'checked-out', isCheckOut: true }],
      8: [{ id: 'b4', guestName: 'Cruz Family', bookingReference: 'BK-2026-004', roomNumber: '11', guestCount: 5, nightsCount: 5, amountDue: 18500, room: 'R11', status: 'ongoing', isCheckIn: true, isCheckOut: true }],
      9: [{ id: 'b5', guestName: 'Garcia Family', bookingReference: 'BK-2024-004', roomNumber: '7', guestCount: 7, nightsCount: 7, amountDue: 22500, room: 'R7', status: 'ongoing', isCheckIn: true }, { id: 'b6', guestName: 'Roberto Tan', bookingReference: 'BK-2024-006', roomNumber: '11', guestCount: 4, nightsCount: 7, amountDue: 14200, room: 'R11', status: 'ongoing' }],
      10: [{ id: 'b7', guestName: 'Santos Group', bookingReference: 'BK-2026-007', roomNumber: '2', guestCount: 3, nightsCount: 3, amountDue: 9000, room: 'R2', status: 'ongoing', isCheckIn: true }, { id: 'b5', guestName: 'Garcia Family', bookingReference: 'BK-2024-004', roomNumber: '7', guestCount: 7, nightsCount: 7, amountDue: 0, room: 'R7', status: 'ongoing' }, { id: 'b6', guestName: 'Roberto Tan', bookingReference: 'BK-2024-006', roomNumber: '11', guestCount: 4, nightsCount: 7, amountDue: 0, room: 'R11', status: 'ongoing' }],
      11: [{ id: 'b7', guestName: 'Santos Group', bookingReference: 'BK-2026-007', roomNumber: '2', guestCount: 3, nightsCount: 3, amountDue: 0, room: 'R2', status: 'ongoing' }, { id: 'b8', guestName: 'Lee Nelson', bookingReference: 'BK-2026-008', roomNumber: '6', guestCount: 2, nightsCount: 2, amountDue: 5100, room: 'R6', status: 'ongoing' }]
    };

    if (month === 5 && year === 2026) {
      return mockData[day] || [];
    }
    
    return bookings.filter(b => b.date === currentStr) || [];
  };

  const getStatusClasses = (status) => {
    switch (status) {
      case 'ongoing':
        return 'bg-[#1E74D4] text-white'; 
      case 'upcoming':
        return 'bg-[#F2994A] text-white'; 
      case 'checked-out':
      default:
        return 'bg-[#9E9E9E] text-white'; 
    }
  };

  // Opens Modal Sheet on Click
  const handleDayClick = (day) => {
    const targetDate = new Date(year, month, day);
    setSelectedDateObject(targetDate);
    setIsModalOpen(true);
  };

  const totalCellsCount = firstDayOfMonth + daysInMonth;
  const isSixWeekMonth = totalCellsCount > 35;
  // Uniform Row Heights: (5 * 11.5vh) === (6 * 9.6vh) ~ Exactly 57.5vh total height bound
  const cellHeightClass = isSixWeekMonth ? 'h-[9.6vh]' : 'h-[11.5vh]';

  const renderCalendarCells = () => {
    const cells = [];

    // 1. Fill Previous Month Padding Slots
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      cells.push(
        <div key={`prev-${i}`} className={`${cellHeightClass} bg-gray-50/40 border-b border-r border-gray-100 p-2 text-gray-300 select-none flex flex-col justify-start overflow-hidden`}>
          <span className="font-semibold text-sm opacity-40">{prevMonthDays - i}</span>
        </div>
      );
    }

    // 2. Fill Current Active Month Days
    for (let day = 1; day <= daysInMonth; day++) {
      const dayBookings = getDayBookings(day);
      
      const hasGlobalCheckIn = dayBookings.some(b => b.isCheckIn);
      const hasGlobalCheckOut = dayBookings.some(b => b.isCheckOut);
      const isTodayHighlight = day === todayDate && month === todayMonth && year === todayYear;

      cells.push(
        <div 
          key={`day-${day}`} 
          onClick={() => handleDayClick(day)}
          className={`${cellHeightClass} border-b border-r border-gray-200 p-2 flex flex-col justify-between hover:bg-gray-50/60 transition-colors relative group cursor-pointer overflow-hidden`}
        >
          {/* Day Label & Check-In/Out Badges */}
          <div className="flex items-center justify-between">
            <span className={`font-bold text-sm ${
              isTodayHighlight 
                ? 'bg-brand-burgundy text-white w-6 h-6 rounded-full flex items-center justify-center shadow-sm font-semibold' 
                : 'text-brand-burgundy'
            }`}>
              {day}
            </span>
            
            <div className="flex gap-0.5">
              {hasGlobalCheckIn && (
                <span className="text-[9px] font-extrabold px-1 bg-[#E1F0FF] text-[#0052B4] rounded border border-[#B3D7FF]">
                  IN
                </span>
              )}
              {hasGlobalCheckOut && (
                <span className="text-[9px] font-extrabold px-1 bg-gray-100 text-gray-600 rounded border border-gray-300">
                  OUT
                </span>
              )}
            </div>
          </div>

          {/* Room Badges Container Stack */}
          <div className="flex flex-wrap gap-1.5 items-end mt-auto overflow-hidden">
            {dayBookings.slice(0, 3).map((item, idx) => {
              if (item.room === 'extra') {
                return (
                  <div key={idx} className="bg-gray-200 text-gray-600 font-bold text-[10px] h-5.5 px-1.5 rounded flex items-center justify-center border border-gray-300">
                    +{item.count}
                  </div>
                );
              }
              return (
                <div 
                  key={idx} 
                  className={`text-[10px] font-bold h-5.5 px-1.5 rounded flex items-center justify-center min-w-[26px] shadow-sm ${getStatusClasses(item.status)}`}
                >
                  {item.room}
                </div>
              );
            })}
            {dayBookings.length > 3 && (
              <div className="bg-gray-200 text-gray-600 font-bold text-[10px] h-5.5 px-1.5 rounded flex items-center justify-center border border-gray-300">
                +{dayBookings.length - 3}
              </div>
            )}
          </div>
        </div>
      );
    }

    // 3. Fill Remaining Grid Cells
    const totalCells = cells.length;
    const remainingSlots = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
    for (let i = 1; i <= remainingSlots; i++) {
      cells.push(
        <div key={`next-${i}`} className={`${cellHeightClass} bg-gray-50/40 border-b border-r border-gray-100 p-2 text-gray-300 select-none flex flex-col justify-start overflow-hidden`}>
          <span className="font-semibold text-sm opacity-40">{i}</span>
        </div>
      );
    }

    return cells;
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden select-none flex flex-col">
      
      {/* 1. Header Month Navigation Title Bar */}
      <div className="flex items-center justify-between px-6 py-3 bg-brand-burgundy text-white flex-none">
        <button 
          onClick={handlePrevMonth} 
          className="p-1.5 rounded-lg border border-white/20 hover:bg-white/10 text-white transition-colors"
        >
          <ChevronLeft size={18} />
        </button>
        
        <h2 className="text-lg font-bold tracking-wide">
          {months[month]} {year}
        </h2>
        
        <button 
          onClick={handleNextMonth} 
          className="p-1.5 rounded-lg border border-white/20 hover:bg-white/10 text-white transition-colors"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* 2. Original Legend Sub-Header Bar */}
      <div className="px-6 py-2.5 bg-gray-50 border-b border-gray-200 flex flex-wrap items-center gap-6 text-xs font-semibold text-gray-600 flex-none">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#1E74D4]" />
          <span>Ongoing</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#F2994A]" />
          <span>Upcoming</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#9E9E9E]" />
          <span>Checked Out</span>
        </div>
        
        <div className="h-4 w-[1px] bg-gray-300 mx-1 hidden sm:block" />

        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-extrabold px-1 bg-[#E1F0FF] text-[#0052B4] rounded border border-[#B3D7FF]">IN</span>
          <span>Check-in day</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-extrabold px-1 bg-gray-100 text-gray-600 rounded border border-gray-300">OUT</span>
          <span>Check-out day</span>
        </div>
      </div>

      {/* 3. Weekdays Header Grid */}
      <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200 text-center py-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider flex-none">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>

      {/* 4. Main Calendar Cells Sheet Matrix */}
      <div className="grid grid-cols-7 border-l border-gray-200 bg-white">
        {renderCalendarCells()}
      </div>

      {/* 5. Daily Detail Viewer Modal Overlayer Injection */}
      <DailyViewModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedDate={selectedDateObject}
        dayBookings={selectedDateObject ? getDayBookings(selectedDateObject.getDate()) : []}
        totalRooms={16}
      />
    </div>
  );
}