import React from "react";
import { Star, MessageCircle, ExternalLink, ShieldCheck, Heart, ThumbsUp } from "lucide-react";
import { googleReviewsData } from "../data/reviewsData";
import { companyInfo } from "../data/companyInfo";

export default function GoogleReviews() {
  return (
    <section id="reviews" className="py-20 bg-slate-100/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header with Google 5.0 Badge */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full text-xs font-bold shadow-sm border border-slate-200 mb-4">
            <span className="text-red-500 font-black">G</span>
            <span className="text-blue-500 font-black">o</span>
            <span className="text-amber-500 font-black">o</span>
            <span className="text-blue-500 font-black">g</span>
            <span className="text-green-500 font-black">l</span>
            <span className="text-red-500 font-black">e</span>
            <span className="text-slate-700 ml-1">Verified Customer Rating</span>
          </div>

          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-4xl sm:text-5xl font-black text-slate-900 font-heading">5.0</span>
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-amber-400" />
              ))}
            </div>
          </div>

          <p className="text-slate-600 text-sm font-semibold">
            Based on <strong className="text-slate-900 font-bold">32 Verified Google Reviews</strong> (100% 5-Star Rating)
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Located at 134/3 E/6 Polgasowita Rd, Piliyandala • Open 24 Hours
          </p>

          <a
            href={companyInfo.contacts.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-navy hover:text-brand-blue mt-3 hover:underline"
          >
            <span>Read all reviews on Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {googleReviewsData.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Author & Stars */}
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 font-heading">{rev.name}</h3>
                    <span className="text-[11px] text-slate-400 block">{rev.badge}</span>
                  </div>
                  <span className="text-[10px] text-slate-400">{rev.date}</span>
                </div>

                <div className="flex items-center gap-0.5 text-amber-400 mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>

                {/* Review Body */}
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  "{rev.text}"
                </p>
              </div>

              {/* Owner Response */}
              {rev.ownerReply && (
                <div className="mt-4 pt-3 border-t border-slate-100 bg-slate-50 -mx-6 -mb-6 p-4 rounded-b-3xl">
                  <span className="text-[10px] font-bold text-slate-700 block">
                    Danusha Rent a car (Owner):
                  </span>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {rev.ownerReply}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Callout Banner */}
        <div className="mt-14 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
              <ThumbsUp className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base font-heading">
                Direct Personal Support From Mr. Danusha
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                No call center runarounds. You deal directly with the owner for transparent pricing, spotless cars, and 24/7 reliability.
              </p>
            </div>
          </div>

          <a
            href={`https://wa.me/${companyInfo.contacts.whatsapp}?text=${encodeURIComponent("Hello Mr. Danusha! I saw your 5-star Google reviews and would like to rent a vehicle.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3 px-5 rounded-xl flex items-center gap-2 shadow-md shrink-0 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat Directly with Mr. Danusha</span>
          </a>
        </div>

      </div>
    </section>
  );
}
