import React from "react";
import { 
  Map, Compass, Clock, Navigation, CheckCircle2, 
  ArrowRight, Mountain, Car 
} from "lucide-react";
import { toursData } from "../data/toursData";

export default function SriLankaTours({ onSelectTour }) {
  return (
    <section id="tours" className="py-20 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 bg-brand-gold/15 text-brand-gold px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 border border-brand-gold/30">
            <Compass className="w-3.5 h-3.5 text-brand-gold" />
            <span>Curated Driving Itineraries</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
            Discover Sri Lanka Behind The Wheel
          </h2>
          <p className="text-slate-400 mt-3 text-sm sm:text-base">
            From high-speed coastal expressways to ancient rock fortresses and mist-shrouded mountain switchbacks. Rent the ideal car tailored to your dream route.
          </p>
        </div>

        {/* Tours Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {toursData.map((tour) => (
            <div
              key={tour.id}
              className="bg-slate-800/80 rounded-3xl border border-slate-700/80 overflow-hidden hover:border-slate-600 transition-all duration-300 flex flex-col group shadow-xl"
            >
              {/* Image Banner */}
              <div className="relative h-56 w-full overflow-hidden bg-slate-950">
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                
                {/* Distance & Duration Tags */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="bg-slate-950/80 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/10 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-brand-gold" />
                    <span>{tour.duration}</span>
                  </span>
                  <span className="bg-brand-navy/80 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/10 flex items-center gap-1">
                    <Navigation className="w-3.5 h-3.5 text-brand-gold" />
                    <span>{tour.distance}</span>
                  </span>
                </div>

                <div className="absolute bottom-4 left-6 right-6">
                  <h3 className="text-xl font-bold text-white font-heading">{tour.title}</h3>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {tour.description}
                </p>

                {/* Highlights */}
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-gold block mb-2">
                    Key Route Highlights:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-300">
                    {tour.highlights.map((h, idx) => (
                      <div key={idx} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommended Vehicles */}
                <div className="bg-slate-900/70 p-3 rounded-2xl border border-slate-700/60">
                  <div className="flex items-center gap-2 text-xs text-slate-300 mb-1.5">
                    <Car className="w-4 h-4 text-brand-gold shrink-0" />
                    <span className="font-semibold text-white">Recommended Vehicles for this Route:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {tour.recommendedVehicles.map((v, idx) => (
                      <span key={idx} className="text-[11px] bg-slate-800 text-slate-200 px-2 py-0.5 rounded-md border border-slate-700">
                        {v}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <button
                  type="button"
                  onClick={() => onSelectTour(tour)}
                  className="w-full py-3 px-4 rounded-xl bg-brand-navy hover:bg-brand-blue text-white font-bold text-xs transition-all flex items-center justify-center gap-2 border border-brand-blue shadow-md"
                >
                  <span>Book Vehicle for this Tour Route</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
