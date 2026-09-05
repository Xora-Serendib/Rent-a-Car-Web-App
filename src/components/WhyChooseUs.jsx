import React from "react";
import { 
  ShieldCheck, Award, Clock, Wrench, FileCheck, 
  Smile, Star, Heart, CheckCircle2 
} from "lucide-react";
import { companyInfo } from "../data/companyInfo";

export default function WhyChooseUs() {
  const points = [
    {
      icon: Award,
      title: "30+ Years of Proven Excellence",
      desc: "Operating continuously since 1992, we are among Sri Lanka's most established, trusted, and tourist-board approved fleet providers."
    },
    {
      icon: Wrench,
      title: "24/7 Islandwide Breakdown Response",
      desc: "Our nationwide technical network ensures fast roadside assistance. If an issue cannot be resolved swiftly, a replacement vehicle is dispatched immediately."
    },
    {
      icon: ShieldCheck,
      title: "Full Comprehensive Insurance",
      desc: "All vehicles carry comprehensive passenger and third-party insurance with optional Collision Damage Waiver (CDW) for zero excess anxiety."
    },
    {
      icon: FileCheck,
      title: "Zero Hidden Costs & Fair Fuel",
      desc: "All mileage allowances, refundable deposits, and taxes are clearly documented upfront. Transparent same-to-same fuel policy on every hire."
    },
    {
      icon: Clock,
      title: "24/7 Airport Meet & Greet",
      desc: "Flight delayed? No worries. Our airport service concierges monitor live flight radars at BIA Katunayake so your vehicle is ready whenever you land."
    },
    {
      icon: Smile,
      title: "AAC Driving License Support",
      desc: "We handle the bureaucratic paperwork for your Automobile Association of Ceylon (AAC) foreign driving permit endorsement before your arrival."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-gold-dark" />
            <span>Uncompromising Quality</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            Why Travelers & Businesses Choose Us
          </h2>
          <p className="text-slate-600 mt-3 text-sm sm:text-base">
            Renting a car in a foreign country requires total trust. We combine international safety standards with warm Sri Lankan hospitality.
          </p>
        </div>

        {/* 6 Key Pillars Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {points.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-brand-navy/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-navy text-brand-gold flex items-center justify-center mb-5 shadow-md">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-heading mb-2">
                  {p.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Customer Trust Quote Banner */}
        <div className="mt-16 bg-gradient-to-r from-brand-navy via-brand-blue to-brand-navy rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-1 text-brand-gold">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-brand-gold" />
              ))}
              <span className="ml-2 text-xs font-bold text-white">4.9 / 5.0 on Google Reviews (2,400+ reviews)</span>
            </div>
            <h3 className="text-2xl font-bold font-heading">
              "Flawless service from BIA airport pickup all the way to Galle!"
            </h3>
            <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
              "We rented a Toyota Axio Hybrid for 12 days driving through Kandy, Nuwara Eliya, Ella and down to Mirissa. The car was spotless, super economical on fuel, and the team had our AAC endorsement ready at the airport. Highly recommended!"
            </p>
            <div className="text-xs text-brand-gold font-semibold">
              — Mark & Sophie Henderson (Melbourne, Australia)
            </div>
          </div>

          <div className="shrink-0 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-center">
            <div className="text-4xl font-black text-brand-gold font-heading">100%</div>
            <div className="text-xs font-semibold text-slate-200 mt-1 uppercase tracking-wider">Fleet Insured</div>
            <div className="text-[11px] text-slate-300 mt-2">ISO 9001:2015 Certified</div>
          </div>
        </div>

      </div>
    </section>
  );
}
