import React, { useState } from "react";
import { X, Calendar, User, Phone, MapPin, Plus, DollarSign } from "lucide-react";
import { companyInfo } from "../../data/companyInfo";

export default function AddBookingModal({ isOpen, onClose, fleet, onAddBooking }) {
  if (!isOpen) return null;

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [vehicleId, setVehicleId] = useState(fleet[0]?.id || "");
  const [serviceType, setServiceType] = useState("self-drive");

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 8);
  const formatDate = (d) => d.toISOString().split("T")[0];

  const [pickupLoc, setPickupLoc] = useState("Piliyandala Head Office (134/3 Polgasowita Rd)");
  const [dropoffLoc, setDropoffLoc] = useState("Piliyandala Head Office (134/3 Polgasowita Rd)");
  const [pickupDate, setPickupDate] = useState(formatDate(tomorrow));
  const [dropoffDate, setDropoffDate] = useState(formatDate(nextWeek));
  const [pickupTime, setPickupTime] = useState("10:00");
  const [dropoffTime, setDropoffTime] = useState("10:00");
  const [status, setStatus] = useState("confirmed");
  const [customTotal, setCustomTotal] = useState("");
  const [notes, setNotes] = useState("");

  const selectedVehicle = fleet.find((c) => c.id === vehicleId) || fleet[0];

  const calculateDays = () => {
    const start = new Date(pickupDate);
    const end = new Date(dropoffDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const days = calculateDays();
  const baseDaily = serviceType === "self-drive" ? selectedVehicle?.rates.selfDriveDaily : selectedVehicle?.rates.withDriverDaily;
  const calculatedTotal = (baseDaily || 10000) * days;
  const totalQuotation = customTotal ? Number(customTotal) : calculatedTotal;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim()) return;

    onAddBooking({
      customer: {
        name: customerName,
        phone,
        email: email || "Walk-in / Phone Inquirer",
        nationality: "Sri Lanka",
        passportOrId: "Collected at Handover"
      },
      vehicleId: selectedVehicle?.id,
      vehicleName: selectedVehicle?.name,
      serviceType,
      pickupLoc,
      dropoffLoc,
      pickupDate,
      dropoffDate,
      pickupTime,
      dropoffTime,
      days,
      freeKmTotal: (selectedVehicle?.rates.freeKmDaily || 100) * days,
      totalQuotation,
      deposit: selectedVehicle?.rates.deposit || 35000,
      status,
      tripPurpose: "Phone / Offline Booking",
      drivingLicenseStatus: "License verified by owner",
      notes: notes.trim() || "Offline phone booking received via 074 252 6538."
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        
        {/* Header */}
        <div className="bg-brand-navy p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center font-bold">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-base font-heading">New Offline / Phone Booking</h3>
              <p className="text-xs text-slate-300">Record customer call or in-person reservation</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto text-xs">
          
          {/* Customer */}
          <div>
            <h4 className="font-bold uppercase tracking-wider text-slate-500 text-[10px] mb-2">Customer Info</h4>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Customer Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kasun Fernando"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 font-semibold"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">WhatsApp / Phone *</label>
                <input
                  type="tel"
                  required
                  placeholder="07X XXX XXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 font-semibold"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-slate-700 font-semibold mb-1">Email Address (Optional)</label>
                <input
                  type="email"
                  placeholder="customer@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900"
                />
              </div>
            </div>
          </div>

          {/* Vehicle & Logistics */}
          <div className="border-t border-slate-200 pt-3">
            <h4 className="font-bold uppercase tracking-wider text-slate-500 text-[10px] mb-2">Vehicle & Dates</h4>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Assigned Vehicle</label>
                <select
                  value={vehicleId}
                  onChange={(e) => setVehicleId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 font-bold cursor-pointer"
                >
                  {fleet.map((car) => (
                    <option key={car.id} value={car.id}>{car.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Service Type</label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 font-semibold"
                >
                  <option value="self-drive">Self-Drive</option>
                  <option value="with-driver">With Driver (Chauffeur)</option>
                  <option value="airport">Airport Transfer</option>
                  <option value="wedding">Wedding / VIP</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 mb-1">Pick-up Date & Time</label>
                <div className="flex gap-2">
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 text-xs"
                  />
                  <input
                    type="time"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-24 bg-slate-50 border border-slate-300 rounded-xl p-2 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 mb-1">Drop-off Date & Time</label>
                <div className="flex gap-2">
                  <input
                    type="date"
                    min={pickupDate}
                    value={dropoffDate}
                    onChange={(e) => setDropoffDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 text-xs"
                  />
                  <input
                    type="time"
                    value={dropoffTime}
                    onChange={(e) => setDropoffTime(e.target.value)}
                    className="w-24 bg-slate-50 border border-slate-300 rounded-xl p-2 text-xs"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-700 mb-1">Pick-up Location</label>
                <select
                  value={pickupLoc}
                  onChange={(e) => setPickupLoc(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs"
                >
                  {companyInfo.locations.map((loc, idx) => (
                    <option key={idx} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Pricing & Status */}
          <div className="border-t border-slate-200 pt-3">
            <h4 className="font-bold uppercase tracking-wider text-slate-500 text-[10px] mb-2">Booking Status & Payment</h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Booking Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 font-bold"
                >
                  <option value="confirmed">Confirmed</option>
                  <option value="on_hire">On Hire (Handed Over)</option>
                  <option value="pending">Pending Deposit</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Quotation Total (Rs.)</label>
                <input
                  type="number"
                  placeholder={`Calculated: Rs. ${calculatedTotal.toLocaleString()}`}
                  value={customTotal}
                  onChange={(e) => setCustomTotal(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 font-bold text-emerald-800"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-slate-700 mb-1">Notes / Instructions</label>
                <textarea
                  rows="2"
                  placeholder="Special instructions, deposit payment notes, flight number, etc."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 text-xs resize-none"
                ></textarea>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-3 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2.5 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5 shadow-md shadow-emerald-700/20"
            >
              <Plus className="w-4 h-4" />
              <span>Record Booking</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
