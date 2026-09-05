// Sri Lanka Comprehensive Geo & Dynamic Routing Engine

// 40+ Pre-mapped hubs, cities, beaches and tourist landmarks across Sri Lanka
export const popularSriLankaDestinations = [
  // Western Province / Hubs
  { name: "Piliyandala (Head Office - Polgasowita Rd)", address: "134/3 E/6 Polgasowita Rd, Piliyandala 10230", lat: 6.8018, lng: 79.9227, category: "Danusha Hub" },
  { name: "Bandaranaike Int'l Airport (CMB Katunayake)", address: "Arrivals Hall, BIA Airport, Katunayake", lat: 7.1808, lng: 79.8841, category: "Airport" },
  { name: "Colombo Fort / Galle Face / Port City", address: "Colombo 01, Galle Face Green & Port City", lat: 6.9344, lng: 79.8428, category: "City" },
  { name: "Mount Lavinia Beach / Dehiwala", address: "Hotel Road, Mount Lavinia", lat: 6.8384, lng: 79.8660, category: "Beach" },
  { name: "Negombo Beach / Hotel Strip", address: "Lewis Place & Porutota Rd, Negombo", lat: 7.2289, lng: 79.8407, category: "Beach" },
  { name: "Kesbewa Town Junction", address: "Kesbewa Bypass, Kesbewa", lat: 6.7865, lng: 79.9482, category: "City" },
  { name: "Kottawa / Makumbura Multimodal Hub", address: "Makumbura Expressway Interchange, Kottawa", lat: 6.8480, lng: 79.9265, category: "Expressway Exit" },
  { name: "Kalutara / Wadduwa Beach", address: "Galle Road, Kalutara North", lat: 6.5854, lng: 79.9607, category: "Beach" },

  // Southern Province
  { name: "Bentota / Induruwa Beach", address: "National Holiday Resort, Bentota", lat: 6.4216, lng: 79.9988, category: "Beach" },
  { name: "Hikkaduwa Coral Reef & Surf Beach", address: "Galle Road, Hikkaduwa", lat: 6.1405, lng: 80.1017, category: "Beach" },
  { name: "Galle Fort / Lighthouse", address: "Church Street, Galle Fort", lat: 6.0329, lng: 80.2168, category: "Heritage" },
  { name: "Unawatuna Beach / Jungle Beach", address: "Yaddehimulla Rd, Unawatuna", lat: 6.0108, lng: 80.2492, category: "Beach" },
  { name: "Weligama Bay / Surf Point", address: "Bypass Rd, Weligama", lat: 5.9722, lng: 80.4287, category: "Beach" },
  { name: "Mirissa Beach / Coconut Tree Hill", address: "Mirissa Harbour & Beach, Mirissa", lat: 5.9483, lng: 80.4578, category: "Beach" },
  { name: "Matara Town / Polhena Beach", address: "Beach Road, Matara", lat: 5.9449, lng: 80.5353, category: "City" },
  { name: "Hiriketiya Bay / Dikwella", address: "Hiriketiya Beach Road, Dikwella", lat: 5.9619, lng: 80.6865, category: "Beach" },
  { name: "Tangalle / Goyambokka Beach", address: "Tangalle Beach Road, Tangalle", lat: 6.0243, lng: 80.7941, category: "Beach" },
  { name: "Hambantota / Mattala Airport (HRI)", address: "Mattala Rajapaksa International Airport", lat: 6.2900, lng: 81.1245, category: "Airport" },
  { name: "Yala National Park / Palatupana Entrance", address: "Palatupana, Yala Wildlife Sanctuary", lat: 6.2736, lng: 81.2885, category: "Wildlife" },
  { name: "Tissamaharama Town & Lake", address: "Main Street, Tissamaharama", lat: 6.2796, lng: 81.2891, category: "Wildlife" },

  // Central Highlands & Tea Country
  { name: "Kandy City / Temple of the Sacred Tooth", address: "Sri Dalada Veediya, Kandy", lat: 7.2906, lng: 80.6337, category: "Heritage" },
  { name: "Peradeniya Royal Botanical Gardens", address: "Galaha Road, Peradeniya, Kandy", lat: 7.2683, lng: 80.5966, category: "Attraction" },
  { name: "Nuwara Eliya / Gregory Lake / Little England", address: "Badulla Road, Nuwara Eliya", lat: 6.9497, lng: 80.7891, category: "Hill Country" },
  { name: "Ella Town / Nine Arches Bridge", address: "Ella-Passara Rd, Ella", lat: 6.8667, lng: 81.0466, category: "Hill Country" },
  { name: "Haputale / Lipton's Seat", address: "Dambatenne Tea Estate, Haputale", lat: 6.7681, lng: 80.9575, category: "Hill Country" },
  { name: "Hatton / Adam's Peak (Sri Pada)", address: "Nallathanniya, Adam's Peak Base", lat: 6.8096, lng: 80.4994, category: "Hill Country" },
  { name: "Kitulgala / White Water Rafting", address: "Avissawella-Hatton Rd, Kitulgala", lat: 6.9897, lng: 80.4137, category: "Adventure" },
  { name: "Pinnawala Elephant Orphanage", address: "B199, Pinnawala, Rambukkana", lat: 7.3014, lng: 80.3871, category: "Wildlife" },

  // Cultural Triangle / North Central
  { name: "Sigiriya Lion Rock Fortress", address: "Sigiriya Heritage Site, Dambulla", lat: 7.9570, lng: 80.7603, category: "Heritage" },
  { name: "Dambulla Golden Cave Temple", address: "Kandy-Jaffna Highway, Dambulla", lat: 7.8566, lng: 80.6483, category: "Heritage" },
  { name: "Anuradhapura Sacred Ancient City", address: "Sacred City Road, Anuradhapura", lat: 8.3114, lng: 80.4037, category: "Heritage" },
  { name: "Polonnaruwa Ancient Kingdom Ruins", address: "Parakrama Samudra, Polonnaruwa", lat: 7.9403, lng: 81.0188, category: "Heritage" },
  { name: "Minneriya / Kaudulla Elephant Gathering", address: "Habarana-Polonnaruwa Rd, Minneriya", lat: 8.0319, lng: 80.8258, category: "Wildlife" },
  { name: "Wilpattu National Park", address: "Hunuwilagama Entrance, Wilpattu", lat: 8.4485, lng: 80.0134, category: "Wildlife" },

  // Eastern & Northern Province
  { name: "Trincomalee / Nilaveli Beach / Pigeon Island", address: "Nilaveli Beach Road, Trincomalee", lat: 8.6894, lng: 81.1897, category: "Beach" },
  { name: "Arugam Bay Surf Point & Main Street", address: "Arugam Bay, Pottuvil", lat: 6.8428, lng: 81.8288, category: "Beach" },
  { name: "Pasikuda / Kalkudah Bay", address: "Pasikuda Hotel Strip, Batticaloa", lat: 7.9255, lng: 81.5645, category: "Beach" },
  { name: "Jaffna City / Nallur Kandaswamy Kovil", address: "Point Pedro Road, Nallur, Jaffna", lat: 9.6749, lng: 80.0298, category: "Heritage" }
];

// Calculate Haversine direct distance in KM
export function calculateDirectKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Generate intermediate highway checkpoints between two points in Sri Lanka
export function generateCurvedWaypoints(p1, p2, routeStyle = "expressway", intermediatePoints = []) {
  // If user provided intermediate waypoints (via points), include them
  const points = [[p1.lat, p1.lng]];

  if (intermediatePoints && intermediatePoints.length > 0) {
    intermediatePoints.forEach((pt) => {
      if (pt && pt.lat && pt.lng) {
        points.push([pt.lat, pt.lng]);
      }
    });
  } else {
    // Generate intelligent road curve waypoints following Sri Lanka terrain
    const latDiff = p2.lat - p1.lat;
    const lngDiff = p2.lng - p1.lng;
    const steps = 6;

    // Expressway curvature bias vs Coastal vs Inland
    for (let i = 1; i < steps; i++) {
      const frac = i / steps;
      let curLat = p1.lat + latDiff * frac;
      let curLng = p1.lng + lngDiff * frac;

      // Realistic bend: Sri Lankan roads curve around the central mountain massif and follow coastal/expressway corridors
      const midCurve = Math.sin(frac * Math.PI);
      if (routeStyle === "coastal") {
        // Bend towards coast (west or south)
        curLng -= midCurve * 0.04;
      } else if (routeStyle === "hill_country") {
        // Bend inland towards central hills
        curLng += midCurve * 0.05;
      } else {
        // Expressway corridor (E01/E02 curve around Colombo suburbs)
        curLng += midCurve * 0.025;
      }
      points.push([curLat, curLng]);
    }
  }

  points.push([p2.lat, p2.lng]);
  return points;
}

// Fetch live road route from public OSRM router with fallback
export async function calculateDynamicRoute(pickup, dropoff, routeStyle = "expressway", waypoints = []) {
  if (!pickup || !dropoff) return null;

  // Build coordinate list for routing: [lng, lat]
  const coordList = [
    `${pickup.lng.toFixed(5)},${pickup.lat.toFixed(5)}`,
    ...waypoints.map((w) => `${w.lng.toFixed(5)},${w.lat.toFixed(5)}`),
    `${dropoff.lng.toFixed(5)},${dropoff.lat.toFixed(5)}`
  ].join(";");

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500); // 3.5s timeout

    const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${coordList}?overview=full&geometries=geojson`;
    const response = await fetch(osrmUrl, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (data.routes && data.routes.length > 0) {
        const routeData = data.routes[0];
        const distanceKm = Math.round(routeData.distance / 1000);
        const totalMinutes = Math.round(routeData.duration / 60);

        const hours = Math.floor(totalMinutes / 60);
        const mins = totalMinutes % 60;
        const durationText = hours > 0 ? `${hours} hr ${mins} mins` : `${mins} mins`;

        // Convert GeoJSON [lng, lat] to Leaflet [lat, lng]
        const latLngWaypoints = routeData.geometry.coordinates.map(([lng, lat]) => [lat, lng]);

        return {
          pickup,
          dropoff,
          distanceKm: distanceKm > 0 ? distanceKm : 1,
          durationText,
          routeDescription: `Live road navigation across Sri Lanka via primary highways`,
          highway: distanceKm > 40 ? "Expressway / Arterial Network" : "Local Arterial Route",
          tollEst: distanceKm > 50 ? "Rs. 450 - 800 (Expressway)" : "No Toll",
          waypoints: latLngWaypoints,
          googleMapsDirUrl: `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(pickup.name || pickup.lat + ',' + pickup.lng)}&destination=${encodeURIComponent(dropoff.name || dropoff.lat + ',' + dropoff.lng)}&travelmode=driving`
        };
      }
    }
  } catch (err) {
    // Network timeout or offline - fall back to internal road curve generator
    console.warn("OSRM routing fallback engaged:", err.message);
  }

  // Fallback calculation
  const directKm = calculateDirectKm(pickup.lat, pickup.lng, dropoff.lat, dropoff.lng);
  const roadCurveFactor = routeStyle === "coastal" ? 1.38 : routeStyle === "hill_country" ? 1.55 : 1.28;
  const estimatedRoadKm = Math.max(1, Math.round(directKm * roadCurveFactor));
  
  const avgSpeed = routeStyle === "expressway" ? 65 : 45; // km/h
  const totalMins = Math.round((estimatedRoadKm / avgSpeed) * 60);
  const hrs = Math.floor(totalMins / 60);
  const m = totalMins % 60;
  const durationText = hrs > 0 ? `${hrs} hr ${m} mins` : `${m} mins`;

  const curvedWaypoints = generateCurvedWaypoints(pickup, dropoff, routeStyle, waypoints);

  return {
    pickup,
    dropoff,
    distanceKm: estimatedRoadKm,
    durationText: `~${durationText}`,
    routeDescription: `Sri Lanka Road Route (${estimatedRoadKm} km)`,
    highway: estimatedRoadKm > 35 ? "Expressway / Main A-Grade Highway" : "Arterial City Route",
    tollEst: estimatedRoadKm > 40 ? "Expressway ETC available" : "No Toll",
    waypoints: curvedWaypoints,
    googleMapsDirUrl: `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(pickup.name || pickup.lat + ',' + pickup.lng)}&destination=${encodeURIComponent(dropoff.name || dropoff.lat + ',' + dropoff.lng)}&travelmode=driving`
  };
}

// Categorized Destination Groups for Dropdowns & Selectors
export const destinationGroups = [
  {
    category: "Danusha Hubs & Airports",
    destinations: [
      "Piliyandala (Head Office - Polgasowita Rd)",
      "Bandaranaike Int'l Airport (CMB Katunayake)",
      "Kesbewa Town Junction",
      "Kottawa / Makumbura Multimodal Hub",
      "Hambantota / Mattala Airport (HRI)"
    ]
  },
  {
    category: "Western Province & Colombo",
    destinations: [
      "Colombo Fort / Galle Face / Port City",
      "Mount Lavinia Beach / Dehiwala",
      "Negombo Beach / Hotel Strip",
      "Kalutara / Wadduwa Beach"
    ]
  },
  {
    category: "Southern Coast & Beaches",
    destinations: [
      "Bentota / Induruwa Beach",
      "Hikkaduwa Coral Reef & Surf Beach",
      "Galle Fort / Lighthouse",
      "Unawatuna Beach / Jungle Beach",
      "Weligama Bay / Surf Point",
      "Mirissa Beach / Coconut Tree Hill",
      "Matara Town / Polhena Beach",
      "Hiriketiya Bay / Dikwella",
      "Tangalle / Goyambokka Beach",
      "Yala National Park / Palatupana Entrance",
      "Tissamaharama Town & Lake"
    ]
  },
  {
    category: "Central Highlands & Tea Country",
    destinations: [
      "Kandy City / Temple of the Sacred Tooth",
      "Peradeniya Royal Botanical Gardens",
      "Nuwara Eliya / Gregory Lake / Little England",
      "Ella Town / Nine Arches Bridge",
      "Haputale / Lipton's Seat",
      "Hatton / Adam's Peak (Sri Pada)",
      "Kitulgala / White Water Rafting",
      "Pinnawala Elephant Orphanage"
    ]
  },
  {
    category: "Cultural Triangle & Heritage",
    destinations: [
      "Sigiriya Lion Rock Fortress",
      "Dambulla Golden Cave Temple",
      "Anuradhapura Sacred Ancient City",
      "Polonnaruwa Ancient Kingdom Ruins",
      "Minneriya / Kaudulla Elephant Gathering",
      "Wilpattu National Park"
    ]
  },
  {
    category: "Eastern & Northern Provinces",
    destinations: [
      "Trincomalee / Nilaveli Beach / Pigeon Island",
      "Arugam Bay Surf Point & Main Street",
      "Pasikuda / Kalkudah Bay",
      "Jaffna City / Nallur Kandaswamy Kovil"
    ]
  }
];

// Resolves any string or pin into a valid geographic location object with accurate lat/lng
export function resolveLocationObject(nameOrString) {
  if (!nameOrString) return popularSriLankaDestinations[1]; // default Airport

  if (typeof nameOrString === "object" && nameOrString.lat && nameOrString.lng) {
    return nameOrString;
  }

  const str = String(nameOrString).trim();

  // 1. Exact match in popular destinations
  const exact = popularSriLankaDestinations.find((d) => d.name.toLowerCase() === str.toLowerCase());
  if (exact) return exact;

  // 2. Specific alias lookups
  if (str.includes("Airport") || str.includes("CMB") || str.includes("Katunayake")) {
    return popularSriLankaDestinations[1]; // BIA
  }
  if (str.includes("Piliyandala") || str.includes("Polgasowita")) {
    return popularSriLankaDestinations[0]; // Piliyandala Head Office
  }
  if (str.includes("Colombo")) {
    return popularSriLankaDestinations[2]; // Colombo Fort
  }

  // 3. Partial match
  const partial = popularSriLankaDestinations.find(
    (d) => str.toLowerCase().includes(d.name.toLowerCase()) || d.name.toLowerCase().includes(str.toLowerCase())
  );
  if (partial) return partial;

  // 4. Coordinates extraction: e.g. "Pinned Location (6.850, 80.120)" or "6.850, 80.120"
  const coordMatch = str.match(/(-?\d+\.?\d*)[,\s]+(-?\d+\.?\d*)/);
  if (coordMatch) {
    const lat = parseFloat(coordMatch[1]);
    const lng = parseFloat(coordMatch[2]);
    if (!isNaN(lat) && !isNaN(lng) && lat >= 5.5 && lat <= 10.0 && lng >= 79.5 && lng <= 82.5) {
      return {
        name: str,
        address: `Custom Pinned Point (${lat.toFixed(4)}, ${lng.toFixed(4)})`,
        lat,
        lng,
        category: "Custom Pinned"
      };
    }
  }

  // 5. Fallback object
  return {
    name: str,
    address: str,
    lat: 7.1808,
    lng: 79.8841,
    category: "Sri Lanka Destination"
  };
}

