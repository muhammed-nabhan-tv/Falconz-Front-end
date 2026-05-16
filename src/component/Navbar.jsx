import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Search, 
  ShoppingBag, 
  Leaf, 
  Heart, 
  User, 
  Menu, 
  X 
} from "lucide-react";
import { gsap } from "gsap";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef(null);
  const { user } = useAuth();
  const location = useLocation();
  // FIX: Run animation on every mount and location change
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(navRef.current, 
        { y: -100, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, ease: "power4.out" }
      );
    });

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      ctx.revert(); // Clean up GSAP to prevent memory leaks
    };
  }, [location.pathname]); // Re-runs if the route changes

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav 
      ref={navRef}
      className={`fixed top-0 w-full z-[110] px-6 transition-all duration-500 ${
        isScrolled || isMobileMenuOpen
        ? "bg-white/90 backdrop-blur-xl border-b border-gray-200 py-3" 
        : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* --- LOGO --- */}
        <Link to="/" className="flex items-center gap-2 group">
          {/* <div className="bg-[#1a1a1a] p-2 rounded-xl group-hover:bg-green-600 transition-all duration-300">
            <Leaf className="text-white" size={20} />
          </div> */}
          <span className="text-xl font-black tracking-tighter text-[#1a1a1a]">
            FALCON<span className="text-green-600">FRUITS</span>
          </span>
        </Link>

        {/* --- CENTER: MAIN NAVIGATION --- */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className={`text-sm font-bold transition-colors hover:text-green-600 ${
                location.pathname === link.path ? "text-green-600" : "text-gray-600"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* --- RIGHT: UTILITY BUTTONS --- */}
        <div className="flex items-center gap-3">
          
          {/* Wishlist */}
          <Link to="/wishlist" className="p-2.5 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
            <Heart size={20} />
          </Link>

          {/* Cart */}
          <Link to={`/cart`} className="relative p-2.5 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all">
            <ShoppingBag size={20} />
            {/* <span className="absolute top-1 right-1 w-4 h-4 bg-green-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full">
              0
            </span> */}
          </Link>

          {/* Profile (Desktop) */}
          <Link to="/profile" className="hidden sm:flex p-2.5 text-gray-600 hover:text-green-600 hover:bg-gray-100 rounded-xl transition-all">
            <User size={20} />
          </Link>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden p-2.5 text-gray-900"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* --- MOBILE MENU --- */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 p-6 flex flex-col gap-4 shadow-xl">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-bold text-gray-800 border-b border-gray-50 pb-2"
            >
              {link.name}
            </Link>
          ))}
          <div className="flex gap-4 pt-2">
            <Link to="/profile" className="flex-1 text-center py-3 bg-gray-100 rounded-xl font-bold">Profile</Link>
            <Link to="/wishlist" className="flex-1 text-center py-3 bg-gray-100 rounded-xl font-bold">Wishlist</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;