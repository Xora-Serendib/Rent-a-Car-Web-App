import React, { useState } from "react";
import { 
  Calculator, Check, Shield, Sparkles, ChevronRight, 
  HelpCircle, Calendar, ArrowRight, UserCheck, Car
} from "lucide-react";
import { fleetVehicles } from "../data/fleetData";
import { formatPrice } from "../utils/currency";
import { companyInfo } from "../data/companyInfo";
import { WhatsAppIcon } from "./icons/WhatsAppIcon";

export default function RateCalculator({ fleet, selectedCurrency, onBookWithEstimate }) {
  const activeFleet = fleet && fleet.length > 0 ? fleet : fleetVehicles;
  const [selectedCarId, setSelectedCarId] = useState(activeFleet[0]?.id || fleetVehicles[0].id);
  const [hireMode, setHireMode] = useState("self-drive");
  const [rentalDays, setRentalDays] = useState(7);

  // Add-ons toggles
  const [cdwInsurance, setCdwInsurance] = useState(true);
  const [babySeat, setBabySeat] = useState(false);
  const [gpsUnit, setGpsUnit] = useState(false);
  const [extraDriver, setExtraDriver] = useState(false);
  const [aacEndorsement, setAacEndorsement] = useState(false);

  const currentCar = activeFleet.find((c) => c.id === selectedCarId) || activeFleet[0];

  // Daily base rate
  const dailyBase = hireMode === "self-drive" 
    ? currentCar.rates.selfDriveDaily 
    : currentCar.rates.withDriverDaily;

  // Discount calculation
  let durationDiscount = 0;
  if (rentalDays >= 28) {
    durationDiscount = 15; // 15% off for monthly hires
  } else if (rentalDays >= 7) {
    durationDiscount = 8; // 8% off for weekly hires
  }

  const promoDiscount = currentCar.discountPercent || 0;
  const discountPercent = Math.min(65, durationDiscount + promoDiscount);

  const discountedDailyRate = dailyBase * (1 - discountPercent / 100);
  const vehicleTotal = Math.round(discountedDailyRate * rentalDays);

  // Add-ons calculations in LKR
  const cdwDaily = 2000;
  const babySeatDaily = 800;
  const gpsDaily = 600;
  const extraDriverDaily = 500;
  const aacEndorsementFlat = 7500;

  const addOnsTotal =
    (cdwInsurance ? cdwDaily * rentalDays : 0) +
    (babySeat ? babySeatDaily * rentalDays : 0) +
    (gpsUnit ? gpsDaily * rentalDays : 0) +
    (extraDriver ? extraDriverDaily * rentalDays : 0) +
    (aacEndorsement ? aacEndorsementFlat : 0);

  const grandTotal = vehicleTotal + addOnsTotal;
  const freeKmTotal = currentCar.rates.freeKmDaily * rentalDays;

  return (
    <section id="calculator" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-navy/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 bg-brand-gold/20 text-brand-gold px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 border border-brand-gold/30">
            <Calculator className="w-3.5 h-3.5 text-brand-gold" />
            <span>Transparent Pricing Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
            Live Rental Cost & Rate Estimator
          </h2>
          <p className="text-slate-400 mt-3 text-sm sm:text-base">
            Configure your rental vehicle, hire period, and desired accessories to get an instant, transparent price quotation with zero hidden surprises.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Controls: Car Selection, Mode, Duration, Add-ons */}
          <div className="lg:col-span-7 bg-slate-800/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-slate-700/80 space-y-6">
            
            {/* 1. Rental Mode Toggle */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-gold mb-2">
                1. Select Rental Service Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setHireMode("self-drive")}
                  className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all border ${
                    hireMode === "self-drive"
                      ? "bg-brand-navy text-white border-brand-gold shadow-lg"
                      : "bg-slate-900/60 text-slate-400 border-slate-700 hover:text-white"
                  }`}
                >
                  <Car className="w-4 h-4 text-brand-gold" />
                  <span>Self-Drive Rental</span>
                </button>

                <button
                  type="button"
                  onClick={() => setHireMode("with-driver")}
                  className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all border ${
                    hireMode === "with-driver"
                      ? "bg-brand-navy text-white border-brand-gold shadow-lg"
                      : "bg-slate-900/60 text-slate-400 border-slate-700 hover:text-white"
                  }`}
                >
                  <UserCheck className="w-4 h-4 text-brand-gold" />
                  <span>Chauffeur-Driven Tour</span>
                </button>
              </div>
            </div>

            {/* 2. Choose Vehicle */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-gold mb-2">
                2. Choose Your Vehicle
              </label>
              <select
                value={selectedCarId}
                onChange={(e) => setSelectedCarId(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-gold transition-colors font-medium cursor-pointer"
              >
                {activeFleet.map((car) => (
                  <option key={car.id} value={car.id} className="bg-slate-900 text-white">
                    {car.name} — {formatPrice(hireMode === "self-drive" ? car.rates.selfDriveDaily : car.rates.withDriverDaily, selectedCurrency)}/day
                  </option>
                ))}
              </select>
            </div>

            {/* 3. Duration Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-brand-gold">
                  3. Duration of Hire
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-black text-brand-gold font-heading">{rentalDays}</span>
                  <span className="text-xs text-slate-300">Days</span>
                  {discountPercent > 0 && (
                    <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                      {discountPercent}% Long-term Discount
                    </span>
                  )}
                </div>
              </div>

              <input
                type="range"
                min="1"
                max="30"
                value={rentalDays}
                onChange={(e) => setRentalDays(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-gold"
              />

              <div className="flex justify-between text-[11px] text-slate-400 mt-2 font-medium">
                <span>1 Day</span>
                <span>7 Days (Weekly -8%)</span>
                <span>14 Days</span>
                <span>28+ Days (Monthly -15%)</span>
              </div>
            </div>

            {/* 4. Optional Extras & Protection Add-ons */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-gold mb-3">
                4. Protection & Value Add-Ons
              </label>

              <div className="space-y-2.5">
                {/* CDW */}
                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-700/60 cursor-pointer hover:border-slate-600 transition-colors">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={cdwInsurance}
                      onChange={(e) => setCdwInsurance(e.target.checked)}
                      className="w-4 h-4 rounded text-brand-gold bg-slate-800 border-slate-600 focus:ring-0 cursor-pointer"
                    />
                    <div>
                      <span className="text-xs font-semibold text-white block">
                        Collision Damage Waiver (CDW / Zero Excess)
                      </span>
                      <span className="text-[11px] text-slate-400">
                        Zero liability on accidental damage & full theft protection
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-brand-gold whitespace-nowrap">
                    +{formatPrice(cdwDaily, selectedCurrency)}/day
                  </span>
                </label>

                {/* AAC Driving Endorsement Assistance */}
                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-700/60 cursor-pointer hover:border-slate-600 transition-colors">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={aacEndorsement}
                      onChange={(e) => setAacEndorsement(e.target.checked)}
                      className="w-4 h-4 rounded text-brand-gold bg-slate-800 border-slate-600 focus:ring-0 cursor-pointer"
                    />
                    <div>
                      <span className="text-xs font-semibold text-white block">
                        Sri Lanka AAC Driving License Endorsement
                      </span>
                      <span className="text-[11px] text-slate-400">
                        We process your legal endorsement so you can drive legally immediately upon arrival
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-brand-gold whitespace-nowrap">
                    +{formatPrice(aacEndorsementFlat, selectedCurrency)} flat
                  </span>
                </label>

                {/* Baby Seat */}
                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-700/60 cursor-pointer hover:border-slate-600 transition-colors">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={babySeat}
                      onChange={(e) => setBabySeat(e.target.checked)}
                      className="w-4 h-4 rounded text-brand-gold bg-slate-800 border-slate-600 focus:ring-0 cursor-pointer"
                    />
                    <div>
                      <span className="text-xs font-semibold text-white block">
                        Child / Infant Safety Seat (ISOFIX)
                      </span>
                      <span className="text-[11px] text-slate-400">
                        Sanitized international standard child restraint
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-brand-gold whitespace-nowrap">
                    +{formatPrice(babySeatDaily, selectedCurrency)}/day
                  </span>
                </label>

                {/* GPS */}
                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-700/60 cursor-pointer hover:border-slate-600 transition-colors">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={gpsUnit}
                      onChange={(e) => setGpsUnit(e.target.checked)}
                      className="w-4 h-4 rounded text-brand-gold bg-slate-800 border-slate-600 focus:ring-0 cursor-pointer"
                    />
                    <div>
                      <span className="text-xs font-semibold text-white block">
                        Dedicated Garmin GPS Unit / 4G Wi-Fi Dongle
                      </span>
                      <span className="text-[11px] text-slate-400">
                        Preloaded offline Sri Lanka topographic & road maps
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-brand-gold whitespace-nowrap">
                    +{formatPrice(gpsDaily, selectedCurrency)}/day
                  </span>
                </label>
              </div>
            </div>

          </div>

          {/* Right Summary Card: Live Computed Cost & Book Action */}
          <div className="lg:col-span-5 bg-gradient-to-b from-brand-navy to-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-700/80 shadow-2xl relative">
            
            <div className="flex items-center gap-3 pb-5 border-b border-white/10">
              <img
                src={currentCar.image}
                alt={currentCar.name}
                className="w-20 h-14 object-cover rounded-xl border border-white/10 shadow-md"
              />
              <div>
                <span className="text-[10px] uppercase font-bold text-brand-gold block">Selected Model</span>
                <h4 className="text-base font-bold text-white font-heading">{currentCar.name}</h4>
                <span className="text-xs text-slate-300">
                  {hireMode === "self-drive" ? "Self-Drive" : "Chauffeur-Driven"} • {rentalDays} Days
                </span>
              </div>
            </div>

            {/* Itemized Calculation */}
            <div className="py-5 space-y-3 text-xs text-slate-300 border-b border-white/10">
              <div className="flex justify-between items-center">
                <span>Base Rate ({rentalDays} days @ {formatPrice(discountedDailyRate, selectedCurrency)}/day):</span>
                <span className="font-semibold text-white">{formatPrice(vehicleTotal, selectedCurrency)}</span>
              </div>

              {discountPercent > 0 && (
                <div className="flex justify-between items-center text-emerald-400">
                  <span>Duration Discount ({discountPercent}%):</span>
                  <span>- {formatPrice((dailyBase * rentalDays) - vehicleTotal, selectedCurrency)}</span>
                </div>
              )}

              <div className="flex justify-between items-center">
                <span>Complimentary Mileage:</span>
                <span className="font-semibold text-brand-gold">{freeKmTotal} km included</span>
              </div>

              {addOnsTotal > 0 && (
                <div className="flex justify-between items-center">
                  <span>Selected Add-Ons & Protection:</span>
                  <span className="font-semibold text-white">{formatPrice(addOnsTotal, selectedCurrency)}</span>
                </div>
              )}

              <div className="flex justify-between items-center">
                <span>Excess Mileage Rate:</span>
                <span className="text-slate-400">Rs. {currentCar.rates.excessKmRate}/km</span>
              </div>
            </div>

            {/* Total Display */}
            <div className="py-5 space-y-2">
              <div className="flex items-baseline justify-between">
                <span className="text-xs uppercase font-bold tracking-wider text-slate-300">
                  Estimated Total ({selectedCurrency})
                </span>
                <div className="text-right">
                  <span className="text-3xl font-black text-brand-gold-light font-heading">
                    {formatPrice(grandTotal, selectedCurrency)}
                  </span>
                  <span className="text-[10px] text-slate-400 block">All taxes & roadside cover included</span>
                </div>
              </div>

              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60 text-[11px] text-slate-300 flex items-center justify-between">
                <span>Refundable Security Deposit:</span>
                <strong className="text-white font-bold">{formatPrice(currentCar.rates.deposit, selectedCurrency)}</strong>
              </div>
            </div>

            {/* Proceed CTA */}
            <button
              type="button"
              onClick={() => onBookWithEstimate({
                car: currentCar,
                hireMode,
                rentalDays,
                grandTotal,
                freeKmTotal,
                addOns: {
                  cdwInsurance,
                  babySeat,
                  gpsUnit,
                  extraDriver,
                  aacEndorsement
                }
              })}
              className="w-full bg-gradient-to-r from-brand-gold to-amber-500 hover:from-amber-400 hover:to-brand-gold text-slate-950 font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-all text-sm flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Lock In This Quote & Reserve</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href={`https://wa.me/${companyInfo.contacts.whatsapp}?text=${encodeURIComponent(`Hello Danusha Rent a car! I calculated an estimate for the ${currentCar.name} (${hireMode === "with-driver" ? "With Driver" : "Self-Drive"}) for ${rentalDays} days. Total: ${formatPrice(grandTotal, selectedCurrency)}. Please confirm availability!`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full mt-2 bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] hover:text-emerald-300 font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all border border-[#25D366]/30 shadow-sm"
            >
              <WhatsAppIcon className="w-4 h-4 fill-current" />
              <span>Inquire This Quote via WhatsApp</span>
            </a>

            <div className="mt-4 text-center">
              <span className="text-[11px] text-slate-400 flex items-center justify-center gap-1">
                <Shield className="w-3.5 h-3.5 text-brand-gold" />
                <span>No cancellation fees up to 48 hours prior to pickup</span>
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
