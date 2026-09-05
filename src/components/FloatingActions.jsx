import React, { useState, useEffect } from "react";
import { Phone, ArrowUp } from "lucide-react";
import { companyInfo } from "../data/companyInfo";
import { WhatsAppIcon } from "./icons/WhatsAppIcon";

export default function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 right-5 z-40 flex flex-col items-end gap-3 pointer-events-none">
      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="pointer-events-auto p-3 rounded-full bg-slate-900/90 hover:bg-slate-900 text-white shadow-xl transition-all hover:-translate-y-1 border border-slate-700 backdrop-blur-md cursor-pointer"
          title="Scroll to Top"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Direct Call Button (Mobile visible) */}
      <a
        href={`tel:${companyInfo.contacts.hotline}`}
        className="pointer-events-auto sm:hidden flex items-center justify-center w-12 h-12 rounded-full bg-brand-navy hover:bg-brand-blue text-white shadow-xl transition-all hover:scale-105 border border-white/20"
        title="Call 24/7 Hotline"
        aria-label="Call 24/7 Hotline"
      >
        <Phone className="w-5 h-5 text-brand-gold animate-pulse" />
      </a>

      {/* Floating WhatsApp Action with message badge */}
      <a
        href={`https://wa.me/${companyInfo.contacts.whatsapp}?text=${encodeURIComponent("Hello Danusha Rent a car! I would like to inquire about vehicle rates and availability.")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto group flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white pl-3.5 pr-4 py-2.5 rounded-full shadow-2xl transition-all hover:scale-105 hover:shadow-emerald-600/40"
        title="Chat with Mr. Danusha on WhatsApp (074 252 6538)"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
        <WhatsAppIcon className="w-5 h-5 fill-current" />
        <span className="text-xs font-bold font-heading hidden md:inline">
          WhatsApp Us
        </span>
      </a>
    </div>
  );
}
