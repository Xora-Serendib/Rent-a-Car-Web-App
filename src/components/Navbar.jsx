import React, { useState, useEffect } from "react";
import { 
  Phone, MessageSquare, Clock, Globe, Menu, X, ChevronDown, 
  Car, Shield, Award, Calendar, HelpCircle, MapPin
} from "lucide-react";
import { companyInfo } from "../data/companyInfo";
import { currencies } from "../utils/currency";
import { WhatsAppIcon } from "./icons/WhatsAppIcon";

export default function Navbar({ selectedCurrency, onCurrencyChange, onOpenBookingModal, onOpenAdminPortal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [fleetDropdownOpen, setFleetDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Notification / Hotline Bar */}
      <div className="bg-brand-dark text-slate-200 border-b border-slate-800 text-xs py-2 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Left: Hotline & 24/7 Status */}
          <div className="flex items-center gap-4 flex-wrap">
            <a 
              href={`tel:${companyInfo.contacts.hotline}`} 
              className="flex items-center gap-1.5 hover:text-brand-gold transition-colors font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-brand-gold animate-pulse" />
              <span>24/7 Hotline:</span>
              <span className="font-bold text-white tracking-wide">{companyInfo.contacts.hotlineDisplay}</span>
            </a>
            <span className="hidden md:inline text-slate-600">|</span>
            <a 
              href={`https://wa.me/${companyInfo.contacts.whatsapp}?text=${encodeURIComponent("Hello Danusha Rent a car! I would like to inquire about vehicle hire in Sri Lanka.")}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 fill-current text-[#25D366]" />
              <span>WhatsApp Reservations</span>
            </a>
            <span className="hidden lg:inline text-slate-600">|</span>
            <span className="hidden lg:flex items-center gap-1 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-brand-gold" />
              <span>Airport Desk Open 24/7</span>
            </span>
          </div>

          {/* Right: Currency Selector & Tourist Board Badge */}
          <div className="flex items-center gap-4 ml-auto">
            <a 
              href={companyInfo.contacts.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-[11px] bg-slate-800 text-brand-gold px-2.5 py-0.5 rounded-full border border-slate-700 font-medium hover:border-brand-gold transition-colors"
            >
              <span>★ 5.0 Google Rated (32 Reviews)</span>
            </a>

            {/* Currency Selector */}
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-2 py-1 rounded-md border border-slate-700">
              <Globe className="w-3.5 h-3.5 text-brand-gold" />
              <select 
                value={selectedCurrency}
                onChange={(e) => onCurrencyChange(e.target.value)}
                className="bg-transparent text-white text-xs font-semibold focus:outline-none cursor-pointer"
                title="Select Display Currency"
              >
                {Object.values(currencies).map((curr) => (
                  <option key={curr.code} value={curr.code} className="bg-slate-900 text-white">
                    {curr.code} ({curr.symbol})
                  </option>
                ))}
              </select>
            </div>

            {/* Owner Portal Quick Access */}
            <button
              type="button"
              onClick={() => onOpenAdminPortal && onOpenAdminPortal()}
              className="inline-flex items-center gap-1.5 text-[11px] bg-amber-500/10 hover:bg-amber-500/25 text-amber-400 px-2.5 py-1 rounded-md border border-amber-500/30 font-semibold transition-all cursor-pointer shadow-sm"
              title="Authorized Owner Login (Mr. Danusha)"
            >
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              <span>Owner Portal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className={`w-full px-4 sm:px-8 transition-all duration-300 ${
        isScrolled 
          ? "bg-brand-navy/95 backdrop-blur-md shadow-xl py-3 border-b border-brand-blue/30" 
          : "bg-brand-navy py-4 border-b border-white/10"
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo & Brand Identity */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-gold to-amber-300 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <Car className="w-6 h-6 text-brand-dark" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white font-heading">
                  DANUSHA<span className="text-brand-gold">CARS</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-brand-gold/20 text-brand-gold px-1.5 py-0.5 rounded">
                  Piliyandala
                </span>
              </div>
              <p className="text-[10px] text-slate-300 font-medium hidden sm:block tracking-wide">
                5.0★ Rated Vehicle Rental • 134/3 Polgasowita Rd
              </p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-100">
            <a href="#home" className="hover:text-brand-gold transition-colors py-2">
              Home
            </a>

            {/* Fleet with Dropdown */}
            <div 
              className="relative py-2"
              onMouseEnter={() => setFleetDropdownOpen(true)}
              onMouseLeave={() => setFleetDropdownOpen(false)}
            >
              <a 
                href="#fleet" 
                className="flex items-center gap-1 hover:text-brand-gold transition-colors"
              >
                <span>Vehicle Fleet</span>
                <ChevronDown className="w-4 h-4 opacity-70" />
              </a>

              {fleetDropdownOpen && (
                <div className="absolute top-full left-0 w-64 bg-slate-900 border border-slate-700/80 rounded-xl shadow-2xl py-2 px-1 text-xs animate-in fade-in slide-in-from-top-2 duration-200">
                  <a href="#fleet" className="block px-3 py-2 text-slate-200 hover:bg-brand-blue hover:text-white rounded-lg transition-colors font-medium">
                    All Vehicles (Overview)
                  </a>
                  <a href="#fleet" className="block px-3 py-2 text-slate-200 hover:bg-brand-blue hover:text-white rounded-lg transition-colors">
                    Economy & General Cars (Alto, Vitz)
                  </a>
                  <a href="#fleet" className="block px-3 py-2 text-slate-200 hover:bg-brand-blue hover:text-white rounded-lg transition-colors">
                    Premium Sedans (Axio, Premio)
                  </a>
                  <a href="#fleet" className="block px-3 py-2 text-slate-200 hover:bg-brand-blue hover:text-white rounded-lg transition-colors">
                    Luxury & VIP (Mercedes-Benz, BMW)
                  </a>
                  <a href="#fleet" className="block px-3 py-2 text-slate-200 hover:bg-brand-blue hover:text-white rounded-lg transition-colors">
                    4WD & SUVs (Land Cruiser Prado, Fortuner)
                  </a>
                  <a href="#fleet" className="block px-3 py-2 text-slate-200 hover:bg-brand-blue hover:text-white rounded-lg transition-colors">
                    Vans & MPVs (Toyota HiAce KDH, Alphard)
                  </a>
                  <a href="#fleet" className="block px-3 py-2 text-slate-200 hover:bg-brand-blue hover:text-white rounded-lg transition-colors">
                    Classic & Vintage Wedding Cars
                  </a>
                  <a href="#fleet" className="block px-3 py-2 text-slate-200 hover:bg-brand-blue hover:text-white rounded-lg transition-colors">
                    Safari Tuk-Tuks / Three Wheelers
                  </a>
                </div>
              )}
            </div>

            <a href="#services" className="hover:text-brand-gold transition-colors py-2">
              Services
            </a>

            <a href="#calculator" className="hover:text-brand-gold transition-colors py-2">
              Rates Calculator
            </a>

            <a href="#tours" className="hover:text-brand-gold transition-colors py-2">
              Explore Sri Lanka
            </a>

            <a href="#guide" className="hover:text-brand-gold transition-colors py-2">
              Driving Guide & FAQ
            </a>

            <a href="#reviews" className="text-amber-300 hover:text-brand-gold transition-colors py-2 flex items-center gap-1 font-semibold">
              <span>Reviews</span>
              <span className="bg-amber-400/20 text-brand-gold text-[10px] px-1.5 py-0.5 rounded font-bold">5.0★</span>
            </a>

            <a href="#contact" className="hover:text-brand-gold transition-colors py-2">
              Contact Us
            </a>
          </div>

          {/* Desktop Right CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => onOpenBookingModal()}
              className="bg-gradient-to-r from-brand-gold to-amber-500 hover:from-amber-400 hover:to-brand-gold text-slate-950 font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/35 hover:-translate-y-0.5 transition-all text-sm flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Online 24/7</span>
            </button>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => onOpenBookingModal()}
              className="bg-brand-gold text-slate-950 font-bold px-3 py-1.5 rounded-lg text-xs"
            >
              Book Now
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:text-brand-gold transition-colors rounded-lg bg-slate-800/80 border border-slate-700"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-slate-700/80 pb-3 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
            <a 
              href="#home" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 text-white font-medium rounded-lg hover:bg-white/10"
            >
              Home
            </a>
            <a 
              href="#fleet" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 text-white font-medium rounded-lg hover:bg-white/10"
            >
              Vehicle Fleet & Rates
            </a>
            <a 
              href="#services" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 text-white font-medium rounded-lg hover:bg-white/10"
            >
              Services (Self-Drive & Chauffeur)
            </a>
            <a 
              href="#calculator" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 text-white font-medium rounded-lg hover:bg-white/10"
            >
              Live Rate Calculator
            </a>
            <a 
              href="#tours" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 text-white font-medium rounded-lg hover:bg-white/10"
            >
              Sri Lanka Tour Itineraries
            </a>
            <a 
              href="#guide" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 text-white font-medium rounded-lg hover:bg-white/10"
            >
              Driving Guide & FAQ
            </a>
            <a 
              href="#contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 text-white font-medium rounded-lg hover:bg-white/10"
            >
              Branch Offices & Contact
            </a>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenAdminPortal) onOpenAdminPortal();
              }}
              className="w-full text-left px-4 py-2.5 text-amber-400 font-semibold rounded-lg bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Shield className="w-4 h-4 text-amber-400" />
              <span>Owner Portal (Authorized Access)</span>
            </button>

            <div className="pt-4 px-3 flex flex-col gap-2">
              <a 
                href={`tel:${companyInfo.contacts.hotline}`}
                className="w-full text-center py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-sm flex items-center justify-center gap-2 border border-slate-700"
              >
                <Phone className="w-4 h-4 text-brand-gold" />
                <span>Call Hotline: {companyInfo.contacts.hotlineDisplay}</span>
              </a>
              <a 
                href={`https://wa.me/${companyInfo.contacts.whatsapp}?text=${encodeURIComponent("Hello Danusha Rent a car! I would like to inquire about vehicle availability.")}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full text-center py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold rounded-xl text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-900/30"
              >
                <WhatsAppIcon className="w-4 h-4 fill-current" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
