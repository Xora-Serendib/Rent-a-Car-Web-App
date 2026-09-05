import React, { useState, useMemo } from "react";
import { 
  Users, Briefcase, Settings2, Fuel, Snowflake, 
  Search, Shield, Check, Info, MessageSquare, Calendar, ChevronRight, Zap
} from "lucide-react";
import { fleetCategories, fleetVehicles } from "../data/fleetData";
import { formatPrice } from "../utils/currency";
import { companyInfo } from "../data/companyInfo";
import { WhatsAppIcon } from "./icons/WhatsAppIcon";

export default function FleetShowcase({ 
  fleet,
  selectedCurrency, 
  activeCategory, 
  onCategoryChange,
  onSelectVehicle, 
  onBookVehicle 
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [rentalMode, setRentalMode] = useState("self-drive"); // 'self-drive' | 'with-driver'

  const vehiclesList = fleet && fleet.length > 0 ? fleet : fleetVehicles;

  const filteredVehicles = useMemo(() => {
    let list = [...vehiclesList];

    // Filter by Category
    if (activeCategory && activeCategory !== "all") {
      list = list.filter((v) => v.category === activeCategory);
    }

    // Filter by Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (v) =>
          v.name.toLowerCase().includes(q) ||
          v.category.toLowerCase().includes(q) ||
          v.features.some((f) => f.toLowerCase().includes(q))
      );
    }

    // Sort
    if (sortBy === "price-low") {
      list.sort((a, b) => (rentalMode === "self-drive" ? a.rates.selfDriveDaily - b.rates.selfDriveDaily : a.rates.withDriverDaily - b.rates.withDriverDaily));
    } else if (sortBy === "price-high") {
      list.sort((a, b) => (rentalMode === "self-drive" ? b.rates.selfDriveDaily - a.rates.selfDriveDaily : b.rates.withDriverDaily - a.rates.withDriverDaily));
    } else if (sortBy === "capacity") {
      list.sort((a, b) => b.seats - a.seats);
    }

    return list;
  }, [activeCategory, searchQuery, sortBy, rentalMode]);

  return (
    <section id="fleet" className="py-20 bg-slate-100/90 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 bg-brand-gold/15 text-brand-dark px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Zap className="w-3.5 h-3.5 text-brand-gold" />
            <span>Sri Lanka's Most Diverse Fleet</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            Choose Your Ideal Vehicle For Sri Lanka Roads
          </h2>
          <p className="text-slate-600 mt-3 text-sm sm:text-base">
            From easy city runabouts and fuel-efficient hybrids to executive VIP sedans, rugged 4WDs, and iconic wedding classics. All vehicles undergo comprehensive multi-point mechanical inspection.
          </p>

          {/* Toggle Self-Drive vs With-Driver Rates */}
          <div className="inline-flex items-center gap-2 bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200 mt-6">
            <button
              type="button"
              onClick={() => setRentalMode("self-drive")}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                rentalMode === "self-drive"
                  ? "bg-brand-navy text-white shadow-md"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Self-Drive Rates
            </button>
            <button
              type="button"
              onClick={() => setRentalMode("with-driver")}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                rentalMode === "with-driver"
                  ? "bg-brand-gold text-slate-950 shadow-md"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Chauffeur-Driven Rates
            </button>
          </div>
        </div>

        {/* Category Filter Pills & Search */}
        <div className="mb-8 space-y-4">
          {/* Scrollable Categories on Mobile */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none sm:flex-wrap sm:justify-center">
            {fleetCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onCategoryChange(cat.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
                  activeCategory === cat.id
                    ? "bg-brand-navy text-white shadow-lg shadow-brand-navy/20 scale-105"
                    : "bg-white text-slate-700 hover:bg-slate-200/80 border border-slate-200"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search & Sort Controls Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by model, brand, or feature..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-brand-navy transition-colors"
              />
            </div>

            {/* Results count & Sort */}
            <div className="flex items-center justify-between w-full sm:w-auto gap-4 text-xs">
              <span className="text-slate-500 font-medium">
                Showing <strong className="text-slate-900 font-bold">{filteredVehicles.length}</strong> vehicles
              </span>

              <div className="flex items-center gap-2">
                <span className="text-slate-500">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 font-medium focus:outline-none cursor-pointer"
                >
                  <option value="default">Recommended</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="capacity">Passenger Capacity</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Vehicles Grid */}
        {filteredVehicles.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200">
            <p className="text-slate-500 font-medium text-base">No vehicles found matching your search.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                onCategoryChange("all");
              }}
              className="mt-4 text-xs font-bold text-brand-navy hover:underline"
            >
              Clear filters and view all vehicles
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVehicles.map((car) => {
              const baseRate = rentalMode === "self-drive" ? car.rates.selfDriveDaily : car.rates.withDriverDaily;
              const hasDiscount = car.discountPercent && car.discountPercent > 0;
              const displayRate = hasDiscount ? Math.round(baseRate * (1 - car.discountPercent / 100)) : baseRate;
              const status = car.status || "available";

              const whatsappText = encodeURIComponent(
                `Hello Danusha Rent A Car! I would like to inquire about renting the ${car.name} (${rentalMode === "self-drive" ? "Self-Drive" : "With Chauffeur"}).`
              );

              return (
                <div 
                  key={car.id}
                  className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
                >
                  {/* Image & Badges */}
                  <div className="relative h-52 w-full overflow-hidden bg-slate-900">
                    <img 
                      src={car.image} 
                      alt={car.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/30" />

                    {/* Tag Badge */}
                    {car.tag && (
                      <span className="absolute top-3 left-3 bg-brand-gold text-slate-950 font-black text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full shadow-md">
                        {car.tag}
                      </span>
                    )}

                    {/* Availability / Status Badge */}
                    {status !== "available" && (
                      <span className={`absolute top-10 left-3 font-bold text-[10px] tracking-wider uppercase px-2.5 py-0.5 rounded-full shadow-md ${
                        status === "rented"
                          ? "bg-amber-500 text-slate-950"
                          : "bg-rose-600 text-white"
                      }`}>
                        {status === "rented" ? "⏳ Rented Out (Pre-book)" : "🛠️ Under Service"}
                      </span>
                    )}

                    {/* Promo Discount Tag or Specs */}
                    {hasDiscount ? (
                      <span className="absolute top-3 right-3 bg-red-600 text-white font-black text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full shadow-md animate-pulse">
                        {car.promoText || `${car.discountPercent}% OFF`}
                      </span>
                    ) : (
                      <span className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-semibold px-2 py-0.5 rounded-full border border-white/20">
                        {car.fuel} • {car.transmission}
                      </span>
                    )}

                    {/* Rate Display on Image bottom */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                      <div>
                        <span className="text-[10px] uppercase font-semibold text-slate-300 block">
                          {rentalMode === "self-drive" ? "Self-Drive From" : "With Driver From"}
                        </span>
                        <div className="flex items-baseline gap-1.5">
                          {hasDiscount && (
                            <span className="text-xs text-slate-400 line-through font-semibold">
                              {formatPrice(baseRate, selectedCurrency)}
                            </span>
                          )}
                          <span className="text-2xl font-black text-brand-gold-light font-heading">
                            {formatPrice(displayRate, selectedCurrency)}
                          </span>
                          <span className="text-xs text-slate-200">/day</span>
                        </div>
                      </div>

                      <div className="text-right text-[11px] text-slate-300 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-lg border border-white/10">
                        <span>{car.rates.freeKmDaily} km free/day</span>
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Vehicle Title */}
                      <h3 className="text-lg font-bold text-slate-900 font-heading group-hover:text-brand-navy transition-colors">
                        {car.name}
                      </h3>

                      {/* Specs Row */}
                      <div className="grid grid-cols-4 gap-2 my-3 py-2.5 border-y border-slate-100 text-slate-600 text-xs">
                        <div className="flex items-center gap-1.5" title={`${car.seats} Passengers`}>
                          <Users className="w-4 h-4 text-brand-navy shrink-0" />
                          <span className="font-semibold">{car.seats} Seats</span>
                        </div>
                        <div className="flex items-center gap-1.5" title={`${car.luggage} Large Luggage`}>
                          <Briefcase className="w-4 h-4 text-brand-navy shrink-0" />
                          <span className="font-semibold">{car.luggage} Bags</span>
                        </div>
                        <div className="flex items-center gap-1.5" title={`Transmission: ${car.transmission}`}>
                          <Settings2 className="w-4 h-4 text-brand-navy shrink-0" />
                          <span className="font-semibold truncate">{car.transmission.split(" ")[0]}</span>
                        </div>
                        <div className="flex items-center gap-1.5" title="Air Conditioning">
                          <Snowflake className="w-4 h-4 text-sky-600 shrink-0" />
                          <span className="font-semibold">{car.ac ? "AC" : "Non-AC"}</span>
                        </div>
                      </div>

                      {/* Highlight Features */}
                      <p className="text-xs text-slate-500 line-clamp-2 mb-3 leading-relaxed">
                        {car.description}
                      </p>

                      {/* Pricing Matrix Preview */}
                      <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100 text-[11px] text-slate-600 space-y-1 mb-4">
                        <div className="flex justify-between">
                          <span>Weekly Rate:</span>
                          <strong className="text-slate-800 font-semibold">{formatPrice(car.rates.selfDriveWeekly, selectedCurrency)}</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>Excess Mileage:</span>
                          <span className="text-slate-700 font-medium">Rs. {car.rates.excessKmRate}/km</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Refundable Deposit:</span>
                          <span className="text-slate-700 font-medium">{formatPrice(car.rates.deposit, selectedCurrency)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action CTAs */}
                    <div className="pt-2 grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => onBookVehicle(car, rentalMode)}
                        className="w-full bg-brand-navy hover:bg-brand-blue text-white font-bold py-2.5 px-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Book Now</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onSelectVehicle(car)}
                        className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2.5 px-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-1 border border-slate-200"
                      >
                        <Info className="w-3.5 h-3.5" />
                        <span>Full Specs</span>
                      </button>

                      <a
                        href={`https://wa.me/${companyInfo.contacts.whatsapp}?text=${whatsappText}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="col-span-2 text-center py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold rounded-xl text-xs transition-colors border border-emerald-200 flex items-center justify-center gap-2"
                      >
                        <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366] fill-current" />
                        <span>WhatsApp Quick Inquiry For This Car</span>
                      </a>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
