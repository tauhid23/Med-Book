import { useState, useEffect, useRef, useCallback } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, User, CircleUserRound } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import logo from "../../public/Images/logo.svg";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "List Your Clinic", to: "/list-your-clinic" },
  { label: "Blog", to: "/blog" },
  { label: "See All Clinic", to: "/see-all-clinic" },
  { label: "About Us", to: "/about-us" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const location = useLocation();

  // ─── Close mobile menu & dropdown on route change ───────────────────────────
  useEffect(() => {
    setMenuOpen(false);
    setUserDropdownOpen(false);
  }, [location.pathname]);

  // ─── Lock body scroll when mobile menu is open ───────────────────────────────
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // ─── Scroll hide/show — IGNORE while mobile menu is open ─────────────────────
  useEffect(() => {
    const handleScroll = () => {
      // Never hide navbar while mobile menu is open
      if (menuOpen) return;

      const currentY = window.scrollY;
      setIsAtTop(currentY < 20);

      if (currentY > lastScrollY.current && currentY > 80) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuOpen]);

  // ─── Always show navbar when menu opens ──────────────────────────────────────
  useEffect(() => {
    if (menuOpen) {
      setShowNavbar(true);
    }
  }, [menuOpen]);

  // ─── Close dropdown on outside click ─────────────────────────────────────────
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    if (userDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [userDropdownOpen]);

  // ─── Close on Escape key ─────────────────────────────────────────────────────
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div
          className={`transition-all duration-500 ${
            isAtTop && !menuOpen
              ? "bg-transparent py-6"
              : "bg-white/90 backdrop-blur-xl py-4 shadow-sm"
          }`}
        >
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <nav className="flex items-center justify-between h-16">

              {/* ==================== LARGE SCREENS (>= 1020px) ==================== */}
              <div className="hidden lg:flex items-center justify-between w-full">

                {/* Left Logo */}
                <Link to="/" className="flex items-center gap-3 group">
                  <img
                    src={logo}
                    alt="MedBook"
                    className="h-11 w-auto transition-transform group-hover:scale-105"
                  />
                  <h1 className="text-2xl font-semibold tracking-tighter text-primary">
                    MedBook
                  </h1>
                </Link>

                {/* Center Menu */}
                <ul className="flex items-center gap-10">
                  {navLinks.map(({ label, to }) => (
                    <li key={to}>
                      <NavLink
                        to={to}
                        end
                        className={({ isActive }) =>
                          `relative text-sm font-medium transition-colors duration-200 ${
                            isActive ? "text-primary" : "text-gray-700 hover:text-primary"
                          }`
                        }
                      >
                        {({ isActive }) => (
                          <>
                            {label}
                            <span
                              className={`absolute -bottom-1 left-0 h-[2.5px] bg-primary rounded-full transition-all duration-300 ${
                                isActive ? "w-full" : "w-0 group-hover:w-full"
                              }`}
                            />
                          </>
                        )}
                      </NavLink>
                    </li>
                  ))}
                </ul>

                {/* Right User Button */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setUserDropdownOpen((prev) => !prev)}
                    aria-expanded={userDropdownOpen}
                    aria-haspopup="true"
                    className="flex items-center gap-3 bg-white border border-gray-200 hover:border-gray-300 px-5 py-2.5 rounded-full transition-all active:scale-95"
                  >
                    <CircleUserRound size={26} className="text-gray-600" />
                    <ChevronDown
                      size={18}
                      className={`transition-transform duration-300 ${userDropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* User Dropdown */}
                  <AnimatePresence>
                    {userDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute right-0 mt-4 w-72 bg-white rounded-3xl shadow-2xl border border-gray-100 py-2 z-50"
                      >
                        <div className="px-6 py-4 border-b">
                          <p className="font-semibold">Get Started</p>
                          <p className="text-sm text-gray-500">Choose your role</p>
                        </div>
                        <div className="p-2">


                          {/* Just to show case then We will delete */}
                    {/* ----------------- */}
                    <Link
                      to="/user-account"
                      onClick={closeMenu}
                      className="flex items-center gap-4 px-6 py-5 hover:bg-gray-50 rounded-2xl mb-3 transition-all"
                    >
                      <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                        <User size={28} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold">User Account</p>
                        <p className="text-sm text-gray-500">View you Account & Booking History</p>
                      </div>
                    </Link>

                    {/* ----------------- */}

                          <Link
                            to="/signup"
                            className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 rounded-2xl transition-colors"
                            onClick={() => setUserDropdownOpen(false)}
                          >
                            <div className="w-11 h-11 bg-blue-100 rounded-2xl flex items-center justify-center">
                              <User size={24} className="text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium">I'm a Patient</p>
                              <p className="text-xs text-gray-500">Book appointments</p>
                            </div>
                          </Link>

                          <Link
                            to="/list-your-clinic"
                            className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 rounded-2xl transition-colors"
                            onClick={() => setUserDropdownOpen(false)}
                          >
                            <div className="w-11 h-11 bg-emerald-100 rounded-2xl flex items-center justify-center text-3xl">
                              🏥
                            </div>
                            <div>
                              <p className="font-medium">I'm a Clinic Owner</p>
                              <p className="text-xs text-gray-500">List your clinic</p>
                            </div>
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* ==================== MOBILE + TABLET (< 1020px) ==================== */}
              <div className="lg:hidden flex items-center justify-between w-full">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3">
                  <img src={logo} alt="MedBook" className="h-10 w-auto" />
                  <h1 className="text-xl font-semibold tracking-tighter text-primary">MedBook</h1>
                </Link>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setMenuOpen((prev) => !prev)}
                  aria-label={menuOpen ? "Close menu" : "Open menu"}
                  aria-expanded={menuOpen}
                  className="p-3 text-gray-700 hover:bg-gray-100 rounded-xl transition-all"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {menuOpen ? (
                      <motion.div
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <X size={28} />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Menu size={28} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </nav>
          </div>

          {/* ==================== MOBILE MENU ==================== */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                key="mobile-menu"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="lg:hidden bg-white border-t shadow-xl overflow-hidden"
              >
                <div className="px-6 py-8 ">
                  {navLinks.map(({ label, to }, i) => (
                    <motion.div
                      key={to}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.25 }}
                    >
                      <NavLink
                        to={to}
                        end
                        onClick={closeMenu}
                        className={({ isActive }) =>
                          `block px-6 py-4 text-lg font-medium rounded-2xl transition-all ${
                            isActive
                              ? "bg-primary/10 text-primary"
                              : "text-gray-700 hover:bg-gray-50"
                          }`
                        }
                      >
                        {label}
                      </NavLink>
                    </motion.div>
                  ))}

                  {/* Mobile User Options */}
                  <motion.div
                    className="pt-4 mt-8 border-t"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: navLinks.length * 0.05 + 0.1 }}
                  >
                    <p className="px-6 text-xs font-semibold text-gray-500 mb-4 tracking-widest">
                      GET STARTED AS
                    </p>

                    {/* Just to show case then We will delete */}
                    {/* ----------------- */}
                    <Link
                      to="/user-account"
                      onClick={closeMenu}
                      className="flex items-center gap-4 px-6 py-5 hover:bg-gray-50 rounded-2xl mb-3 transition-all"
                    >
                      <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                        <User size={28} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold">User Account</p>
                        <p className="text-sm text-gray-500">View you Account & Booking History</p>
                      </div>
                    </Link>

                    {/* ----------------- */}

                    <Link
                      to="/signup"
                      onClick={closeMenu}
                      className="flex items-center gap-4 px-6 py-5 hover:bg-gray-50 rounded-2xl mb-3 transition-all"
                    >
                      <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                        <User size={28} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold">I'm a Patient</p>
                        <p className="text-sm text-gray-500">Book medical appointments</p>
                      </div>
                    </Link>

                    <Link
                      to="/list-your-clinic"
                      onClick={closeMenu}
                      className="flex items-center gap-4 px-6 py-5 hover:bg-gray-50 rounded-2xl transition-all"
                    >
                      <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-3xl">
                        🏥
                      </div>
                      <div>
                        <p className="font-semibold">I'm a Clinic Owner</p>
                        <p className="text-sm text-gray-500">List your clinic</p>
                      </div>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* ── Backdrop overlay — closes menu on outside tap (mobile UX standard) ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
            onClick={closeMenu}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </>
  );
}