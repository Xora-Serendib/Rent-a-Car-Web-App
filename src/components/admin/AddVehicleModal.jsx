import React, { useState } from "react";
import { X, Plus, Car, DollarSign, Image, Shield, Check } from "lucide-react";
import { fleetCategories } from "../../data/fleetData";

export default function AddVehicleModal({ isOpen, onClose, onAddVehicle }) {
  if (!isOpen) return null;

  const [name, setName] = useState("");
  const [category, setCategory] = useState("economy");
  const [tag, setTag] = useState("Popular Choice");
  const [image, setImage] = useState("");
  const [seats, setSeats] = useState(4);
  const [luggage, setLuggage] = useState(2);
  const [transmission, setTransmission] = useState("Automatic");
  const [fuel, setFuel] = useState("Petrol");
  const [ac, setAc] = useState(true);
  const [description, setDescription] = useState("");

  // Rates
  const [selfDriveDaily, setSelfDriveDaily] = useState(11000);
  const [withDriverDaily, setWithDriverDaily] = useState(17000);
  const [selfDriveWeekly, setSelfDriveWeekly] = useState(70000);
  const [deposit, setDeposit] = useState(35000);
  const [excessKmRate, setExcessKmRate] = useState(65);
  const [freeKmDaily, setFreeKmDaily] = useState(100);

  // Discount
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoText, setPromoText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAddVehicle({
      name,
      category,
      tag,
      image: image.trim() || "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
      seats: Number(seats),
      luggage: Number(luggage),
      transmission,
      fuel,
      ac,
      description: description.trim() || "Clean, fully serviced vehicle with comprehensive insurance.",
      discountPercent: Number(discountPercent) || 0,
      promoText,
      rates: {
        selfDriveDaily: Number(selfDriveDaily),
        withDriverDaily: Number(withDriverDaily),
        selfDriveWeekly: Number(selfDriveWeekly),
        selfDriveMonthly: Number(selfDriveWeekly) * 3.6,
        deposit: Number(deposit),
        excessKmRate: Number(excessKmRate),
        freeKmDaily: Number(freeKmDaily)
      }
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        
        {/* Header */}
        <div className="bg-brand-navy p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-gold text-slate-950 flex items-center justify-center font-bold">
              <Car className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-base font-heading">Add New Vehicle to Fleet</h3>
              <p className="text-xs text-slate-300">Set specifications, rates, and photo</p>
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto text-xs">
          
          {/* Basic Details */}
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">Vehicle Make & Model Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Toyota Corolla Cross Hybrid (2025)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 font-semibold focus:border-brand-navy"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 font-medium"
              >
                {fleetCategories.filter(c => c.id !== "all").map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Badge Tag</label>
              <input
                type="text"
                placeholder="e.g. Popular, Premium, Best Mileage"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 font-medium"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">Photo Image URL</label>
              <input
                type="url"
                placeholder="https://images.unsplash.com/... or direct image link"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 font-mono"
              />
              <span className="text-[10px] text-slate-400">Leave blank to use a high-resolution default image</span>
            </div>
          </div>

          {/* Specifications */}
          <div className="border-t border-slate-200 pt-3">
            <h4 className="font-bold uppercase tracking-wider text-slate-500 text-[10px] mb-2">Specifications</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-slate-600 mb-1">Seats</label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={seats}
                  onChange={(e) => setSeats(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 text-xs text-slate-900 font-semibold"
                />
              </div>
              <div>
                <label className="block text-slate-600 mb-1">Luggage Bags</label>
                <input
                  type="number"
                  min="0"
                  max="15"
                  value={luggage}
                  onChange={(e) => setLuggage(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 text-xs text-slate-900 font-semibold"
                />
              </div>
              <div>
                <label className="block text-slate-600 mb-1">Transmission</label>
                <select
                  value={transmission}
                  onChange={(e) => setTransmission(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 text-xs text-slate-900 font-medium"
                >
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                  <option value="e-CVT Hybrid">e-CVT Hybrid</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-600 mb-1">Fuel Type</label>
                <select
                  value={fuel}
                  onChange={(e) => setFuel(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 text-xs text-slate-900 font-medium"
                >
                  <option value="Petrol">Petrol</option>
                  <option value="Hybrid (Petrol/Electric)">Hybrid</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric</option>
                </select>
              </div>
            </div>
          </div>

          {/* Pricing in LKR */}
          <div className="border-t border-slate-200 pt-3">
            <h4 className="font-bold uppercase tracking-wider text-slate-500 text-[10px] mb-2">Rental Pricing (LKR)</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Self-Drive / Day (Rs.)</label>
                <input
                  type="number"
                  step="500"
                  value={selfDriveDaily}
                  onChange={(e) => setSelfDriveDaily(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 text-xs text-slate-900 font-bold"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">With Driver / Day (Rs.)</label>
                <input
                  type="number"
                  step="500"
                  value={withDriverDaily}
                  onChange={(e) => setWithDriverDaily(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 text-xs text-slate-900 font-bold"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">Weekly Rate (Rs.)</label>
                <input
                  type="number"
                  step="1000"
                  value={selfDriveWeekly}
                  onChange={(e) => setSelfDriveWeekly(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 text-xs text-slate-900 font-bold"
                />
              </div>
              <div>
                <label className="block text-slate-600 mb-1">Security Deposit (Rs.)</label>
                <input
                  type="number"
                  step="5000"
                  value={deposit}
                  onChange={(e) => setDeposit(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 text-xs text-slate-900"
                />
              </div>
              <div>
                <label className="block text-slate-600 mb-1">Free Km / Day</label>
                <input
                  type="number"
                  value={freeKmDaily}
                  onChange={(e) => setFreeKmDaily(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 text-xs text-slate-900"
                />
              </div>
              <div>
                <label className="block text-slate-600 mb-1">Excess Km Rate (Rs.)</label>
                <input
                  type="number"
                  value={excessKmRate}
                  onChange={(e) => setExcessKmRate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 text-xs text-slate-900"
                />
              </div>
            </div>
          </div>

          {/* Discount & Promo */}
          <div className="border-t border-slate-200 pt-3">
            <h4 className="font-bold uppercase tracking-wider text-slate-500 text-[10px] mb-2">Promotional Discount</h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-600 mb-1">Discount Percentage (%)</label>
                <input
                  type="number"
                  min="0"
                  max="70"
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 text-xs text-slate-900 font-bold text-emerald-700"
                />
              </div>
              <div>
                <label className="block text-slate-600 mb-1">Custom Promo Badge</label>
                <input
                  type="text"
                  placeholder="e.g. Weekend Special, 10% Off"
                  value={promoText}
                  onChange={(e) => setPromoText(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 text-xs text-slate-900"
                />
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
              className="py-2.5 px-6 bg-brand-navy hover:bg-brand-blue text-white font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5 shadow-md shadow-brand-navy/20"
            >
              <Plus className="w-4 h-4 text-brand-gold" />
              <span>Save & Add to Fleet</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
