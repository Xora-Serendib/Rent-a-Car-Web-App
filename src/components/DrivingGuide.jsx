import React, { useState } from "react";
import { 
  FileText, Check, ChevronDown, ChevronUp, AlertTriangle, 
  HelpCircle, Shield, Compass, PhoneCall 
} from "lucide-react";
import { faqsData } from "../data/faqsData";

export default function DrivingGuide() {
  const [openQuestionIndex, setOpenQuestionIndex] = useState(0);

  return (
    <section id="guide" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 bg-brand-navy/10 text-brand-navy px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <FileText className="w-3.5 h-3.5 text-brand-navy" />
            <span>Essential Tourist Knowledge</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            Driving in Sri Lanka: Rules & FAQs
          </h2>
          <p className="text-slate-600 mt-3 text-sm sm:text-base">
            Everything you need to know about driving licenses, AAC endorsements, road laws, and rental terms before embarking on your journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Sri Lanka Driving & AAC Permit Guide */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                AAC
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 font-heading">
                  Foreign License Endorsement Guide
                </h3>
                <span className="text-xs text-slate-500">Legal Requirement for Self-Drive</span>
              </div>
            </div>

            <div className="text-xs text-slate-600 space-y-3 leading-relaxed">
              <p>
                To legally self-drive any motor vehicle in Sri Lanka, foreign license holders must obtain an official local endorsement.
              </p>

              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900 block text-xs">Two Accepted Options:</span>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>1949 Geneva Convention IDP:</strong> Endorsed by the Automobile Association of Ceylon (AAC) in Colombo.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Temporary Sri Lankan Permit:</strong> Issued at DMT Werahera with your national driving license.</span>
                </div>
              </div>

              {/* Assistance Promo Box */}
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-emerald-900">
                <span className="font-bold block mb-1">★ We Do The Work For You!</span>
                <p className="text-[11px] text-emerald-800">
                  Email us clear copies of your passport and home driver's license prior to departure, and our team will obtain the AAC endorsement so your permit is ready upon your vehicle handover!
                </p>
              </div>

              {/* Road Quick Facts */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="font-bold text-slate-900 block text-xs">Road Quick Rules:</span>
                <ul className="list-disc pl-4 space-y-1 text-slate-600 text-[11px]">
                  <li>Drive on the <strong>LEFT</strong> side of the road.</li>
                  <li>Seatbelts mandatory for front occupants.</li>
                  <li>Strict zero tolerance policy for mobile phone use while driving.</li>
                  <li>Expressway speed limit: <strong>100 km/h</strong> (automated speed cameras active).</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive FAQ Accordion */}
          <div className="lg:col-span-7 space-y-6">
            {faqsData.map((categoryGroup, catIdx) => (
              <div key={catIdx} className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 pl-1">
                  {categoryGroup.category}
                </h4>

                <div className="space-y-2.5">
                  {categoryGroup.questions.map((faq, qIdx) => {
                    const globalIdx = `${catIdx}-${qIdx}`;
                    const isOpen = openQuestionIndex === globalIdx;

                    return (
                      <div
                        key={qIdx}
                        className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm transition-all"
                      >
                        <button
                          type="button"
                          onClick={() => setOpenQuestionIndex(isOpen ? null : globalIdx)}
                          className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 hover:text-brand-navy"
                        >
                          <span className="flex items-center gap-2">
                            <HelpCircle className="w-4 h-4 text-brand-gold shrink-0" />
                            <span>{faq.q}</span>
                          </span>
                          {isOpen ? (
                            <ChevronUp className="w-4 h-4 text-brand-navy shrink-0" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                          )}
                        </button>

                        {isOpen && (
                          <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
