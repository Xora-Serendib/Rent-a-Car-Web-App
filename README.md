# Danusha Rent A Car — Customer Booking Web Application

5.0★ Google Rated (32 Reviews) • 134/3 Polgasowita Rd, Piliyandala • Hotline: 074 252 6538

A premier, mobile-first car rental booking platform built with **React**, **Vite**, **Tailwind CSS**, **Leaflet Maps**, and **Google Cloud Firestore (Firebase Free Spark Plan)**.

---

## 🌟 Key Features

1. **Any Location in Sri Lanka & Any Way to Go**:
   - Interactive Leaflet map with Google Road & Satellite Hybrid tiles.
   - Search 40+ destinations across all 9 provinces or click anywhere on the island.
   - Draggable pins for custom pick-up and drop-off points.
   - 3 Route preferences: 🚀 **Expressway (Fastest)**, 🌊 **Coastal Highway**, ⛰️ **Hill Country & Scenic Byways**.
   - Add intermediate stopovers / waypoints.
   - Real-time road distance in **KM**, duration, and expressway toll estimates.
2. **Real-Time Fleet & Rates**:
   - Filter by category: Economy, Sedans, Luxury, SUVs, Vans, Wedding cars.
   - Live availability badges: `Available Now`, `Currently on Hire`, `Maintenance`.
   - Real-time price updates synced directly from Mr. Danusha's Owner Admin Portal via Firebase Firestore.
3. **Multi-Step Booking Survey & PDF Voucher**:
   - 3-step customer survey gathering travel details, license status, and party size.
   - Automatically downloads official A4 PDF booking voucher.
   - Automatically launches WhatsApp to Mr. Danusha (`074 252 6538`) with the pre-formatted reservation.
4. **Mobile & Device Responsive**:
   - Pixel-perfect layout across iPhones, Android phones, tablets (iPads), and desktop monitors.

---

## 🚀 How to Push to Your GitHub

Open PowerShell or Command Prompt inside `E:\Projects\danusha-rent-a-car`:

```bash
# 1. Create a new repository on your GitHub named "danusha-rent-a-car"
# 2. Add your GitHub remote (replace <YOUR_GITHUB_USERNAME> with your GitHub handle):
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/danusha-rent-a-car.git

# 3. Push to GitHub:
git branch -M main
git push -u origin main
```

---

## ☁️ How to Host on Vercel (100% Free)

1. Go to [https://vercel.com/](https://vercel.com/) and log in with your GitHub account.
2. Click **"Add New..."** → **"Project"**.
3. Select your `danusha-rent-a-car` repository and click **"Import"**.
4. Framework Preset will automatically detect **Vite**.
5. *(Optional)* In **Environment Variables**, add your Firebase keys if you have set up a free Firebase project:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
6. Click **"Deploy"**. Your customer website will be live in ~30 seconds!

---

## 🛠️ Local Development

```bash
# Install dependencies
npm.cmd install

# Start local dev server (port 3000)
npm.cmd run dev

# Build for production
npm.cmd run build
```
