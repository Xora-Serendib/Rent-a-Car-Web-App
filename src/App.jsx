import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FleetShowcase from "./components/FleetShowcase";
import RateCalculator from "./components/RateCalculator";
import Services from "./components/Services";
import SriLankaTours from "./components/SriLankaTours";
import WhyChooseUs from "./components/WhyChooseUs";
import GoogleReviews from "./components/GoogleReviews";
import DrivingGuide from "./components/DrivingGuide";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import VehicleModal from "./components/VehicleModal";
import BookingModal from "./components/BookingModal";
import FloatingActions from "./components/FloatingActions";
import { useData } from "./context/DataContext";

export default function App() {
  const { fleet, addBooking } = useData();
  const [selectedCurrency, setSelectedCurrency] = useState("LKR");
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedVehicleForModal, setSelectedVehicleForModal] = useState(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingPrefill, setBookingPrefill] = useState({});

  // 1. From Hero Search
  const handleHeroSearchSubmit = (searchParams) => {
    // If specific category chosen, apply filter
    if (searchParams.selectedCategory && searchParams.selectedCategory !== "all") {
      setActiveCategory(searchParams.selectedCategory);
    }
    
    // Set prefilled data for when user books
    setBookingPrefill({
      serviceType: searchParams.serviceType,
      pickupLocation: searchParams.pickupLocation,
      dropoffLocation: searchParams.dropoffLocation,
      pickupDate: searchParams.pickupDate,
      dropoffDate: searchParams.dropoffDate,
      pickupTime: searchParams.pickupTime,
      dropoffTime: searchParams.dropoffTime,
      rentalDays: searchParams.rentalDays
    });

    // Smooth scroll down to fleet section
    const fleetSection = document.getElementById("fleet");
    if (fleetSection) {
      fleetSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // 2. Direct quick booking open
  const handleOpenQuickBook = (data = {}) => {
    setBookingPrefill((prev) => ({ ...prev, ...data }));
    setBookingModalOpen(true);
  };

  // 3. Book specific vehicle from card
  const handleBookVehicle = (car, mode = "self-drive") => {
    setBookingPrefill((prev) => ({
      ...prev,
      car,
      selectedVehicleId: car.id,
      hireMode: mode,
      serviceType: mode
    }));
    setBookingModalOpen(true);
  };

  // 4. Book with estimated calculation
  const handleBookWithEstimate = (estimateData) => {
    setBookingPrefill((prev) => ({
      ...prev,
      car: estimateData.car,
      selectedVehicleId: estimateData.car.id,
      hireMode: estimateData.hireMode,
      serviceType: estimateData.hireMode,
      rentalDays: estimateData.rentalDays,
      addOns: estimateData.addOns
    }));
    setBookingModalOpen(true);
  };

  // 5. Select Tour Package
  const handleSelectTour = (tour) => {
    // find a recommended vehicle
    const matchedCar = fleet.find((c) => 
      tour.recommendedVehicles.some((rv) => c.name.toLowerCase().includes(rv.toLowerCase()))
    ) || fleet[0];

    setBookingPrefill((prev) => ({
      ...prev,
      car: matchedCar,
      selectedVehicleId: matchedCar?.id,
      serviceType: "with-driver",
      hireMode: "with-driver",
      notes: `Interested in the "${tour.title}" (${tour.duration}) tour route.`
    }));
    setBookingModalOpen(true);
  };

  // 6. Select Service from Services section
  const handleSelectService = (svc) => {
    if (svc.id === "self-drive") {
      setBookingPrefill((prev) => ({ ...prev, serviceType: "self-drive", hireMode: "self-drive" }));
      setActiveCategory("all");
      const fleetSec = document.getElementById("fleet");
      if (fleetSec) fleetSec.scrollIntoView({ behavior: "smooth" });
    } else if (svc.id === "with-driver") {
      setBookingPrefill((prev) => ({ ...prev, serviceType: "with-driver", hireMode: "with-driver" }));
      setActiveCategory("all");
      const fleetSec = document.getElementById("fleet");
      if (fleetSec) fleetSec.scrollIntoView({ behavior: "smooth" });
    } else if (svc.id === "weddings-events") {
      setActiveCategory("vintage");
      setBookingPrefill((prev) => ({ ...prev, serviceType: "wedding", notes: "Wedding car hire inquiry" }));
      const fleetSec = document.getElementById("fleet");
      if (fleetSec) fleetSec.scrollIntoView({ behavior: "smooth" });
    } else {
      setBookingPrefill((prev) => ({
        ...prev,
        notes: `Inquiry regarding ${svc.title}`
      }));
      setBookingModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-brand-gold selection:text-slate-950 font-sans">
      
      {/* Global Navbar */}
      <Navbar 
        selectedCurrency={selectedCurrency}
        onCurrencyChange={setSelectedCurrency}
        onOpenBookingModal={() => handleOpenQuickBook()}
        onOpenAdminPortal={() => setAdminPortalOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Section & Quick Booking Engine */}
        <Hero 
          onSearchSubmit={handleHeroSearchSubmit}
          onQuickBook={handleOpenQuickBook}
        />

        {/* Fleet Showcase & Filter Matrix */}
        <FleetShowcase 
          fleet={fleet}
          selectedCurrency={selectedCurrency}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          onSelectVehicle={(car) => setSelectedVehicleForModal(car)}
          onBookVehicle={handleBookVehicle}
        />

        {/* Live Rate Calculator */}
        <RateCalculator 
          fleet={fleet}
          selectedCurrency={selectedCurrency}
          onBookWithEstimate={handleBookWithEstimate}
        />

        {/* Tailored Services */}
        <Services 
          onSelectService={handleSelectService}
        />

        {/* Curated Sri Lanka Driving Tours */}
        <SriLankaTours 
          onSelectTour={handleSelectTour}
        />

        {/* Verified 5.0 Google Reviews (32 Reviews) */}
        <GoogleReviews />

        {/* Trust, Credentials & Highlights */}
        <WhyChooseUs />

        {/* Sri Lanka Driving Guide, AAC Permits & FAQs */}
        <DrivingGuide />

        {/* Branch Locations & Contact Form */}
        <ContactSection />
      </main>

      {/* Global Footer */}
      <Footer 
        onOpenBookingModal={() => handleOpenQuickBook()}
      />

      {/* Full Vehicle Specs Modal */}
      {selectedVehicleForModal && (
        <VehicleModal 
          vehicle={selectedVehicleForModal}
          selectedCurrency={selectedCurrency}
          onClose={() => setSelectedVehicleForModal(null)}
          onBook={(car, mode) => {
            setSelectedVehicleForModal(null);
            handleBookVehicle(car, mode);
          }}
        />
      )}

      {/* Multi-Step Booking / Quick Inquiry Modal */}
      {bookingModalOpen && (
        <BookingModal 
          isOpen={bookingModalOpen}
          onClose={() => setBookingModalOpen(false)}
          selectedCurrency={selectedCurrency}
          prefilledData={bookingPrefill}
          fleet={fleet}
          onBookingCreated={(b) => addBooking(b)}
        />
      )}

      {/* Floating WhatsApp, Hotline & Scroll Top Action Buttons */}
      <FloatingActions />

    </div>
  );
}
