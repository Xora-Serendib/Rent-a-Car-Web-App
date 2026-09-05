# Ceylon Prime Rent A Car — Web Application

A premier, high-converting car rental, chauffeur-driven tour, and fleet management web application inspired by Sri Lanka's leading vehicle rental service ([malkey.lk](https://www.malkey.lk/)).

---

## 🌟 Key Features

1. **Instant Search & Booking Widget (Hero)**:
   - Tabbed services: **Self-Drive**, **With Chauffeur**, **Airport Transfer (BIA CMB)**, and **Weddings & VIP**.
   - Dynamic pickup and drop-off locations across Sri Lanka.
   - Automatic duration and live price preview.

2. **Complete Fleet Catalog & Filter Engine**:
   - Filter categories: Economy/General, Premium Sedans, Luxury & VIP (Mercedes/BMW), 4WD & SUVs (Land Cruiser Prado, Fortuner), Passenger Vans (Toyota HiAce KDH), Classic/Vintage Wedding Cars, and Safari Tuk-Tuks.
   - Real-time rate toggle: **Self-Drive** vs **Chauffeur-Driven**.
   - Detailed specification pills: Passengers, luggage, transmission, fuel, and air conditioning.
   - Live multi-currency support: **LKR (Rs.)**, **USD ($)**, **EUR (€)**, **GBP (£)**, and **AUD (A$)**.

3. **Live Interactive Rate & Cost Calculator**:
   - Interactive slider for rental duration (1 to 30 days) with automatic weekly (-8%) and monthly (-15%) discounts.
   - Add-on toggles: Collision Damage Waiver (CDW / Zero Excess), Child Safety Seat, Garmin GPS, Additional Driver, and AAC Sri Lanka driving endorsement assistance.
   - Itemized transparent cost calculation with zero hidden fees.

4. **Multi-Step Online Booking & WhatsApp Synchronization**:
   - Step 1: Vehicle & Rental Logistics.
   - Step 2: Extras & Insurance Coverage.
   - Step 3: Customer Information & Flight Number tracking.
   - One-click **"Send to WhatsApp Desk"** generating a pre-formatted, detailed reservation message directly to the company WhatsApp hotline.

5. **Tourist Driving Guide & FAQs**:
   - Legal requirements for foreign driving licenses and IDPs in Sri Lanka.
   - Automobile Association of Ceylon (AAC) temporary endorsement guide.
   - Frequently Asked Questions accordion (mileage limits, fuel policy, security deposits, road laws).

6. **Curated Sri Lanka Travel Itineraries**:
   - Cultural Triangle & Ancient Kingdoms (Sigiriya, Dambulla, Polonnaruwa).
   - Misty Highlands & Tea Country (Kandy, Nuwara Eliya, Ella).
   - Golden Southern Coastline & Galle Fort.
   - Wildlife Safari Expeditions (Yala, Udawalawe).

---

## 🚀 Quick Start Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher)
- npm or pnpm

### Run Locally
```bash
# Navigate to the project directory
cd car-rental-website

# Start the Vite local development server
npm.cmd run dev
```
Open your browser at `http://localhost:3000` (or the URL printed in the terminal).

### Production Build
```bash
npm.cmd run build
```
The optimized, static production files will be output to the `dist/` directory, ready to deploy to Vercel, Netlify, Cloudflare Pages, Firebase Hosting, or any standard web server.

---

## 🎨 Easy Customization & Rebranding

All company details, fleet vehicles, rates, and services are decoupled into clean, editable JavaScript data files inside `src/data/`:

- **`src/data/companyInfo.js`**: Update company name, phone numbers, WhatsApp hotline, email addresses, office locations, and accreditation badges.
- **`src/data/fleetData.js`**: Add, edit, or remove vehicles, specifications, daily/weekly rates, excess mileage fees, and photos.
- **`src/data/servicesData.js`**: Customize company service offerings and features.
- **`src/data/toursData.js`**: Modify tour packages, driving routes, and recommended vehicle types.
- **`src/data/faqsData.js`**: Update rental terms, payment rules, and questions.
- **`src/utils/currency.js`**: Adjust live currency exchange rates or add new currencies.
