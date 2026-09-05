import { 
  Car, Phone, Mail, MapPin, Clock, ShieldCheck, 
  Award, Heart, ChevronRight, CreditCard 
} from "lucide-react";
import { companyInfo } from "../data/companyInfo";
import { WhatsAppIcon } from "./icons/WhatsAppIcon";

export default function Footer({ onOpenBookingModal }) {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      
      {/* Top Value Banner */}
      <div className="bg-brand-navy/60 border-b border-slate-800 py-8 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-2xl bg-brand-gold text-slate-950 flex items-center justify-center shrink-0 shadow-lg">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base font-heading">
                Danusha Rent A Car — 5.0★ Google Rated Agency
              </h4>
              <p className="text-slate-300 text-xs mt-0.5">
                32 Verified 5-Star Reviews • 134/3 E/6 Polgasowita Rd, Piliyandala • Managed Directly by Mr. Danusha
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onOpenBookingModal()}
              className="bg-brand-gold hover:bg-amber-400 text-slate-950 font-bold px-6 py-3 rounded-xl text-xs shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
            >
              Book Service Online 24/7
            </button>
            <a
              href={`https://wa.me/${companyInfo.contacts.whatsapp}?text=${encodeURIComponent("Hello Danusha Rent a car! I would like to inquire about booking a vehicle.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20ba59] text-white font-bold px-5 py-3 rounded-xl text-xs shadow-lg shadow-emerald-900/30 transition-all flex items-center gap-2"
            >
              <WhatsAppIcon className="w-4 h-4 fill-current" />
              <span>WhatsApp Us (074 252 6538)</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-brand-gold flex items-center justify-center text-slate-950 font-bold">
                <Car className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-white font-heading tracking-tight">
                DANUSHA<span className="text-brand-gold">CARS</span>
              </span>
            </a>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Danusha Rent a car is a 5.0★ Google-rated vehicle rental agency based in Piliyandala, Sri Lanka. Managed with personal care by Mr. Danusha, delivering clean, reliable cars with transparent rates and 24/7 support.
            </p>

            <div className="pt-2 space-y-1.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                <span>Hotline: <strong className="text-white">{companyInfo.contacts.hotlineDisplay}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                <span>Email: <strong className="text-white">{companyInfo.contacts.email}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                <span>Airport Counter: <strong className="text-white">Open 24/7, 365 Days</strong></span>
              </div>
            </div>
          </div>

          {/* Col 2: Fleet Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider font-heading">
              Vehicle Categories
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#fleet" className="hover:text-brand-gold transition-colors">General & Economy Cars</a></li>
              <li><a href="#fleet" className="hover:text-brand-gold transition-colors">Premium Sedans & Hybrids</a></li>
              <li><a href="#fleet" className="hover:text-brand-gold transition-colors">Mercedes & BMW Luxury</a></li>
              <li><a href="#fleet" className="hover:text-brand-gold transition-colors">Toyota Prado & 4WD SUVs</a></li>
              <li><a href="#fleet" className="hover:text-brand-gold transition-colors">Passenger Vans (HiAce KDH)</a></li>
              <li><a href="#fleet" className="hover:text-brand-gold transition-colors">Classic & Wedding Cars</a></li>
              <li><a href="#fleet" className="hover:text-brand-gold transition-colors">Safari Tuk-Tuks / Auto Rickshaw</a></li>
            </ul>
          </div>

          {/* Col 3: Services & Tours */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider font-heading">
              Services & Tours
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#services" className="hover:text-brand-gold transition-colors">Self-Drive Rentals</a></li>
              <li><a href="#services" className="hover:text-brand-gold transition-colors">Chauffeur-Driven Tours</a></li>
              <li><a href="#services" className="hover:text-brand-gold transition-colors">Airport CMB Meet & Greet</a></li>
              <li><a href="#services" className="hover:text-brand-gold transition-colors">Wedding Limousines</a></li>
              <li><a href="#services" className="hover:text-brand-gold transition-colors">Corporate Fleet Leasing</a></li>
              <li><a href="#tours" className="hover:text-brand-gold transition-colors">Cultural Triangle Tour</a></li>
              <li><a href="#tours" className="hover:text-brand-gold transition-colors">Hill Country Tea Circuit</a></li>
            </ul>
          </div>

          {/* Col 4: Branch Offices */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider font-heading">
              Branch Offices
            </h4>
            <div className="space-y-3 text-xs">
              <div>
                <strong className="text-white block">Piliyandala Head Office:</strong>
                <span>134/3 E/6 Polgasowita Rd, Piliyandala 10230</span>
              </div>
              <div>
                <strong className="text-white block">Airport Counter (BIA):</strong>
                <span>24/7 Meet & Greet Delivery at Katunayake</span>
              </div>
              <div>
                <strong className="text-white block">Colombo & Suburbs:</strong>
                <span>Serving Piliyandala, Kesbewa, Maharagama & Mount Lavinia</span>
              </div>
              <div>
                <strong className="text-white block">Southern Expressway Link:</strong>
                <span>Kahathuduwa & Kottawa Interchanges for Islandwide Delivery</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Payment & Copyright */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-400 text-[11px]">
          <div>
            © {new Date().getFullYear()} Danusha Rent a car. All rights reserved. 
            <span className="block sm:inline sm:ml-1 font-semibold text-brand-gold">5.0 ★ Google Rated (32 Reviews) • 134/3 Polgasowita Rd, Piliyandala</span>
          </div>

          <div className="flex items-center gap-4 flex-wrap justify-center">
            <div className="flex items-center gap-2 text-slate-300">
              <span className="text-slate-400">Accepted:</span>
              <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800">Visa</span>
              <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800">Mastercard</span>
              <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800">Amex</span>
              <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800">Bank Transfer</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
