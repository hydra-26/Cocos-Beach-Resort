import React, { useState, useRef } from 'react';
import * as htmlToImage from 'html-to-image';
import { Bed, Users, Calendar, Eye } from 'lucide-react';

// Modular Component Custom Imports
import AddBookingModal from '../components/modals/AddBookingModal';
import CalendarViewModal from '../components/modals/CalendarViewModal';
import ViewDetailsModal from '../components/modals/ViewDetailsModal';
import Receipts from '../components/Receipts';

export default function Rooms() {
  const [activeFilter, setActiveFilter] = useState('All');
  
  // Booking Modal States
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: '', contact: '', guests: 1, address: '',
    room: '', checkIn: '', checkOut: '', notes: '',
    rate: 0, extra: 0, downpayment: 0, paymentStatus: 'Unpaid'
  });

  // Calendar Modal States
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [selectedCalendarRoom, setSelectedCalendarRoom] = useState(null);

  // View Details Modal States
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedBookingDetails, setSelectedBookingDetails] = useState(null);

  // Receipt Modal Canvas Link States
  const [showReceipt, setShowReceipt] = useState(false);
  const [activeReceipt, setActiveReceipt] = useState(null);
  const receiptCaptureRef = useRef(null);

  // Computed Billing Calculations (Mirrors Bookings logic accurately)
  const calculatedNights = () => {
    if (!bookingForm.checkIn || !bookingForm.checkOut) return 0;
    const diffTime = Math.abs(new Date(bookingForm.checkOut) - new Date(bookingForm.checkIn));
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 0;
  };
  
  // Adjusted calculations to accurately capture dynamic day length intervals
  const totalDays = calculatedNights() || 1;
  const calculatedRoomTotal = (bookingForm.rate || 0) * totalDays;
  const totalBaseAmount = calculatedRoomTotal + (bookingForm.extra || 0);
  const balanceDue = totalBaseAmount - (bookingForm.downpayment || 0);

  const roomsData = [
    { id: 1, roomNumber: '1', type: 'Available', maxGuests: 4, currentGuest: null, checkOutDate: null },
    { id: 2, roomNumber: '2', type: 'Occupied', maxGuests: 4, currentGuest: 'Maria Santos', checkOutDate: '2026-06-15' },
    { id: 3, roomNumber: '3', type: 'Available', maxGuests: 4, currentGuest: null, checkOutDate: null },
    { id: 4, roomNumber: '4', type: 'Reserved', maxGuests: 4, currentGuest: 'Pedro Cruz', checkOutDate: '2026-06-14' },
    { id: 5, roomNumber: '5', type: 'Available', maxGuests: 4, currentGuest: null, checkOutDate: null },
    { id: 6, roomNumber: '6', type: 'Occupied', maxGuests: 4, currentGuest: 'Ana Reyes', checkOutDate: '2026-06-18' },
    { id: 7, roomNumber: '7', type: 'Occupied', maxGuests: 8, currentGuest: 'Garcia Family', checkOutDate: '2026-06-20' },
    { id: 8, roomNumber: '8', type: 'Available', maxGuests: 8, currentGuest: null, checkOutDate: null },
  ];

  const totalCount = 16;
  const availableCount = roomsData.filter(r => r.type === 'Available').length + 4;
  const occupiedCount = roomsData.filter(r => r.type === 'Occupied').length + 2;
  const reservedCount = roomsData.filter(r => r.type === 'Reserved').length + 2;

  const filterTabs = [
    { label: 'All', count: totalCount, dotColor: null },
    { label: 'Available', count: availableCount, dotColor: 'bg-[#22C55E]' },
    { label: 'Occupied', count: occupiedCount, dotColor: 'bg-[#DC2626]' },
    { label: 'Reserved', count: reservedCount, dotColor: 'bg-[#EA580C]' },
  ];

  const filteredRooms = activeFilter === 'All' ? roomsData : roomsData.filter(room => room.type === activeFilter);

  const handleFormInputChange = (field, value) => {
    setBookingForm(prev => ({ ...prev, [field]: value }));
  };

  const handleOpenBookingModal = (roomNumber) => {
    setBookingForm({
      name: '',
      contact: '',
      guests: 1,
      address: '',
      room: `Room ${roomNumber}`, 
      checkIn: '',
      checkOut: '',
      notes: '',
      rate: 1500, // Predefined baseline room price point
      extra: 0,
      downpayment: 0,
      paymentStatus: 'Unpaid'
    });
    setShowBookingModal(true);
  };

  const handleOpenCalendarModal = (room) => {
    setSelectedCalendarRoom(room);
    setShowCalendarModal(true);
  };

  const handleOpenDetailsModal = (room) => {
    // Compiling a complete matching layout mock profile schema for ViewDetailsModal
    setSelectedBookingDetails({
      id: `BK-2026-${100 + room.id}`,
      guestName: room.currentGuest,
      roomNumber: room.roomNumber,
      room: `Room ${room.roomNumber}`,
      status: room.type,
      checkIn: '2026-06-10', // Sample realistic baseline fallbacks
      checkOut: room.checkOutDate || '2026-06-15',
      guests: room.maxGuests,
      contact: '0917-555-0192',
      address: 'Pangasinan, Philippines',
      notes: 'Guest requested extra linens and early check-in availability adjustments.',
      nights: 4,
      rate: 1500,
      extra: 200,
      totalPaid: 3500,
      balance: 2700
    });
    setShowDetailsModal(true);
  };

  // Process data payload compilation and directly present matching receipt preview overlay
  const handleSaveBookingSubmit = (e) => {
    e.preventDefault();
    
    setActiveReceipt({
      id: `BK-2026-${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      ...bookingForm,
      nights: totalDays,
      total: totalBaseAmount,
      balance: balanceDue
    });

    setShowBookingModal(false);
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

  const getStatusCardStyles = (type) => {
    switch (type) {
      case 'Available': return { bg: 'bg-[#F2FAF5]', border: 'border-[#22C55E]/20', iconContainer: 'bg-[#E6F7ED] text-[#22C55E]', badge: 'bg-[#E6F7ED] text-[#15803D]' };
      case 'Occupied': return { bg: 'bg-[#FDF2F2]', border: 'border-[#DC2626]/10', iconContainer: 'bg-[#FDE8E8] text-[#DC2626]', badge: 'bg-[#FDE8E8] text-[#9B1C1C]' };
      case 'Reserved': return { bg: 'bg-[#FFF8F5]', border: 'border-[#EA580C]/10', iconContainer: 'bg-[#FFEFE6] text-[#EA580C]', badge: 'bg-[#FFEFE6] text-[#C2410C]' };
      default: return {};
    }
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden select-none flex flex-col">
      <div className="flex items-center justify-between px-6 py-3 bg-brand-burgundy text-white flex-none">
        <h2 className="text-lg font-bold tracking-wide">Room Status Directory</h2>
      </div>

      <div className="px-6 py-2.5 bg-gray-50 border-b border-gray-200 flex flex-wrap items-center gap-3 text-xs font-semibold flex-none">
        {filterTabs.map((tab) => {
          const isActive = activeFilter === tab.label;
          return (
            <button
              key={tab.label}
              onClick={() => setActiveFilter(tab.label)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all border ${
                isActive ? 'bg-brand-burgundy text-white border-brand-burgundy shadow-sm' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {tab.dotColor && <span className={`w-2 h-2 rounded-full ${tab.dotColor}`} />}
              <span>{tab.label} ({tab.count})</span>
            </button>
          );
        })}
      </div>

      <div className="p-6 bg-white overflow-y-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredRooms.map((room) => {
            const styles = getStatusCardStyles(room.type);
            return (
              <div key={room.id} className={`rounded-2xl border ${styles.border} ${styles.bg} p-5 flex flex-col justify-between transition-all shadow-sm hover:shadow-md relative overflow-hidden`}>
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex gap-3 items-center">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${styles.iconContainer}`}>
                        <Bed size={20} />
                      </div>
                      <div>
                        <span className="text-2xl font-black text-gray-800 tracking-tight">{room.roomNumber}</span>
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Room No.</p>
                      </div>
                    </div>
                    <span className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full tracking-wide uppercase scale-90 ${styles.badge}`}>{room.type}</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-5">
                    <Users size={14} className="text-gray-400" />
                    <span>Max {room.maxGuests} guests</span>
                  </div>

                  <div className="min-h-[64px] border-t border-gray-100/60 pt-3 mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">Current Guest</span>
                    {room.currentGuest ? (
                      <div>
                        <h4 className="font-bold text-sm text-gray-800 truncate">{room.currentGuest}</h4>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1 bg-white/70 px-2 py-1 rounded-md border border-gray-100 max-w-max">
                          <Calendar size={12} className="text-gray-400" />
                          <span>Check-out: <span className="font-semibold text-gray-700">{room.checkOutDate}</span></span>
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs font-medium text-gray-400 italic pt-1">No current guest</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2 mt-auto">
                  {room.type === 'Available' ? (
                    <button 
                      onClick={() => handleOpenBookingModal(room.roomNumber)}
                      className="w-full bg-brand-burgundy hover:bg-[#721F32] text-white text-xs font-bold py-2 px-4 rounded-xl shadow-sm transition-colors flex items-center justify-center gap-1.5"
                    >
                      Book Now
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleOpenDetailsModal(room)}
                      className="w-full bg-[#1E74D4] hover:bg-[#155cb1] text-white text-xs font-bold py-2 px-4 rounded-xl shadow-sm transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Eye size={14} />
                      <span>View Details</span>
                    </button>
                  )}
                  <button 
                    onClick={() => handleOpenCalendarModal(room)}
                    className="w-full bg-white hover:bg-gray-50 text-gray-700 text-xs font-bold py-2 px-4 rounded-xl border border-gray-200 shadow-sm transition-all flex items-center justify-center gap-1.5"
                  >
                    <Calendar size={14} className="text-gray-400" />
                    <span>Calendar View</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Booking Form Input Wizard Modal */}
      <AddBookingModal 
        showModal={showBookingModal}
        setShowModal={setShowBookingModal}
        form={bookingForm}
        handleInputChange={handleFormInputChange}
        executeSave={handleSaveBookingSubmit}
        isRoomFixed={true} 
      />

      {/* Calendar Grid View Portal Modal */}
      <CalendarViewModal 
        showModal={showCalendarModal}
        setShowModal={setShowCalendarModal}
        room={selectedCalendarRoom}
      />

      {/* Comprehensive Reservation Details Overview Modal */}
      <ViewDetailsModal
        showModal={showDetailsModal}
        setShowModal={setShowDetailsModal}
        booking={selectedBookingDetails}
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