import React, { useEffect, useRef, useState, useCallback } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { 
  Maximize2, Navigation, MapPin, Plus, Trash2, RotateCcw, 
  ArrowRight, Compass, Shield, Sparkles, Layers
} from "lucide-react";

export default function RouteInteractiveMap({
  route,
  pickupPoint,
  dropoffPoint,
  waypoints = [],
  routeStyle = "expressway",
  onUpdatePoint, // (type: "pickup" | "dropoff" | "waypoint", latLng, name?) => void
  onAddWaypoint,
  onRemoveWaypoint
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const layerGroupRef = useRef(null);
  const tileLayerRef = useRef(null);
  
  const [mapType, setMapType] = useState("google"); // "google" | "satellite" | "osm"
  const [clickMode, setClickMode] = useState("pickup"); // "pickup" | "dropoff" | "waypoint"

  // 1. Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        zoomControl: true,
        attributionControl: false
      }).setView([pickupPoint?.lat || 6.9271, pickupPoint?.lng || 79.9612], 9);

      mapInstanceRef.current = map;
      layerGroupRef.current = L.layerGroup().addTo(map);

      // Force resize on modal load
      setTimeout(() => {
        map.invalidateSize();
      }, 300);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // 2. Tile layer update
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    let tileUrl = "https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}";
    if (mapType === "satellite") {
      tileUrl = "https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}";
    } else if (mapType === "osm") {
      tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    }

    tileLayerRef.current = L.tileLayer(tileUrl, {
      maxZoom: 19,
      subdomains: ["0", "1", "2", "3"]
    }).addTo(map);
  }, [mapType]);

  // 3. Click-to-place on map handler
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const handleMapClick = (e) => {
      const { lat, lng } = e.latlng;
      if (clickMode === "pickup") {
        onUpdatePoint("pickup", { lat, lng });
        setClickMode("dropoff"); // Automatically toggle to next step
      } else if (clickMode === "dropoff") {
        onUpdatePoint("dropoff", { lat, lng });
      } else if (clickMode === "waypoint" && onAddWaypoint) {
        onAddWaypoint({ lat, lng });
      }
    };

    map.on("click", handleMapClick);
    return () => {
      map.off("click", handleMapClick);
    };
  }, [clickMode, onUpdatePoint, onAddWaypoint]);

  // 4. Render Markers, Polylines and Waypoints
  useEffect(() => {
    const map = mapInstanceRef.current;
    const layerGroup = layerGroupRef.current;
    if (!map || !layerGroup || !pickupPoint || !dropoffPoint) return;

    layerGroup.clearLayers();

    // --- A. Pick-up Marker (Draggable) ---
    const pickupIcon = L.divIcon({
      className: "custom-pin",
      html: `
        <div style="position: relative; display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -100%); cursor: grab;">
          <div style="background: #10b981; color: white; width: 36px; height: 36px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 14px rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 15px;">
            A
          </div>
          <div style="width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 8px solid #10b981; margin-top: -2px;"></div>
          <div style="background: rgba(15, 23, 42, 0.95); color: #6ee7b7; padding: 2px 8px; border-radius: 6px; font-size: 10px; font-weight: bold; border: 1px solid rgba(16,185,129,0.6); margin-top: 3px; white-space: nowrap; box-shadow: 0 2px 8px rgba(0,0,0,0.5);">
            🟢 ${pickupPoint.name ? pickupPoint.name.split('(')[0] : 'Pick-up (Drag me)'}
          </div>
        </div>
      `,
      iconSize: [0, 0]
    });

    const pickupMarker = L.marker([pickupPoint.lat, pickupPoint.lng], {
      icon: pickupIcon,
      draggable: true
    }).addTo(layerGroup);

    pickupMarker.on("dragend", (e) => {
      const pos = e.target.getLatLng();
      onUpdatePoint("pickup", { lat: pos.lat, lng: pos.lng });
    });

    pickupMarker.bindPopup(`<b>Pick-up Point:</b><br/>${pickupPoint.name || 'Custom Location'}<br/><small>Drag anywhere in Sri Lanka to reposition</small>`);

    // --- B. Drop-off Marker (Draggable) ---
    const dropoffIcon = L.divIcon({
      className: "custom-pin",
      html: `
        <div style="position: relative; display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -100%); cursor: grab;">
          <div style="background: #f59e0b; color: #0f172a; width: 36px; height: 36px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 14px rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 15px;">
            B
          </div>
          <div style="width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 8px solid #f59e0b; margin-top: -2px;"></div>
          <div style="background: rgba(15, 23, 42, 0.95); color: #fcd34d; padding: 2px 8px; border-radius: 6px; font-size: 10px; font-weight: bold; border: 1px solid rgba(245,158,11,0.6); margin-top: 3px; white-space: nowrap; box-shadow: 0 2px 8px rgba(0,0,0,0.5);">
            🏁 ${dropoffPoint.name ? dropoffPoint.name.split('(')[0] : 'Drop-off (Drag me)'}
          </div>
        </div>
      `,
      iconSize: [0, 0]
    });

    const dropoffMarker = L.marker([dropoffPoint.lat, dropoffPoint.lng], {
      icon: dropoffIcon,
      draggable: true
    }).addTo(layerGroup);

    dropoffMarker.on("dragend", (e) => {
      const pos = e.target.getLatLng();
      onUpdatePoint("dropoff", { lat: pos.lat, lng: pos.lng });
    });

    dropoffMarker.bindPopup(`<b>Drop-off Point:</b><br/>${dropoffPoint.name || 'Custom Location'}<br/><small>Drag anywhere in Sri Lanka to reposition</small>`);

    // --- C. Intermediate Waypoints (Via Points) ---
    if (waypoints && waypoints.length > 0) {
      waypoints.forEach((wp, idx) => {
        const wpIcon = L.divIcon({
          className: "custom-wp-pin",
          html: `
            <div style="position: relative; display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -100%); cursor: grab;">
              <div style="background: #3b82f6; color: white; width: 28px; height: 28px; border-radius: 50%; border: 2px solid white; box-shadow: 0 3px 10px rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 12px;">
                ${idx + 1}
              </div>
              <div style="width: 0; height: 0; border-left: 5px solid transparent; border-right: 5px solid transparent; border-top: 6px solid #3b82f6; margin-top: -1px;"></div>
              <div style="background: rgba(15, 23, 42, 0.9); color: #93c5fd; padding: 1px 6px; border-radius: 4px; font-size: 9px; font-weight: bold; border: 1px solid rgba(59,130,246,0.5); margin-top: 2px; white-space: nowrap;">
                Via ${idx + 1}
              </div>
            </div>
          `,
          iconSize: [0, 0]
        });

        const wpMarker = L.marker([wp.lat, wp.lng], {
          icon: wpIcon,
          draggable: true
        }).addTo(layerGroup);

        wpMarker.on("dragend", (e) => {
          const pos = e.target.getLatLng();
          onUpdatePoint("waypoint", { lat: pos.lat, lng: pos.lng, index: idx });
        });
      });
    }

    // --- D. Draw Highlighted Highway Polyline ---
    if (route && route.waypoints && route.waypoints.length > 1) {
      // 1. Wide ambient glow
      const glowPolyline = L.polyline(route.waypoints, {
        color: "#1e3a8a",
        weight: 12,
        opacity: 0.5,
        lineCap: "round",
        lineJoin: "round"
      }).addTo(layerGroup);

      // 2. High-contrast route line (Google navigation blue)
      const mainPolyline = L.polyline(route.waypoints, {
        color: "#2563eb",
        weight: 6,
        opacity: 0.95,
        lineCap: "round",
        lineJoin: "round"
      }).addTo(layerGroup);

      // 3. Inner dashed animation trail
      const dashPolyline = L.polyline(route.waypoints, {
        color: "#bfdbfe",
        weight: 2,
        opacity: 0.9,
        dashArray: "10, 14"
      }).addTo(layerGroup);

      // 4. Floating Distance Pill in middle of route
      const midIndex = Math.floor(route.waypoints.length / 2);
      const midPoint = route.waypoints[midIndex];

      const distanceIcon = L.divIcon({
        className: "route-distance-pill",
        html: `
          <div style="position: relative; display: flex; align-items: center; gap: 5px; background: #0f172a; color: #f59e0b; border: 2px solid #f59e0b; border-radius: 20px; padding: 4px 12px; font-weight: 900; font-size: 11px; box-shadow: 0 6px 20px rgba(0,0,0,0.7); transform: translate(-50%, -50%); white-space: nowrap;">
            <span>🚗</span>
            <span>${route.distanceKm} KM</span>
            <span style="color: #cbd5e1; font-weight: normal; font-size: 10px;">(${route.durationText})</span>
          </div>
        `,
        iconSize: [0, 0]
      });

      L.marker(midPoint, { icon: distanceIcon }).addTo(layerGroup);

      // Fit bounds with comfortable padding
      map.fitBounds(L.latLngBounds(route.waypoints), {
        padding: [60, 60],
        maxZoom: 13
      });
    }

    setTimeout(() => {
      map.invalidateSize();
    }, 250);

  }, [route, pickupPoint, dropoffPoint, waypoints]);

  const handleFitBounds = () => {
    const map = mapInstanceRef.current;
    if (!map || !route?.waypoints || route.waypoints.length === 0) return;
    map.fitBounds(L.latLngBounds(route.waypoints), {
      padding: [60, 60],
      maxZoom: 13
    });
  };

  return (
    <div className="relative w-full h-full min-h-[380px] sm:min-h-[460px] bg-slate-950 overflow-hidden select-none">
      {/* Map Element */}
      <div ref={mapContainerRef} className="w-full h-full min-h-[380px] sm:min-h-[460px] z-0" />

      {/* Top Left: Interactive Click Mode Selector */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-1 bg-slate-900/90 backdrop-blur-md p-1 rounded-xl border border-slate-700 shadow-2xl">
        <button
          type="button"
          onClick={() => setClickMode("pickup")}
          className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
            clickMode === "pickup"
              ? "bg-emerald-600 text-white shadow-md"
              : "text-slate-300 hover:text-white"
          }`}
          title="Click anywhere on Sri Lanka map to place Pick-up"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>Pick-up (A)</span>
        </button>

        <button
          type="button"
          onClick={() => setClickMode("dropoff")}
          className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
            clickMode === "dropoff"
              ? "bg-amber-500 text-slate-950 font-black shadow-md"
              : "text-slate-300 hover:text-white"
          }`}
          title="Click anywhere on Sri Lanka map to place Drop-off"
        >
          <span className="w-2 h-2 rounded-full bg-amber-300"></span>
          <span>Drop-off (B)</span>
        </button>

        <button
          type="button"
          onClick={() => setClickMode("waypoint")}
          className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
            clickMode === "waypoint"
              ? "bg-blue-600 text-white shadow-md"
              : "text-slate-300 hover:text-white"
          }`}
          title="Click map to add via / stopover point"
        >
          <Plus className="w-3 h-3" />
          <span>Add Stopover</span>
        </button>
      </div>

      {/* Top Right: Map Layers & Reset Fit */}
      <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md p-1.5 rounded-xl border border-slate-700 shadow-2xl">
        <button
          type="button"
          onClick={() => setMapType("google")}
          className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
            mapType === "google" 
              ? "bg-brand-navy text-brand-gold shadow" 
              : "text-slate-300 hover:text-white"
          }`}
        >
          Google
        </button>
        <button
          type="button"
          onClick={() => setMapType("satellite")}
          className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
            mapType === "satellite" 
              ? "bg-brand-navy text-brand-gold shadow" 
              : "text-slate-300 hover:text-white"
          }`}
        >
          Satellite
        </button>
        <button
          type="button"
          onClick={() => setMapType("osm")}
          className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
            mapType === "osm" 
              ? "bg-brand-navy text-brand-gold shadow" 
              : "text-slate-300 hover:text-white"
          }`}
        >
          OSM
        </button>

        <button
          type="button"
          onClick={handleFitBounds}
          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-brand-gold border border-slate-700 transition-colors ml-1 cursor-pointer"
          title="Center and fit route into screen"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Map Drag Tip Hint */}
      <div className="absolute top-14 left-3 z-10 hidden sm:flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md border border-slate-700/60 text-slate-300 text-[10px] px-2.5 py-1 rounded-lg shadow pointer-events-none">
        <Sparkles className="w-3 h-3 text-brand-gold" />
        <span>Tip: Click map or drag pins anywhere in Sri Lanka to redraw route</span>
      </div>

      {/* Bottom Left: Live Route KM Display Card */}
      {route && (
        <div className="absolute bottom-3 left-3 z-10 bg-slate-900/95 backdrop-blur-md border border-slate-700/90 p-3 rounded-2xl shadow-2xl max-w-[280px] sm:max-w-xs text-xs space-y-2 pointer-events-auto">
          <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-1.5">
            <span className="font-bold text-white flex items-center gap-1.5 text-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
              <span>Driving Route & Distance</span>
            </span>
            <span className="bg-gradient-to-r from-amber-400 to-brand-gold text-slate-950 font-black px-2.5 py-0.5 rounded-full text-[11px] shadow-sm">
              {route.distanceKm} KM
            </span>
          </div>

          <div className="space-y-1 text-[11px]">
            <div className="flex items-center gap-2 text-slate-200">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0"></span>
              <span className="truncate font-medium">A: {pickupPoint.name || `${pickupPoint.lat.toFixed(3)}, ${pickupPoint.lng.toFixed(3)}`}</span>
            </div>
            {waypoints.length > 0 && (
              <div className="flex items-center gap-2 text-blue-300 text-[10px]">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-400 shrink-0"></span>
                <span>Via {waypoints.length} stopover point(s)</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-slate-200">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0"></span>
              <span className="truncate font-medium">B: {dropoffPoint.name || `${dropoffPoint.lat.toFixed(3)}, ${dropoffPoint.lng.toFixed(3)}`}</span>
            </div>
          </div>

          <div className="pt-1 border-t border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
            <span>⏱️ {route.durationText}</span>
            <span className="text-amber-300 font-semibold">{route.highway.split('(')[0]}</span>
          </div>
        </div>
      )}
    </div>
  );
}
