import React, { useState } from "react";
import { 
  Calendar, Search, Filter, MessageSquare, Phone, 
  FileDown, Plus, Trash2, CheckCircle2, Clock, XCircle, AlertCircle, Eye
} from "lucide-react";
import { generateBookingPDF } from "../../utils/pdfGenerator";
import { formatPrice } from "../../utils/currency";
import { WhatsAppIcon } from "../icons/WhatsAppIcon";

export default function AdminBookingsManager({ 
  bookings, 
  onUpdateBookingStatus, 
  onDeleteBooking, 
  onOpenAddBooking 
}) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeBookingForDetails, setActiveBookingForDetails] = useState(null);

  const filteredBookings = bookings.filter((bk) => {
    const matchStatus = statusFilter === "all" || bk.status === statusFilter;
    const q = search.toLowerCase();
    const matchSearch =
      bk.id.toLowerCase().includes(q) ||
      bk.customer?.name.toLowerCase().includes(q) ||
      bk.customer?.phone.toLowerCase().includes(q) ||
      bk.vehicleName.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "confirmed":
        return {
          label: "Confirmed",
          color: "bg-emerald-100 text-emerald-800 border-emerald-300",
          icon: CheckCircle2
        };
      case "on_hire":
        return {
          label: "On Hire (Active)",
          color: "bg-blue-100 text-blue-800 border-blue-300",
          icon: Clock
        };
      case "pending":
        return {
          label: "Pending Inquiry",
          color: "bg-amber-100 text-amber-800 border-amber-300",
          icon: AlertCircle
        };
      case "completed":
        return {
          label: "Completed",
          color: "bg-slate-100 text-slate-700 border-slate-300",
          icon: CheckCircle2
        };
      case "cancelled":
        return {
          label: "Cancelled",
          color: "bg-rose-100 text-rose-800 border-rose-300",
          icon: XCircle
        };
      default:
        return {
          label: status,
          color: "bg-slate-100 text-slate-700 border-slate-300",
          icon: Clock
        };
    }
  };

  const handleDownloadVoucher = (bk) => {
    generateBookingPDF({
      name: bk.customer?.name || "Customer",
      phone: bk.customer?.phone || "",
      email: bk.customer?.email || "",
      nationality: bk.customer?.nationality || "Sri Lanka",
      passportOrId: bk.customer?.passportOrId || "",
      carName: bk.vehicleName,
      carFuel: "Petrol / Hybrid",
      carTransmission: "Automatic",
      serviceType: bk.serviceType || "self-drive",
      days: bk.days || 1,
      freeKmTotal: bk.freeKmTotal || 100,
      pickupLoc: bk.pickupLoc,
      pickupDate: bk.pickupDate,
      pickupTime: bk.pickupTime,
      dropoffLoc: bk.dropoffLoc,
      dropoffDate: bk.dropoffDate,
      dropoffTime: bk.dropoffTime,
      flightNumber: bk.flightNumber || "",
      hotelAddress: bk.hotelAddress || "",
      tripPurpose: bk.tripPurpose || "General Travel",
      passengersCount: bk.passengersCount || "2 Passengers",
      luggageCount: bk.luggageCount || "2 Suitcases",
      drivingLicenseStatus: bk.drivingLicenseStatus || "Standard License",
      licenseExperience: bk.licenseExperience || "Over 2 years",
      destinationsPlanned: bk.destinationsPlanned || "",
      notes: bk.notes || "",
      cdw: true,
      vehicleTotalFormatted: `Rs. ${(bk.totalQuotation || 0).toLocaleString()}`,
      extrasTotalFormatted: "Rs. 0",
      grandTotalFormatted: `Rs. ${(bk.totalQuotation || 0).toLocaleString()}`,
      depositFormatted: `Rs. ${(bk.deposit || 35000).toLocaleString()}`
    }, true);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Bar: Search, Status Filter Pills, Manual Booking */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search bookings by customer name, phone, or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-brand-navy"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: "all", label: "All" },
            { id: "pending", label: "Pending" },
            { id: "confirmed", label: "Confirmed" },
            { id: "on_hire", label: "On Hire" },
            { id: "completed", label: "Completed" },
            { id: "cancelled", label: "Cancelled" }
          ].map((pill) => (
            <button
              key={pill.id}
              type="button"
              onClick={() => setStatusFilter(pill.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                statusFilter === pill.id
                  ? "bg-brand-navy text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>

        {/* Add Manual Booking */}
        <button
          type="button"
          onClick={onOpenAddBooking}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-700/20 transition-all shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Booking</span>
        </button>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-[11px] uppercase tracking-wider text-slate-500 font-bold">
              <tr>
                <th className="py-3.5 px-4">Booking Ref</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Vehicle Reserved</th>
                <th className="py-3.5 px-4">Hire Dates</th>
                <th className="py-3.5 px-4">Quotation Total</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-12 text-slate-400">
                    No reservations found matching your filter.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((bk) => {
                  const badge = getStatusBadge(bk.status);
                  const Icon = badge.icon;
                  const cleanPhone = bk.customer?.phone?.replace(/\D/g, "");

                  return (
                    <tr key={bk.id} className="hover:bg-slate-50/80 transition-colors">
                      
                      {/* ID & Time */}
                      <td className="py-3.5 px-4">
                        <span className="font-mono font-bold text-slate-900 block">{bk.id}</span>
                        <span className="text-[10px] text-slate-400">
                          {new Date(bk.createdAt).toLocaleDateString()}
                        </span>
                      </td>

                      {/* Customer */}
                      <td className="py-3.5 px-4">
                        <strong className="text-slate-900 block">{bk.customer?.name}</strong>
                        <span className="text-[11px] text-slate-500 block">{bk.customer?.phone}</span>
                        {bk.customer?.email && (
                          <span className="text-[10px] text-slate-400">{bk.customer?.email}</span>
                        )}
                      </td>

                      {/* Vehicle */}
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-brand-navy block">{bk.vehicleName}</span>
                        <span className="text-[10px] uppercase font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                          {bk.serviceType}
                        </span>
                      </td>

                      {/* Dates */}
                      <td className="py-3.5 px-4">
                        <div className="text-slate-800">
                          {bk.pickupDate} ➔ {bk.dropoffDate}
                        </div>
                        <span className="text-[10px] text-slate-500 font-bold">
                          {bk.days} Day(s) • {bk.freeKmTotal} km
                        </span>
                      </td>

                      {/* Total */}
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        <span className="text-sm font-heading text-emerald-800 block">
                          Rs. {(bk.totalQuotation || 0).toLocaleString()}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          Dep: Rs. {(bk.deposit || 35000).toLocaleString()}
                        </span>
                      </td>

                      {/* Status Selector */}
                      <td className="py-3.5 px-4">
                        <select
                          value={bk.status}
                          onChange={(e) => onUpdateBookingStatus(bk.id, e.target.value)}
                          className={`text-[11px] font-bold px-2 py-1 rounded-lg border cursor-pointer ${badge.color}`}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="on_hire">On Hire</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          
                          {/* WhatsApp Direct */}
                          {cleanPhone && (
                            <a
                              href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hello ${bk.customer?.name}! This is Mr. Danusha from Danusha Rent a Car regarding your booking (${bk.id}) for the ${bk.vehicleName}.`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 text-[#25D366] hover:bg-emerald-50 rounded-lg transition-colors border border-emerald-200"
                              title="Chat with customer on WhatsApp"
                            >
                              <WhatsAppIcon className="w-4 h-4 fill-current" />
                            </a>
                          )}

                          {/* Call */}
                          {bk.customer?.phone && (
                            <a
                              href={`tel:${bk.customer.phone}`}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-blue-200"
                              title="Call customer directly"
                            >
                              <Phone className="w-4 h-4" />
                            </a>
                          )}

                          {/* Download PDF Voucher */}
                          <button
                            type="button"
                            onClick={() => handleDownloadVoucher(bk)}
                            className="p-2 text-brand-navy hover:bg-brand-navy/10 rounded-lg transition-colors border border-slate-200"
                            title="Download official PDF Booking Voucher"
                          >
                            <FileDown className="w-4 h-4 text-brand-gold" />
                          </button>

                          {/* Delete */}
                          <button
                            type="button"
                            onClick={() => {
                              if (window.confirm(`Delete reservation ${bk.id} for ${bk.customer?.name}?`)) {
                                onDeleteBooking(bk.id);
                              }
                            }}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-slate-200"
                            title="Delete booking"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
