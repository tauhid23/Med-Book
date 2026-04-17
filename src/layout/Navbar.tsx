import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, ChevronDown, User, CircleUserRound } from "lucide-react";
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
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Enhanced scroll behavior
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;

        setIsAtTop(currentScrollY < 20);

        if (currentScrollY > lastScrollY && currentScrollY > 80) {
          setShowNavbar(false);
        } else {
          setShowNavbar(true);
        }

        setLastScrollY(currentScrollY);
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuOpen && !(e.target as HTMLElement).closest("nav")) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div
        className={`transition-all duration-500 ${
          isAtTop
            ? "bg-transparent py-6"
            : "bg-white/55 backdrop-blur-xl py-4 shadow-lg"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between h-14">
            {/* Logo Section */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="flex items-center justify-center">
                <img
                  src={logo}
                  alt="MedBook Logo"
                  className="h-12 w-auto transition-transform group-hover:scale-110 duration-300"
                />
              </div>
              <h1 className="text-2xl font-semibold tracking-tighter text-primary">
                MedBook
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center gap-10">
              {navLinks.map(({ label, to }) => (
                <li key={to}>
                 <NavLink to={to} end>
  {({ isActive }) => {
    const base = "relative text-sm font-medium px-1 py-1.5 transition-all duration-200";
    const active = "text-primary";
    const inactive = "text-black hover:text-primary group";

    return (
      <span className={`${base} ${isActive ? active : inactive}`}>
        {label}
        <span
          className={`absolute -bottom-0.5 left-0 h-[2.5px] bg-primary rounded-full transition-all duration-300 ${
            isActive ? "w-full" : "w-0 group-hover:w-full"
          }`}
        />
      </span>
    );
  }}
</NavLink>
                </li>
              ))}
            </ul>

            {/* Desktop CTA - Now User Type Button */}
            <div className="hidden md:flex items-center gap-4">
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-3 bg-slate-100 hover:bg-slate-200 active:scale-95 transition-all duration-200 text-secondary font-medium text-sm px-3 py-1.5 rounded-full hover:shadow-lg"
                >
                  <div className="w-6 h-6 rounded-full  flex items-center justify-center text-black/50">
                    <CircleUserRound size={26} strokeWidth={1} />
                  </div>
                  <ChevronDown
                    size={18}
                    className={`transition-transform duration-300 text-blacl/50 ${
                      userDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* User Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-zinc-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-3 border-b border-zinc-100">
                      <p className="font-medium text-zinc-900">Get Started</p>
                      <p className="text-xs text-zinc-500">Choose how you'd like to proceed</p>
                    </div>
                    <div className="py-1">
                      <a
                        href="/signup"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-zinc-50 text-zinc-700 hover:text-zinc-900 transition-colors"
                      >
                        <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                          <User size={20} />
                        </div>
                        <div>
                          <p className="font-medium">I'm a Patient</p>
                          <p className="text-xs text-zinc-500">Book an appointment</p>
                        </div>
                      </a>
                      <a
                        href="/list-your-clinic"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-zinc-50 text-zinc-700 hover:text-zinc-900 transition-colors"
                      >
                        <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                          🏥
                        </div>
                        <div>
                          <p className="font-medium">I'm a Clinic Owner</p>
                          <p className="text-xs text-zinc-500">List your clinic</p>
                        </div>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-3 text-white hover:bg-white/10 rounded-xl transition-all active:scale-95"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </nav>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-zinc-950/95 backdrop-blur-xl border-t border-white/10 animate-in slide-in-from-top duration-300">
            <div className="px-6 py-8 space-y-2">
              {navLinks.map(({ label, to }) => (
                <NavLink
                  key={to}
                  to={to}
                  end
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-6 py-4 rounded-2xl text-lg font-medium transition-all ${
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-white/70 hover:bg-white/5 hover:text-white"
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}

              {/* Mobile User Action */}
              <div className="pt-6 border-t border-white/10">
                <Link
                  to="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-3 w-full bg-white text-zinc-900 font-semibold py-4 rounded-2xl hover:bg-zinc-100 active:scale-[0.985] transition-all"
                >
                  <User size={22} />
                  Request Service
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}