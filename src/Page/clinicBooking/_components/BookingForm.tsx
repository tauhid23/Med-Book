import { useState, useRef } from "react";

// ── Types ──────────────────────────────────────────────
type ShiftOption = "Morning shift" | "Afternoon shift" | "Evening shift";
type TreatmentType = "Dialysis HD" | "Dialysis HDF";

interface SelectedDate {
  day: number;
  shift: ShiftOption;
}

// ── Helpers ─────────────────────────────────────────────
const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const FULL_DAY_NAMES = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const SHIFTS: ShiftOption[] = ["Morning shift","Afternoon shift","Evening shift"];

function getDayName(year: number, month: number, day: number) {
  return FULL_DAY_NAMES[new Date(year, month, day).getDay()];
}



function CloseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-300 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}

// ── Calendar Component ──────────────────────────────────
function InteractiveCalendar({
  year, month, selectedDays, onToggleDay,
}: {
  year: number;
  month: number;
  selectedDays: number[];
  onToggleDay: (day: number) => void;
}) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className="w-full max-w-xs">
      <p className="text-xs font-semibold text-gray-600 text-center mb-3">
        {MONTH_NAMES[month]} {year}
      </p>
      <div className="grid grid-cols-7 mb-1">
        {DAY_NAMES.map((d, i) => (
          <div
            key={d}
            className={`text-center text-[11px] font-medium pb-1 ${
              i === 0 || i === 6 ? "text-sky-400" : "text-gray-400"
            }`}
          >
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {cells.map((day, idx) => {
          if (day === null) return <div key={idx} />;
          const col = idx % 7;
          const isSat = col === 6;
          const isSun = col === 0;
          const isSelected = selectedDays.includes(day);
          return (
            <button
              key={idx}
              onClick={() => onToggleDay(day)}
              className={`flex items-center justify-center h-8 w-8 mx-auto rounded-full text-[12px] font-medium transition-all
                ${isSelected
                  ? "text-white"
                  : isSat || isSun
                  ? "text-sky-400 hover:bg-sky-50"
                  : "text-gray-700 hover:bg-gray-100"
                }`}
              style={isSelected ? { background: "linear-gradient(135deg, #38bdf8, #0ea5e9)" } : {}}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Shift Selector Row ──────────────────────────────────
function ShiftRow({
  label, shift, onChangeShift, onRemove,
}: {
  label: string;
  shift: ShiftOption;
  onChangeShift: (s: ShiftOption) => void;
  onRemove: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-4">
      <p className="text-xs text-gray-500 mb-1.5">{label}</p>
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <button
            onClick={() => setOpen((v) => !v)}
            className="w-full flex items-center justify-between border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-600 bg-white hover:border-gray-300 transition-colors"
          >
            <span>{shift}</span>
            <ChevronDownIcon />
          </button>
          {open && (
            <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-100 rounded-lg shadow-lg z-10 overflow-hidden">
              {SHIFTS.map((s) => (
                <button
                  key={s}
                  onClick={() => { onChangeShift(s); setOpen(false); }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-sky-50 hover:text-sky-500 ${
                    shift === s ? "text-sky-500 bg-sky-50/50" : "text-gray-600"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
        <button
          onClick={onRemove}
          className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  );
}

// ── Right Panel ─────────────────────────────────────────
function BookingSummaryPanel({ selectedCount }: { selectedCount: number }) {
  const total = 79 * selectedCount;
  return (
    <div className="sticky top-6 flex flex-col gap-4">
      {/* Clinic card */}
      <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
        <div className="flex gap-3 items-start">
          <img
            src="https://images.unsplash.com/photo-1587351021355-a479a299d2f9?w=120&q=80"
            alt="City Medical Center"
            className="w-16 h-16 rounded-xl object-cover shrink-0"
          />
          <div>
            <h3 className="text-sm font-bold text-gray-800 mb-1">City Medical Center</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Block 21A, Orchard Boulevard, #12-144<br />
              Orchard Gateway Tower 2, Near Somerset<br />
              MRT Exit B, Singapore 238895
            </p>
          </div>
        </div>

        <hr className="border-gray-100 my-4" />

        {/* Price details */}
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-3">Price Details</p>
          <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
            <span>$79 × {selectedCount} treatment{selectedCount !== 1 ? "s" : ""}</span>
            <span className="font-semibold text-gray-800">${total}</span>
          </div>
          <button
            className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all"
            style={{
              background: selectedCount > 0
                ? "linear-gradient(135deg, #38bdf8, #0ea5e9)"
                : "#e5e7eb",
              color: selectedCount > 0 ? "white" : "#9ca3af",
            }}
          >
            Confirm Your Booking
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ───────────────────────────────────────────
export default function BookAppointmentPage() {
  const YEAR = 2025;
  const MONTH = 10; // November

  const [selectedDates, setSelectedDates] = useState<SelectedDate[]>([
    { day: 23, shift: "Morning shift" },
    { day: 26, shift: "Morning shift" },
    { day: 27, shift: "Morning shift" },
  ]);

  const [treatment, setTreatment] = useState<TreatmentType>("Dialysis HD");
  const [patientStatus, setPatientStatus] = useState({ hiv: false, hbv: false, hcv: false });
  const [insurance, setInsurance] = useState({ ehic: false, ghic: false });
  const [carepartner, setCarepartner] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const selectedDays = selectedDates.map((d) => d.day);

  function toggleDay(day: number) {
    const exists = selectedDates.find((d) => d.day === day);
    if (exists) {
      setSelectedDates((prev) => prev.filter((d) => d.day !== day));
    } else {
      const sorted = [...selectedDates, { day, shift: "Morning shift" as ShiftOption }].sort((a, b) => a.day - b.day);
      setSelectedDates(sorted);
    }
  }

  function updateShift(day: number, shift: ShiftOption) {
    setSelectedDates((prev) => prev.map((d) => d.day === day ? { ...d, shift } : d));
  }

  function removeDate(day: number) {
    setSelectedDates((prev) => prev.filter((d) => d.day !== day));
  }

  function getDateLabel(day: number) {
    const dayName = getDayName(YEAR, MONTH, day);
    return `${dayName}, ${MONTH_NAMES[MONTH]} ${day}`;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-8 py-10">
        <div className="flex gap-10 items-start">

          {/* ── LEFT COLUMN ── */}
          <div className="flex-1 min-w-0">
            {/* Page header */}
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Book Your Appointment</h1>
            <p className="text-sm text-gray-400 mb-8">Plan Your Visit With Confidence and Clarity</p>


            <hr className="border-gray-100 mb-8" />

            {/* Treatment Days & Shifts */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-bold text-gray-800">Treatment Days & Shifts</h2>
                
              </div>
              <p className="text-sm text-gray-500 leading-relaxed mb-6">
                Select the days you prefer for your treatment by clicking on each date<br />
                within the selected period. After choosing the dates, pick your preferred<br />
                treatment shift from the options shown below the calendar.
              </p>

              {/* Calendar */}
              <div className="mb-6 mt-12">
                <InteractiveCalendar
                  year={YEAR}
                  month={MONTH}
                  selectedDays={selectedDays}
                  onToggleDay={toggleDay}
                />
              </div>

              {/* Shift selectors */}
              {selectedDates.map(({ day, shift }) => (
                <ShiftRow
                  key={day}
                  label={getDateLabel(day)}
                  shift={shift}
                  onChangeShift={(s) => updateShift(day, s)}
                  onRemove={() => removeDate(day)}
                />
              ))}
            </div>

            <hr className="border-gray-100 mb-8" />

            {/* Patient Details */}
            <div className="mb-8">
              <h2 className="text-base font-bold text-gray-800 mb-1">Patient Details</h2>
              <p className="text-sm text-gray-400 mb-6">
                Please Provide the Full Personal Details of the Individual You Are Booking the Treatment For
              </p>

              <div className="flex flex-col gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-sky-300 transition-colors"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-sky-300 transition-colors"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Phone Number</label>
                  <div className="flex border border-gray-200 rounded-lg overflow-hidden focus-within:border-sky-300 transition-colors">
                    <div className="flex items-center gap-2 px-3 py-2.5 border-r border-gray-200 bg-gray-50 shrink-0">
                      <span className="text-base">🇦🇪</span>
                      <span className="text-xs text-gray-500">—</span>
                    </div>
                    <input
                      type="tel"
                      placeholder="111 222 333 444"
                      className="flex-1 px-4 py-2.5 text-sm text-gray-700 placeholder-gray-300 focus:outline-none bg-white"
                    />
                  </div>
                </div>

                {/* Birth date */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Birth date</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="dd/mm/yyyy"
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-sky-300 transition-colors pr-10"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2">
                      <CalendarIcon />
                    </span>
                  </div>
                </div>

                {/* Language Preference */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Language Preference</label>
                  <div className="relative">
                    <select className="w-full appearance-none border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-600 focus:outline-none focus:border-sky-300 transition-colors bg-white pr-10">
                      <option>English</option>
                      <option>Arabic</option>
                      <option>French</option>
                      <option>Spanish</option>
                    </select>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <ChevronDownIcon />
                    </span>
                  </div>
                </div>

                {/* Patient Status */}
                <div className="pt-2">
                  <p className="text-xs font-medium text-gray-600 mb-2">Patient Status</p>
                  <div className="flex items-center gap-5 flex-wrap">
                    {[
                      { key: "hiv" as const, label: "HIV Positive" },
                      { key: "hbv" as const, label: "HBV Positive" },
                      { key: "hcv" as const, label: "HCV Positive" },
                    ].map(({ key, label }) => (
                      <label key={key} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={patientStatus[key]}
                          onChange={() => setPatientStatus((p) => ({ ...p, [key]: !p[key] }))}
                          className="w-4 h-4 rounded border-gray-300 text-sky-500 focus:ring-sky-400"
                        />
                        <span className="text-sm text-gray-600">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Health Insurance Card */}
                <div>
                  <p className="text-xs font-medium text-gray-600 mb-2">Health Insurance Card</p>
                  <div className="flex items-center gap-5">
                    {[
                      { key: "ehic" as const, label: "EHIC Holder" },
                      { key: "ghic" as const, label: "GHIC Holder" },
                    ].map(({ key, label }) => (
                      <label key={key} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={insurance[key]}
                          onChange={() => setInsurance((i) => ({ ...i, [key]: !i[key] }))}
                          className="w-4 h-4 rounded border-gray-300 text-sky-500 focus:ring-sky-400"
                        />
                        <span className="text-sm text-gray-600">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Select treatment type */}
                <div>
                  <p className="text-xs font-medium text-gray-600 mb-2">Select treatment type</p>
                  <div className="flex gap-2">
                    {(["Dialysis HD", "Dialysis HDF"] as TreatmentType[]).map((t) => (
                      <button
                        key={t}
                        onClick={() => setTreatment(t)}
                        className="px-5 py-2 rounded-full text-sm font-semibold border transition-all"
                        style={
                          treatment === t
                            ? { background: "linear-gradient(135deg, #38bdf8, #0ea5e9)", color: "white", borderColor: "transparent" }
                            : { background: "white", color: "#9ca3af", borderColor: "#e5e7eb" }
                        }
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Care partner */}
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={carepartner}
                    onChange={() => setCarepartner((v) => !v)}
                    className="w-4 h-4 rounded border-gray-300 text-sky-500 focus:ring-sky-400"
                  />
                  <span className="text-sm text-gray-600">I'm bringing my care partner</span>
                </label>
              </div>
            </div>

            <hr className="border-gray-100 mb-8" />

            {/* Home Clinic Details */}
            <div className="mb-8">
              <h2 className="text-base font-bold text-gray-800 mb-5">Home Clinic Details</h2>

              <div className="flex flex-col gap-4">
                {/* Country */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Home Clinic Country</label>
                  <div className="relative">
                    <select className="w-full appearance-none border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-600 focus:outline-none focus:border-sky-300 transition-colors bg-white pr-10">
                      <option>Singapore</option>
                      <option>United Arab Emirates</option>
                      <option>United Kingdom</option>
                      <option>United States</option>
                    </select>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <ChevronDownIcon />
                    </span>
                  </div>
                </div>

                {/* Clinic Name */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Home Clinic Name</label>
                  <input
                    type="text"
                    placeholder="Clinic Name"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-sky-300 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Home Clinic Consultant Name</label>
                  <input
                    type="text"
                    placeholder="Consultant Name"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-sky-300 transition-colors"
                  />
                </div>
              </div>
            </div>

            <hr className="border-gray-100 mb-8" />

            {/* Medical Report */}
            <div className="mb-10">
              <h2 className="text-base font-bold text-gray-800 mb-1">Medical Report</h2>
              <p className="text-sm text-gray-400 mb-5">
                A recent summary from your neurologist or dialysis clinic about your current treatment.
              </p>

              <input
                type="file"
                ref={fileRef}
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) setUploadedFile(f.name);
                }}
              />
              <button
                onClick={() => fileRef.current?.click()}
                className="w-full border-2 border-dashed border-gray-200 rounded-xl py-8 flex flex-col items-center justify-center hover:border-sky-300 transition-colors"
              >
                <UploadIcon />
                {uploadedFile ? (
                  <p className="text-sm text-sky-500 font-medium">{uploadedFile}</p>
                ) : (
                  <p className="text-xs text-gray-400 text-center">
                    Select a file to upload. Formats: PDF,<br />JPG, PNG. Max size: 5MB.
                  </p>
                )}
              </button>
            </div>

          </div>

          {/* ── RIGHT STICKY COLUMN ── */}
          <div className="">
            <BookingSummaryPanel selectedCount={selectedDates.length} />
          </div>

        </div>
      </div>
    </div>
  );
}