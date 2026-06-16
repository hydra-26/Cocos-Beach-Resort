import React from 'react';
import { createPortal } from 'react-dom';
import { Download } from 'lucide-react';
import logo from '../assets/sidebar.svg';

export default function Receipts({ 
  showReceipt, 
  setShowReceipt, 
  activeReceipt, 
  receiptCaptureRef, 
  handleDownloadPng 
}) {
  if (!showReceipt || !activeReceipt) return null;

  // Derive duration safety defaults to prevent multiplying by 0 or NaN
  const dynamicNights = parseInt(activeReceipt.nights) || 1;
  const calculatedRoomTotal = (activeReceipt.rate || 0) * dynamicNights;
  const extraCharges = activeReceipt.extra || 0;
  const downpayment = activeReceipt.downpayment || 0;

  // Calculate the overall total and balance dynamically based on stay duration
  const dynamicTotal = calculatedRoomTotal + extraCharges;
  const dynamicBalance = dynamicTotal - downpayment;

  return createPortal(
    // overflow-hidden prevents any page-level or modal scrolling completely
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 overflow-hidden">
      
      {/* The receipt container is now optimized to be compact and self-contained */}
      <div className="bg-white rounded-2xl flex flex-col w-[360px] shadow-2xl border border-gray-100 overflow-hidden max-h-[95vh]">
        
        {/* Document Canvas Frame Wrapper - Shared as the inner card content */}
        <div ref={receiptCaptureRef} className="w-full bg-white text-gray-800 p-0 font-sans">
          
          {/* Header Banner Area */}
          <div className="bg-brand-burgundy text-white p-4 text-center relative overflow-hidden">
            <div className="flex justify-center">
              <img src={logo} alt="Cocos Beach Resort" className="h-8 object-contain"/>
            </div>
            <p className="text-[10px] opacity-75 mt-0.5">Brgy. Ilog Malino, Bolinao, Pangasinan - 0917-486-1902</p>
            <div className="mt-3">
              <p className="text-[9px] opacity-60 uppercase tracking-widest font-bold">Booking Receipt</p>
              <p className="text-lg font-mono font-black tracking-wide my-0.5">{activeReceipt.id}</p>
              <p className="text-[10px] opacity-75">Issued {activeReceipt.date}</p>
            </div>
          </div>

          {/* Statement Details Sheet - Slightly compacted margins to fit comfortably */}
          <div className="p-4 space-y-3 text-xs">
            {/* Guest Information */}
            <div>
              <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Guest Information</h5>
              <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                <div><p className="text-[9px] text-gray-400">Name</p><p className="font-bold text-gray-700 truncate">{activeReceipt.name}</p></div>
                <div><p className="text-[9px] text-gray-400">Contact</p><p className="font-mono text-gray-700">{activeReceipt.contact}</p></div>
                <div><p className="text-[9px] text-gray-400">No. of Guests</p><p className="font-medium text-gray-700">{activeReceipt.guests} person(s)</p></div>
                <div><p className="text-[9px] text-gray-400">Room</p><p className="font-semibold text-gray-700">{activeReceipt.room}</p></div>
                <div className="col-span-2"><p className="text-[9px] text-gray-400">Address</p><p className="font-medium text-gray-600 truncate">{activeReceipt.address || '--'} </p></div>
              </div>
            </div>

            {/* Stay Details */}
            <div className="border-t border-gray-100 pt-2">
              <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Stay Details</h5>
              <div className="grid grid-cols-3 gap-1">
                <div><p className="text-[9px] text-gray-400">Check-in</p><p className="font-medium text-gray-700 font-mono text-[10px]">{activeReceipt.checkIn}</p></div>
                <div><p className="text-[9px] text-gray-400">Check-out</p><p className="font-medium text-gray-700 font-mono text-[10px]">{activeReceipt.checkOut}</p></div>
                <div><p className="text-[9px] text-gray-400">Duration</p><p className="font-bold text-gray-700">{dynamicNights} {dynamicNights === 1 ? 'night' : 'nights'}</p></div>
              </div>
            </div>

            {/* Billing Summary */}
            <div className="border-t border-gray-100 pt-2 space-y-1">
              <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Billing Summary</h5>
              <div className="flex justify-between text-gray-500 font-medium">
                <span>Room Subtotal</span>
                <span className="font-mono">₱{calculatedRoomTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-500 font-medium"><span>Extra Charges</span><span className="font-mono">₱{extraCharges.toLocaleString()}</span></div>
              <div className="flex justify-between font-bold text-gray-800 border-t border-gray-100 pt-1"><span>Total</span><span className="font-mono">₱{dynamicTotal.toLocaleString()}</span></div>
              <div className="flex justify-between text-gray-400"><span>Downpayment</span><span className="font-mono">- ₱{downpayment.toLocaleString()}</span></div>
              
              <div className="bg-gray-50 p-2 rounded-lg flex justify-between items-center font-black text-xs mt-1 border border-gray-100">
                <span className="text-gray-700">Balance Due</span>
                {/* Dynamically computes and displays the true math balance */}
                <span className="text-rose-600 font-mono text-sm">₱{dynamicBalance.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between items-center pt-1">
                <span className="text-[9px] font-bold text-gray-400 uppercase">Payment Status</span>
                <span className="bg-rose-50 text-rose-600 border border-rose-100 font-bold px-1.5 py-0.5 rounded text-[9px] tracking-wide uppercase">{activeReceipt.paymentStatus}</span>
              </div>
            </div>

            {/* Footer Signatures */}
            <div className="border-t border-dashed pt-3 text-center space-y-0.5 text-[9px] text-gray-400 font-medium">
              <p className="text-gray-600 font-semibold flex items-center justify-center gap-1">Thank you for choosing Cocos Beach Resort! 🌴</p>
              <p className="text-gray-500">Ms. Sidney Tombaga - Admin - 0917-486-1902</p>
            </div>
          </div>
        </div>

        {/* Action Toolbar Panel */}
        <div className="flex gap-2 w-full border-t border-gray-100 p-3 bg-gray-50">
          <button onClick={() => setShowReceipt(false)} className="flex-1 py-2 border rounded-xl text-xs font-semibold text-gray-500 bg-white hover:bg-gray-50 transition-colors">Close</button>
          <button onClick={handleDownloadPng} className="flex-1 py-2 bg-brand-burgundy hover:bg-[#631425] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-colors">
            <Download size={14} /> Download PNG
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}