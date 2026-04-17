import { useState } from "react";
import hero_image from "../../../../public/Images/hero-doctor-image.png";
import { Search } from "lucide-react";

const avatars = [
  "https://randomuser.me/api/portraits/women/1.jpg",
  "https://randomuser.me/api/portraits/men/2.jpg",
  "https://randomuser.me/api/portraits/women/3.jpg",
  "https://randomuser.me/api/portraits/men/4.jpg",
  "https://randomuser.me/api/portraits/women/5.jpg",
  "https://randomuser.me/api/portraits/men/6.jpg",
];

export default function HeroSection() {
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  return (
    <section
      className="relative w-full min-h-[580px] md:min-h-[70vh] lg:min-h-[85vh] flex items-center overflow-hidden rounded-2xl gradient"
    //   style={{
    //     background:
    //       "linear-gradient(135deg, #e8f6fd 0%, #b3e8f8 40%, #7dd6f5 100%)",
    //   }}
    >
      {/* FULL WIDTH SAFE WRAPPER */}
      <div className="w-full mt-24">
        
        {/* CONTENT CONTAINER */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* LEFT CONTENT */}
          <div className="flex flex-col gap-6  py-14 max-w-3xl">
            
            {/* HEADLINE */}
            <div>
              <h1
                className="text-[2.6rem] font-bold leading-tight text-gray-800"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                Book Verified Dialysis Clinics
                <br />
                While You Travel
              </h1>

              <p className="mt-3 text-gray-500 text-[0.97rem] font-normal">
                Real-time availability, secure booking, and trusted clinics at your fingertips
              </p>
            </div>

            {/* SEARCH BAR */}
            <div className="flex items-center bg-white rounded-2xl shadow-lg px-2 py-2 gap-1 mt-2 max-w-160 w-full">
              
              {/* LOCATION */}
              <div className="flex flex-col px-4 py-2 flex-1 min-w-0 border-r border-gray-200">
                <span className="text-xs font-semibold text-gray-700 mb-1">
                  Search Clinics
                </span>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Search Location"
                  className="text-sm text-gray-400 bg-transparent outline-none placeholder-gray-300 w-full"
                />
              </div>

              {/* CHECK IN */}
              <div className="flex flex-col px-4 py-2 flex-1 min-w-0 border-r border-gray-200">
                <span className="text-xs font-semibold text-gray-700 mb-1">
                  Check In
                </span>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="text-sm text-gray-400 bg-transparent outline-none w-full"
                  style={{ colorScheme: "light" }}
                />
              </div>

              {/* CHECK OUT */}
              <div className="flex flex-col px-4 py-2 flex-1 min-w-0">
                <span className="text-xs font-semibold text-gray-700 mb-1">
                  Check Out
                </span>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="text-sm text-gray-400 bg-transparent outline-none w-full"
                  style={{ colorScheme: "light" }}
                />
              </div>

              {/* BUTTON */}
              <button
                className="flex items-center gap-2 text-white text-sm font-semibold px-7 py-5 rounded-xl ml-2 transition-opacity hover:opacity-90 active:scale-95 shrink-0 bg-primary"
              >
                <Search size={18} />
                Search
              </button>
            </div>

            {/* SOCIAL PROOF */}
            <div className="bg-white rounded-2xl shadow-md px-5 py-4 flex flex-col gap-2 max-w-[280px] mt-22">
              
              <div className="flex items-center">
                {avatars.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`User ${i + 1}`}
                    className="w-9 h-9 rounded-full border-2 border-white object-cover"
                    style={{
                      marginLeft: i === 0 ? 0 : "-10px",
                      zIndex: avatars.length - i,
                    }}
                  />
                ))}

                <div
                  className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white"
                  style={{
                    marginLeft: "-10px",
                    background:
                      "linear-gradient(135deg, #38bdf8, #06b6d4)",
                    zIndex: 0,
                  }}
                >
                  +
                </div>
              </div>

              <p className="text-[0.8rem] text-gray-500 font-medium leading-snug">
                Book from{" "}
                <span className="font-bold text-gray-700">
                  200+ Verified & Certified
                </span>
                <br />
                Clinics Worldwide
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE LAYER (SAFE + RESPONSIVE FIX) */}
        <div className="absolute right-30 bottom-0 h-full flex items-end justify-end pointer-events-none select-none">
          <img
            src={hero_image}
            alt="Doctor"
            className="object-contain h-[95%] max-h-[560px] drop-shadow-xl"
            style={{ objectPosition: "top" }}
          />

          {/* FLOATING CARD */}
          <div
            className="absolute bottom-30 right-[57%] bg-white rounded-2xl shadow-lg flex items-center gap-3 px-4 py-3"
            style={{ minWidth: "180px" }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-[#22D3BB]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.95.684l1.25 3.75a1 1 0 01-.23 1.02l-1.5 1.5a11.042 11.042 0 005.516 5.516l1.5-1.5a1 1 0 011.02-.23l3.75 1.25a1 1 0 01.684.95V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>

            <div>
              <p className="text-[0.7rem] text-gray-400 font-medium">
                24 hour service
              </p>
              <p className="text-sm font-bold text-secondary">
                (000) 111 1020
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}