import React from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

export default function AddBookingModal({ 
  showModal, 
  setShowModal, 
  form, 
  handleInputChange, 
  executeSave, 
  totalBaseAmount, 
  balanceDue      
}) {
  if (!showModal) return null;

  // Calculate the total number of days based on check-in and check-out dates
  const calculateDays = () => {
    if (!form.checkIn || !form.checkOut) return 1;
    const start = new Date(form.checkIn);
    const end = new Date(form.checkOut);
    const diffTime = end - start;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1; 
  };

  const totalDays = calculateDays();
  const calculatedRoomTotal = (form.rate || 0) * totalDays;
  const extraCharges = form.extra || 0;
  const downpayment = form.downpayment || 0;

  // Dynamically calculate overall booking totals reflecting the duration changes
  const dynamicTotal = calculatedRoomTotal + extraCharges;
  const dynamicBalance = dynamicTotal - downpayment;

  // Real-time Validation States
  const isGuestsInvalid = form.guests !== undefined && form.guests !== '' && form.guests < 1;
  const isRateInvalid = form.rate !== undefined && form.rate !== '' && form.rate < 0;
  const isExtraInvalid = form.extra !== undefined && form.extra !== '' && form.extra < 0;
  const isDownpaymentInvalid = form.downpayment !== undefined && form.downpayment !== '' && form.downpayment < 0;

  // Check if any required field is completely blank/empty
  const isRequiredMissing = !form.name?.trim() || !form.contact?.trim() || !form.checkIn || !form.checkOut;

  // Form submission is blocked if required strings are missing OR any active error layout triggers
  const isSubmitDisabled = isRequiredMissing || isGuestsInvalid || isRateInvalid || isExtraInvalid || isDownpaymentInvalid;

  return createPortal(
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 overflow-y-auto animate-fade-in">
      
      {/* Container adapts naturally using h-auto, border boxes match smoothly */}
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl flex overflow-hidden border border-gray-100 my-auto h-auto transition-all duration-300">
        <div className="flex-1 flex flex-col h-full">
          <div className="p-4 border-b flex justify-between items-center bg-gray-50">
            <h3 className="font-bold text-gray-800 text-lg">New Booking</h3>
            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
              <X size={20} />
            </button>
          </div>
          
          <form onSubmit={executeSave} className="p-6 space-y-6 h-auto">
            {/* Guest Information Section */}
            <div>
              <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Guest Information</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                  <label className="text-xs font-bold text-gray-600">Full Name *</label>
                  <input required type="text" value={form.name} onChange={(e) => handleInputChange('name', e.target.value)} className="w-full border rounded-lg p-2 text-sm mt-1 outline-none focus:border-[#7A1C31]" placeholder="e.g. Maria Santos" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-600">Contact *</label>
                  <input required type="text" value={form.contact} onChange={(e) => handleInputChange('contact', e.target.value)} className="w-full border rounded-lg p-2 text-sm mt-1 outline-none focus:border-[#7A1C31]" placeholder="09XX-XXX-XXXX" />
                </div>
                
                <div>
                  <label className={`text-xs font-bold ${isGuestsInvalid ? 'text-rose-600' : 'text-gray-600'}`}>No. of Guests *</label>
                  <input 
                    required 
                    type="number" 
                    min="1"
                    value={form.guests} 
                    onChange={(e) => {
                      const parsedValue = e.target.value === '' ? '' : parseInt(e.target.value);
                      handleInputChange('guests', parsedValue);
                    }} 
                    onBlur={() => {
                      if (form.guests === '' || form.guests < 1) {
                        handleInputChange('guests', 1);
                      }
                    }}
                    className={`w-full border rounded-lg p-2 text-sm mt-1 outline-none transition-colors duration-200 ${
                      isGuestsInvalid 
                        ? 'border-rose-500 bg-rose-50/50 text-rose-900 focus:border-rose-600 focus:ring-1 focus:ring-rose-600' 
                        : 'border-gray-200 text-gray-800 focus:border-[#7A1C31]'
                    }`} 
                    placeholder="e.g. 4" 
                  />
                  {isGuestsInvalid && (
                    <p className="text-[11px] font-medium text-rose-600 mt-1.5 animate-pulse">
                      ⚠️ Must be at least 1 guest.
                    </p>
                  )}
                </div>
                
                <div className="col-span-3">
                  <label className="text-xs font-bold text-gray-600">Address</label>
                  <input type="text" value={form.address} onChange={(e) => handleInputChange('address', e.target.value)} className="w-full border rounded-lg p-2 text-sm mt-1 outline-none focus:border-[#7A1C31]" placeholder="City, Province" />
                </div>
              </div>
            </div>

            {/* Stay Configuration Info */}
            <div>
              <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Booking Details</h4>
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-600">Room *</label>
                  <select value={form.room} onChange={(e) => handleInputChange('room', e.target.value)} className="w-full border rounded-lg p-2 text-sm mt-1 outline-none focus:border-[#7A1C31]">
                    <option>Room 1</option>
                    <option>Room 2</option>
                    <option>Room 3</option>
                  </select>
                </div>
                <div className="col-span-1">
                  <label className="text-xs font-bold text-gray-600">Check-in *</label>
                  <input required type="date" value={form.checkIn} onChange={(e) => handleInputChange('checkIn', e.target.value)} className="w-full border rounded-lg p-2 text-sm mt-1 outline-none focus:border-[#7A1C31]" />
                </div>
                <div className="col-span-1">
                  <label className="text-xs font-bold text-gray-600">Check-out *</label>
                  <input required type="date" value={form.checkOut} onChange={(e) => handleInputChange('checkOut', e.target.value)} className="w-full border rounded-lg p-2 text-sm mt-1 outline-none focus:border-[#7A1C31]" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-600">Notes / Requests</label>
                  <input type="text" value={form.notes} onChange={(e) => handleInputChange('notes', e.target.value)} className="w-full border rounded-lg p-2 text-sm mt-1 outline-none focus:border-[#7A1C31]" placeholder="Optional" />
                </div>
              </div>
            </div>

            {/* Rates/Billing Block */}
            <div>
              <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Billing</h4>
              <div className="grid grid-cols-4 gap-4">
                {/* Room Rate / Night */}
                <div>
                  <label className={`text-xs font-bold ${isRateInvalid ? 'text-rose-600' : 'text-gray-600'}`}>Room Rate (₱/night)*</label>
                  <input 
                    required 
                    type="number" 
                    min="0"
                    value={form.rate || ''} 
                    onChange={(e) => handleInputChange('rate', e.target.value === '' ? '' : parseFloat(e.target.value))} 
                    className={`w-full border rounded-lg p-2 text-sm mt-1 outline-none transition-colors ${
                      isRateInvalid 
                        ? 'border-rose-500 bg-rose-50/50 text-rose-900 focus:border-rose-600' 
                        : 'border-gray-200 focus:border-[#7A1C31]'
                    }`}
                    placeholder="0" 
                  />
                  {isRateInvalid && (
                    <p className="text-[11px] font-medium text-rose-600 mt-1.5 animate-pulse">⚠️ Rate cannot be negative.</p>
                  )}
                </div>

                {/* Extra Charges */}
                <div>
                  <label className={`text-xs font-bold ${isExtraInvalid ? 'text-rose-600' : 'text-gray-600'}`}>Extra Charges (₱)</label>
                  <input 
                    type="number" 
                    min="0"
                    value={form.extra || ''} 
                    onChange={(e) => handleInputChange('extra', e.target.value === '' ? '' : parseFloat(e.target.value))} 
                    className={`w-full border rounded-lg p-2 text-sm mt-1 outline-none transition-colors ${
                      isExtraInvalid 
                        ? 'border-rose-500 bg-rose-50/50 text-rose-900 focus:border-rose-600' 
                        : 'border-gray-200 focus:border-[#7A1C31]'
                    }`}
                    placeholder="0" 
                  />
                  {isExtraInvalid && (
                    <p className="text-[11px] font-medium text-rose-600 mt-1.5 animate-pulse">⚠️ Charges cannot be negative.</p>
                  )}
                </div>

                {/* Downpayment */}
                <div>
                  <label className={`text-xs font-bold ${isDownpaymentInvalid ? 'text-rose-600' : 'text-gray-600'}`}>Downpayment (₱)</label>
                  <input 
                    type="number" 
                    min="0"
                    value={form.downpayment || ''} 
                    onChange={(e) => handleInputChange('downpayment', e.target.value === '' ? '' : parseFloat(e.target.value))} 
                    className={`w-full border rounded-lg p-2 text-sm mt-1 outline-none transition-colors ${
                      isDownpaymentInvalid 
                        ? 'border-rose-500 bg-rose-50/50 text-rose-900 focus:border-rose-600' 
                        : 'border-gray-200 focus:border-[#7A1C31]'
                    }`}
                    placeholder="0" 
                  />
                  {isDownpaymentInvalid && (
                    <p className="text-[11px] font-medium text-rose-600 mt-1.5 animate-pulse">⚠️ Cannot be negative.</p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-600">Payment Status</label>
                  <select value={form.paymentStatus} onChange={(e) => handleInputChange('paymentStatus', e.target.value)} className="w-full border rounded-lg p-2 text-sm mt-1 outline-none focus:border-[#7A1C31]">
                    <option>Unpaid</option>
                    <option>Partial</option>
                    <option>Fully Paid</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-2 pt-4 border-t">
              <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-lg text-sm text-gray-600 font-medium hover:bg-gray-50">Cancel</button>
              <button 
                type="submit" 
                disabled={isSubmitDisabled}
                className={`px-5 py-2 text-white rounded-lg text-sm font-medium transition-all duration-200 ${
                  isSubmitDisabled 
                    ? 'bg-gray-300 cursor-not-allowed opacity-60' 
                    : 'bg-[#7A1C31] hover:bg-[#631425] shadow-sm'
                }`}
              >
                Save Booking
              </button>
            </div>
          </form>
        </div>

        {/* Summary Sidebar */}
        <div className="w-72 bg-[#7A1C31] text-white p-6 flex flex-col justify-between border-l border-[#631425]">
          <div className="space-y-5 text-sm">
            <h4 className="text-xs font-bold tracking-widest opacity-60 uppercase">Summary</h4>
            <div><span className="text-[11px] opacity-50 block tracking-wide uppercase">Guest Name</span><span className="font-bold text-base block truncate">{form.name || '—'}</span></div>
            <div className="grid grid-cols-2 gap-2">
              <div><span className="text-[11px] opacity-50 block tracking-wide uppercase">Room</span><span className="font-semibold text-gray-200">{form.room}</span></div>
              <div><span className="text-[11px] opacity-50 block tracking-wide uppercase">Guests</span><span className="font-semibold text-gray-200">{form.guests || 1} pax</span></div>
            </div>
            <div><span className="text-[11px] opacity-50 block tracking-wide uppercase">Contact</span><span className="font-mono text-xs text-gray-200">{form.contact || '—'}</span></div>
            <div><span className="text-[11px] opacity-50 block tracking-wide uppercase">Address</span><span className="text-xs text-gray-200 block truncate">{form.address || '—'}</span></div>
            <div className="grid grid-cols-2 gap-2 border-t border-white/10 pt-3">
              <div><span className="text-[11px] opacity-50 block tracking-wide uppercase">Check-In</span><span className="text-xs font-mono text-gray-200">{form.checkIn || '—'}</span></div>
              <div><span className="text-[11px] opacity-50 block tracking-wide uppercase">Check-Out</span><span className="text-xs font-mono text-gray-200">{form.checkOut || '—'}</span></div>
            </div>
          </div>

          <div className="border-t border-white/20 pt-4 mt-6 space-y-2 text-xs">
            <div className="flex justify-between opacity-80">
              <span>Room Subtotal</span>
              <span>₱{calculatedRoomTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between opacity-80"><span>Extra</span><span>₱{extraCharges.toLocaleString()}</span></div>
            <div className="flex justify-between font-bold text-sm border-t border-white/10 pt-2 text-white"><span>Total</span><span>₱{dynamicTotal.toLocaleString()}</span></div>
            <div className="flex justify-between opacity-80"><span>Downpayment</span><span>- ₱{downpayment.toLocaleString()}</span></div>
            <div className="flex justify-between font-extrabold text-base border-t border-white/20 pt-2 text-yellow-400"><span>Balance</span><span>₱{dynamicBalance.toLocaleString()}</span></div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}