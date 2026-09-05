import React from "react";
import { 
  X, Check, Users, Briefcase, Settings2, Fuel, Snowflake, 
  ShieldCheck, AlertCircle, Calendar, MessageSquare, ArrowRight
} from "lucide-react";
import { formatPrice } from "../utils/currency";
import { companyInfo } from "../data/companyInfo";
import { WhatsAppIcon } from "./icons/WhatsAppIcon";

export default function VehicleModal({ vehicle, selectedCurrency, onClose, onBook }) {
  if (!vehicle) return null;

  const whatsappText = encodeURIComponent(
    `Hello Danusha Rent a car! I am interested in reserving the ${vehicle.name}. Please confirm availability and rates.`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden my-8 border border-slate-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white transition-colors"
          aria-label="Close vehicle modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Image */}
        <div className="relative h-64 sm:h-80 w-full bg-slate-900 overflow-hidden">
          <img
            src={vehicle.image}
            alt={vehicle.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
          
          <div className="absolute bottom-4 left-6 right-6 text-white">
            {vehicle.tag && (
              <span className="bg-brand-gold text-slate-950 font-black text-xs uppercase tracking-wider px-3 py-1 rounded-full shadow-md inline-block mb-2">
                {vehicle.tag}
              </span>
            )}
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading">
              {vehicle.name}
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1">
              {vehicle.recommendedFor}
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Quick Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-brand-navy shrink-0" />
              <div>
                <span className="text-[10px] text-slate-500 uppercase block font-semibold">Capacity</span>
                <span className="text-xs font-bold text-slate-900">{vehicle.seats} Passengers</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-brand-navy shrink-0" />
              <div>
                <span className="text-[10px] text-slate-500 uppercase block font-semibold">Luggage</span>
                <span className="text-xs font-bold text-slate-900">{vehicle.luggage} Suitcases</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Settings2 className="w-5 h-5 text-brand-navy shrink-0" />
              <div>
                <span className="text-[10px] text-slate-500 uppercase block font-semibold">Transmission</span>
                <span className="text-xs font-bold text-slate-900">{vehicle.transmission}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Fuel className="w-5 h-5 text-brand-navy shrink-0" />
              <div>
                <span className="text-[10px] text-slate-500 uppercase block font-semibold">Fuel System</span>
                <span className="text-xs font-bold text-slate-900">{vehicle.fuel}</span>
              </div>
            </div>
          </div>

          {/* Rates Breakdown Matrix */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-brand-navy" />
              <span>Rental Rate Schedule ({selectedCurrency})</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-brand-navy/5 border border-brand-navy/20 p-3.5 rounded-2xl">
                <span className="text-[10px] text-slate-500 uppercase font-semibold block">Self-Drive / Day</span>
                <span className="text-lg font-black text-brand-navy font-heading">
                  {formatPrice(vehicle.rates.selfDriveDaily, selectedCurrency)}
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">{vehicle.rates.freeKmDaily} km/day free</span>
              </div>

              <div className="bg-brand-gold/10 border border-brand-gold/30 p-3.5 rounded-2xl">
                <span className="text-[10px] text-slate-500 uppercase font-semibold block">With Driver / Day</span>
                <span className="text-lg font-black text-brand-gold-dark font-heading">
                  {formatPrice(vehicle.rates.withDriverDaily, selectedCurrency)}
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Chauffeur Included</span>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl">
                <span className="text-[10px] text-slate-500 uppercase font-semibold block">Weekly Discounted</span>
                <span className="text-lg font-bold text-slate-900 font-heading">
                  {formatPrice(vehicle.rates.selfDriveWeekly, selectedCurrency)}
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">7 Days (700 km free)</span>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl">
                <span className="text-[10px] text-slate-500 uppercase font-semibold block">Security Deposit</span>
                <span className="text-lg font-bold text-slate-900 font-heading">
                  {formatPrice(vehicle.rates.deposit, selectedCurrency)}
                </span>
                <span className="text-[10px] text-emerald-600 font-medium block mt-0.5">100% Refundable</span>
              </div>
            </div>
          </div>

          {/* Key Features List */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
              Vehicle Equipment & Features
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
              {vehicle.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Included Protection & Roadside Assistance */}
          <div className="bg-blue-50/70 border border-blue-200 p-4 rounded-2xl flex items-start gap-3 text-xs text-blue-900">
            <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold block">All Rentals Include:</strong>
              Comprehensive insurance cover, 24/7 islandwide breakdown roadside rescue, mechanical replacement guarantee, and complimentary airport/office handover.
            </div>
          </div>

          {/* Bottom CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                onBook(vehicle, "self-drive");
              }}
              className="flex-1 bg-brand-navy hover:bg-brand-blue text-white font-bold py-3.5 px-5 rounded-xl text-sm transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book This Vehicle Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={`https://wa.me/${companyInfo.contacts.whatsapp}?text=${whatsappText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold py-3.5 px-5 rounded-xl text-sm transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <WhatsAppIcon className="w-4 h-4 fill-current" />
              <span>Inquire via WhatsApp</span>
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
