import React, { useState, useMemo } from "react";
import { 
  ShieldCheck, Award, MapPin, Calendar, Clock, Car, 
  Search, ArrowRight, CheckCircle2, Sparkles, UserCheck, Plane, Heart,
  Navigation, Compass
} from "lucide-react";
import { companyInfo } from "../data/companyInfo";
import { fleetCategories } from "../data/fleetData";
import { WhatsAppIcon } from "./icons/WhatsAppIcon";
import { getRouteDetails } from "../utils/routeCalculator";
import { destinationGroups, popularSriLankaDestinations } from "../utils/sriLankaGeo";
import RouteMapModal from "./RouteMapModal";

export default function Hero({ onSearchSubmit, onQuickBook }) {
  const [serviceType, setServiceType] = useState("self-drive");
  const [pickupLocation, setPickupLocation] = useState("Bandaranaike Int'l Airport (CMB Katunayake)");
  const [dropoffLocation, setDropoffLocation] = useState("Bandaranaike Int'l Airport (CMB Katunayake)");
  const [customRouteData, setCustomRouteData] = useState(null);
  
  // Default dates: tomorrow to 5 days later
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const fiveDaysLater = new Date();
  fiveDaysLater.setDate(fiveDaysLater.getDate() + 6);

  const formatDate = (date) => date.toISOString().split("T")[0];

  const [pickupDate, setPickupDate] = useState(formatDate(tomorrow));
  const [dropoffDate, setDropoffDate] = useState(formatDate(fiveDaysLater));
  const [pickupTime, setPickupTime] = useState("10:00");
  const [dropoffTime, setDropoffTime] = useState("10:00");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isRouteMapOpen, setIsRouteMapOpen] = useState(false);

  // Compute live route distance and directions
  const routeDetails = useMemo(() => {
    if (customRouteData && customRouteData.pickup === pickupLocation && customRouteData.dropoff === dropoffLocation) {
      return customRouteData;
    }
    return getRouteDetails(pickupLocation, dropoffLocation);
  }, [pickupLocation, dropoffLocation, customRouteData]);

  const calculateDays = () => {
    const start = new Date(pickupDate);
    const end = new Date(dropoffDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const rentalDays = calculateDays();

  const handleSearch = (e) => {
    e.preventDefault();
    onSearchSubmit({
      serviceType,
      pickupLocation,
      dropoffLocation,
      pickupDate,
      dropoffDate,
      pickupTime,
      dropoffTime,
      selectedCategory,
      rentalDays
    });
  };

  return (
    <div id="home" className="relative bg-brand-dark text-white overflow-hidden">
      {/* Background Graphic & Scenic Atmosphere Overlay */}
      <div className="absolute inset-0 z-0 opacity-35 bg-cover bg-center mix-blend-luminosity scale-105 transition-transform duration-1000"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=2000&q=80')`
        }}
      />
      {/* Subtle Radial & Linear Gradients for depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/90 to-brand-navy/80 z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.15),transparent_50%)] z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pt-10 sm:pt-16 pb-20 sm:pb-28">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Hero Typography & Trust Badges */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Accreditations Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 px-3.5 py-1.5 rounded-full text-xs font-semibold text-brand-gold-light">
              <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
              <span>Danusha Rent A Car • 134/3 Polgasowita Rd, Piliyandala</span>
              <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full">5.0 ★ (32 Reviews)</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] font-heading">
              Sri Lanka's Top-Rated <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-amber-300 to-yellow-500">5.0★ Car Rental</span> & Chauffeur Fleet.
            </h1>

            {/* Sub-headline description */}
            <p className="text-slate-300 text-sm sm:text-base lg:text-lg max-w-2xl leading-relaxed">
              Experience friendly, honest, and spotless car hire directly managed by Mr. Danusha. Whether you need an economical city runner, a hybrid touring sedan, an SUV, or airport transfers at BIA Katunayake, we provide transparent rates with zero hidden charges.
            </p>

            {/* Key Value Points */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs sm:text-sm">
              <div className="flex items-center gap-2 text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0" />
                <span>5.0★ Google Verified (32 Reviews)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0" />
                <span>Direct Support from Mr. Danusha</span>
              </div>
              <div className="flex items-center gap-2 text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0" />
                <span>Spotless & Maintained Cars</span>
              </div>
              <div className="flex items-center gap-2 text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0" />
                <span>24/7 BIA Airport Delivery</span>
              </div>
              <div className="flex items-center gap-2 text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0" />
                <span>Self-Drive & With-Driver</span>
              </div>
              <div className="flex items-center gap-2 text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0" />
                <span>Zero Hidden Fees Guaranteed</span>
              </div>
            </div>

            {/* Social Proof Counters */}
            <div className="pt-4 flex flex-wrap items-center gap-6 border-t border-white/10">
              {companyInfo.stats.map((stat, idx) => (
                <div key={idx}>
                  <div className="text-2xl sm:text-3xl font-black text-brand-gold font-heading">{stat.value}</div>
                  <div className="text-xs text-slate-400 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Booking / Search Card */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-700/80 rounded-3xl p-5 sm:p-7 shadow-2xl shadow-black/50">
              
              {/* Card Header & Service Selection Tabs */}
              <div className="mb-5">
                <div className="text-xs font-bold uppercase tracking-wider text-brand-gold mb-3 flex items-center justify-between">
                  <span>Fast Booking & Rate Check</span>
                  <span className="text-[11px] text-slate-400 font-normal">Instant Confirmation</span>
                </div>

                <div className="grid grid-cols-4 gap-1 bg-slate-800/90 p-1 rounded-xl border border-slate-700">
                  <button
                    type="button"
                    onClick={() => setServiceType("self-drive")}
                    className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg text-[11px] font-semibold transition-all ${
                      serviceType === "self-drive" 
                        ? "bg-brand-gold text-slate-950 shadow-md font-bold" 
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    <Car className="w-3.5 h-3.5 mb-1" />
                    <span>Self-Drive</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setServiceType("with-driver")}
                    className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg text-[11px] font-semibold transition-all ${
                      serviceType === "with-driver" 
                        ? "bg-brand-gold text-slate-950 shadow-md font-bold" 
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    <UserCheck className="w-3.5 h-3.5 mb-1" />
                    <span>With Driver</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setServiceType("airport")}
                    className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg text-[11px] font-semibold transition-all ${
                      serviceType === "airport" 
                        ? "bg-brand-gold text-slate-950 shadow-md font-bold" 
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    <Plane className="w-3.5 h-3.5 mb-1" />
                    <span>Airport CMB</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setServiceType("wedding")}
                    className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg text-[11px] font-semibold transition-all ${
                      serviceType === "wedding" 
                        ? "bg-brand-gold text-slate-950 shadow-md font-bold" 
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    <Heart className="w-3.5 h-3.5 mb-1" />
                    <span>Wedding</span>
                  </button>
                </div>
              </div>

              {/* Form Controls */}
              <form onSubmit={handleSearch} className="space-y-4">
                {/* Pick-up Location */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-brand-gold" />
                      <span>Pick-up Location</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsRouteMapOpen(true)}
                      className="text-[10px] font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 hover:underline cursor-pointer"
                      title="View on Google Map"
                    >
                      <Navigation className="w-3 h-3 text-amber-400" />
                      <span>Map Route</span>
                    </button>
                  </div>
                  <select
                    value={pickupLocation}
                    onChange={(e) => {
                      setPickupLocation(e.target.value);
                      setCustomRouteData(null);
                    }}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-gold transition-colors font-medium cursor-pointer"
                  >
                    {pickupLocation && !popularSriLankaDestinations.some((d) => d.name === pickupLocation) && (
                      <option value={pickupLocation} className="bg-slate-900 text-brand-gold font-bold">
                        📍 {pickupLocation} (Custom Pinned Location)
                      </option>
                    )}
                    {destinationGroups.map((grp, gIdx) => (
                      <optgroup key={gIdx} label={grp.category} className="bg-slate-950 text-brand-gold font-bold">
                        {grp.destinations.map((loc, idx) => (
                          <option key={idx} value={loc} className="bg-slate-900 text-white font-normal">
                            {loc}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>

                {/* Drop-off Location */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-400" />
                      <span>Drop-off Location</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsRouteMapOpen(true)}
                      className="text-[10px] font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 hover:underline cursor-pointer"
                      title="View on Google Map"
                    >
                      <Navigation className="w-3 h-3 text-amber-400" />
                      <span>Map Route</span>
                    </button>
                  </div>
                  <select
                    value={dropoffLocation}
                    onChange={(e) => {
                      setDropoffLocation(e.target.value);
                      setCustomRouteData(null);
                    }}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-gold transition-colors font-medium cursor-pointer"
                  >
                    {dropoffLocation && !popularSriLankaDestinations.some((d) => d.name === dropoffLocation) && (
                      <option value={dropoffLocation} className="bg-slate-900 text-amber-400 font-bold">
                        🏁 {dropoffLocation} (Custom Destination)
                      </option>
                    )}
                    {destinationGroups.map((grp, gIdx) => (
                      <optgroup key={gIdx} label={grp.category} className="bg-slate-950 text-brand-gold font-bold">
                        {grp.destinations.map((loc, idx) => (
                          <option key={idx} value={loc} className="bg-slate-900 text-white font-normal">
                            {loc}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>

                {/* Interactive Route & KM Distance Banner */}
                {routeDetails && (
                  <div 
                    onClick={() => setIsRouteMapOpen(true)}
                    className="group bg-gradient-to-r from-amber-500/15 via-slate-800 to-amber-500/10 border border-amber-500/30 hover:border-amber-400 p-2.5 sm:p-3 rounded-2xl flex items-center justify-between gap-3 cursor-pointer transition-all hover:scale-[1.01] shadow-md"
                    title="Click to view interactive Google Map with highlighted route and distance in km"
                  >
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <div className="w-8 h-8 rounded-xl bg-amber-400/20 text-brand-gold flex items-center justify-center shrink-0 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors shadow-sm">
                        <Navigation className="w-4 h-4 animate-pulse" />
                      </div>
                      <div className="text-[11px] truncate">
                        <div className="text-slate-200 font-bold truncate flex items-center gap-1.5">
                          <span>Route:</span>
                          <span className="text-brand-gold text-sm font-black">{routeDetails.distanceKm} KM</span>
                          <span className="text-slate-400 font-normal hidden sm:inline">({routeDetails.durationText})</span>
                        </div>
                        <p className="text-[10px] text-amber-300/80 truncate">
                          {routeDetails.highway}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 bg-brand-gold hover:bg-amber-300 text-slate-950 text-[10px] font-black px-2.5 py-1.5 rounded-lg flex items-center gap-1 shadow-sm transition-transform group-hover:translate-x-0.5">
                      <span>View Map</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                )}

                {/* Pick-up Date & Time */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-brand-gold" />
                      <span>Pick-up Date</span>
                    </label>
                    <input
                      type="date"
                      value={pickupDate}
                      min={formatDate(new Date())}
                      onChange={(e) => setPickupDate(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-gold font-medium"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-brand-gold" />
                      <span>Time</span>
                    </label>
                    <select
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-gold font-medium"
                    >
                      <option value="00:00">12:00 AM (Midnight)</option>
                      <option value="06:00">06:00 AM</option>
                      <option value="08:00">08:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="12:00">12:00 PM (Noon)</option>
                      <option value="14:00">02:00 PM</option>
                      <option value="16:00">04:00 PM</option>
                      <option value="18:00">06:00 PM</option>
                      <option value="20:00">08:00 PM</option>
                      <option value="22:00">10:00 PM</option>
                    </select>
                  </div>
                </div>

                {/* Return Date & Time */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-amber-400" />
                      <span>Drop-off Date</span>
                    </label>
                    <input
                      type="date"
                      value={dropoffDate}
                      min={pickupDate}
                      onChange={(e) => setDropoffDate(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-gold font-medium"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-400" />
                      <span>Time</span>
                    </label>
                    <select
                      value={dropoffTime}
                      onChange={(e) => setDropoffTime(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-gold font-medium"
                    >
                      <option value="00:00">12:00 AM (Midnight)</option>
                      <option value="06:00">06:00 AM</option>
                      <option value="08:00">08:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="12:00">12:00 PM (Noon)</option>
                      <option value="14:00">02:00 PM</option>
                      <option value="16:00">04:00 PM</option>
                      <option value="18:00">06:00 PM</option>
                      <option value="20:00">08:00 PM</option>
                      <option value="22:00">10:00 PM</option>
                    </select>
                  </div>
                </div>

                {/* Duration & Category Preview */}
                <div className="flex items-center justify-between bg-slate-800/60 px-3 py-2 rounded-xl text-xs text-slate-300 border border-slate-700/60">
                  <span>Estimated Hire Period:</span>
                  <span className="font-bold text-brand-gold text-sm">{rentalDays} Day{rentalDays > 1 ? "s" : ""}</span>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 space-y-2.5">
                  <button
                    type="button"
                    onClick={() => onQuickBook({
                      serviceType,
                      pickupLocation,
                      dropoffLocation,
                      pickupDate,
                      dropoffDate,
                      pickupTime,
                      dropoffTime,
                      rentalDays
                    })}
                    className="w-full bg-gradient-to-r from-brand-gold to-amber-500 hover:from-amber-400 hover:to-brand-gold text-slate-950 font-black py-3.5 px-4 rounded-xl shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:-translate-y-0.5 transition-all text-sm flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book Online Now (Instant Reservation)</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    type="submit"
                    className="w-full bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold py-2.5 px-4 rounded-xl transition-all text-xs flex items-center justify-center gap-2 border border-slate-700 cursor-pointer"
                  >
                    <Search className="w-3.5 h-3.5 text-brand-gold" />
                    <span>Or Browse Fleet Specs & Models</span>
                  </button>

                  <a
                    href={`https://wa.me/${companyInfo.contacts.whatsapp}?text=${encodeURIComponent(`Hello Danusha Rent a car! I need a quote for a ${serviceType === "with-driver" ? "Chauffeur-Driven" : "Self-Drive"} rental from ${pickupLocation} on ${pickupDate} for ${rentalDays} days.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] hover:text-emerald-300 font-bold py-2.5 px-4 rounded-xl transition-all text-xs flex items-center justify-center gap-2 border border-[#25D366]/30 cursor-pointer shadow-sm"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-current" />
                    <span>Quick Quote via WhatsApp (074 252 6538)</span>
                  </a>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>

      {/* Google Map Driving Route & Distance Modal */}
      {isRouteMapOpen && (
        <RouteMapModal
          isOpen={isRouteMapOpen}
          onClose={() => setIsRouteMapOpen(false)}
          initialPickup={pickupLocation}
          initialDropoff={dropoffLocation}
          onSelectRoute={(data) => {
            setPickupLocation(data.pickup);
            setDropoffLocation(data.dropoff);
            setCustomRouteData({
              pickup: data.pickup,
              dropoff: data.dropoff,
              distanceKm: data.distanceKm,
              durationText: data.durationText,
              highway: `${data.distanceKm} km via Sri Lanka Highway Route`,
              googleMapsDirUrl: data.googleMapsDirUrl
            });
          }}
        />
      )}

    </div>
  );
}
