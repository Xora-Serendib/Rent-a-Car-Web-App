import React, { useState, useEffect, useMemo } from "react";
import { 
  X, Check, Calendar, MapPin, User, Mail, Phone, 
  MessageSquare, ShieldCheck, Clock, ArrowRight, ArrowLeft, 
  Car, UserCheck, AlertCircle, Plane, Briefcase, Users, FileText, Send, Sparkles, Copy, FileDown,
  Navigation
} from "lucide-react";
import { fleetVehicles } from "../data/fleetData";
import { companyInfo } from "../data/companyInfo";
import { formatPrice } from "../utils/currency";
import { generateBookingPDF } from "../utils/pdfGenerator";
import { WhatsAppIcon } from "./icons/WhatsAppIcon";
import { getRouteDetails } from "../utils/routeCalculator";
import { destinationGroups, popularSriLankaDestinations } from "../utils/sriLankaGeo";
import RouteMapModal from "./RouteMapModal";

export default function BookingModal({ 
  isOpen, 
  onClose, 
  selectedCurrency,
  prefilledData = {},
  fleet,
  onBookingCreated
}) {
  const activeFleet = fleet && fleet.length > 0 ? fleet : fleetVehicles;
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [includeFullTextSurvey, setIncludeFullTextSurvey] = useState(false);
  const [isSharingNative, setIsSharingNative] = useState(false);

  // Form State - Step 1: Vehicle & Logistics
  const [selectedVehicleId, setSelectedVehicleId] = useState(
    prefilledData?.car?.id || prefilledData?.selectedVehicleId || activeFleet[0]?.id || fleetVehicles[3].id
  );
  const [serviceType, setServiceType] = useState(prefilledData?.serviceType || prefilledData?.hireMode || "self-drive");
  const [pickupLoc, setPickupLoc] = useState(prefilledData?.pickupLocation || "Bandaranaike Int'l Airport (CMB Katunayake)");
  const [dropoffLoc, setDropoffLoc] = useState(prefilledData?.dropoffLocation || "Bandaranaike Int'l Airport (CMB Katunayake)");
  const [customRouteData, setCustomRouteData] = useState(null);
  const [isRouteMapOpen, setIsRouteMapOpen] = useState(false);

  // Compute live route distance in km
  const routeDetails = useMemo(() => {
    if (customRouteData && customRouteData.pickup === pickupLoc && customRouteData.dropoff === dropoffLoc) {
      return customRouteData;
    }
    return getRouteDetails(pickupLoc, dropoffLoc);
  }, [pickupLoc, dropoffLoc, customRouteData]);
  
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 8);
  const formatDate = (d) => d.toISOString().split("T")[0];

  const [pickupDate, setPickupDate] = useState(prefilledData?.pickupDate || formatDate(tomorrow));
  const [dropoffDate, setDropoffDate] = useState(prefilledData?.dropoffDate || formatDate(nextWeek));
  const [pickupTime, setPickupTime] = useState(prefilledData?.pickupTime || "10:00");
  const [dropoffTime, setDropoffTime] = useState(prefilledData?.dropoffTime || "10:00");

  // Step 2: Extras & Protection
  const [cdw, setCdw] = useState(prefilledData?.addOns?.cdwInsurance ?? true);
  const [babySeat, setBabySeat] = useState(prefilledData?.addOns?.babySeat ?? false);
  const [gps, setGps] = useState(prefilledData?.addOns?.gpsUnit ?? false);
  const [aacEndorsement, setAacEndorsement] = useState(prefilledData?.addOns?.aacEndorsement ?? false);
  const [extraDriver, setExtraDriver] = useState(prefilledData?.addOns?.extraDriver ?? false);

  // Step 3: Customer Information & Complete Survey
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nationality, setNationality] = useState("");
  const [passportOrId, setPassportOrId] = useState("");
  const [tripPurpose, setTripPurpose] = useState("Holiday & Tourism");
  const [passengersCount, setPassengersCount] = useState("2 Passengers");
  const [luggageCount, setLuggageCount] = useState("2 Suitcases");
  const [drivingLicenseStatus, setDrivingLicenseStatus] = useState(
    serviceType === "self-drive" ? "Has 1949 Geneva IDP" : "Chauffeur Service (No license needed)"
  );
  const [licenseExperience, setLicenseExperience] = useState("Yes (held license > 2 years)");
  const [destinationsPlanned, setDestinationsPlanned] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [hotelAddress, setHotelAddress] = useState("");
  const [notes, setNotes] = useState(prefilledData?.notes || "");

  // Update state whenever prefilledData changes
  useEffect(() => {
    if (prefilledData) {
      if (prefilledData.car?.id || prefilledData.selectedVehicleId) {
        setSelectedVehicleId(prefilledData.car?.id || prefilledData.selectedVehicleId);
      }
      if (prefilledData.serviceType || prefilledData.hireMode) {
        setServiceType(prefilledData.serviceType || prefilledData.hireMode);
      }
      if (prefilledData.pickupLocation) setPickupLoc(prefilledData.pickupLocation);
      if (prefilledData.dropoffLocation) setDropoffLoc(prefilledData.dropoffLocation);
      if (prefilledData.pickupDate) setPickupDate(prefilledData.pickupDate);
      if (prefilledData.dropoffDate) setDropoffDate(prefilledData.dropoffDate);
      if (prefilledData.pickupTime) setPickupTime(prefilledData.pickupTime);
      if (prefilledData.dropoffTime) setDropoffTime(prefilledData.dropoffTime);
      if (prefilledData.addOns) {
        if (prefilledData.addOns.cdwInsurance !== undefined) setCdw(prefilledData.addOns.cdwInsurance);
        if (prefilledData.addOns.babySeat !== undefined) setBabySeat(prefilledData.addOns.babySeat);
        if (prefilledData.addOns.gpsUnit !== undefined) setGps(prefilledData.addOns.gpsUnit);
        if (prefilledData.addOns.aacEndorsement !== undefined) setAacEndorsement(prefilledData.addOns.aacEndorsement);
        if (prefilledData.addOns.extraDriver !== undefined) setExtraDriver(prefilledData.addOns.extraDriver);
      }
      if (prefilledData.notes) setNotes(prefilledData.notes);
    }
  }, [prefilledData]);

  const activeCar = activeFleet.find((c) => c.id === selectedVehicleId) || activeFleet[0];

  // Calculate rental days
  const calculateDays = () => {
    const start = new Date(pickupDate);
    const end = new Date(dropoffDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const days = calculateDays();

  // Price calculations
  const baseDaily = serviceType === "self-drive" ? activeCar.rates.selfDriveDaily : activeCar.rates.withDriverDaily;
  const discountRate = days >= 28 ? 0.85 : days >= 7 ? 0.92 : 1.0;
  const vehicleTotal = Math.round(baseDaily * days * discountRate);

  const cdwFee = cdw ? 2000 * days : 0;
  const babySeatFee = babySeat ? 800 * days : 0;
  const gpsFee = gps ? 600 * days : 0;
  const aacFee = aacEndorsement ? 7500 : 0;
  const extraDriverFee = extraDriver ? 500 * days : 0;

  const extrasTotal = cdwFee + babySeatFee + gpsFee + aacFee + extraDriverFee;
  const grandTotal = vehicleTotal + extrasTotal;
  const freeKmTotal = activeCar.rates.freeKmDaily * days;

  // Selected add-ons text
  const selectedAddonsList = [
    cdw ? "• CDW (Zero Excess Accidental Waiver)" : null,
    aacEndorsement ? "• AAC Driving Permit Endorsement Service" : null,
    babySeat ? "• Child/Baby Safety Seat (ISOFIX)" : null,
    gps ? "• Garmin GPS / 4G Wi-Fi Hotspot" : null,
    extraDriver ? "• Additional Authorized Insured Driver" : null
  ].filter(Boolean).join("\n") || "• None (Standard Comprehensive Cover)";

  // Comprehensive WhatsApp Survey Dossier
  const buildWhatsAppMessageRaw = () => {
    return [
      `🚗 *DANUSHA RENT A CAR — NEW BOOKING & SURVEY*`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `👤 *CUSTOMER INFORMATION*`,
      `• *Full Name:* ${name || "Not specified"}`,
      `• *Phone / WhatsApp:* ${phone || "Not specified"}`,
      `• *Email:* ${email || "Not specified"}`,
      `• *Country / Nationality:* ${nationality || "Not specified"}`,
      `• *Passport / National ID:* ${passportOrId || "Not specified"}`,
      ``,
      `🚙 *VEHICLE & RENTAL DETAILS*`,
      `• *Vehicle:* ${activeCar.name} (${activeCar.fuel} / ${activeCar.transmission})`,
      `• *Service Type:* ${serviceType.toUpperCase()}`,
      `• *Duration:* ${days} Day(s) [${freeKmTotal} km free included]`,
      `• *Pick-up Location:* ${pickupLoc}`,
      `  📅 ${pickupDate} @ ${pickupTime}`,
      `• *Drop-off Location:* ${dropoffLoc}`,
      `  📅 ${dropoffDate} @ ${dropoffTime}`,
      flightNumber ? `• *Flight Details:* ${flightNumber}` : null,
      hotelAddress ? `• *Hotel / Villa Delivery:* ${hotelAddress}` : null,
      ``,
      `📋 *COMPLETE CUSTOMER TRIP SURVEY*`,
      `• *Trip Purpose:* ${tripPurpose}`,
      `• *Party Size:* ${passengersCount} | ${luggageCount}`,
      `• *Driving License Status:* ${drivingLicenseStatus}`,
      serviceType === "self-drive" ? `• *Driver Experience:* ${licenseExperience}` : null,
      destinationsPlanned ? `• *Planned Route / Destinations:* ${destinationsPlanned}` : `• *Planned Route:* Islandwide Travel`,
      ``,
      `🛡️ *SELECTED PROTECTION & EXTRAS*`,
      selectedAddonsList,
      ``,
      `💰 *PRICE ESTIMATE & QUOTATION*`,
      `• *Base Vehicle Hire (${days} days):* ${formatPrice(vehicleTotal, selectedCurrency)}`,
      extrasTotal > 0 ? `• *Extras & Protection:* ${formatPrice(extrasTotal, selectedCurrency)}` : null,
      `• *Estimated Grand Total:* *${formatPrice(grandTotal, selectedCurrency)}*`,
      `• *Refundable Security Deposit:* ${formatPrice(activeCar.rates.deposit, selectedCurrency)} (Due at handover)`,
      ``,
      `📄 *OFFICIAL PDF VOUCHER:* Generated & Downloaded (attaching to this chat)`,
      notes ? `\n📝 *SPECIAL REQUESTS / NOTES:*\n${notes}` : null,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `_Automated Booking Dossier sent directly to Danusha Rent a Car Reservation Desk (074 252 6538)_`
    ].filter(Boolean).join("\n");
  };

  // Data payload for PDF Voucher
  const getPDFData = () => ({
    name,
    phone,
    email,
    nationality,
    passportOrId,
    carName: activeCar.name,
    carFuel: activeCar.fuel,
    carTransmission: activeCar.transmission,
    serviceType,
    days,
    freeKmTotal,
    pickupLoc,
    pickupDate,
    pickupTime,
    dropoffLoc,
    dropoffDate,
    dropoffTime,
    flightNumber,
    hotelAddress,
    tripPurpose,
    passengersCount,
    luggageCount,
    drivingLicenseStatus,
    licenseExperience,
    destinationsPlanned,
    notes,
    cdw,
    aacEndorsement,
    babySeat,
    gps,
    extraDriver,
    vehicleTotalFormatted: formatPrice(vehicleTotal, selectedCurrency),
    extrasTotalFormatted: formatPrice(extrasTotal, selectedCurrency),
    grandTotalFormatted: formatPrice(grandTotal, selectedCurrency),
    depositFormatted: formatPrice(activeCar.rates.deposit, selectedCurrency)
  });

  // Short & Clean Voucher WhatsApp Note (Accompanies the PDF)
  const buildWhatsAppShortMessage = () => {
    return [
      `🚗 *DANUSHA RENT A CAR — RESERVATION VOUCHER*`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `Hello Mr. Danusha, I have completed my booking online for the *${activeCar.name}*.`,
      ``,
      `📎 *OFFICIAL PDF BOOKING VOUCHER ATTACHED*`,
      `_All customer and trip survey details are included inside the attached voucher._`,
      ``,
      `• *Customer:* ${name || "Customer"} (${phone || "Phone provided in PDF"})`,
      `• *Vehicle:* ${activeCar.name} (${serviceType.toUpperCase()})`,
      `• *Rental Dates:* ${pickupDate} (${pickupTime}) ➔ ${dropoffDate} (${dropoffTime}) [${days} Days]`,
      `• *Pick-up Location:* ${pickupLoc}`,
      `• *Quotation Total:* *${formatPrice(grandTotal, selectedCurrency)}*`,
      `• *Refundable Deposit:* ${formatPrice(activeCar.rates.deposit, selectedCurrency)}`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `_Official PDF Booking Voucher is attached to this chat._`
    ].join("\n");
  };

  const getWhatsAppMessage = () => {
    return includeFullTextSurvey ? buildWhatsAppMessageRaw() : buildWhatsAppShortMessage();
  };

  const getWhatsAppUrl = () => {
    return `https://wa.me/${companyInfo.contacts.whatsapp}?text=${encodeURIComponent(getWhatsAppMessage())}`;
  };

  // Download PDF Voucher manually
  const handleDownloadPDF = () => {
    const payload = getPDFData();
    generateBookingPDF(payload, true);
  };

  // Submit: Try Native Web Share API with actual PDF file, or fallback to auto-download + WhatsApp
  const handleFinalSubmit = async (e) => {
    if (e) e.preventDefault();
    setSubmitted(true);

    // 1. Automatically register booking in Owner Dashboard
    if (onBookingCreated) {
      onBookingCreated({
        customer: {
          name: name || "Customer",
          phone: phone || "",
          email: email || "",
          nationality: nationality || "Sri Lanka",
          passportOrId: passportOrId || ""
        },
        vehicleId: activeCar.id,
        vehicleName: activeCar.name,
        serviceType,
        pickupLoc,
        dropoffLoc,
        pickupDate,
        dropoffDate,
        pickupTime,
        dropoffTime,
        days,
        freeKmTotal,
        totalQuotation: grandTotal,
        deposit: activeCar.rates.deposit,
        status: "pending",
        tripPurpose,
        drivingLicenseStatus,
        distanceKm: routeDetails?.distanceKm || 0,
        destinationsPlanned: destinationsPlanned || `${pickupLoc} ➔ ${dropoffLoc} (${routeDetails?.distanceKm || 0} km)`,
        notes
      });
    }

    const payload = getPDFData();
    const pdfResult = generateBookingPDF(payload, false);

    // 1. Check if browser can share files directly (iOS Safari, Android Chrome, etc.)
    if (navigator.canShare && pdfResult?.file && navigator.canShare({ files: [pdfResult.file] })) {
      try {
        setIsSharingNative(true);
        await navigator.share({
          files: [pdfResult.file],
          title: `Danusha Rent A Car Voucher - ${name || "Customer"}`,
          text: `Booking voucher for ${activeCar.name} (${days} days) - Danusha Rent a car (074 252 6538)`
        });
        setIsSharingNative(false);
        return; // Successfully opened native share menu with PDF attached!
      } catch (err) {
        setIsSharingNative(false);
        // If user aborted or dismissed, continue to fallback below
        if (err.name !== "AbortError") {
          console.log("Web share fallback triggered:", err);
        }
      }
    }

    // 2. Fallback for Desktop browsers:
    // Auto-download the PDF to customer's computer
    if (pdfResult?.doc && pdfResult?.filename) {
      pdfResult.doc.save(pdfResult.filename);
    }

    // Open WhatsApp with clean voucher message
    const url = getWhatsAppUrl();
    window.open(url, "_blank");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getWhatsAppMessage());
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden my-auto border border-slate-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          aria-label="Close booking modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="bg-brand-navy p-6 sm:p-7 text-white">
          <div className="flex items-center gap-2 text-brand-gold text-xs font-bold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Official Online Reservation & Survey</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold font-heading">
            {submitted ? "Reservation Sent to WhatsApp" : "Book Your Sri Lanka Vehicle & Trip Survey"}
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Instant booking confirmation sent directly to our 24/7 WhatsApp concierge: <strong className="text-brand-gold">074 252 6538</strong>
          </p>

          {/* Stepper (if not submitted) */}
          {!submitted && (
            <div className="grid grid-cols-3 gap-2 mt-5 text-[11px] font-bold">
              <div className={`py-2 px-2 rounded-xl text-center border transition-all ${
                currentStep === 1 
                  ? "bg-brand-gold text-slate-950 border-brand-gold shadow-md" 
                  : currentStep > 1
                  ? "bg-white/20 text-white border-white/20"
                  : "bg-white/5 text-slate-400 border-white/10"
              }`}>
                1. Vehicle & Logistics
              </div>
              <div className={`py-2 px-2 rounded-xl text-center border transition-all ${
                currentStep === 2 
                  ? "bg-brand-gold text-slate-950 border-brand-gold shadow-md" 
                  : currentStep > 2
                  ? "bg-white/20 text-white border-white/20"
                  : "bg-white/5 text-slate-400 border-white/10"
              }`}>
                2. Extras & Coverage
              </div>
              <div className={`py-2 px-2 rounded-xl text-center border transition-all ${
                currentStep === 3 
                  ? "bg-brand-gold text-slate-950 border-brand-gold shadow-md" 
                  : "bg-white/5 text-slate-400 border-white/10"
              }`}>
                3. Customer Survey & WhatsApp
              </div>
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="p-6 sm:p-8 max-h-[78vh] overflow-y-auto">
          {submitted ? (
            /* Success View */
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <FileText className="w-8 h-8 text-emerald-600" />
              </div>
              <div>
                <span className="text-xs uppercase font-bold text-emerald-600 tracking-wider">
                  Official PDF Voucher Ready
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 font-heading mt-1">
                  Ready to Dispatch, {name || "Valued Customer"}!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto mt-2 leading-relaxed">
                  Your official PDF Booking Voucher for the <strong>{activeCar.name}</strong> ({days} days) has been created. Connect directly with Mr. Danusha on WhatsApp (<strong>074 252 6538</strong>) to finalize your car handover.
                </p>
              </div>

              {/* PDF Voucher Summary Box */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left text-xs text-slate-700 space-y-3 max-w-xl mx-auto shadow-inner">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-brand-gold" />
                    <span>PDF Voucher Summary</span>
                  </span>
                  <button
                    type="button"
                    onClick={copyToClipboard}
                    className="flex items-center gap-1 text-[11px] text-brand-navy hover:underline font-semibold"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copied ? "Copied to Clipboard!" : "Copy WhatsApp Text"}</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div><span className="text-slate-500">Customer:</span> <strong>{name || "Customer"}</strong></div>
                  <div><span className="text-slate-500">Phone:</span> <strong>{phone || "Not specified"}</strong></div>
                  <div><span className="text-slate-500">Vehicle:</span> <strong>{activeCar.name}</strong></div>
                  <div><span className="text-slate-500">Service:</span> <strong className="uppercase">{serviceType}</strong></div>
                  <div><span className="text-slate-500">Pickup:</span> <strong>{pickupLoc} ({pickupDate})</strong></div>
                  <div><span className="text-slate-500">Dropoff:</span> <strong>{dropoffLoc} ({dropoffDate})</strong></div>
                  <div><span className="text-slate-500">Trip Purpose:</span> <strong>{tripPurpose}</strong></div>
                  <div><span className="text-slate-500">Survey Data:</span> <strong className="text-emerald-700">Compiled inside PDF</strong></div>
                </div>

                <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
                  <span className="font-semibold text-slate-900">Total Quotation:</span>
                  <span className="text-base font-black text-brand-navy">{formatPrice(grandTotal, selectedCurrency)}</span>
                </div>
              </div>

              {/* Primary Action Buttons */}
              <div className="pt-2 space-y-2.5 max-w-md mx-auto">
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 bg-[#25D366] hover:bg-[#20ba59] text-white font-black rounded-2xl text-sm flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-700/25 transition-all hover:scale-[1.02]"
                >
                  <WhatsAppIcon className="w-5 h-5 fill-current" />
                  <span>Open WhatsApp (074 252 6538)</span>
                </a>

                <button
                  type="button"
                  onClick={handleDownloadPDF}
                  className="w-full py-3.5 px-4 bg-brand-navy hover:bg-brand-blue text-white font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  <FileDown className="w-4 h-4 text-brand-gold" />
                  <span>Download / Re-save PDF Booking Voucher</span>
                </button>

                <div className="text-[11px] text-slate-600 bg-amber-50 p-3 rounded-xl border border-amber-200/70 text-center space-y-1">
                  <p>
                    📱 <strong>On Mobile (Phones/Tablets):</strong> The PDF file can be shared directly via WhatsApp.
                  </p>
                  <p>
                    💻 <strong>On Desktop / PC:</strong> Your official PDF voucher has been downloaded to your computer — simply attach it to your WhatsApp chat!
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* STEP 1: Vehicle & Logistics */}
              {currentStep === 1 && (
                <div className="space-y-5">
                  {/* Service Type Selection */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      1. Choose Rental Service
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: "self-drive", label: "Self-Drive", icon: Car },
                        { id: "with-driver", label: "With Chauffeur", icon: UserCheck },
                        { id: "airport", label: "Airport CMB", icon: Plane },
                        { id: "wedding", label: "Wedding / VIP", icon: Sparkles }
                      ].map((item) => {
                        const Icon = item.icon;
                        const isSelected = serviceType === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => {
                              setServiceType(item.id);
                              if (item.id === "with-driver" || item.id === "airport") {
                                setDrivingLicenseStatus("Chauffeur Service (No license needed)");
                              }
                            }}
                            className={`p-3 rounded-2xl text-xs font-bold border transition-all flex flex-col items-center justify-center gap-1.5 ${
                              isSelected
                                ? "bg-brand-navy text-white border-brand-navy shadow-md scale-[1.02]"
                                : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                            }`}
                          >
                            <Icon className={`w-4 h-4 ${isSelected ? "text-brand-gold" : "text-slate-500"}`} />
                            <span>{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Vehicle Selector */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      2. Select Vehicle Model
                    </label>
                    <select
                      value={selectedVehicleId}
                      onChange={(e) => setSelectedVehicleId(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-brand-navy font-semibold cursor-pointer"
                    >
                      {activeFleet.map((car) => (
                        <option key={car.id} value={car.id}>
                          {car.name} ({car.category.toUpperCase()}) — {formatPrice(serviceType === "self-drive" ? car.rates.selfDriveDaily : car.rates.withDriverDaily, selectedCurrency)}/day
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Pick-up & Drop-off Locations */}
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-brand-navy" />
                          <span>Pick-up Location</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => setIsRouteMapOpen(true)}
                          className="text-[11px] font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 cursor-pointer"
                        >
                          <Navigation className="w-3 h-3 text-amber-500" />
                          <span>Google Map</span>
                        </button>
                      </div>
                      <select
                        value={pickupLoc}
                        onChange={(e) => {
                          setPickupLoc(e.target.value);
                          setCustomRouteData(null);
                        }}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-navy cursor-pointer font-medium"
                      >
                        {pickupLoc && !popularSriLankaDestinations.some((d) => d.name === pickupLoc) && (
                          <option value={pickupLoc} className="bg-slate-100 text-brand-navy font-bold">
                            📍 {pickupLoc} (Custom Pinned Location)
                          </option>
                        )}
                        {destinationGroups.map((grp, gIdx) => (
                          <optgroup key={gIdx} label={grp.category} className="font-bold text-brand-navy bg-slate-100">
                            {grp.destinations.map((loc, idx) => (
                              <option key={idx} value={loc} className="font-normal text-slate-800 bg-white">
                                {loc}
                              </option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-amber-600" />
                          <span>Drop-off Location</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => setIsRouteMapOpen(true)}
                          className="text-[11px] font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 cursor-pointer"
                        >
                          <Navigation className="w-3 h-3 text-amber-500" />
                          <span>Google Map</span>
                        </button>
                      </div>
                      <select
                        value={dropoffLoc}
                        onChange={(e) => {
                          setDropoffLoc(e.target.value);
                          setCustomRouteData(null);
                        }}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-navy cursor-pointer font-medium"
                      >
                        {dropoffLoc && !popularSriLankaDestinations.some((d) => d.name === dropoffLoc) && (
                          <option value={dropoffLoc} className="bg-slate-100 text-amber-700 font-bold">
                            🏁 {dropoffLoc} (Custom Destination)
                          </option>
                        )}
                        {destinationGroups.map((grp, gIdx) => (
                          <optgroup key={gIdx} label={grp.category} className="font-bold text-brand-navy bg-slate-100">
                            {grp.destinations.map((loc, idx) => (
                              <option key={idx} value={loc} className="font-normal text-slate-800 bg-white">
                                {loc}
                              </option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Route & Distance in KM Interactive Banner */}
                  {routeDetails && (
                    <div 
                      onClick={() => setIsRouteMapOpen(true)}
                      className="p-2.5 bg-gradient-to-r from-amber-50 to-amber-100/60 border border-amber-300/80 rounded-2xl flex items-center justify-between gap-2 cursor-pointer hover:border-amber-500 transition-all shadow-sm"
                      title="Click to view interactive Google Map with driving route and distance in km"
                    >
                      <div className="flex items-center gap-2.5 overflow-hidden">
                        <div className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
                          <Navigation className="w-3.5 h-3.5 animate-pulse" />
                        </div>
                        <div className="text-xs truncate">
                          <span className="font-bold text-slate-900">Driving Distance: </span>
                          <span className="font-black text-amber-700 text-sm">{routeDetails.distanceKm} KM</span>
                          <span className="text-slate-600 text-[11px] ml-1">({routeDetails.durationText})</span>
                        </div>
                      </div>

                      <div className="text-[10px] font-bold text-slate-900 bg-brand-gold hover:bg-amber-400 px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-sm shrink-0 cursor-pointer">
                        <span>View Map</span>
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  )}

                  {/* Dates and Times */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Pick-up Date & Time</label>
                      <input
                        type="date"
                        value={pickupDate}
                        onChange={(e) => setPickupDate(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 text-xs text-slate-900 mb-1.5 font-medium"
                      />
                      <input
                        type="time"
                        value={pickupTime}
                        onChange={(e) => setPickupTime(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 text-xs text-slate-900 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Drop-off Date & Time</label>
                      <input
                        type="date"
                        value={dropoffDate}
                        min={pickupDate}
                        onChange={(e) => setDropoffDate(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 text-xs text-slate-900 mb-1.5 font-medium"
                      />
                      <input
                        type="time"
                        value={dropoffTime}
                        onChange={(e) => setDropoffTime(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 text-xs text-slate-900 font-medium"
                      />
                    </div>
                  </div>

                  {/* Duration notice */}
                  <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
                    <span>Total Rental Duration:</span>
                    <strong className="font-black text-sm">{days} Days ({freeKmTotal} km included)</strong>
                  </div>

                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="w-full py-3.5 bg-brand-navy hover:bg-brand-blue text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-md"
                  >
                    <span>Proceed to Extras & Protection</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* STEP 2: Extras & Add-ons */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="text-xs text-slate-500 mb-2">
                    Select optional insurance coverage and travel accessories:
                  </div>

                  {/* CDW */}
                  <label className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={cdw}
                        onChange={(e) => setCdw(e.target.checked)}
                        className="w-4 h-4 text-brand-navy rounded"
                      />
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">Collision Damage Waiver (CDW / Zero Excess)</span>
                        <span className="text-[11px] text-slate-500">Zero accidental damage liability & total theft protection</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-slate-900">+{formatPrice(2000 * days, selectedCurrency)}</span>
                  </label>

                  {/* AAC Driving Endorsement */}
                  <label className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={aacEndorsement}
                        onChange={(e) => {
                          setAacEndorsement(e.target.checked);
                          if (e.target.checked) {
                            setDrivingLicenseStatus("I request Ceylon Prime to obtain my AAC Endorsement");
                          }
                        }}
                        className="w-4 h-4 text-brand-navy rounded"
                      />
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">AAC Driving Permit Endorsement Service</span>
                        <span className="text-[11px] text-slate-500">We legally validate your foreign license with the Ceylon Automobile Association</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-slate-900">+{formatPrice(7500, selectedCurrency)} flat</span>
                  </label>

                  {/* Baby Seat */}
                  <label className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={babySeat}
                        onChange={(e) => setBabySeat(e.target.checked)}
                        className="w-4 h-4 text-brand-navy rounded"
                      />
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">Child / Baby Seat (ISOFIX)</span>
                        <span className="text-[11px] text-slate-500">Cleaned & sanitized child safety seat</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-slate-900">+{formatPrice(800 * days, selectedCurrency)}</span>
                  </label>

                  {/* GPS */}
                  <label className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={gps}
                        onChange={(e) => setGps(e.target.checked)}
                        className="w-4 h-4 text-brand-navy rounded"
                      />
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">Garmin GPS / Portable 4G Wi-Fi Dongle</span>
                        <span className="text-[11px] text-slate-500">Continuous mobile internet hotspot for your phone</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-slate-900">+{formatPrice(600 * days, selectedCurrency)}</span>
                  </label>

                  {/* Extra Driver */}
                  <label className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={extraDriver}
                        onChange={(e) => setExtraDriver(e.target.checked)}
                        className="w-4 h-4 text-brand-navy rounded"
                      />
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">Additional Authorized Driver</span>
                        <span className="text-[11px] text-slate-500">Fully insured second driver permitted on contract</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-slate-900">+{formatPrice(500 * days, selectedCurrency)}</span>
                  </label>

                  <div className="flex items-center gap-3 pt-3">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="flex-1 py-3.5 bg-brand-navy hover:bg-brand-blue text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-md"
                    >
                      <span>Proceed to Customer Details & Survey</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Complete Customer Information & Trip Survey */}
              {currentStep === 3 && (
                <form onSubmit={handleFinalSubmit} className="space-y-4">
                  
                  {/* Section A: Customer Details */}
                  <div className="border-b border-slate-200 pb-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-brand-navy mb-2 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-brand-gold" />
                      <span>Customer Contact Information</span>
                    </h4>

                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Full Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Michael Smith"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-navy font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">WhatsApp / Mobile Number *</label>
                        <input
                          type="tel"
                          required
                          placeholder="+94 7X XXX XXXX / international"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-navy font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Email Address *</label>
                        <input
                          type="email"
                          required
                          placeholder="michael@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-navy font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Country / Nationality *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. United Kingdom, Germany, Australia"
                          value={nationality}
                          onChange={(e) => setNationality(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-navy font-medium"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Passport Number / National ID (Optional)</label>
                        <input
                          type="text"
                          placeholder="For pre-filling rental agreement prior to handover"
                          value={passportOrId}
                          onChange={(e) => setPassportOrId(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-navy"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section B: Complete Trip & Travel Survey */}
                  <div className="border-b border-slate-200 pb-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-brand-navy mb-2 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-brand-gold" />
                      <span>Trip Survey & Travel Logistics</span>
                    </h4>

                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Purpose of Trip</label>
                        <select
                          value={tripPurpose}
                          onChange={(e) => setTripPurpose(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-navy cursor-pointer"
                        >
                          <option value="Holiday & Tourism">Holiday & Tourism</option>
                          <option value="Round-Island Road Trip">Round-Island Road Trip</option>
                          <option value="Business & Corporate Travel">Business & Corporate Travel</option>
                          <option value="Wedding & Family Function">Wedding & Family Function</option>
                          <option value="Surfing & Coastal Adventure">Surfing & Coastal Adventure</option>
                          <option value="Visiting Friends & Relatives">Visiting Friends & Relatives</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Driving License Status</label>
                        <select
                          value={drivingLicenseStatus}
                          onChange={(e) => setDrivingLicenseStatus(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-navy cursor-pointer"
                        >
                          <option value="Has 1949 Geneva IDP">I hold a 1949 Geneva Convention IDP</option>
                          <option value="Needs AAC Endorsement Assistance">I request AAC Endorsement Assistance</option>
                          <option value="Holds Sri Lankan Driving License">I hold a local Sri Lankan Driving License</option>
                          <option value="Chauffeur Service (No license needed)">Chauffeur Service (No license needed)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Total Passengers</label>
                        <select
                          value={passengersCount}
                          onChange={(e) => setPassengersCount(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-navy cursor-pointer"
                        >
                          <option value="1 Passenger">1 Solo Traveler</option>
                          <option value="2 Passengers">2 Passengers (Couple)</option>
                          <option value="3-4 Passengers">3 - 4 Passengers (Family)</option>
                          <option value="5-7 Passengers">5 - 7 Passengers (Group)</option>
                          <option value="8+ Passengers">8+ Passengers (Large Entourage)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Luggage Bags Expected</label>
                        <select
                          value={luggageCount}
                          onChange={(e) => setLuggageCount(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-navy cursor-pointer"
                        >
                          <option value="1-2 Small Bags">1 - 2 Small Bags / Backpacks</option>
                          <option value="2-3 Medium Suitcases">2 - 3 Medium Suitcases</option>
                          <option value="4+ Large Suitcases">4+ Large Suitcases / Heavy Luggage</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Flight Number (If BIA Airport pickup)</label>
                        <input
                          type="text"
                          placeholder="e.g. UL 504, EK 650, QR 662"
                          value={flightNumber}
                          onChange={(e) => setFlightNumber(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-navy"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Hotel or Villa Address (For delivery)</label>
                        <input
                          type="text"
                          placeholder="e.g. Cinnamon Grand Colombo or Galle Fort Villa"
                          value={hotelAddress}
                          onChange={(e) => setHotelAddress(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-navy"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Planned Route / Towns in Sri Lanka</label>
                        <input
                          type="text"
                          placeholder="e.g. Colombo -> Kandy -> Nuwara Eliya -> Ella -> Yala -> Galle"
                          value={destinationsPlanned}
                          onChange={(e) => setDestinationsPlanned(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-navy"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section C: Notes */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Special Notes / Dietary / Timing Requirements</label>
                    <textarea
                      rows="2"
                      placeholder="Any specific vehicle color preference, driver language, surf rack mounting, etc..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-navy resize-none"
                    ></textarea>
                  </div>

                  {/* Final Quotation Summary */}
                  <div className="bg-slate-900 text-white rounded-2xl p-4 text-xs space-y-2">
                    <div className="flex justify-between text-slate-300">
                      <span>Vehicle Hire ({activeCar.name} • {days} days):</span>
                      <strong className="text-white">{formatPrice(vehicleTotal, selectedCurrency)}</strong>
                    </div>
                    {extrasTotal > 0 && (
                      <div className="flex justify-between text-slate-300">
                        <span>Selected Protection & Extras:</span>
                        <strong className="text-white">{formatPrice(extrasTotal, selectedCurrency)}</strong>
                      </div>
                    )}
                    <div className="flex justify-between items-baseline pt-2 border-t border-slate-700 text-sm font-bold">
                      <span className="text-brand-gold">Total Estimated Quotation:</span>
                      <span className="text-lg text-brand-gold font-black font-heading">
                        {formatPrice(grandTotal, selectedCurrency)}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400">
                      * Refundable security deposit: {formatPrice(activeCar.rates.deposit, selectedCurrency)} due at vehicle handover.
                    </div>
                  </div>

                  {/* Delivery Format Option: PDF vs Long Survey Text */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">
                          Send As Clean PDF Voucher (Recommended)
                        </span>
                        <span className="text-[11px] text-slate-500">
                          {includeFullTextSurvey
                            ? "Full 30-line text survey will be sent to WhatsApp"
                            : "Voucher PDF is attached with all details; keeps WhatsApp chat clean"}
                        </span>
                      </div>
                    </div>
                    <label className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={includeFullTextSurvey}
                        onChange={(e) => setIncludeFullTextSurvey(e.target.checked)}
                        className="w-4 h-4 text-brand-navy rounded cursor-pointer"
                      />
                      <span className="text-slate-600 hidden sm:inline">Include Full Survey Text</span>
                    </label>
                  </div>

                  {/* Notice of WhatsApp Dispatch */}
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center gap-2.5 text-xs text-emerald-900">
                    <WhatsAppIcon className="w-4 h-4 fill-current text-[#25D366] shrink-0" />
                    <span>
                      {isSharingNative
                        ? "Opening native share menu to send the PDF file directly to WhatsApp..."
                        : "Creates your official PDF Booking Voucher and opens WhatsApp directly to Mr. Danusha (074 252 6538)."}
                    </span>
                  </div>

                  {/* Submit Controls */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="w-full sm:w-auto py-3.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleDownloadPDF}
                      className="w-full sm:w-auto py-3.5 px-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 border border-slate-700 shadow-sm cursor-pointer"
                      title="Download PDF Booking Voucher without submitting"
                    >
                      <FileDown className="w-4 h-4 text-brand-gold" />
                      <span>Download PDF Voucher</span>
                    </button>

                    <button
                      type="submit"
                      className="w-full sm:flex-1 py-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-black rounded-2xl text-xs sm:text-sm transition-all shadow-xl shadow-emerald-700/25 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01]"
                    >
                      <WhatsAppIcon className="w-4 h-4 fill-current" />
                      <span>Send PDF Voucher to WhatsApp</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>

      </div>

      {/* Embedded Route Map Modal */}
      {isRouteMapOpen && (
        <RouteMapModal
          isOpen={isRouteMapOpen}
          onClose={() => setIsRouteMapOpen(false)}
          initialPickup={pickupLoc}
          initialDropoff={dropoffLoc}
          onSelectRoute={(data) => {
            setPickupLoc(data.pickup);
            setDropoffLoc(data.dropoff);
            setCustomRouteData({
              pickup: data.pickup,
              dropoff: data.dropoff,
              distanceKm: data.distanceKm,
              durationText: data.durationText,
              routeStyle: data.routeStyle
            });
            setDestinationsPlanned(`${data.pickup} ➔ ${data.dropoff} (${data.distanceKm} km via ${data.routeStyle || "Main Route"})`);
          }}
        />
      )}
    </div>
  );
}
