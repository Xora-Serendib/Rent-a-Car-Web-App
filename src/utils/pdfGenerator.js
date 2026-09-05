import jsPDF from "jspdf";
import { formatPrice } from "./currency";

export const generateBookingPDF = (bookingData, autoDownload = true) => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 14;
  const contentWidth = pageWidth - (margin * 2);

  // Colors
  const navyColor = [0, 31, 84];     // #001f54
  const goldColor = [217, 119, 6];   // #d97706
  const darkColor = [15, 23, 42];    // slate-900
  const grayColor = [100, 116, 139]; // slate-500
  const lightBg = [248, 250, 252];   // slate-50

  // 1. Header Banner
  doc.setFillColor(...navyColor);
  doc.rect(0, 0, pageWidth, 28, "F");

  // Gold accent bar
  doc.setFillColor(...goldColor);
  doc.rect(0, 28, pageWidth, 2, "F");

  // Brand Name
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("DANUSHA RENT A CAR", margin, 12);

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(251, 191, 36); // gold light
  doc.text("5.0 ★★★★★ GOOGLE RATED (32 REVIEWS) • OPEN 24 HOURS", margin, 18);

  doc.setFontSize(8);
  doc.setTextColor(226, 232, 240);
  doc.text("134/3 E/6 Polgasowita Rd, Piliyandala 10230 | Hotline/WhatsApp: 074 252 6538", margin, 23);

  // Voucher Ref on right
  const voucherNo = `DRC-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, "0")}-${Math.floor(1000 + Math.random() * 9000)}`;
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text("BOOKING VOUCHER", pageWidth - margin, 12, { align: "right" });
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(251, 191, 36);
  doc.text(voucherNo, pageWidth - margin, 18, { align: "right" });
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(226, 232, 240);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, pageWidth - margin, 23, { align: "right" });

  let y = 37;

  // Helper box drawer
  const drawSectionBox = (title, height) => {
    doc.setFillColor(...lightBg);
    doc.roundedRect(margin, y, contentWidth, height, 2, 2, "F");
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(margin, y, contentWidth, height, 2, 2, "S");

    // Title pill
    doc.setFillColor(...navyColor);
    doc.roundedRect(margin, y, contentWidth, 7, 2, 2, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text(title.toUpperCase(), margin + 4, y + 4.8);
  };

  // 2. Customer Information Section
  drawSectionBox("1. Customer Profile", 26);
  doc.setFontSize(8.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...darkColor);

  const col1 = margin + 4;
  const col2 = margin + (contentWidth / 2) + 2;

  doc.text(`Full Name: ${bookingData.name || "Customer"}`, col1, y + 12);
  doc.text(`Phone / WhatsApp: ${bookingData.phone || "074 252 6538"}`, col1, y + 18);
  doc.text(`Email: ${bookingData.email || "N/A"}`, col1, y + 24);

  doc.text(`Nationality: ${bookingData.nationality || "Sri Lanka / International"}`, col2, y + 12);
  doc.text(`Passport / National ID: ${bookingData.passportOrId || "Not specified"}`, col2, y + 18);
  doc.text(`Status: Online Booking Request`, col2, y + 24);

  y += 30;

  // 3. Vehicle & Rental Logistics
  drawSectionBox("2. Vehicle & Rental Logistics", 34);
  doc.setFontSize(8.5);
  doc.setTextColor(...darkColor);

  doc.setFont("helvetica", "bold");
  doc.text(`Reserved Vehicle: ${bookingData.carName}`, col1, y + 12);
  doc.setFont("helvetica", "normal");
  doc.text(`Service Type: ${(bookingData.serviceType || "self-drive").toUpperCase()}`, col1, y + 17);
  doc.text(`Rental Duration: ${bookingData.days || 1} Days (${bookingData.freeKmTotal || 100} km included free)`, col1, y + 22);
  doc.text(`Pick-up: ${bookingData.pickupLoc}`, col1, y + 27);
  doc.text(`  Date & Time: ${bookingData.pickupDate} @ ${bookingData.pickupTime}`, col1, y + 31);

  doc.text(`Fuel / Transmission: ${bookingData.carFuel} / ${bookingData.carTransmission}`, col2, y + 12);
  doc.text(`Drop-off: ${bookingData.dropoffLoc}`, col2, y + 17);
  doc.text(`  Date & Time: ${bookingData.dropoffDate} @ ${bookingData.dropoffTime}`, col2, y + 22);
  if (bookingData.flightNumber) {
    doc.text(`Flight Number: ${bookingData.flightNumber}`, col2, y + 27);
  }
  if (bookingData.hotelAddress) {
    doc.text(`Delivery Address: ${bookingData.hotelAddress}`, col2, y + 31);
  }

  y += 38;

  // 4. Customer Trip Survey
  drawSectionBox("3. Customer Trip Survey", 26);
  doc.setFontSize(8.5);
  doc.setTextColor(...darkColor);

  doc.text(`Trip Purpose: ${bookingData.tripPurpose}`, col1, y + 12);
  doc.text(`Party Size: ${bookingData.passengersCount} | ${bookingData.luggageCount}`, col1, y + 18);
  doc.text(`Planned Route: ${bookingData.destinationsPlanned || "Islandwide Road Trip"}`, col1, y + 24);

  doc.text(`Driving License: ${bookingData.drivingLicenseStatus}`, col2, y + 12);
  doc.text(`Driver Experience: ${bookingData.licenseExperience}`, col2, y + 18);
  if (bookingData.notes) {
    doc.text(`Special Notes: ${bookingData.notes.substring(0, 45)}...`, col2, y + 24);
  }

  y += 30;

  // 5. Selected Protection & Add-ons
  drawSectionBox("4. Protection & Extras Selected", 22);
  doc.setFontSize(8);
  doc.setTextColor(...darkColor);

  const addonsList = [];
  if (bookingData.cdw) addonsList.push("• Collision Damage Waiver (CDW Zero Excess)");
  if (bookingData.aacEndorsement) addonsList.push("• AAC Driving License Endorsement Service");
  if (bookingData.babySeat) addonsList.push("• Child Safety Seat (ISOFIX)");
  if (bookingData.gps) addonsList.push("• Garmin GPS / 4G Wi-Fi Dongle");
  if (bookingData.extraDriver) addonsList.push("• Additional Authorized Driver");

  if (addonsList.length === 0) {
    doc.text("• Standard Full Comprehensive Insurance included.", col1, y + 13);
  } else {
    addonsList.slice(0, 3).forEach((item, idx) => {
      doc.text(item, col1, y + 12 + (idx * 4.5));
    });
    addonsList.slice(3).forEach((item, idx) => {
      doc.text(item, col2, y + 12 + (idx * 4.5));
    });
  }

  y += 26;

  // 6. Quotation & Pricing Summary
  drawSectionBox("5. Rental Rate & Quotation Summary", 32);
  doc.setFontSize(8.5);

  doc.text(`Base Vehicle Hire (${bookingData.days} days):`, col1, y + 12);
  doc.text(bookingData.vehicleTotalFormatted, col1 + 65, y + 12);

  doc.text("Protection & Extras Total:", col1, y + 18);
  doc.text(bookingData.extrasTotalFormatted, col1 + 65, y + 18);

  doc.setFont("helvetica", "bold");
  doc.setTextColor(...goldColor);
  doc.setFontSize(11);
  doc.text("ESTIMATED GRAND TOTAL:", col1, y + 26);
  doc.text(bookingData.grandTotalFormatted, col1 + 65, y + 26);

  doc.setFontSize(8.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...darkColor);
  doc.text(`Refundable Security Deposit: ${bookingData.depositFormatted}`, col2, y + 12);
  doc.text("Excess Mileage Fee: Rs. 60 - 95/km", col2, y + 18);
  doc.text("Payment: Cash, Card or Bank Transfer at handover", col2, y + 26);

  y += 36;

  // 7. Terms & Signatures
  doc.setDrawColor(203, 213, 225);
  doc.line(margin, y, pageWidth - margin, y);

  y += 5;
  doc.setFontSize(7.5);
  doc.setTextColor(...grayColor);
  doc.text(
    "Terms: Valid original passport, driving license, and deposit guarantee required at vehicle delivery. 24/7 Islandwide roadside breakdown support.",
    margin,
    y
  );

  y += 15;
  // Signatures
  doc.line(margin + 5, y, margin + 55, y);
  doc.text("Customer Signature", margin + 12, y + 4);

  doc.line(pageWidth - margin - 55, y, pageWidth - margin - 5, y);
  doc.text("Authorized Signature (Danusha)", pageWidth - margin - 52, y + 4);

  // Save the PDF
  const filename = `Danusha_Rent_A_Car_Voucher_${(bookingData.name || "Customer").replace(/\s+/g, "_")}.pdf`;
  const blob = doc.output("blob");
  let file = null;
  try {
    file = new File([blob], filename, { type: "application/pdf" });
  } catch (e) {
    // Older Safari fallback
  }

  if (autoDownload) {
    doc.save(filename);
  }

  return { doc, blob, file, filename };
};
