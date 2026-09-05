// Cross-Port Local Synchronization Service for Local Development
// Allows localhost:3000 (customer site) and localhost:3001 (admin portal)
// to exchange bookings and fleet updates seamlessly before Firebase is configured.

const SYNC_ENDPOINTS = [
  "/api/local-sync",
  "http://localhost:3000/api/local-sync",
  "http://localhost:3001/api/local-sync"
];

export async function getLocalSyncData() {
  for (const endpoint of SYNC_ENDPOINTS) {
    try {
      const res = await fetch(endpoint, { method: "GET" });
      if (res.ok) {
        const data = await res.json();
        return data;
      }
    } catch (e) {
      // Try next endpoint
    }
  }
  return null;
}

export async function pushBookingToLocalSync(booking) {
  if (!booking) return false;
  for (const endpoint of SYNC_ENDPOINTS) {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ booking })
      });
      if (res.ok) {
        return true;
      }
    } catch (e) {
      // Try next endpoint
    }
  }
  return false;
}

export async function pushAllBookingsToLocalSync(bookings) {
  if (!Array.isArray(bookings)) return false;
  for (const endpoint of SYNC_ENDPOINTS) {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookings })
      });
      if (res.ok) {
        return true;
      }
    } catch (e) {
      // Try next endpoint
    }
  }
  return false;
}
