import React, { useState } from "react";
import { 
  X, Lock, Key, Car, Calendar, DollarSign, Settings, 
  LogOut, Download, Upload, RefreshCw, ShieldCheck, CheckCircle2,
  TrendingUp, Clock, AlertTriangle, ChevronRight, Plus
} from "lucide-react";
import { useData } from "../../context/DataContext";
import AdminFleetManager from "./AdminFleetManager";
import AdminBookingsManager from "./AdminBookingsManager";
import AddVehicleModal from "./AddVehicleModal";
import AddBookingModal from "./AddBookingModal";

export default function AdminPortalModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const {
    fleet,
    bookings,
    isAdminAuthenticated,
    loginAdmin,
    logoutAdmin,
    changeAdminPin,
    updateVehicleRate,
    updateVehicleDiscount,
    setVehicleStatus,
    addVehicle,
    deleteVehicle,
    resetFleetToDefault,
    addBooking,
    updateBookingStatus,
    deleteBooking,
    exportDatabaseJSON,
    importDatabaseJSON
  } = useData();

  const [activeTab, setActiveTab] = useState("overview"); // overview | fleet | bookings | settings
  const [pinInput, setPinInput] = useState("");
  const [loginError, setLoginError] = useState("");

  // Submodals
  const [addVehicleOpen, setAddVehicleOpen] = useState(false);
  const [addBookingOpen, setAddBookingOpen] = useState(false);

  // Settings State
  const [oldPin, setOldPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [pinNotice, setPinNotice] = useState(null);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError("");
    const res = loginAdmin(pinInput.trim());
    if (!res.success) {
      setLoginError(res.message);
    } else {
      setPinInput("");
    }
  };

  const handleChangePin = (e) => {
    e.preventDefault();
    const res = changeAdminPin(oldPin, newPin);
    if (res.success) {
      setPinNotice({ type: "success", text: "Owner PIN successfully updated!" });
      setOldPin("");
      setNewPin("");
    } else {
      setPinNotice({ type: "error", text: res.message });
    }
    setTimeout(() => setPinNotice(null), 4000);
  };

  const handleImportFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === "string") {
        const res = importDatabaseJSON(content);
        if (res.success) {
          alert("Database successfully restored from JSON backup!");
        } else {
          alert(`Import failed: ${res.message}`);
        }
      }
    };
    reader.readAsText(file);
  };

  // KPI Calculations
  const totalFleetCount = fleet.length;
  const availableCarsCount = fleet.filter((c) => (c.status || "available") === "available").length;
  const rentedCarsCount = fleet.filter((c) => c.status === "rented").length;
  const maintenanceCount = fleet.filter((c) => c.status === "maintenance").length;

  const totalBookingsCount = bookings.length;
  const pendingBookingsCount = bookings.filter((b) => b.status === "pending").length;
  const activeRentalsCount = bookings.filter((b) => b.status === "on_hire").length;
  const totalPipelineRevenue = bookings.reduce((acc, b) => acc + (b.totalQuotation || 0), 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl bg-slate-100 rounded-3xl shadow-2xl border border-slate-300 overflow-hidden my-auto min-h-[75vh] flex flex-col">
        
        {/* Top Header Bar */}
        <header className="bg-brand-navy p-4 sm:px-6 text-white flex items-center justify-between border-b border-brand-blue/30 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-gold to-amber-300 flex items-center justify-center text-slate-950 font-bold shadow-md">
              <Key className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg font-heading tracking-tight">
                  Danusha Rent A Car • Owner Portal
                </span>
                <span className="bg-brand-gold/20 text-brand-gold text-[10px] font-bold px-2 py-0.5 rounded-full border border-brand-gold/30">
                  Authorized Access
                </span>
              </div>
              <p className="text-[11px] text-slate-300 hidden sm:block">
                Direct vehicle rates, individual car discounts, bookings pipeline & car availability
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdminAuthenticated && (
              <button
                type="button"
                onClick={logoutAdmin}
                className="py-1.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-700"
                title="Logout Owner Session"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              aria-label="Close Portal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Auth Barrier or Main Dashboard */}
        {!isAdminAuthenticated ? (
          /* Login Card */
          <div className="flex-1 flex items-center justify-center p-6 py-16">
            <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center space-y-6">
              
              <div className="w-16 h-16 rounded-2xl bg-brand-navy/10 text-brand-navy flex items-center justify-center mx-auto">
                <Lock className="w-8 h-8 text-brand-gold" />
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-slate-900 font-heading">
                  Owner Authentication
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Enter your owner PIN to manage rates, discounts, and customer bookings.
                </p>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="text-left">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Owner Security PIN</label>
                  <input
                    type="password"
                    autoFocus
                    placeholder="Enter PIN (Default: 2026)"
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-center text-lg font-mono font-bold tracking-widest text-slate-900 focus:outline-none focus:border-brand-navy"
                  />
                </div>

                {loginError && (
                  <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-medium">
                    {loginError}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 bg-brand-navy hover:bg-brand-blue text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-brand-navy/20 cursor-pointer"
                >
                  Unlock Owner Dashboard
                </button>
              </form>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-[11px] text-slate-500">
                🔒 <strong>Owner Default PIN:</strong> <code className="bg-slate-200 px-1.5 py-0.5 rounded text-slate-800 font-mono font-bold">2026</code> (Can be changed in Settings tab)
              </div>
            </div>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="flex-1 flex flex-col min-h-0">
            
            {/* Tab Navigation */}
            <div className="bg-white border-b border-slate-200 px-6 pt-3 flex items-center justify-between overflow-x-auto scrollbar-none gap-2">
              <div className="flex items-center gap-2">
                {[
                  { id: "overview", label: "Overview & Metrics", icon: TrendingUp },
                  { id: "fleet", label: `Fleet & Rates (${totalFleetCount})`, icon: Car },
                  { id: "bookings", label: `Bookings Pipeline (${totalBookingsCount})`, icon: Calendar },
                  { id: "settings", label: "Settings & Backup", icon: Settings }
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-3 px-4 rounded-t-xl text-xs font-bold border-b-2 transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                        isActive
                          ? "border-brand-gold text-brand-navy bg-slate-50"
                          : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50/60"
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? "text-brand-gold" : "text-slate-400"}`} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Quick Actions */}
              <div className="hidden sm:flex items-center gap-2 pb-2">
                <button
                  type="button"
                  onClick={() => setAddVehicleOpen(true)}
                  className="bg-brand-navy hover:bg-brand-blue text-white font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1 shadow-sm cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-brand-gold" />
                  <span>New Car</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAddBookingOpen(true)}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1 shadow-sm cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Booking</span>
                </button>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto max-h-[72vh]">
              
              {/* TAB 1: OVERVIEW */}
              {activeTab === "overview" && (
                <div className="space-y-6">
                  
                  {/* KPI Cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                      <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
                        <span>Total Fleet</span>
                        <Car className="w-4 h-4 text-brand-navy" />
                      </div>
                      <div className="mt-3">
                        <span className="text-3xl font-black text-slate-900 font-heading">{totalFleetCount}</span>
                        <div className="flex items-center gap-2 mt-1 text-[11px] font-bold">
                          <span className="text-emerald-700">{availableCarsCount} Ready</span>
                          <span className="text-slate-300">•</span>
                          <span className="text-amber-700">{rentedCarsCount} Rented</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                      <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
                        <span>Total Reservations</span>
                        <Calendar className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div className="mt-3">
                        <span className="text-3xl font-black text-emerald-800 font-heading">{totalBookingsCount}</span>
                        <div className="flex items-center gap-2 mt-1 text-[11px] font-bold">
                          <span className="text-amber-600">{pendingBookingsCount} Pending</span>
                          <span className="text-slate-300">•</span>
                          <span className="text-blue-600">{activeRentalsCount} On Hire</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                      <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
                        <span>Pipeline Booking Value</span>
                        <DollarSign className="w-4 h-4 text-amber-500" />
                      </div>
                      <div className="mt-3">
                        <span className="text-2xl font-black text-slate-900 font-heading">
                          Rs. {(totalPipelineRevenue / 1000).toFixed(0)}k
                        </span>
                        <p className="text-[11px] text-slate-400 mt-1">Across all logged bookings</p>
                      </div>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                      <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
                        <span>Fleet Availability</span>
                        <ShieldCheck className="w-4 h-4 text-brand-gold" />
                      </div>
                      <div className="mt-3">
                        <span className="text-3xl font-black text-emerald-700 font-heading">
                          {Math.round((availableCarsCount / (totalFleetCount || 1)) * 100)}%
                        </span>
                        <p className="text-[11px] text-slate-400 mt-1">{maintenanceCount} vehicles in service</p>
                      </div>
                    </div>

                  </div>

                  {/* Quick Control Hub */}
                  <div className="grid md:grid-cols-2 gap-5">
                    
                    {/* Recent Bookings preview */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <h4 className="font-extrabold text-sm text-slate-900 font-heading flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-emerald-600" />
                          <span>Latest Customer Bookings</span>
                        </h4>
                        <button
                          type="button"
                          onClick={() => setActiveTab("bookings")}
                          className="text-xs font-bold text-brand-navy hover:underline flex items-center gap-1"
                        >
                          <span>View All ({totalBookingsCount})</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="space-y-2">
                        {bookings.slice(0, 3).map((b) => (
                          <div key={b.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
                            <div>
                              <strong className="text-slate-900 block">{b.customer?.name}</strong>
                              <span className="text-slate-500 text-[11px]">{b.vehicleName} • {b.days} Days</span>
                            </div>
                            <div className="text-right">
                              <span className="font-bold text-emerald-700 block">Rs. {(b.totalQuotation || 0).toLocaleString()}</span>
                              <span className="text-[10px] uppercase font-bold text-slate-400">{b.status}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Fleet Quick Status preview */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <h4 className="font-extrabold text-sm text-slate-900 font-heading flex items-center gap-1.5">
                          <Car className="w-4 h-4 text-brand-navy" />
                          <span>Vehicle Fleet Status</span>
                        </h4>
                        <button
                          type="button"
                          onClick={() => setActiveTab("fleet")}
                          className="text-xs font-bold text-brand-navy hover:underline flex items-center gap-1"
                        >
                          <span>Manage Fleet & Rates</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="space-y-2">
                        {fleet.slice(0, 3).map((c) => (
                          <div key={c.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
                            <div>
                              <strong className="text-slate-900 block">{c.name}</strong>
                              <span className="text-slate-500 text-[11px]">
                                Self-Drive: Rs. {c.rates.selfDriveDaily.toLocaleString()}/day
                              </span>
                            </div>
                            <div>
                              <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                                (c.status || "available") === "available"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : c.status === "rented"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-rose-100 text-rose-800"
                              }`}>
                                {c.status || "available"}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                </div>
              )}

              {/* TAB 2: FLEET & RATES */}
              {activeTab === "fleet" && (
                <AdminFleetManager
                  fleet={fleet}
                  onUpdateVehicleRate={updateVehicleRate}
                  onUpdateVehicleDiscount={updateVehicleDiscount}
                  onSetVehicleStatus={setVehicleStatus}
                  onDeleteVehicle={deleteVehicle}
                  onOpenAddVehicle={() => setAddVehicleOpen(true)}
                />
              )}

              {/* TAB 3: BOOKINGS PIPELINE */}
              {activeTab === "bookings" && (
                <AdminBookingsManager
                  bookings={bookings}
                  onUpdateBookingStatus={updateBookingStatus}
                  onDeleteBooking={deleteBooking}
                  onOpenAddBooking={() => setAddBookingOpen(true)}
                />
              )}

              {/* TAB 4: SETTINGS & BACKUP */}
              {activeTab === "settings" && (
                <div className="space-y-6 max-w-3xl mx-auto">
                  
                  {/* Security PIN Change */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                    <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm font-heading">
                      <Lock className="w-4 h-4 text-brand-gold" />
                      <span>Change Owner Security PIN</span>
                    </div>

                    <form onSubmit={handleChangePin} className="space-y-3 text-xs">
                      <div className="grid sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-slate-700 font-bold mb-1">Current PIN</label>
                          <input
                            type="password"
                            required
                            placeholder="Current PIN (Default: 2026)"
                            value={oldPin}
                            onChange={(e) => setOldPin(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-700 font-bold mb-1">New PIN (4+ digits)</label>
                          <input
                            type="password"
                            required
                            placeholder="e.g. 8899"
                            value={newPin}
                            onChange={(e) => setNewPin(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5"
                          />
                        </div>
                      </div>

                      {pinNotice && (
                        <div className={`p-2.5 rounded-xl font-bold ${
                          pinNotice.type === "success" ? "bg-emerald-50 text-emerald-800" : "bg-rose-50 text-rose-800"
                        }`}>
                          {pinNotice.text}
                        </div>
                      )}

                      <button
                        type="submit"
                        className="py-2.5 px-5 bg-brand-navy hover:bg-brand-blue text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
                      >
                        Update Security PIN
                      </button>
                    </form>
                  </div>

                  {/* Database Export & Backup */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-xs">
                    <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm font-heading">
                      <Download className="w-4 h-4 text-emerald-600" />
                      <span>Backup & Restore Data (JSON)</span>
                    </div>
                    <p className="text-slate-500">
                      Download a full backup of all vehicle rates, discounts, and customer bookings onto your computer, or restore from a previously exported backup file.
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        type="button"
                        onClick={exportDatabaseJSON}
                        className="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl flex items-center gap-2 shadow-sm cursor-pointer"
                      >
                        <Download className="w-4 h-4" />
                        <span>Export Database (.json)</span>
                      </button>

                      <label className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl flex items-center gap-2 cursor-pointer border border-slate-300">
                        <Upload className="w-4 h-4" />
                        <span>Restore From Backup File</span>
                        <input
                          type="file"
                          accept=".json"
                          onChange={handleImportFile}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Factory Reset Fleet */}
                  <div className="bg-white p-6 rounded-2xl border border-red-200 shadow-sm space-y-3 text-xs">
                    <div className="flex items-center gap-2 text-red-700 font-extrabold text-sm font-heading">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      <span>Reset Fleet to Factory Defaults</span>
                    </div>
                    <p className="text-slate-600">
                      This will reset all modified rates, added vehicles, and discounts back to Danusha Rent a car's original default fleet specifications.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm("Are you sure you want to reset all vehicles and rates back to defaults?")) {
                          resetFleetToDefault();
                          alert("Fleet reset to defaults!");
                        }
                      }}
                      className="py-2.5 px-4 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>Reset Fleet to Defaults</span>
                    </button>
                  </div>

                </div>
              )}

            </div>

          </div>
        )}

      </div>

      {/* Submodal: Add New Vehicle */}
      <AddVehicleModal
        isOpen={addVehicleOpen}
        onClose={() => setAddVehicleOpen(false)}
        onAddVehicle={addVehicle}
      />

      {/* Submodal: Add Manual Booking */}
      <AddBookingModal
        isOpen={addBookingOpen}
        onClose={() => setAddBookingOpen(false)}
        fleet={fleet}
        onAddBooking={addBooking}
      />

    </div>
  );
}
