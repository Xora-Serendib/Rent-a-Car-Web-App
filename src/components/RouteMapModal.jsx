import React, { useState, useEffect, useMemo } from "react";
import { 
  X, MapPin, Navigation, ArrowRight, ArrowLeftRight, Clock, 
  ShieldCheck, Fuel, ExternalLink, Sparkles, CheckCircle2, Car, Compass,
  Search, Plus, Trash2, Milestone, Layers, Route
} from "lucide-react";
import { popularSriLankaDestinations, calculateDynamicRoute } from "../utils/sriLankaGeo";
import { companyInfo } from "../data/companyInfo";
import { WhatsAppIcon } from "./icons/WhatsAppIcon";
import RouteInteractiveMap from "./RouteInteractiveMap";

export default function RouteMapModal({
  isOpen,
  onClose,
  initialPickup,
  initialDropoff,
  onSelectRoute
}) {
  // Find initial location objects
  const defaultPickup = useMemo(() => {
    return popularSriLankaDestinations.find(
      (d) => d.name === initialPickup || d.name.includes("Airport")
    ) || popularSriLankaDestinations[1];
  }, [initialPickup]);

  const defaultDropoff = useMemo(() => {
    return popularSriLankaDestinations.find(
      (d) => d.name === initialDropoff || d.name.includes("Piliyandala")
    ) || popularSriLankaDestinations[0];
  }, [initialDropoff]);

  const [pickupPoint, setPickupPoint] = useState(defaultPickup);
  const [dropoffPoint, setDropoffPoint] = useState(defaultDropoff);
  const [waypoints, setWaypoints] = useState([]);
  const [routeStyle, setRouteStyle] = useState("expressway"); // "expressway" | "coastal" | "hill_country"

  // Search filter query state
  const [pickupSearch, setPickupSearch] = useState("");
  const [dropoffSearch, setDropoffSearch] = useState("");
  const [showPickupSearch, setShowPickupSearch] = useState(false);
  const [showDropoffSearch, setShowDropoffSearch] = useState(false);

  // Dynamic calculated route
  const [route, setRoute] = useState(null);
  const [loadingRoute, setLoadingRoute] = useState(false);

  // Recalculate route whenever pickup, dropoff, waypoints or style changes
  useEffect(() => {
    if (!pickupPoint || !dropoffPoint) return;

    let isCancelled = false;
    setLoadingRoute(true);

    calculateDynamicRoute(pickupPoint, dropoffPoint, routeStyle, waypoints)
      .then((res) => {
        if (!isCancelled && res) {
          setRoute(res);
          setLoadingRoute(false);
        }
      })
      .catch((err) => {
        console.error("Routing error:", err);
        if (!isCancelled) setLoadingRoute(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [pickupPoint, dropoffPoint, routeStyle, waypoints]);

  if (!isOpen) return null;

  // Filter destinations by search query
  const filteredPickupDestinations = popularSriLankaDestinations.filter(
    (d) => !pickupSearch || d.name.toLowerCase().includes(pickupSearch.toLowerCase()) || d.address.toLowerCase().includes(pickupSearch.toLowerCase())
  );

  const filteredDropoffDestinations = popularSriLankaDestinations.filter(
    (d) => !dropoffSearch || d.name.toLowerCase().includes(dropoffSearch.toLowerCase()) || d.address.toLowerCase().includes(dropoffSearch.toLowerCase())
  );

  // Swap pickup & dropoff
  const handleSwap = () => {
    const temp = pickupPoint;
    setPickupPoint(dropoffPoint);
    setDropoffPoint(temp);
  };

  // Update a point from map drag or click
  const handleUpdatePoint = (type, latLng, name) => {
    if (type === "pickup") {
      setPickupPoint((prev) => ({
        ...prev,
        lat: latLng.lat,
        lng: latLng.lng,
        name: name || `Pinned Location (${latLng.lat.toFixed(3)}, ${latLng.lng.toFixed(3)})`
      }));
    } else if (type === "dropoff") {
      setDropoffPoint((prev) => ({
        ...prev,
        lat: latLng.lat,
        lng: latLng.lng,
        name: name || `Pinned Location (${latLng.lat.toFixed(3)}, ${latLng.lng.toFixed(3)})`
      }));
    } else if (type === "waypoint" && latLng.index !== undefined) {
      setWaypoints((prev) => {
        const next = [...prev];
        next[latLng.index] = {
          lat: latLng.lat,
          lng: latLng.lng,
          name: `Via Point ${latLng.index + 1}`
        };
        return next;
      });
    }
  };

  const handleAddWaypoint = (latLng) => {
    setWaypoints((prev) => [
      ...prev,
      {
        lat: latLng.lat,
        lng: latLng.lng,
        name: `Stopover ${prev.length + 1}`
      }
    ]);
  };

  const handleRemoveWaypoint = (index) => {
    setWaypoints((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleApply = () => {
    if (onSelectRoute && route) {
      onSelectRoute({
        pickup: pickupPoint.name,
        dropoff: dropoffPoint.name,
        distanceKm: route.distanceKm,
        durationText: route.durationText,
        routeStyle,
        waypointsCount: waypoints.length
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-slate-900 border border-slate-700/80 w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh] text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-slate-950 px-5 sm:px-6 py-3.5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-gold to-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-lg shadow-amber-500/20">
              <Compass className="w-5 h-5 animate-spin" style={{ animationDuration: "16s" }} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold font-heading text-white">
                  Sri Lanka Islandwide Route & Distance Navigator
                </h3>
                <span className="bg-amber-400/20 text-brand-gold text-[10px] font-black px-2 py-0.5 rounded-full border border-amber-400/30">
                  Select Any Location & Route
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Choose any city, beach, or tourist site in Sri Lanka • Click or drag map pins to customize your route
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close Navigator"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Location Selectors, Autocomplete Search, & Route Preferences */}
        <div className="bg-slate-900/95 p-3 sm:p-5 border-b border-slate-800 space-y-3 max-h-[38vh] sm:max-h-none overflow-y-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            
            {/* Pick-up Location with searchable picker */}
            <div className="md:col-span-5 relative">
              <label className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 flex items-center justify-between mb-1">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Pick-up Location (Anywhere in SL)</span>
                </span>
                <button
                  type="button"
                  onClick={() => setShowPickupSearch(!showPickupSearch)}
                  className="text-[10px] text-emerald-300 hover:underline flex items-center gap-0.5 cursor-pointer"
                >
                  <Search className="w-3 h-3" />
                  <span>{showPickupSearch ? "Close List" : "Search 40+ Places"}</span>
                </button>
              </label>

              <div 
                onClick={() => setShowPickupSearch(true)}
                className="w-full bg-slate-800 border border-slate-700 hover:border-emerald-500 rounded-xl px-3.5 py-2 text-xs text-white flex items-center justify-between cursor-pointer transition-colors"
              >
                <span className="font-semibold truncate text-emerald-300">
                  🟢 {pickupPoint.name}
                </span>
                <Search className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-2" />
              </div>

              {/* Autocomplete Dropdown Drawer */}
              {showPickupSearch && (
                <div className="absolute top-full left-0 w-full z-40 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl mt-1.5 p-2 max-h-60 overflow-y-auto">
                  <input
                    type="text"
                    value={pickupSearch}
                    onChange={(e) => setPickupSearch(e.target.value)}
                    placeholder="Type city, beach, airport or hotel..."
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs text-white focus:outline-none focus:border-emerald-500 mb-2"
                    autoFocus
                  />
                  <div className="space-y-1">
                    {filteredPickupDestinations.map((dest, i) => (
                      <div
                        key={i}
                        onClick={() => {
                          setPickupPoint(dest);
                          setShowPickupSearch(false);
                          setPickupSearch("");
                        }}
                        className="p-2 hover:bg-slate-800 rounded-xl cursor-pointer text-xs flex items-center justify-between transition-colors"
                      >
                        <div>
                          <strong className="text-white block">{dest.name}</strong>
                          <span className="text-[10px] text-slate-400">{dest.address}</span>
                        </div>
                        <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-700">
                          {dest.category}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Swap Button */}
            <div className="md:col-span-2 flex justify-center pt-1 md:pt-4">
              <button
                type="button"
                onClick={handleSwap}
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-brand-navy border border-slate-700 hover:border-brand-gold text-slate-300 hover:text-brand-gold transition-all shadow-md flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
                title="Swap Pick-up and Drop-off locations"
              >
                <ArrowLeftRight className="w-4 h-4 text-brand-gold" />
                <span className="hidden sm:inline md:hidden text-[11px]">Swap Direction</span>
              </button>
            </div>

            {/* Drop-off Location with searchable picker */}
            <div className="md:col-span-5 relative">
              <label className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center justify-between mb-1">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Drop-off Location (Anywhere in SL)</span>
                </span>
                <button
                  type="button"
                  onClick={() => setShowDropoffSearch(!showDropoffSearch)}
                  className="text-[10px] text-amber-300 hover:underline flex items-center gap-0.5 cursor-pointer"
                >
                  <Search className="w-3 h-3" />
                  <span>{showDropoffSearch ? "Close List" : "Search 40+ Places"}</span>
                </button>
              </label>

              <div 
                onClick={() => setShowDropoffSearch(true)}
                className="w-full bg-slate-800 border border-slate-700 hover:border-amber-500 rounded-xl px-3.5 py-2 text-xs text-white flex items-center justify-between cursor-pointer transition-colors"
              >
                <span className="font-semibold truncate text-amber-300">
                  🏁 {dropoffPoint.name}
                </span>
                <Search className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-2" />
              </div>

              {/* Autocomplete Dropdown Drawer */}
              {showDropoffSearch && (
                <div className="absolute top-full left-0 w-full z-40 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl mt-1.5 p-2 max-h-60 overflow-y-auto">
                  <input
                    type="text"
                    value={dropoffSearch}
                    onChange={(e) => setDropoffSearch(e.target.value)}
                    placeholder="Type destination, beach, hill country..."
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs text-white focus:outline-none focus:border-amber-500 mb-2"
                    autoFocus
                  />
                  <div className="space-y-1">
                    {filteredDropoffDestinations.map((dest, i) => (
                      <div
                        key={i}
                        onClick={() => {
                          setDropoffPoint(dest);
                          setShowDropoffSearch(false);
                          setDropoffSearch("");
                        }}
                        className="p-2 hover:bg-slate-800 rounded-xl cursor-pointer text-xs flex items-center justify-between transition-colors"
                      >
                        <div>
                          <strong className="text-white block">{dest.name}</strong>
                          <span className="text-[10px] text-slate-400">{dest.address}</span>
                        </div>
                        <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-700">
                          {dest.category}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Quick Route Mode ("Any way to go") & Popular Sri Lanka Quick Destination Chips */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800 text-xs">
            
            {/* Route Preferences ("Ways to go") */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400 font-bold text-[11px] uppercase tracking-wider flex items-center gap-1">
                <Route className="w-3.5 h-3.5 text-brand-gold" />
                <span>Way to go:</span>
              </span>

              <div className="bg-slate-800/80 p-0.5 rounded-xl border border-slate-700 flex items-center gap-0.5">
                <button
                  type="button"
                  onClick={() => setRouteStyle("expressway")}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    routeStyle === "expressway"
                      ? "bg-brand-gold text-slate-950 shadow-sm"
                      : "text-slate-300 hover:text-white"
                  }`}
                  title="Fastest highway network via E01/E02/E03"
                >
                  🚀 Expressway (Fastest)
                </button>

                <button
                  type="button"
                  onClick={() => setRouteStyle("coastal")}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    routeStyle === "coastal"
                      ? "bg-brand-gold text-slate-950 shadow-sm"
                      : "text-slate-300 hover:text-white"
                  }`}
                  title="Scenic coastal drive along Galle Road / Marine Drive"
                >
                  🌊 Coastal Highway
                </button>

                <button
                  type="button"
                  onClick={() => setRouteStyle("hill_country")}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    routeStyle === "hill_country"
                      ? "bg-brand-gold text-slate-950 shadow-sm"
                      : "text-slate-300 hover:text-white"
                  }`}
                  title="Scenic mountain route through tea plantations"
                >
                  ⛰️ Hill Country
                </button>
              </div>
            </div>

            {/* Quick Presets for Popular Sri Lanka Destinations */}
            <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-full">
              <span className="text-[10px] text-slate-400 font-bold uppercase shrink-0">Popular:</span>
              {[
                { label: "Airport ➔ Galle", p: popularSriLankaDestinations[1], d: popularSriLankaDestinations[10] },
                { label: "Piliyandala ➔ Kandy", p: popularSriLankaDestinations[0], d: popularSriLankaDestinations[20] },
                { label: "Airport ➔ Ella", p: popularSriLankaDestinations[1], d: popularSriLankaDestinations[23] },
                { label: "Colombo ➔ Sigiriya", p: popularSriLankaDestinations[2], d: popularSriLankaDestinations[28] },
                { label: "Airport ➔ Mirissa", p: popularSriLankaDestinations[1], d: popularSriLankaDestinations[13] }
              ].map((chip, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setPickupPoint(chip.p);
                    setDropoffPoint(chip.d);
                  }}
                  className="text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-brand-gold px-2.5 py-1 rounded-lg border border-slate-700 shrink-0 cursor-pointer transition-colors"
                >
                  {chip.label}
                </button>
              ))}
            </div>

          </div>

        </div>

        {/* Live Distance & Route Stats Bar */}
        {route && (
          <div className="bg-slate-950/70 px-5 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
            
            {/* Primary Distance Badge */}
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/40 px-3.5 py-1.5 rounded-2xl flex items-baseline gap-1.5 shadow-inner">
                <span className="text-2xl sm:text-3xl font-black text-brand-gold font-heading tracking-tight">
                  {route.distanceKm}
                </span>
                <span className="text-xs font-black uppercase text-amber-300 tracking-wider">KM</span>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-xs text-slate-200 font-semibold">
                  <Clock className="w-3.5 h-3.5 text-brand-gold" />
                  <span>Estimated Drive:</span>
                  <strong className="text-white font-bold">{route.durationText}</strong>
                  {loadingRoute && <span className="text-amber-400 animate-pulse text-[11px]">(Updating...)</span>}
                </div>
                <div className="text-[11px] text-slate-400 flex items-center gap-1.5 flex-wrap">
                  <span>Highway: <strong className="text-slate-300">{route.highway}</strong></span>
                  <span>•</span>
                  <span>Tolls: <strong className="text-slate-300">{route.tollEst}</strong></span>
                  <span>•</span>
                  <span>100 km/day Free Included</span>
                </div>
              </div>
            </div>

            {/* Waypoints Active Pill */}
            {waypoints.length > 0 && (
              <div className="flex items-center gap-1.5">
                <span className="text-xs bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2.5 py-1 rounded-lg font-semibold">
                  {waypoints.length} Stopover(s) Added
                </span>
                <button
                  type="button"
                  onClick={() => setWaypoints([])}
                  className="text-[11px] text-red-400 hover:text-red-300 underline cursor-pointer"
                >
                  Clear Vias
                </button>
              </div>
            )}

          </div>
        )}

        {/* Map Body: Interactive Leaflet Map with Google Tiles, Draggable Pins, Polyline */}
        <div className="relative flex-1 min-h-[360px] sm:min-h-[460px] bg-slate-950 flex flex-col">
          <RouteInteractiveMap 
            route={route}
            pickupPoint={pickupPoint}
            dropoffPoint={dropoffPoint}
            waypoints={waypoints}
            routeStyle={routeStyle}
            onUpdatePoint={handleUpdatePoint}
            onAddWaypoint={handleAddWaypoint}
            onRemoveWaypoint={handleRemoveWaypoint}
          />

          {/* Bottom Right Floating Open in Google Maps App button */}
          {route && (
            <a
              href={route.googleMapsDirUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4 z-20 bg-white hover:bg-slate-100 text-slate-900 font-bold px-3.5 py-2 rounded-xl text-xs shadow-2xl flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer border border-slate-300"
              title="Open full interactive directions in official Google Maps app"
            >
              <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
              <span>Open in Google Maps App</span>
            </a>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="bg-slate-950 px-5 sm:px-6 py-3.5 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-400 text-center sm:text-left flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-brand-gold shrink-0" />
            <span>Islandwide roadside cover and clean vehicle delivery anywhere in Sri Lanka by Mr. Danusha.</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            {/* WhatsApp Quote for this specific custom route */}
            <a
              href={`https://wa.me/${companyInfo.contacts.whatsapp}?text=${encodeURIComponent(`Hello Danusha Rent a car! I planned a route on your map: Pick-up at ${pickupPoint.name} and Drop-off at ${dropoffPoint.name} (Distance: ${route?.distanceKm || 0} km, Est. Duration: ${route?.durationText || 'N/A'}, Route Preference: ${routeStyle}). Please send the best car rental quote.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none bg-[#25D366] hover:bg-[#20ba59] text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
              title="Send this exact route to Mr. Danusha on WhatsApp"
            >
              <WhatsAppIcon className="w-4 h-4 fill-current" />
              <span>WhatsApp Route Quote</span>
            </a>

            {/* Apply & Continue */}
            <button
              type="button"
              onClick={handleApply}
              className="flex-1 sm:flex-none bg-gradient-to-r from-brand-gold to-amber-500 hover:from-amber-400 hover:to-brand-gold text-slate-950 font-black py-2.5 px-5 rounded-xl text-xs transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Confirm This Route & Book</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
