// Location coordinates & route calculation engine for Sri Lanka
export const sriLankaLocations = {
  "Piliyandala (Head Office - Polgasowita Rd)": {
    name: "Piliyandala Head Office",
    address: "134/3 E/6 Polgasowita Rd, Piliyandala 10230",
    lat: 6.8018,
    lng: 79.9227,
    isHub: true,
    region: "Western Province"
  },
  "Bandaranaike Int'l Airport (CMB 24/7 Meet & Greet)": {
    name: "Bandaranaike Int'l Airport (CMB)",
    address: "Katunayake International Airport Arrivals Terminal",
    lat: 7.1808,
    lng: 79.8841,
    isAirport: true,
    region: "Western Province"
  },
  "Kesbewa / Piliyandala Town Area": {
    name: "Kesbewa / Piliyandala Town",
    address: "Kesbewa Junction & Piliyandala Bypass Rd",
    lat: 6.7865,
    lng: 79.9482,
    region: "Western Province"
  },
  "Colombo Fort / Central Hotels": {
    name: "Colombo Fort & Galle Face",
    address: "Colombo 01 - 03, Galle Face & Port City Hotels",
    lat: 6.9344,
    lng: 79.8428,
    region: "Western Province"
  },
  "Mount Lavinia / Dehiwala Coast": {
    name: "Mount Lavinia Beach Area",
    address: "Hotel Road, Mount Lavinia & Dehiwala Marine Drive",
    lat: 6.8384,
    lng: 79.8660,
    region: "Western Province"
  },
  "Maharagama / Kottawa Expressway Exit": {
    name: "Kottawa / Maharagama Interchange",
    address: "Makumbura Multimodal Hub & Southern Expressway Exit",
    lat: 6.8480,
    lng: 79.9265,
    region: "Western Province"
  },
  "Galle Fort / Southern Beach Hotels": {
    name: "Galle Fort & Unawatuna",
    address: "Rampart Street, Galle Fort & Southern Expressway Exit",
    lat: 6.0329,
    lng: 80.2168,
    region: "Southern Province"
  },
  "Kandy / Hill Country": {
    name: "Kandy City Center",
    address: "Dalada Veediya, Kandy & Central Highlands",
    lat: 7.2906,
    lng: 80.6337,
    region: "Central Province"
  },
  "Doorstep Villa / Home Delivery (Islandwide)": {
    name: "Doorstep Villa / Home Delivery",
    address: "Direct Delivery to your Hotel, Villa or Residence Islandwide",
    lat: 6.9000,
    lng: 79.9000,
    region: "Islandwide"
  }
};

// Verified highway road distances (km), driving duration and recommended routes
const knownRoutes = {
  "Bandaranaike Int'l Airport (CMB 24/7 Meet & Greet)|Piliyandala (Head Office - Polgasowita Rd)": {
    distanceKm: 48,
    durationText: "45–55 mins",
    routeDescription: "Via E03 Katunayake Expressway ➔ E02 Outer Circular ➔ Kahathuduwa Exit",
    highway: "E03 & E02 Expressway (Fastest & direct)",
    tollEst: "Rs. 450",
    waypoints: [
      [7.1808, 79.8841],
      [7.1400, 79.8900],
      [7.0500, 79.9200],
      [6.9800, 79.9500],
      [6.8800, 79.9700],
      [6.8200, 79.9500],
      [6.8018, 79.9227]
    ]
  },
  "Piliyandala (Head Office - Polgasowita Rd)|Bandaranaike Int'l Airport (CMB 24/7 Meet & Greet)": {
    distanceKm: 48,
    durationText: "45–55 mins",
    routeDescription: "Via Kahathuduwa Interchange ➔ E02 Outer Circular ➔ E03 Airport Expressway",
    highway: "E02 & E03 Expressway",
    tollEst: "Rs. 450",
    waypoints: [
      [6.8018, 79.9227],
      [6.8200, 79.9500],
      [6.8800, 79.9700],
      [6.9800, 79.9500],
      [7.0500, 79.9200],
      [7.1400, 79.8900],
      [7.1808, 79.8841]
    ]
  },
  "Bandaranaike Int'l Airport (CMB 24/7 Meet & Greet)|Colombo Fort / Central Hotels": {
    distanceKm: 34,
    durationText: "35–45 mins",
    routeDescription: "Via E03 Katunayake Expressway ➔ Peliyagoda ➔ Colombo Port Access Elevated Highway",
    highway: "E03 Katunayake Expressway",
    tollEst: "Rs. 350",
    waypoints: [
      [7.1808, 79.8841],
      [7.1000, 79.8900],
      [7.0100, 79.9000],
      [6.9600, 79.8800],
      [6.9344, 79.8428]
    ]
  },
  "Colombo Fort / Central Hotels|Bandaranaike Int'l Airport (CMB 24/7 Meet & Greet)": {
    distanceKm: 34,
    durationText: "35–45 mins",
    routeDescription: "Via Colombo Port Access ➔ Peliyagoda ➔ E03 Airport Expressway",
    highway: "E03 Airport Expressway",
    tollEst: "Rs. 350",
    waypoints: [
      [6.9344, 79.8428],
      [6.9600, 79.8800],
      [7.0100, 79.9000],
      [7.1000, 79.8900],
      [7.1808, 79.8841]
    ]
  },
  "Piliyandala (Head Office - Polgasowita Rd)|Galle Fort / Southern Beach Hotels": {
    distanceKm: 108,
    durationText: "1 hr 15 mins",
    routeDescription: "Via Kahathuduwa Interchange ➔ E01 Southern Expressway ➔ Pinnaduwa (Galle) Exit",
    highway: "E01 Southern Expressway (100 km/h cruising)",
    tollEst: "Rs. 600",
    waypoints: [
      [6.8018, 79.9227],
      [6.7500, 79.9800],
      [6.5500, 80.0500],
      [6.3500, 80.1200],
      [6.1500, 80.1800],
      [6.0329, 80.2168]
    ]
  },
  "Galle Fort / Southern Beach Hotels|Piliyandala (Head Office - Polgasowita Rd)": {
    distanceKm: 108,
    durationText: "1 hr 15 mins",
    routeDescription: "Via Pinnaduwa (Galle) ➔ E01 Southern Expressway ➔ Kahathuduwa Exit",
    highway: "E01 Southern Expressway",
    tollEst: "Rs. 600",
    waypoints: [
      [6.0329, 80.2168],
      [6.1500, 80.1800],
      [6.3500, 80.1200],
      [6.5500, 80.0500],
      [6.7500, 79.9800],
      [6.8018, 79.9227]
    ]
  },
  "Bandaranaike Int'l Airport (CMB 24/7 Meet & Greet)|Galle Fort / Southern Beach Hotels": {
    distanceKm: 152,
    durationText: "1 hr 55 mins",
    routeDescription: "Via E03 Airport Expressway ➔ E02 Outer Circular ➔ E01 Southern Expressway",
    highway: "Full Islandwide Expressway Network",
    tollEst: "Rs. 950",
    waypoints: [
      [7.1808, 79.8841],
      [7.0500, 79.9200],
      [6.8800, 79.9700],
      [6.5500, 80.0500],
      [6.2500, 80.1500],
      [6.0329, 80.2168]
    ]
  },
  "Bandaranaike Int'l Airport (CMB 24/7 Meet & Greet)|Kandy / Hill Country": {
    distanceKm: 105,
    durationText: "2 hrs 45 mins",
    routeDescription: "Via Minuwangoda ➔ Mirigama ➔ Central Expressway (E04) & A1 Colombo-Kandy Rd",
    highway: "E04 Central Expressway & A1 Highway",
    tollEst: "Rs. 300",
    waypoints: [
      [7.1808, 79.8841],
      [7.2000, 80.0500],
      [7.2500, 80.2500],
      [7.2700, 80.4500],
      [7.2906, 80.6337]
    ]
  },
  "Piliyandala (Head Office - Polgasowita Rd)|Kandy / Hill Country": {
    distanceKm: 124,
    durationText: "3 hrs 10 mins",
    routeDescription: "Via Kottawa Interchange ➔ Kadawatha ➔ Central Expressway / A1 Highway",
    highway: "E02 / E04 & A1 Highway",
    tollEst: "Rs. 450",
    waypoints: [
      [6.8018, 79.9227],
      [6.8800, 79.9700],
      [7.0500, 79.9500],
      [7.2500, 80.2500],
      [7.2906, 80.6337]
    ]
  },
  "Piliyandala (Head Office - Polgasowita Rd)|Colombo Fort / Central Hotels": {
    distanceKm: 19,
    durationText: "30–40 mins",
    routeDescription: "Via Horana-Colombo Main Rd (B84) ➔ Pamankada ➔ Galle Road",
    highway: "B84 Highway & Marine Drive",
    tollEst: "No Toll",
    waypoints: [
      [6.8018, 79.9227],
      [6.8400, 79.8900],
      [6.8800, 79.8700],
      [6.9344, 79.8428]
    ]
  },
  "Piliyandala (Head Office - Polgasowita Rd)|Mount Lavinia / Dehiwala Coast": {
    distanceKm: 11,
    durationText: "20–25 mins",
    routeDescription: "Via Bokundara ➔ Borupana Rd ➔ Mount Lavinia Galle Road",
    highway: "Local Arterial Roads",
    tollEst: "No Toll",
    waypoints: [
      [6.8018, 79.9227],
      [6.8150, 79.8950],
      [6.8384, 79.8660]
    ]
  },
  "Piliyandala (Head Office - Polgasowita Rd)|Maharagama / Kottawa Expressway Exit": {
    distanceKm: 8,
    durationText: "12–18 mins",
    routeDescription: "Via Kesbewa-Kottawa By-pass road direct to Makumbura Interchange",
    highway: "Makumbura Connector",
    tollEst: "No Toll",
    waypoints: [
      [6.8018, 79.9227],
      [6.8250, 79.9350],
      [6.8480, 79.9265]
    ]
  },
  "Piliyandala (Head Office - Polgasowita Rd)|Kesbewa / Piliyandala Town Area": {
    distanceKm: 3.5,
    durationText: "6–10 mins",
    routeDescription: "Via Polgasowita Rd into Kesbewa Main Junction",
    highway: "Town Connection",
    tollEst: "No Toll",
    waypoints: [
      [6.8018, 79.9227],
      [6.7950, 79.9350],
      [6.7865, 79.9482]
    ]
  }
};

// Haversine calculation fallback for any arbitrary locations
function calculateHaversineKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
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

export function getRouteDetails(pickupLocName, dropoffLocName) {
  if (!pickupLocName || !dropoffLocName) {
    return null;
  }

  // Same pickup & dropoff
  if (pickupLocName === dropoffLocName) {
    const locInfo = sriLankaLocations[pickupLocName] || { lat: 6.8018, lng: 79.9227 };
    return {
      pickup: locInfo,
      dropoff: locInfo,
      distanceKm: 0,
      durationText: "Same Location (Round-trip)",
      routeDescription: "Vehicle pickup and return at the same designated branch location.",
      highway: "Local Return",
      tollEst: "No Toll",
      waypoints: [
        [locInfo.lat, locInfo.lng],
        [locInfo.lat + 0.001, locInfo.lng + 0.001]
      ],
      googleMapsDirUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(pickupLocName + " Sri Lanka")}`
    };
  }

  const routeKey = `${pickupLocName}|${dropoffLocName}`;
  const reverseKey = `${dropoffLocName}|${pickupLocName}`;

  let matchedRoute = knownRoutes[routeKey];
  let isReversed = false;

  if (!matchedRoute && knownRoutes[reverseKey]) {
    matchedRoute = knownRoutes[reverseKey];
    isReversed = true;
  }

  const pickup = sriLankaLocations[pickupLocName] || {
    name: pickupLocName,
    address: pickupLocName,
    lat: 6.8018,
    lng: 79.9227
  };

  const dropoff = sriLankaLocations[dropoffLocName] || {
    name: dropoffLocName,
    address: dropoffLocName,
    lat: 7.1808,
    lng: 79.8841
  };

  if (matchedRoute) {
    const waypoints = isReversed ? [...matchedRoute.waypoints].reverse() : matchedRoute.waypoints;
    return {
      pickup,
      dropoff,
      distanceKm: matchedRoute.distanceKm,
      durationText: matchedRoute.durationText,
      routeDescription: matchedRoute.routeDescription,
      highway: matchedRoute.highway,
      tollEst: matchedRoute.tollEst,
      waypoints,
      googleMapsDirUrl: `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(pickup.address || pickup.name + " Sri Lanka")}&destination=${encodeURIComponent(dropoff.address || dropoff.name + " Sri Lanka")}&travelmode=driving`
    };
  }

  // Fallback calculation
  const directKm = calculateHaversineKm(pickup.lat, pickup.lng, dropoff.lat, dropoff.lng);
  const estimatedRoadKm = Math.round(directKm * 1.32); // Average Sri Lanka road curvature factor
  const estHours = estimatedRoadKm / 45; // Average speed ~45 km/h in Sri Lanka
  const estHoursRound = Math.floor(estHours);
  const estMinsRound = Math.round((estHours - estHoursRound) * 60);
  const durationText = estHoursRound > 0 ? `${estHoursRound} hr ${estMinsRound} mins` : `${estMinsRound} mins`;

  return {
    pickup,
    dropoff,
    distanceKm: estimatedRoadKm,
    durationText: `~${durationText}`,
    routeDescription: `Scenic arterial road route across Sri Lanka (${estimatedRoadKm} km)`,
    highway: "Main Island Highway",
    tollEst: estimatedRoadKm > 40 ? "Expressway option available" : "No Toll",
    waypoints: [
      [pickup.lat, pickup.lng],
      [(pickup.lat + dropoff.lat) / 2 + 0.02, (pickup.lng + dropoff.lng) / 2 + 0.03],
      [dropoff.lat, dropoff.lng]
    ],
    googleMapsDirUrl: `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(pickup.address || pickup.name + " Sri Lanka")}&destination=${encodeURIComponent(dropoff.address || dropoff.name + " Sri Lanka")}&travelmode=driving`
  };
}
