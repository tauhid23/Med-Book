import { useState } from "react";
import BookingPanel from "./BookingPanel";
// ── Types ──────────────────────────────────────────────
type NearbyTab = "Visit" | "Stay" | "Eat";

// ── Icons ──────────────────────────────────────────────
function ShareIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
    </svg>
  );
}

function LocationPinIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-green-400 shrink-0" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  );
}

function RefreshmentIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function TransferIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
    </svg>
  );
}

function ParkingIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
    </svg>
  );
}

function CashIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );
}

function BankIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
    </svg>
  );
}

function CardIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
  );
}

function VisitIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );
}

function StayIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}

function EatIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
    </svg>
  );
}

// ── Mini Calendar ───────────────────────────────────────
function MiniCalendar({ month, year, highlightDays }: { month: number; year: number; highlightDays?: number[] }) {
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const highlighted = new Set(highlightDays ?? []);

  return (
    <div className="flex-1 min-w-0">
      <p className="text-xs font-semibold text-gray-600 text-center mb-2">
        {monthNames[month]} {year}
      </p>
      <div className="grid grid-cols-7 gap-0">
        {dayNames.map((d) => (
          <div key={d} className="text-center text-[10px] text-gray-400 font-medium pb-1">{d}</div>
        ))}
        {cells.map((day, idx) => {
          const isHighlighted = day !== null && highlighted.has(day);
          const isSat = (idx % 7) === 6;
          const isSun = (idx % 7) === 0;
          return (
            <div
              key={idx}
              className={`text-center text-[11px] py-1 rounded ${
                day === null ? "" :
                isHighlighted
                  ? "text-sky-500 font-semibold"
                  : isSat || isSun
                  ? "text-sky-400 font-medium"
                  : "text-gray-700"
              }`}
            >
              {day ?? ""}
            </div>
          );
        })}
      </div>
    </div>
  );
}



// ── Main Page ───────────────────────────────────────────
export default function ClinicDetail() {
  const [nearbyTab, setNearbyTab] = useState<NearbyTab>("Visit");

  const nearbyTabs: { id: NearbyTab; icon: React.ReactNode}[] = [
    { id: "Visit", icon: <VisitIcon /> },
    { id: "Stay",  icon: <StayIcon /> },
    { id: "Eat",   icon: <EatIcon /> },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto  py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_260px] gap-10">

          {/* ── LEFT COLUMN ── */}
          <div className="flex-1 min-w-0 flex flex-col gap-6">

            {/* Header */}
            <div>
              <div className="flex items-start justify-between mb-1">
                <h1 className="text-2xl font-bold text-gray-900">City Medical Center</h1>
                <button className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors shrink-0 ml-4">
                  <ShareIcon />
                  Share
                </button>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <LocationPinIcon />
                <span>Block 21A, Orchard Boulevard, #12-144 Orchard Gateway Tower 2, New Somerset MRT Exit 9, Singapore 238895</span>
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Expert Care */}
            <div>
              <h2 className="text-base font-semibold text-gray-800 mb-3">Expert Care for Diverse Conditions*</h2>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-gray-500 font-medium">Accepting:</span>
                {["HIV Patients", "HBV Patients", "HCV Patients"].map((tag) => (
                  <div key={tag} className="flex items-center gap-1 bg-gray-50 border border-gray-100 rounded-full px-2.5 py-1">
                    <CheckCircleIcon />
                    <span className="text-xs text-gray-600">{tag}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* About */}
            <div>
              <h2 className="text-base font-semibold text-gray-800 mb-2">About the Clinic</h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                Our clinic proudly welcomes international patients seeking trusted and high-quality medical services in Singapore.
                From expert consultations to advanced treatments, we offer complete support, including appointment management
                and personalized care plans. With our multilingual team and globally recognized specialists, we ensure a smooth and
                comfortable healthcare experience for patients from around the world.
              </p>
            </div>

            {/* What this clinic offers */}
            <div>
              <h2 className="text-base font-semibold text-gray-800 mb-3">What this clinic offers</h2>
              <div className="flex items-center gap-6">
                {[
                  { icon: <RefreshmentIcon />, label: "Refreshments" },
                  { icon: <TransferIcon />,    label: "Free Transfer" },
                  { icon: <ParkingIcon />,     label: "Free Parking" },
                ].map(({ icon, label }) => (
                  <div key={label} className="flex items-center gap-1.5">
                    {icon}
                    <span className="text-sm text-gray-500">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Available Treatment Days */}
            <div>
              <h2 className="text-base font-semibold text-gray-800 mb-1">Available Treatment Days</h2>
              {/* <p className="text-xs text-gray-400 mb-4">29/11/2025 – 02/12/2025</p> */}
              <div className="flex gap-6 max-w-lg mt-10">
                <MiniCalendar
                  month={10}
                  year={2025}
                  highlightDays={[1, 8, 15, 22, 29]}
                />
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Accepted payment method */}
            <div>
              <h2 className="text-base font-semibold text-gray-800 mb-3">Accepted payment method</h2>
              <div className="flex items-center gap-6">
                {[
                  { icon: <CashIcon />,  label: "Cash" },
                  { icon: <BankIcon />,  label: "Bank Transfers" },
                  { icon: <CardIcon />,  label: "Credit Cards" },
                ].map(({ icon, label }) => (
                  <div key={label} className="flex items-center gap-1.5">
                    {icon}
                    <span className="text-sm text-gray-500">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden border border-gray-100 h-86 w-full">
              <iframe
                title="Clinic Location"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                src="https://www.openstreetmap.org/export/embed.html?bbox=103.7,1.25,104.0,1.4&layer=mapnik"
              />
            </div>

            <hr className="border-gray-100" />

            {/* What's Nearby */}
            <div>
              <h2 className="text-base font-semibold text-gray-800 mb-4">What's Nearby the Clinic</h2>
              <div className="flex items-center gap-6">
                {nearbyTabs.map(({ id, icon }) => (
                  <button
                    key={id}
                    onClick={() => setNearbyTab(id)}
                    className="flex flex-col items-center gap-1.5 group"
                  >
                    <div
                      className={`p-3 rounded-xl border transition-all ${
                        nearbyTab === id
                          ? "border-sky-200 bg-sky-50 text-sky-500"
                          : "border-gray-100 bg-gray-50 text-gray-400 group-hover:border-gray-200"
                      }`}
                    >
                      {icon}
                    </div>
                    <span
                      className={`text-xs font-medium ${
                        nearbyTab === id ? "text-sky-500" : "text-gray-500"
                      }`}
                    >
                      {id}
                    </span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* ── RIGHT STICKY COLUMN ── */}
          <div className="">
  <BookingPanel />
</div>

        </div>
      </div>
    </div>
  );
}