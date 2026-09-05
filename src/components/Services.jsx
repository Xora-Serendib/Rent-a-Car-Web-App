import React from "react";
import { 
  Compass, UserCheck, Plane, HeartHandshake, Building2, 
  Check, ArrowRight, ShieldCheck, Sparkles 
} from "lucide-react";
import { servicesData } from "../data/servicesData";

const iconMap = {
  Compass: Compass,
  UserCheck: UserCheck,
  Plane: Plane,
  HeartHandshake: HeartHandshake,
  Building2: Building2
};

export default function Services({ onSelectService }) {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 bg-brand-navy/10 text-brand-navy px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>Tailored Mobility Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            Comprehensive Vehicle Services In Sri Lanka
          </h2>
          <p className="text-slate-600 mt-3 text-sm sm:text-base">
            Backed by over three decades of hospitality and transport excellence. Whether you seek self-drive adventure, VIP airport concierges, or ceremonial wedding limousines.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((svc) => {
            const IconComponent = iconMap[svc.icon] || Compass;

            return (
              <div
                key={svc.id}
                className="bg-slate-50 rounded-3xl border border-slate-200/80 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Image & Overlay */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                  <img
                    src={svc.image}
                    alt={svc.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  
                  {/* Badge */}
                  <span className="absolute top-3 right-3 bg-brand-navy text-white text-[11px] font-bold px-3 py-1 rounded-full shadow">
                    {svc.badge}
                  </span>

                  <div className="absolute bottom-3 left-4 flex items-center gap-2 text-white">
                    <div className="w-9 h-9 rounded-xl bg-brand-gold text-slate-950 flex items-center justify-center shadow-md">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-lg font-heading text-white">{svc.title}</h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {svc.shortDescription}
                    </p>

                    <div className="space-y-2 border-t border-slate-200 pt-4 mb-4">
                      {svc.features.slice(0, 4).map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                          <Check className="w-3.5 h-3.5 text-brand-gold-dark shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectService(svc)}
                    className="w-full mt-2 py-2.5 px-4 rounded-xl bg-white hover:bg-brand-navy hover:text-white text-slate-800 font-bold text-xs border border-slate-200 transition-all flex items-center justify-center gap-2 group-hover:border-brand-navy shadow-sm"
                  >
                    <span>Inquire About {svc.title}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
