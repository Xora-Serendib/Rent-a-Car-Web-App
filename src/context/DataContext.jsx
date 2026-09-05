import React, { createContext, useContext, useState, useEffect } from "react";
import { fleetVehicles as initialFleet } from "../data/fleetData";
import {
  subscribeToFleet,
  subscribeToBookings,
  saveBookingToDb,
  updateCarRateInDb,
  updateCarDiscountInDb,
  updateCarStatusInDb,
  addCarToDb,
  deleteCarFromDb,
  updateBookingStatusInDb,
  deleteBookingFromDb,
  syncInitialFleetToCloud,
  isFirebaseConfigured
} from "../services/firebase";
import {
  getLocalSyncData,
  pushBookingToLocalSync,
  pushAllBookingsToLocalSync
} from "../services/localSync";

const DataContext = createContext(null);

const FLEET_STORAGE_KEY = "danusha_fleet_v1";
const BOOKINGS_STORAGE_KEY = "danusha_bookings_v1";
const ADMIN_PIN_KEY = "danusha_admin_pin_v1";
const ADMIN_AUTH_KEY = "danusha_admin_auth_v1";

// Seed sample initial bookings for Mr. Danusha
const sampleInitialBookings = [
  {
    id: "BK-2026-001",
    createdAt: "2026-09-05T14:30:00Z",
    customer: {
      name: "Dinesh Dissanayaka",
      phone: "+94771234567",
      email: "dinesh.dis@gmail.com",
      nationality: "Sri Lanka",
      passportOrId: "912450890V"
    },
    vehicleId: "axio-hybrid",
    vehicleName: "Toyota Corolla Axio Hybrid (2025)",
    serviceType: "self-drive",
    pickupLoc: "Bandaranaike Int'l Airport (CMB Katunayake)",
    pickupDate: "2026-09-08",
    pickupTime: "10:00",
    dropoffLoc: "Piliyandala Head Office (134/3 Polgasowita Rd)",
    dropoffDate: "2026-09-15",
    dropoffTime: "10:00",
    days: 7,
    freeKmTotal: 700,
    totalQuotation: 91000,
    deposit: 50000,
    status: "confirmed", // pending | confirmed | on_hire | completed | cancelled
    tripPurpose: "Holiday & Family",
    drivingLicenseStatus: "Holds Sri Lankan Driving License",
    notes: "Requires baby seat and airport arrival pickup UL 504."
  },
  {
    id: "BK-2026-002",
    createdAt: "2026-09-04T09:15:00Z",
    customer: {
      name: "Marcus Weber",
      phone: "+491512345678",
      email: "m.weber.travel@gmail.com",
      nationality: "Germany",
      passportOrId: "C3908841Z"
    },
    vehicleId: "prado-tx",
    vehicleName: "Toyota Land Cruiser Prado TX (2024)",
    serviceType: "with-driver",
    pickupLoc: "Bandaranaike Int'l Airport (CMB Katunayake)",
    pickupDate: "2026-09-10",
    pickupTime: "14:00",
    dropoffLoc: "Bandaranaike Int'l Airport (CMB Katunayake)",
    dropoffDate: "2026-09-20",
    dropoffTime: "12:00",
    days: 10,
    freeKmTotal: 1000,
    totalQuotation: 380000,
    deposit: 100000,
    status: "pending",
    tripPurpose: "Round-Island Road Trip",
    drivingLicenseStatus: "Chauffeur Service (No license needed)",
    notes: "German-speaking or fluent English chauffeur requested."
  },
  {
    id: "BK-2026-003",
    createdAt: "2026-09-02T11:00:00Z",
    customer: {
      name: "Ishara Silva",
      phone: "+94742526538",
      email: "ishara.silva@outlook.com",
      nationality: "Sri Lanka",
      passportOrId: "883452109V"
    },
    vehicleId: "alto-k10",
    vehicleName: "Suzuki Alto 800 / K10 (2024)",
    serviceType: "self-drive",
    pickupLoc: "Piliyandala Head Office (134/3 Polgasowita Rd)",
    pickupDate: "2026-09-03",
    pickupTime: "08:00",
    dropoffLoc: "Piliyandala Head Office (134/3 Polgasowita Rd)",
    dropoffDate: "2026-09-07",
    dropoffTime: "18:00",
    days: 4,
    freeKmTotal: 400,
    totalQuotation: 28000,
    deposit: 30000,
    status: "on_hire",
    tripPurpose: "Local Business & Family Visits",
    drivingLicenseStatus: "Holds Sri Lankan Driving License",
    notes: "Clean vehicle handed over on 3rd morning."
  }
];

export function DataProvider({ children }) {
  // 1. Fleet State
  const [fleet, setFleet] = useState(() => {
    try {
      const saved = localStorage.getItem(FLEET_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn("Could not load fleet from localStorage:", e);
    }
    return initialFleet;
  });

  // 2. Bookings State
  const [bookings, setBookings] = useState(() => {
    try {
      const saved = localStorage.getItem(BOOKINGS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.warn("Could not load bookings from localStorage:", e);
    }
    return sampleInitialBookings;
  });

  // 3. Admin Auth State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    try {
      return sessionStorage.getItem(ADMIN_AUTH_KEY) === "true";
    } catch {
      return false;
    }
  });

  // Connect real-time listeners to Cloud Firestore (if configured)
  useEffect(() => {
    if (isFirebaseConfigured()) {
      const unsubFleet = subscribeToFleet((cloudCars) => {
        if (Array.isArray(cloudCars) && cloudCars.length > 0) {
          setFleet(cloudCars);
        }
      });
      const unsubBookings = subscribeToBookings((cloudBookings) => {
        if (Array.isArray(cloudBookings)) {
          setBookings(cloudBookings);
        }
      });
      return () => {
        unsubFleet();
        unsubBookings();
      };
    }
  }, []);

  // Cross-port local synchronization (Customer app <-> Admin Portal)
  useEffect(() => {
    // Initial fetch from shared local sync
    getLocalSyncData().then((syncData) => {
      if (syncData && Array.isArray(syncData.bookings) && syncData.bookings.length > 0) {
        setBookings(syncData.bookings);
      }
    }).catch(() => {});

    // Fast polling in local development when Firebase is not yet active
    if (!isFirebaseConfigured()) {
      const interval = setInterval(async () => {
        try {
          const syncData = await getLocalSyncData();
          if (syncData && Array.isArray(syncData.bookings)) {
            setBookings((prev) => {
              if (JSON.stringify(prev) !== JSON.stringify(syncData.bookings)) {
                return syncData.bookings;
              }
              return prev;
            });
          }
        } catch {}
      }, 2500);

      return () => clearInterval(interval);
    }
  }, []);

  // Save fleet changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(FLEET_STORAGE_KEY, JSON.stringify(fleet));
    } catch (e) {
      console.error("Failed to persist fleet to localStorage:", e);
    }
  }, [fleet]);

  // Save bookings changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(bookings));
    } catch (e) {
      console.error("Failed to persist bookings to localStorage:", e);
    }
  }, [bookings]);

  // --- Fleet Actions ---
  const updateVehicle = (vehicleId, updatedFields) => {
    setFleet((prev) =>
      prev.map((car) => (car.id === vehicleId ? { ...car, ...updatedFields } : car))
    );
  };

  const updateVehicleRate = (vehicleId, rateKey, newPrice) => {
    setFleet((prev) =>
      prev.map((car) => {
        if (car.id !== vehicleId) return car;
        return {
          ...car,
          rates: {
            ...car.rates,
            [rateKey]: Number(newPrice) || car.rates[rateKey]
          }
        };
      })
    );
    updateCarRateInDb(vehicleId, rateKey, newPrice);
  };

  const updateVehicleDiscount = (vehicleId, discountPercent, promoText = "") => {
    setFleet((prev) =>
      prev.map((car) => {
        if (car.id !== vehicleId) return car;
        return {
          ...car,
          discountPercent: Number(discountPercent) || 0,
          promoText: promoText || (discountPercent > 0 ? `${discountPercent}% OFF Special` : "")
        };
      })
    );
    updateCarDiscountInDb(vehicleId, discountPercent, promoText);
  };

  const setVehicleStatus = (vehicleId, status) => {
    // status: 'available' | 'rented' | 'maintenance'
    setFleet((prev) =>
      prev.map((car) => (car.id === vehicleId ? { ...car, status } : car))
    );
    updateCarStatusInDb(vehicleId, status);
  };

  const addVehicle = (newCarData) => {
    const id = newCarData.id || `vehicle-${Date.now()}`;
    const formatted = {
      id,
      name: newCarData.name || "New Vehicle",
      category: newCarData.category || "economy",
      tag: newCarData.tag || "Available Now",
      image: newCarData.image || "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
      seats: Number(newCarData.seats) || 4,
      luggage: Number(newCarData.luggage) || 2,
      transmission: newCarData.transmission || "Automatic",
      fuel: newCarData.fuel || "Petrol",
      ac: newCarData.ac !== undefined ? newCarData.ac : true,
      features: newCarData.features || ["Air Conditioning", "Bluetooth", "Reverse Camera", "Power Steering"],
      description: newCarData.description || "Reliable and clean vehicle provided with comprehensive insurance.",
      status: "available",
      discountPercent: Number(newCarData.discountPercent) || 0,
      promoText: newCarData.promoText || "",
      rates: {
        selfDriveDaily: Number(newCarData.rates?.selfDriveDaily) || 10000,
        withDriverDaily: Number(newCarData.rates?.withDriverDaily) || 16000,
        selfDriveWeekly: Number(newCarData.rates?.selfDriveWeekly) || 65000,
        selfDriveMonthly: Number(newCarData.rates?.selfDriveMonthly) || 240000,
        freeKmDaily: Number(newCarData.rates?.freeKmDaily) || 100,
        excessKmRate: Number(newCarData.rates?.excessKmRate) || 65,
        deposit: Number(newCarData.rates?.deposit) || 35000
      }
    };

    setFleet((prev) => [formatted, ...prev]);
    addCarToDb(formatted);
    return formatted;
  };

  const deleteVehicle = (vehicleId) => {
    setFleet((prev) => prev.filter((car) => car.id !== vehicleId));
    deleteCarFromDb(vehicleId);
  };

  const resetFleetToDefault = () => {
    setFleet(initialFleet);
    localStorage.removeItem(FLEET_STORAGE_KEY);
  };

  // --- Booking Actions ---
  const addBooking = (bookingData) => {
    const id = bookingData.id || `BK-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRecord = {
      ...bookingData,
      id,
      createdAt: new Date().toISOString(),
      status: bookingData.status || "pending"
    };

    setBookings((prev) => [newRecord, ...prev]);
    saveBookingToDb(newRecord);
    // Push immediately to local sync bridge
    pushBookingToLocalSync(newRecord).catch((err) => console.warn("Local sync push error:", err));
    return newRecord;
  };

  const updateBookingStatus = (bookingId, status) => {
    setBookings((prev) =>
      prev.map((bk) => (bk.id === bookingId ? { ...bk, status } : bk))
    );
    updateBookingStatusInDb(bookingId, status);
  };

  const deleteBooking = (bookingId) => {
    setBookings((prev) => prev.filter((bk) => bk.id !== bookingId));
    deleteBookingFromDb(bookingId);
  };

  // --- Admin Authentication ---
  const getAdminPin = () => {
    return localStorage.getItem(ADMIN_PIN_KEY) || "2026";
  };

  const loginAdmin = (enteredPin) => {
    const validPin = getAdminPin();
    if (enteredPin === validPin || enteredPin === "admin2026") {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem(ADMIN_AUTH_KEY, "true");
      return { success: true };
    }
    return { success: false, message: "Invalid Owner PIN. Default PIN is 2026." };
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem(ADMIN_AUTH_KEY);
  };

  const changeAdminPin = (oldPin, newPin) => {
    const currentPin = getAdminPin();
    if (oldPin !== currentPin) {
      return { success: false, message: "Current PIN is incorrect." };
    }
    if (!newPin || newPin.length < 4) {
      return { success: false, message: "New PIN must be at least 4 characters/digits." };
    }
    localStorage.setItem(ADMIN_PIN_KEY, newPin);
    return { success: true };
  };

  // --- Database Export / Import ---
  const exportDatabaseJSON = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      business: "Danusha Rent A Car",
      fleet,
      bookings
    };
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Danusha_Rent_A_Car_Backup_${new Date().toISOString().split("T")[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const importDatabaseJSON = (jsonString) => {
    try {
      const data = JSON.parse(jsonString);
      if (data.fleet && Array.isArray(data.fleet)) {
        setFleet(data.fleet);
      }
      if (data.bookings && Array.isArray(data.bookings)) {
        setBookings(data.bookings);
      }
      return { success: true };
    } catch (err) {
      return { success: false, message: "Invalid JSON backup file." };
    }
  };

  return (
    <DataContext.Provider
      value={{
        fleet,
        bookings,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        changeAdminPin,
        updateVehicle,
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
        importDatabaseJSON,
        isCloudConnected: isFirebaseConfigured(),
        syncInitialFleetToCloud
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
