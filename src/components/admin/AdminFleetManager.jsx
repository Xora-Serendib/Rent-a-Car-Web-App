import React, { useState } from "react";
import { 
  Car, Plus, Edit2, Trash2, Check, DollarSign, Tag, 
  Search, ShieldAlert, CheckCircle2, Clock, AlertTriangle, Sparkles 
} from "lucide-react";
import { fleetCategories } from "../../data/fleetData";

export default function AdminFleetManager({ 
  fleet, 
  onUpdateVehicleRate, 
  onUpdateVehicleDiscount, 
  onSetVehicleStatus, 
  onDeleteVehicle, 
  onOpenAddVehicle 
}) {
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [editingCarId, setEditingCarId] = useState(null);
  const [savedNotice, setSavedNotice] = useState(null);

  // In-place edits
  const [editRates, setEditRates] = useState({});
  const [editDiscount, setEditDiscount] = useState(0);
  const [editPromo, setEditPromo] = useState("");

  const filteredFleet = fleet.filter((car) => {
    const matchCat = filterCategory === "all" || car.category === filterCategory;
    const matchSearch = car.name.toLowerCase().includes(search.toLowerCase()) || car.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleStartEdit = (car) => {
    setEditingCarId(car.id);
    setEditRates({
      selfDriveDaily: car.rates.selfDriveDaily,
      withDriverDaily: car.rates.withDriverDaily,
      selfDriveWeekly: car.rates.selfDriveWeekly,
      deposit: car.rates.deposit,
      excessKmRate: car.rates.excessKmRate
    });
    setEditDiscount(car.discountPercent || 0);
    setEditPromo(car.promoText || "");
  };

  const handleSaveEdit = (carId) => {
    // update rates
    Object.keys(editRates).forEach((rateKey) => {
      onUpdateVehicleRate(carId, rateKey, editRates[rateKey]);
    });
    // update discount
    onUpdateVehicleDiscount(carId, editDiscount, editPromo);
    
    setEditingCarId(null);
    setSavedNotice(`Updated rates & discounts for vehicle!`);
    setTimeout(() => setSavedNotice(null), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Controls: Search, Filter, Add Car */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search fleet by car name or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-brand-navy"
          />
        </div>

        {/* Filter Category */}
        <div className="flex items-center gap-2">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 font-semibold cursor-pointer"
          >
            {fleetCategories.map((c) => (
              <option key={c.id} value={c.id}>{c.label}</option>
            ))}
          </select>

          {/* Add Car CTA */}
          <button
            type="button"
            onClick={onOpenAddVehicle}
            className="bg-brand-navy hover:bg-brand-blue text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-md shadow-brand-navy/20 transition-all shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-brand-gold" />
            <span>Add Vehicle</span>
          </button>
        </div>
      </div>

      {/* Save Toast */}
      {savedNotice && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2 animate-in fade-in duration-150">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{savedNotice}</span>
        </div>
      )}

      {/* Vehicles Grid / Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredFleet.map((car) => {
          const isEditing = editingCarId === car.id;
          const status = car.status || "available";

          return (
            <div 
              key={car.id} 
              className={`bg-white rounded-2xl border transition-all overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md ${
                isEditing ? "border-brand-gold ring-2 ring-brand-gold/30" : "border-slate-200"
              }`}
            >
              {/* Card Header & Thumbnail */}
              <div>
                <div className="relative h-44 bg-slate-900 overflow-hidden">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  
                  {/* Category Pill */}
                  <span className="absolute top-3 left-3 bg-slate-900/80 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md backdrop-blur-sm border border-slate-700">
                    {car.category}
                  </span>

                  {/* Discount Badge (if active) */}
                  {car.discountPercent > 0 && (
                    <span className="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md shadow-md animate-pulse">
                      {car.promoText || `${car.discountPercent}% OFF`}
                    </span>
                  )}

                  {/* Title on image */}
                  <div className="absolute bottom-2.5 left-3.5 right-3.5 text-white">
                    <h4 className="font-extrabold text-sm font-heading truncate">{car.name}</h4>
                    <p className="text-[11px] text-slate-300">
                      {car.transmission} • {car.fuel} • {car.seats} Seats
                    </p>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-4 space-y-3 text-xs">
                  
                  {/* Availability Control */}
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">Availability:</span>
                    <select
                      value={status}
                      onChange={(e) => onSetVehicleStatus(car.id, e.target.value)}
                      className={`text-[11px] font-black px-2.5 py-1 rounded-lg border cursor-pointer ${
                        status === "available" 
                          ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                          : status === "rented"
                          ? "bg-amber-50 text-amber-800 border-amber-300"
                          : "bg-rose-50 text-rose-700 border-rose-300"
                      }`}
                    >
                      <option value="available">✓ Available For Hire</option>
                      <option value="rented">⏳ Rented Out / On Road</option>
                      <option value="maintenance">🛠️ In Service / Maintenance</option>
                    </select>
                  </div>

                  {isEditing ? (
                    /* Edit Form Mode */
                    <div className="space-y-3 pt-1 bg-amber-50/50 p-3 rounded-xl border border-amber-200/70">
                      <div className="text-[11px] font-bold text-amber-900 flex items-center gap-1">
                        <Edit2 className="w-3 h-3" />
                        <span>Edit Vehicle Rates (LKR)</span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <div>
                          <label className="text-slate-600 block mb-0.5">Self-Drive / Day</label>
                          <input
                            type="number"
                            step="250"
                            value={editRates.selfDriveDaily}
                            onChange={(e) => setEditRates({ ...editRates, selfDriveDaily: Number(e.target.value) })}
                            className="w-full bg-white border border-slate-300 rounded-lg p-1.5 font-bold text-slate-900"
                          />
                        </div>
                        <div>
                          <label className="text-slate-600 block mb-0.5">With Driver / Day</label>
                          <input
                            type="number"
                            step="500"
                            value={editRates.withDriverDaily}
                            onChange={(e) => setEditRates({ ...editRates, withDriverDaily: Number(e.target.value) })}
                            className="w-full bg-white border border-slate-300 rounded-lg p-1.5 font-bold text-slate-900"
                          />
                        </div>
                        <div>
                          <label className="text-slate-600 block mb-0.5">Weekly Rate</label>
                          <input
                            type="number"
                            step="1000"
                            value={editRates.selfDriveWeekly}
                            onChange={(e) => setEditRates({ ...editRates, selfDriveWeekly: Number(e.target.value) })}
                            className="w-full bg-white border border-slate-300 rounded-lg p-1.5 font-bold text-slate-900"
                          />
                        </div>
                        <div>
                          <label className="text-slate-600 block mb-0.5">Deposit (Rs.)</label>
                          <input
                            type="number"
                            step="5000"
                            value={editRates.deposit}
                            onChange={(e) => setEditRates({ ...editRates, deposit: Number(e.target.value) })}
                            className="w-full bg-white border border-slate-300 rounded-lg p-1.5 font-bold text-slate-900"
                          />
                        </div>
                      </div>

                      <div className="pt-2 border-t border-amber-200 grid grid-cols-2 gap-2 text-[11px]">
                        <div>
                          <label className="text-slate-600 block mb-0.5">Promo Discount %</label>
                          <input
                            type="number"
                            min="0"
                            max="70"
                            value={editDiscount}
                            onChange={(e) => setEditDiscount(Number(e.target.value))}
                            className="w-full bg-white border border-slate-300 rounded-lg p-1.5 font-black text-rose-700"
                          />
                        </div>
                        <div>
                          <label className="text-slate-600 block mb-0.5">Promo Tag Text</label>
                          <input
                            type="text"
                            placeholder="e.g. 10% Off Weekend"
                            value={editPromo}
                            onChange={(e) => setEditPromo(e.target.value)}
                            className="w-full bg-white border border-slate-300 rounded-lg p-1.5 text-slate-900"
                          />
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setEditingCarId(null)}
                          className="flex-1 py-1.5 bg-white border border-slate-300 text-slate-700 font-bold rounded-lg text-xs"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSaveEdit(car.id)}
                          className="flex-1 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1 shadow-sm"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Save Rates</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Read Mode Pricing Table */
                    <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 space-y-1.5 text-[11px]">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Self-Drive / Day:</span>
                        <strong className="font-extrabold text-slate-900 text-xs">
                          Rs. {car.rates.selfDriveDaily.toLocaleString()}
                          {car.discountPercent > 0 && (
                            <span className="text-[10px] text-emerald-600 ml-1 font-black">
                              (-{car.discountPercent}%)
                            </span>
                          )}
                        </strong>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">With Driver / Day:</span>
                        <span className="font-semibold text-slate-800">
                          Rs. {car.rates.withDriverDaily.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Weekly Rate:</span>
                        <span className="font-semibold text-slate-800">
                          Rs. {car.rates.selfDriveWeekly.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center pt-1 border-t border-slate-200">
                        <span className="text-slate-500">Deposit:</span>
                        <span className="text-slate-700 font-medium">Rs. {car.rates.deposit.toLocaleString()}</span>
                      </div>
                    </div>
                  )}

                </div>
              </div>

              {/* Card Footer Actions */}
              {!isEditing && (
                <div className="p-3 border-t border-slate-100 flex items-center gap-2 bg-slate-50/50">
                  <button
                    type="button"
                    onClick={() => handleStartEdit(car)}
                    className="flex-1 py-2 px-3 bg-brand-navy hover:bg-brand-blue text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-brand-gold" />
                    <span>Edit Rates & Promo</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm(`Delete ${car.name} from fleet? This cannot be undone.`)) {
                        onDeleteVehicle(car.id);
                      }
                    }}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors border border-slate-200"
                    title="Delete vehicle from fleet"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
}
