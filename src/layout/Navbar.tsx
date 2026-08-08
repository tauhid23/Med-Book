import { useCallback, useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Building2,
  ChevronDown,
  CircleUserRound,
  LogOut,
  Menu,
  User,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import logo from "../../public/Images/logo.svg";
import { signout } from "../lib/authApi";
import { useAuthStore } from "../store/authStore";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "List Your Clinic", to: "/list-your-clinic" },
  { label: "Blog", to: "/blog" },
  { label: "See All Clinic", to: "/see-all-clinic" },
  { label: "About Us", to: "/about-us" },
  { label: "Contact", to: "/contact" },
];

const guestLinks = [
  {
    label: "I'm a Patient",
    description: "Book appointments",
    to: "/signup?account_type=PATIENT",
    icon: <User size={24} className="text-blue-600" />,
    iconClass: "bg-blue-100",
  },
  {
    label: "I'm a Clinic Owner",
    description: "Create a clinic-owner account",
    to: "/signup?account_type=CLINIC_OWNER",
    icon: <Building2 size={24} className="text-emerald-600" />,
    iconClass: "bg-emerald-100",
  },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const navigate = useNavigate();

  const accessToken = useAuthStore((state) => state.accessToken);
  const refreshToken = useAuthStore((state) => state.refreshToken);
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const logoutMutation = useMutation({
    mutationFn: async () => {
      if (!accessToken || !refreshToken) return null;
      return signout(accessToken, refreshToken);
    },
    onSettled: () => {
      clearAuth();
      setUserDropdownOpen(false);
      setMenuOpen(false);
      navigate("/signin");
    },
  });

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (menuOpen) return;

      const currentY = window.scrollY;
      setIsAtTop(currentY < 20);
      setShowNavbar(!(currentY > lastScrollY.current && currentY > 80));
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setUserDropdownOpen(false);
      }
    };

    if (userDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [userDropdownOpen]);

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
  const handleLogout = useCallback(() => {
    logoutMutation.mutate();
  }, [logoutMutation]);

  const formattedRole = user?.role?.replace(/_/g, " ").toLowerCase();

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `relative text-sm font-medium transition-colors duration-200 ${
      isActive ? "text-primary" : "text-gray-700 hover:text-primary"
    }`;

  const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block px-6 py-4 text-lg font-medium rounded-2xl transition-all ${
      isActive ? "bg-primary/10 text-primary" : "text-gray-700 hover:bg-gray-50"
    }`;

  const renderGuestLinks = (isMobile = false) =>
    guestLinks.map((item) => (
      <Link
        key={item.to}
        to={item.to}
        onClick={isMobile ? closeMenu : () => setUserDropdownOpen(false)}
        className={`flex items-center gap-4 hover:bg-gray-50 rounded-2xl transition-all ${
          isMobile ? "px-6 py-5 mb-3" : "px-5 py-4"
        }`}
      >
        <div
          className={`${
            isMobile ? "w-12 h-12" : "w-11 h-11"
          } ${item.iconClass} rounded-2xl flex items-center justify-center`}
        >
          {item.icon}
        </div>
        <div>
          <p className={isMobile ? "font-semibold" : "font-medium"}>
            {item.label}
          </p>
          <p className={isMobile ? "text-sm text-gray-500" : "text-xs text-gray-500"}>
            {item.description}
          </p>
        </div>
      </Link>
    ));

  const renderAccountLinks = (isMobile = false) => (
    <>
      <Link
        to="/user-account"
        onClick={isMobile ? closeMenu : () => setUserDropdownOpen(false)}
        className={`flex items-center gap-4 hover:bg-gray-50 rounded-2xl transition-all ${
          isMobile ? "px-6 py-5 mb-3" : "px-5 py-4"
        }`}
      >
        <div
          className={`${
            isMobile ? "w-12 h-12" : "w-11 h-11"
          } bg-blue-100 rounded-2xl flex items-center justify-center`}
        >
          <User size={isMobile ? 28 : 24} className="text-blue-600" />
        </div>
        <div className="min-w-0">
          <p className={isMobile ? "font-semibold" : "font-medium"}>
            User Account
          </p>
          <p className={isMobile ? "text-sm text-gray-500" : "text-xs text-gray-500"}>
            View account and bookings
          </p>
        </div>
      </Link>

      <button
        type="button"
        onClick={handleLogout}
        disabled={logoutMutation.isPending}
        className={`w-full flex items-center gap-4 hover:bg-red-50 rounded-2xl transition-all text-left disabled:opacity-60 ${
          isMobile ? "px-6 py-5" : "px-5 py-4"
        }`}
      >
        <div
          className={`${
            isMobile ? "w-12 h-12" : "w-11 h-11"
          } bg-red-100 rounded-2xl flex items-center justify-center`}
        >
          <LogOut size={isMobile ? 27 : 23} className="text-red-600" />
        </div>
        <div>
          <p className="font-semibold text-red-600">
            {logoutMutation.isPending ? "Logging out..." : "Logout"}
          </p>
          <p className={isMobile ? "text-sm text-gray-500" : "text-xs text-gray-500"}>
            Sign out of this device
          </p>
        </div>
      </button>
    </>
  );

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
              <div className="hidden lg:flex items-center justify-between w-full">
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

                <ul className="flex items-center gap-10">
                  {navLinks.map(({ label, to }) => (
                    <li key={to}>
                      <NavLink to={to} end className={navLinkClass}>
                        {({ isActive }) => (
                          <>
                            {label}
                            <span
                              className={`absolute -bottom-1 left-0 h-[2.5px] bg-primary rounded-full transition-all duration-300 ${
                                isActive ? "w-full" : "w-0"
                              }`}
                            />
                          </>
                        )}
                      </NavLink>
                    </li>
                  ))}
                </ul>

                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setUserDropdownOpen((prev) => !prev)}
                    aria-expanded={userDropdownOpen}
                    aria-haspopup="true"
                    className="flex items-center gap-3 bg-white border border-gray-200 hover:border-gray-300 px-5 py-2.5 rounded-full transition-all active:scale-95"
                  >
                    <CircleUserRound size={26} className="text-gray-600" />
                    <ChevronDown
                      size={18}
                      className={`transition-transform duration-300 ${
                        userDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {userDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute right-0 mt-4 w-72 bg-white rounded-3xl shadow-2xl border border-gray-100 py-2 z-50"
                      >
                        {isAuthenticated ? (
                          <>
                            <div className="px-6 py-4 border-b">
                              <p className="font-semibold truncate">
                                {user?.email || "User Account"}
                              </p>
                              {formattedRole && (
                                <p className="text-sm text-gray-500 capitalize">
                                  {formattedRole}
                                </p>
                              )}
                            </div>
                            <div className="p-2">{renderAccountLinks()}</div>
                          </>
                        ) : (
                          <>
                            <div className="px-6 py-4 border-b">
                              <p className="font-semibold">Get Started</p>
                              <p className="text-sm text-gray-500">
                                Choose your role
                              </p>
                            </div>
                            <div className="p-2">{renderGuestLinks()}</div>
                          </>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="lg:hidden flex items-center justify-between w-full">
                <Link to="/" className="flex items-center gap-3">
                  <img src={logo} alt="MedBook" className="h-10 w-auto" />
                  <h1 className="text-xl font-semibold tracking-tighter text-primary">
                    MedBook
                  </h1>
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen((prev) => {
                      const next = !prev;
                      if (next) setShowNavbar(true);
                      return next;
                    });
                  }}
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
                <div className="px-6 py-8">
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
                        className={mobileNavLinkClass}
                      >
                        {label}
                      </NavLink>
                    </motion.div>
                  ))}

                  <motion.div
                    className="pt-4 mt-8 border-t"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: navLinks.length * 0.05 + 0.1 }}
                  >
                    {isAuthenticated ? (
                      <>
                        <div className="px-6 mb-4">
                          <p className="text-xs font-semibold text-gray-500 tracking-widest">
                            ACCOUNT
                          </p>
                          <p className="font-semibold truncate mt-2">
                            {user?.email || "User Account"}
                          </p>
                          {formattedRole && (
                            <p className="text-sm text-gray-500 capitalize">
                              {formattedRole}
                            </p>
                          )}
                        </div>
                        {renderAccountLinks(true)}
                      </>
                    ) : (
                      <>
                        <p className="px-6 text-xs font-semibold text-gray-500 mb-4 tracking-widest">
                          GET STARTED AS
                        </p>
                        {renderGuestLinks(true)}
                      </>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

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
