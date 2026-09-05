import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy
} from "firebase/firestore";

// Read Firebase config from environment variables (Vite prefix: VITE_)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Verify whether valid credentials have been provided
export const isFirebaseConfigured = () => {
  return Boolean(
    firebaseConfig.apiKey &&
    firebaseConfig.projectId &&
    firebaseConfig.apiKey !== "YOUR_FIREBASE_API_KEY" &&
    firebaseConfig.projectId !== "YOUR_PROJECT_ID"
  );
};

let app = null;
let db = null;

if (isFirebaseConfigured()) {
  try {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    db = getFirestore(app);
    console.log("🟢 Firebase Firestore successfully initialized for Danusha Rent A Car.");
  } catch (error) {
    console.warn("⚠️ Firebase initialization encountered an issue. Falling back to local database mode:", error);
    db = null;
  }
} else {
  console.info("ℹ️ Firebase credentials not provided in .env. Running in Dual-Mode (local persistent storage). Connect Firebase anytime to enable cross-device cloud sync.");
}

export { db };

// --------------------------------------------------------------------------
// Cloud Firestore Service Helpers (with automatic fallback to local storage)
// --------------------------------------------------------------------------

const CARS_COLLECTION = "cars";
const BOOKINGS_COLLECTION = "bookings";

/**
 * Subscribe to real-time Fleet updates
 */
export function subscribeToFleet(onUpdate, onError) {
  if (db && isFirebaseConfigured()) {
    try {
      const q = collection(db, CARS_COLLECTION);
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          if (!snapshot.empty) {
            const cars = [];
            snapshot.forEach((docSnap) => {
              cars.push({ id: docSnap.id, ...docSnap.data() });
            });
            onUpdate(cars);
          }
        },
        (err) => {
          console.warn("Firestore fleet subscription error:", err);
          if (onError) onError(err);
        }
      );
      return unsubscribe;
    } catch (e) {
      console.warn("Could not attach Firestore fleet listener:", e);
    }
  }
  return () => {};
}

/**
 * Subscribe to real-time Bookings pipeline
 */
export function subscribeToBookings(onUpdate, onError) {
  if (db && isFirebaseConfigured()) {
    try {
      const q = query(collection(db, BOOKINGS_COLLECTION), orderBy("createdAt", "desc"));
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const bookings = [];
          snapshot.forEach((docSnap) => {
            bookings.push({ id: docSnap.id, ...docSnap.data() });
          });
          onUpdate(bookings);
        },
        (err) => {
          console.warn("Firestore bookings subscription error:", err);
          if (onError) onError(err);
        }
      );
      return unsubscribe;
    } catch (e) {
      console.warn("Could not attach Firestore bookings listener:", e);
    }
  }
  return () => {};
}

/**
 * Create or save a booking document to Cloud Firestore
 */
export async function saveBookingToDb(booking) {
  if (!booking || !booking.id) return null;
  if (db && isFirebaseConfigured()) {
    try {
      const docRef = doc(db, BOOKINGS_COLLECTION, booking.id);
      await setDoc(docRef, booking, { merge: true });
      return { success: true, cloud: true };
    } catch (err) {
      console.error("Firestore save booking error:", err);
      return { success: false, error: err };
    }
  }
  return { success: true, cloud: false };
}

/**
 * Update a vehicle in Cloud Firestore
 */
export async function updateCarInDb(carId, updateData) {
  if (db && isFirebaseConfigured()) {
    try {
      const docRef = doc(db, CARS_COLLECTION, carId);
      await setDoc(docRef, updateData, { merge: true });
      return { success: true };
    } catch (err) {
      console.error("Firestore update car error:", err);
      return { success: false, error: err };
    }
  }
  return { success: true, cloud: false };
}

/**
 * Update vehicle rates in Cloud Firestore
 */
export async function updateCarRateInDb(carId, rateKey, newPrice) {
  if (db && isFirebaseConfigured()) {
    try {
      const docRef = doc(db, CARS_COLLECTION, carId);
      await updateDoc(docRef, {
        [`rates.${rateKey}`]: Number(newPrice)
      });
      return { success: true };
    } catch (err) {
      console.error("Firestore update rate error:", err);
      return { success: false, error: err };
    }
  }
  return { success: true, cloud: false };
}

/**
 * Update vehicle promotional discount in Cloud Firestore
 */
export async function updateCarDiscountInDb(carId, discountPercent, promoText = "") {
  if (db && isFirebaseConfigured()) {
    try {
      const docRef = doc(db, CARS_COLLECTION, carId);
      await updateDoc(docRef, {
        discountPercent: Number(discountPercent) || 0,
        promoText: promoText || (discountPercent > 0 ? `${discountPercent}% OFF Special` : "")
      });
      return { success: true };
    } catch (err) {
      console.error("Firestore update discount error:", err);
      return { success: false, error: err };
    }
  }
  return { success: true, cloud: false };
}

/**
 * Update vehicle availability status in Cloud Firestore
 */
export async function updateCarStatusInDb(carId, status) {
  if (db && isFirebaseConfigured()) {
    try {
      const docRef = doc(db, CARS_COLLECTION, carId);
      await updateDoc(docRef, { status });
      return { success: true };
    } catch (err) {
      console.error("Firestore update status error:", err);
      return { success: false, error: err };
    }
  }
  return { success: true, cloud: false };
}

/**
 * Add a new vehicle to Cloud Firestore
 */
export async function addCarToDb(car) {
  if (!car || !car.id) return null;
  if (db && isFirebaseConfigured()) {
    try {
      const docRef = doc(db, CARS_COLLECTION, car.id);
      await setDoc(docRef, car);
      return { success: true };
    } catch (err) {
      console.error("Firestore add car error:", err);
      return { success: false, error: err };
    }
  }
  return { success: true, cloud: false };
}

/**
 * Delete a vehicle from Cloud Firestore
 */
export async function deleteCarFromDb(carId) {
  if (db && isFirebaseConfigured()) {
    try {
      const docRef = doc(db, CARS_COLLECTION, carId);
      await deleteDoc(docRef);
      return { success: true };
    } catch (err) {
      console.error("Firestore delete car error:", err);
      return { success: false, error: err };
    }
  }
  return { success: true, cloud: false };
}

/**
 * Update booking status in Cloud Firestore
 */
export async function updateBookingStatusInDb(bookingId, status) {
  if (db && isFirebaseConfigured()) {
    try {
      const docRef = doc(db, BOOKINGS_COLLECTION, bookingId);
      await updateDoc(docRef, { status });
      return { success: true };
    } catch (err) {
      console.error("Firestore update booking status error:", err);
      return { success: false, error: err };
    }
  }
  return { success: true, cloud: false };
}

/**
 * Delete booking from Cloud Firestore
 */
export async function deleteBookingFromDb(bookingId) {
  if (db && isFirebaseConfigured()) {
    try {
      const docRef = doc(db, BOOKINGS_COLLECTION, bookingId);
      await deleteDoc(docRef);
      return { success: true };
    } catch (err) {
      console.error("Firestore delete booking error:", err);
      return { success: false, error: err };
    }
  }
  return { success: true, cloud: false };
}

/**
 * Sync initial fleet to Firestore if collection is empty
 */
export async function syncInitialFleetToCloud(fleetList) {
  if (!db || !isFirebaseConfigured() || !Array.isArray(fleetList)) return;
  try {
    for (const car of fleetList) {
      const docRef = doc(db, CARS_COLLECTION, car.id);
      await setDoc(docRef, car, { merge: true });
    }
    console.log("✅ Initial fleet synchronized to Cloud Firestore.");
  } catch (err) {
    console.warn("Could not sync fleet to Firestore:", err);
  }
}
