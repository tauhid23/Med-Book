import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Country Data ─────────────────────────────────────────────────────────────
const countries = [
  { code: "AE", name: "UAE",          dial: "+971", flag: "🇦🇪" },
  { code: "US", name: "United States",dial: "+1",   flag: "🇺🇸" },
  { code: "GB", name: "UK",           dial: "+44",  flag: "🇬🇧" },
  { code: "IN", name: "India",        dial: "+91",  flag: "🇮🇳" },
  { code: "SA", name: "Saudi Arabia", dial: "+966", flag: "🇸🇦" },
  { code: "QA", name: "Qatar",        dial: "+974", flag: "🇶🇦" },
  { code: "KW", name: "Kuwait",       dial: "+965", flag: "🇰🇼" },
  { code: "BH", name: "Bahrain",      dial: "+973", flag: "🇧🇭" },
  { code: "OM", name: "Oman",         dial: "+968", flag: "🇴🇲" },
  { code: "EG", name: "Egypt",        dial: "+20",  flag: "🇪🇬" },
  { code: "JO", name: "Jordan",       dial: "+962", flag: "🇯🇴" },
  { code: "LB", name: "Lebanon",      dial: "+961", flag: "🇱🇧" },
  { code: "DE", name: "Germany",      dial: "+49",  flag: "🇩🇪" },
  { code: "FR", name: "France",       dial: "+33",  flag: "🇫🇷" },
  { code: "AU", name: "Australia",    dial: "+61",  flag: "🇦🇺" },
  { code: "CA", name: "Canada",       dial: "+1",   flag: "🇨🇦" },
  { code: "PK", name: "Pakistan",     dial: "+92",  flag: "🇵🇰" },
  { code: "BD", name: "Bangladesh",   dial: "+880", flag: "🇧🇩" },
  { code: "TR", name: "Turkey",       dial: "+90",  flag: "🇹🇷" },
  { code: "NG", name: "Nigeria",      dial: "+234", flag: "🇳🇬" },
];

// ─── Country Dropdown ─────────────────────────────────────────────────────────
function CountryDropdown({
  selected,
  onChange,
}: {
  selected: (typeof countries)[0];
  onChange: (c: (typeof countries)[0]) => void;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const filtered = countries.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.dial.includes(search)
  );

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => searchRef.current?.focus(), 50);
  }, [open]);

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-1.5 h-full px-3 border-r border-gray-200 bg-transparent hover:bg-gray-50 transition-colors rounded-l-xl focus:outline-none"
        style={{ minWidth: 80 }}
      >
        <span className="text-xl leading-none">{selected.flag}</span>
        <span className="text-sm text-gray-600 font-medium">{selected.dial}</span>
        <ChevronDown
          size={14}
          className={`text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden"
          >
            {/* Search */}
            <div className="px-3 pt-3 pb-2">
              <input
                ref={searchRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search country..."
                className="w-full text-sm px-3 py-2 rounded-xl border border-gray-200 outline-none focus:border-[#38bdf8] transition-colors"
              />
            </div>

            {/* List */}
            <div className="max-h-52 overflow-y-auto pb-2">
              {filtered.length === 0 ? (
                <p className="text-center text-sm text-gray-400 py-4">No results</p>
              ) : (
                filtered.map((c) => (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => {
                      onChange(c);
                      setOpen(false);
                      setSearch("");
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors text-left ${
                      c.code === selected.code ? "bg-sky-50 text-sky-600" : "text-gray-700"
                    }`}
                  >
                    <span className="text-lg">{c.flag}</span>
                    <span className="flex-1 font-medium">{c.name}</span>
                    <span className="text-gray-400 text-xs">{c.dial}</span>
                    {c.code === selected.code && (
                      <Check size={14} className="text-sky-500" />
                    )}
                  </button>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Checkbox ─────────────────────────────────────────────────────────────────
function Checkbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: React.ReactNode;
}) {
  return (
    <label className="flex items-start gap-3 cursor-pointer group">
      <div
        onClick={() => onChange(!checked)}
        className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center shrink-0 border-2 transition-all duration-200 ${
          checked
            ? "bg-[#38bdf8] border-[#38bdf8]"
            : "border-gray-300 bg-white group-hover:border-[#38bdf8]"
        }`}
      >
        <AnimatePresence>
          {checked && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Check size={12} className="text-white" strokeWidth={3} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <span className="text-sm text-gray-500 leading-relaxed">{label}</span>
    </label>
  );
}

// ─── Input Field ──────────────────────────────────────────────────────────────
function InputField({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-[#4a90a4]">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-700 placeholder-gray-300 outline-none focus:border-[#38bdf8] focus:ring-2 focus:ring-[#38bdf8]/10 transition-all duration-200 bg-white"
      />
    </div>
  );
}

// ─── Feature Item ─────────────────────────────────────────────────────────────
function FeatureItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-4">
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
        style={{ background: "linear-gradient(135deg, #a8eddc, #4fd1aa)" }}
      >
        <Check size={15} className="text-white" strokeWidth={3} />
      </div>
      <span className="text-gray-600 text-[0.95rem]">{text}</span>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ListYourClinic() {
  const [form, setForm] = useState({
    clinicName: "",
    contactPerson: "",
    email: "",
    phone: "",
    clinicGroup: "",
  });
  const [country, setCountry] = useState(countries[0]);
  const [joinNetwork, setJoinNetwork] = useState(false);
  const [agreePolicy, setAgreePolicy] = useState(false);

  const set = (key: keyof typeof form) => (val: string) =>
    setForm((p) => ({ ...p, [key]: val }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ ...form, countryDial: country.dial, joinNetwork, agreePolicy });
  };

  return (
    <section
      className="min-h-screen w-full bg-white flex items-center justify-center px-4 py-8"
    >
      <div className="max-w-7xl w-full mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-46">

        {/* ── LEFT ── */}
        <motion.div
          className="flex-1 max-w-lg"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1
            className="text-[2rem] sm:text-[2.4rem] font-extrabold leading-tight mb-4"
            style={{ color: "#1a2e3b", fontFamily: "'Raleway', 'Nunito Sans', sans-serif" }}
          >
            Achieve More with Your Business
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed mb-8">
            Discover the solutions that will take your business to the next level
          </p>

          <div className="flex flex-col gap-5">
            <FeatureItem text="Grow your patient network" />
            <FeatureItem text="Connect with international patients" />
            <FeatureItem text="Boost your online presence" />
          </div>
        </motion.div>

        {/* ── RIGHT — Form Card ── */}
        <motion.div
  className="flex-1 w-full max-w-2xl"
  initial={{ opacity: 0, x: 30 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
>
  <form
    onSubmit={handleSubmit}
    className="bg-white rounded-3xl border border-gray-100 shadow-lg px-5 sm:px-8 py-8 sm:py-10 flex flex-col gap-5"
  >
    {/* Title */}
    <h2
      className="text-xl sm:text-2xl font-semibold text-center text-gray-800 mb-2" 
      style={{ fontFamily: "'Raleway', 'Nunito Sans', sans-serif" }}
    >
      List your clinic
    </h2>

    {/* Row 1 */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
      <InputField
        label="Clinic Name"
        placeholder="Enter clinic name"
        value={form.clinicName}
        onChange={set("clinicName")}
      />
      <InputField
        label="Contact Person"
        placeholder="Enter contact name"
        value={form.contactPerson}
        onChange={set("contactPerson")}
      />
    </div>

    {/* Row 2 */}
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
      <InputField
        label="Email Address"
        placeholder="email@example.com"
        type="email"
        value={form.email}
        onChange={set("email")}
      />

      {/* Phone with Country Dropdown */}
      <div className="flex flex-col gap-1.5 w-full">
        <label className="text-xs font-semibold text-[#4a90a4]">
          Phone Number
        </label>

        <div className="flex items-center w-full rounded-xl border border-gray-200 overflow-hidden focus-within:border-[#38bdf8] focus-within:ring-2 focus-within:ring-[#38bdf8]/10 transition-all duration-200 bg-white h-[46px] sm:h-[48px]">
          <CountryDropdown selected={country} onChange={setCountry} />

          <input
            type="tel"
            value={form.phone}
            onChange={(e) => set("phone")(e.target.value)}
            placeholder="111 222 333 444"
            className="flex-1 min-w-0 px-3 py-3 text-sm text-gray-700 placeholder-gray-300 bg-transparent outline-none"
          />
        </div>
      </div>
    </div>

    {/* Clinic Group */}
    <InputField
      label="Clinic Group (optional)"
      placeholder="Enter clinic group name"
      value={form.clinicGroup}
      onChange={set("clinicGroup")}
    />

    {/* Checkboxes */}
    <div className="flex flex-col gap-3 mt-1">
      <Checkbox
        checked={joinNetwork}
        onChange={setJoinNetwork}
        label="Join our network"
      />

      <Checkbox
        checked={agreePolicy}
        onChange={setAgreePolicy}
        label={
          <>
            By submitting your information, you agree to the use and
            processing of your personal data in accordance with our{" "}
            <a href="#" className="text-[#38bdf8] hover:underline">
              Privacy Policy
            </a>
            .
          </>
        }
      />
    </div>

    {/* Submit */}
    <motion.button
      type="submit"
      whileHover={{ opacity: 0.92 }}
      whileTap={{ scale: 0.98 }}
      className="w-full py-4 rounded-2xl text-white font-semibold text-base mt-2 transition-all"
      style={{
        background: "linear-gradient(90deg, #38bdf8 0%, #22d3ee 100%)",
      }}
    >
      Submit
    </motion.button>
  </form>
</motion.div>
      </div>
    </section>
  );
}