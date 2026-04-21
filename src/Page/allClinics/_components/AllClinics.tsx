import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";



type Treatment = {
  name: string;
  price: string;
};

type Clinic = {
  id: number;
  name: string;
  image: string;
  rating: number;
  location: string;
  distance: string;
  badges: string[];
  amenities: string[];
  treatments: Treatment[];
};

const clinics: Clinic[] = [
  {
    id: 1,
    name: "City Medical Center",
    image: "https://images.unsplash.com/photo-1587351021355-a479a299d2f9?w=600&q=80",
    rating: 4.9,
    location: "Marsala, Italy",
    distance: "0.69 km from the city center",
    badges: ["EHIC", "GHIC"],
    amenities: ["Refreshments", "Free Transfer", "Free Parking"],
    treatments: [
      { name: "Dialysis HD", price: "$250" },
      { name: "Dialysis HDF", price: "$250" },
    ],
  },
  {
    id: 2,
    name: "Apollo Dialysis Hub",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80",
    rating: 4.7,
    location: "Milan, Italy",
    distance: "1.2 km from the city center",
    badges: ["EHIC", "GHIC"],
    amenities: ["Refreshments", "Free Transfer", "Free Parking"],
    treatments: [
      { name: "Dialysis HD", price: "$230" },
      { name: "Dialysis HDF", price: "$260" },
    ],
  },
  {
    id: 3,
    name: "MedLife Renal Clinic",
    image: "https://images.unsplash.com/photo-1626315869436-d6781ba69d6e?w=600&q=80",
    rating: 4.8,
    location: "Rome, Italy",
    distance: "2.1 km from the city center",
    badges: ["EHIC"],
    amenities: ["Refreshments", "Free Parking"],
    treatments: [
      { name: "Dialysis HD", price: "$220" },
      { name: "Dialysis HDF", price: "$245" },
    ],
  },
  {
    id: 4,
    name: "NephroPlus Center",
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&q=80",
    rating: 4.6,
    location: "Naples, Italy",
    distance: "0.95 km from the city center",
    badges: ["EHIC", "GHIC"],
    amenities: ["Refreshments", "Free Transfer", "Free Parking"],
    treatments: [
      { name: "Dialysis HD", price: "$210" },
      { name: "Dialysis HDF", price: "$240" },
    ],
  },
  {
    id: 5,
    name: "Global Kidney Institute",
    image: "https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?w=600&q=80",
    rating: 4.9,
    location: "Florence, Italy",
    distance: "1.5 km from the city center",
    badges: ["EHIC", "GHIC"],
    amenities: ["Refreshments", "Free Transfer", "Free Parking"],
    treatments: [
      { name: "Dialysis HD", price: "$270" },
      { name: "Dialysis HDF", price: "$295" },
    ],
  },
  {
    id: 6,
    name: "RenalCare Specialists",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&q=80",
    rating: 4.5,
    location: "Venice, Italy",
    distance: "3.0 km from the city center",
    badges: ["GHIC"],
    amenities: ["Refreshments", "Free Parking"],
    treatments: [
      { name: "Dialysis HD", price: "$200" },
      { name: "Dialysis HDF", price: "$225" },
    ],
  },
  {
    id: 7,
    name: "Sunrise Dialysis Clinic",
    image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600&q=80",
    rating: 4.8,
    location: "Bologna, Italy",
    distance: "0.5 km from the city center",
    badges: ["EHIC", "GHIC"],
    amenities: ["Refreshments", "Free Transfer", "Free Parking"],
    treatments: [
      { name: "Dialysis HD", price: "$255" },
      { name: "Dialysis HDF", price: "$275" },
    ],
  },
];


const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};


function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex bg-amber-100/50 p-1.5 rounded-lg items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          viewBox="0 0 20 20"
          fill={star <= Math.floor(rating) ? "#FBBF24" : star - 0.5 <= rating ? "#FBBF24" : "#D1D5DB"}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-sm font-semibold text-gray-700 ml-1">{rating}</span>
    </div>
  );
}

function LocationIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-green-400 shrink-0" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  );
}

function AmenityIcon({ type }: { type: string }) {
  if (type === "Refreshments") return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
  if (type === "Free Transfer") return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
    </svg>
  );
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
    </svg>
  );
}

function ClinicCard({ clinic }: { clinic: Clinic }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col w-full">
      <div className="w-full overflow-hidden rounded-xl m-3" style={{ width: "calc(100% - 24px)", height: "300px" }}>
        <img
          src={clinic.image}
          alt={clinic.name}
          className="w-full h-full object-cover rounded-xl"
        />
      </div>

      <div className="px-5 pb-5 flex flex-col gap-3 flex-1">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold" style={{ color: "#0ea5e9" }}>{clinic.name}</h3>
          <StarRating rating={clinic.rating} />
        </div>

        <div className="flex items-center gap-1.5 text-sm text-gray-500">
          <LocationIcon />
          <span>{clinic.location}</span>
          <span className="text-gray-300 mx-1">|</span>
          <span>{clinic.distance}</span>
        </div>

        <div className="flex items-center gap-3">
          {clinic.badges.map((badge) => (
            <div key={badge} className="flex items-center gap-1">
              <CheckIcon />
              <span className="text-sm font-medium" style={{ color: "#0ea5e9" }}>{badge}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {clinic.amenities.map((amenity) => (
            <div key={amenity} className="flex items-center gap-1">
              <AmenityIcon type={amenity} />
              <span className="text-xs text-gray-500">{amenity}</span>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-100 mt-1" />

        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs text-gray-400 mb-1">Per treatment</p>
            {clinic.treatments.map((t) => (
              <p key={t.name} className="text-sm font-normal text-gray-500">
                {t.name}{" "}
                <span className="font-normal text-gray-500">{t.price}</span>
              </p>
            ))}
          </div>
          <Link
          to={`/clinic-details/${clinic.id}`}
            className="px-6 py-2.5 rounded-xl text-white text-sm font-semibold transition-opacity hover:opacity-90 active:scale-95"
            style={{ background: "linear-gradient(135deg, #38bdf8, #0ea5e9)" }}
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}

const filterOptions: string[] = ["All Dialysis", "Dialysis HD", "Dialysis HDF"];
const sortOptions: string[] = ["Rating", "Distance", "Price"];

function AllClinics() {
  const [activeFilter, setActiveFilter] = useState<string>("All Dialysis");
  const [sortBy, setSortBy] = useState<string>("Rating");
  const [sortOpen, setSortOpen] = useState<boolean>(false);

  const filteredClinics = clinics.filter((clinic) => {
    if (activeFilter === "All Dialysis") return true;
    return clinic.treatments.some((t) => t.name === activeFilter);
  });

  return (
    <div className="min-h-screen  py-6">
      {/* Filter Bar */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-gray-700 font-medium text-sm">Filters</span>
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-2 py-1.5 shadow-sm">
          {filterOptions.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className="px-4 py-1.5 rounded-full text-sm font-medium transition-all"
              style={
                activeFilter === filter
                  ? { background: "linear-gradient(135deg, #38bdf8, #0ea5e9)", color: "white" }
                  : { color: "#6b7280", background: "transparent" }
              }
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

 <div className="h-px w-auto bg-gray-200/60 mt-5 mb-5"></div>

      {/* Header Row */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Discover{" "}
          <span className="font-bold">{filteredClinics.length * 30 + 2}</span>{" "}
          Clinics in (Singapore)
        </h2>
        <div className="relative">
          <button
            onClick={() => setSortOpen((v) => !v)}
            className="flex items-center gap-1.5 text-sm text-gray-600 font-medium"
          >
            Sort by:{" "}
            <span className="text-gray-800 font-semibold">{sortBy}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {sortOpen && (
            <div className="absolute right-0 top-8 bg-white border border-gray-100 shadow-lg rounded-xl overflow-hidden z-10 w-36">
              {sortOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => { setSortBy(opt); setSortOpen(false); }}
                  className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-sky-50 hover:text-sky-500 transition-colors"
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="h-px w-auto bg-gray-200/60 md:mb-14 mb-8"></div>

      {/* Cards Grid */}
      <motion.div
  variants={containerVariants}
  initial="hidden"
  animate="visible"
  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
>
        {filteredClinics.map((clinic) => (
  <motion.div key={clinic.id} variants={cardVariants}>
    <ClinicCard clinic={clinic} />
  </motion.div>
))}
      </motion.div>
    </div>
  );
}

export default AllClinics;