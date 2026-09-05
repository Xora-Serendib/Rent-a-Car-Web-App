import React, { useState } from "react";
import { 
  Phone, Mail, MapPin, Clock, Send, MessageSquare, 
  CheckCircle2, Building, Plane, Globe 
} from "lucide-react";
import { companyInfo } from "../data/companyInfo";
import { WhatsAppIcon } from "./icons/WhatsAppIcon";

export default function ContactSection() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Vehicle Rental Inquiry",
    message: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 bg-brand-navy/10 text-brand-navy px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5 text-brand-gold" />
            <span>Islandwide Branch Network</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            Connect With Our Reservation Concierge
          </h2>
          <p className="text-slate-600 mt-3 text-sm sm:text-base">
            Visit our Colombo headquarters, meet our team directly at the international airport arrivals hall, or message our 24/7 reservation desk on WhatsApp.
          </p>
        </div>

        {/* Branch Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {companyInfo.branches.map((branch) => (
            <div
              key={branch.id}
              className={`p-5 rounded-3xl border transition-all ${
                branch.isPrimary 
                  ? "bg-brand-navy text-white border-brand-navy shadow-lg" 
                  : branch.isAirport
                  ? "bg-amber-500/10 border-amber-500/30 text-slate-900"
                  : "bg-slate-50 border-slate-200 text-slate-900"
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                {branch.isAirport ? (
                  <Plane className={`w-5 h-5 ${branch.isPrimary ? "text-brand-gold" : "text-amber-600"}`} />
                ) : (
                  <Building className={`w-5 h-5 ${branch.isPrimary ? "text-brand-gold" : "text-brand-navy"}`} />
                )}
                <h3 className="font-bold text-sm font-heading">{branch.name}</h3>
              </div>

              <p className={`text-xs mb-3 ${branch.isPrimary ? "text-slate-300" : "text-slate-600"}`}>
                {branch.address}
              </p>

              <div className="space-y-1.5 text-xs pt-3 border-t border-slate-200/20">
                <a 
                  href={`tel:${branch.phone}`}
                  className={`flex items-center gap-1.5 font-semibold hover:underline ${
                    branch.isPrimary ? "text-brand-gold" : "text-brand-navy"
                  }`}
                >
                  <Phone className="w-3.5 h-3.5 shrink-0" />
                  <span>{branch.phone}</span>
                </a>
                <div className={`flex items-center gap-1.5 text-[11px] ${
                  branch.isPrimary ? "text-slate-300" : "text-slate-500"
                }`}>
                  <Clock className="w-3.5 h-3.5 shrink-0" />
                  <span>{branch.hours}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Form and Map Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Inquiry Form */}
          <div className="lg:col-span-6 bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 font-heading mb-2">
              Send an Online Inquiry
            </h3>
            <p className="text-xs text-slate-600 mb-6">
              Our reservation agents typically reply within 15 minutes during daylight hours and 30 minutes overnight.
            </p>

            {formSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center text-emerald-900 space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-base">Inquiry Submitted Successfully!</h4>
                <p className="text-xs text-emerald-700">
                  Thank you, <strong>{formData.name}</strong>. Our reservation supervisor will contact you shortly via email/phone with your quotation.
                </p>
                <button
                  type="button"
                  onClick={() => setFormSubmitted(false)}
                  className="mt-2 text-xs font-bold text-emerald-800 underline"
                >
                  Submit another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. David Miller"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-navy"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-navy"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Phone / WhatsApp Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-navy"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Inquiry Purpose</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-navy cursor-pointer"
                    >
                      <option value="Self-Drive Rental">Self-Drive Car Rental</option>
                      <option value="Chauffeur Driven Tour">Chauffeur-Driven Tour</option>
                      <option value="Airport Transfer">Airport CMB Transfer</option>
                      <option value="Wedding Car Hire">Wedding / Vintage Car Hire</option>
                      <option value="Corporate Fleet Leasing">Corporate Fleet Leasing</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Message or Dates & Requirements</label>
                  <textarea
                    rows="4"
                    placeholder="Tell us about your arrival date, desired vehicle model, planned destinations, or any special requests..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl p-3.5 text-xs text-slate-900 focus:outline-none focus:border-brand-navy resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-navy hover:bg-brand-blue text-white font-bold py-3.5 px-4 rounded-xl text-xs transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry</span>
                </button>
              </form>
            )}
          </div>

          {/* Colombo Pamankada Head Office Location Card / Visual Map */}
          <div className="lg:col-span-6 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="flex items-center gap-2 text-brand-gold text-xs font-bold uppercase tracking-wider mb-2">
                <MapPin className="w-4 h-4" />
                <span>Headquarters & Garage • 5.0★ Google Rated</span>
              </div>
              <h3 className="text-2xl font-bold font-heading mb-2">
                134/3 E/6 Polgasowita Rd, Piliyandala 10230
              </h3>
              <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                Conveniently located on Polgasowita Road, Piliyandala with fast connection to Kesbewa, Maharagama, Mount Lavinia, and the Southern Expressway (Kahathuduwa/Kottawa interchanges) for rapid islandwide car dispatch.
              </p>

              <div className="mb-5">
                <a
                  href={companyInfo.contacts.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-semibold underline"
                >
                  <span>Open 134/3 Polgasowita Rd on Google Maps</span>
                  <MapPin className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Contact Pills */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-xs bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                  <Phone className="w-4 h-4 text-brand-gold shrink-0" />
                  <span>24-Hour Hotline / WhatsApp: <strong>{companyInfo.contacts.hotlineDisplay}</strong></span>
                </div>
                <div className="flex items-center gap-3 text-xs bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                  <Clock className="w-4 h-4 text-brand-gold shrink-0" />
                  <span>Operating Hours: <strong>Open 24 Hours / 7 Days</strong></span>
                </div>
              </div>
            </div>

            {/* Visual Route Link */}
            <div className="bg-slate-800/90 rounded-2xl p-4 border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-center sm:text-left">
                <span className="text-xs font-bold text-white block">Need Directions or Airport Pickup?</span>
                <span className="text-[11px] text-slate-400">Our chauffeurs can pick you up anywhere islandwide</span>
              </div>
              <a
                href={`https://wa.me/${companyInfo.contacts.whatsapp}?text=${encodeURIComponent("Hello Danusha Rent a car! I need directions or transfer service.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs py-2 px-4 rounded-xl flex items-center gap-2 shrink-0 transition-all shadow-md shadow-emerald-900/20"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
