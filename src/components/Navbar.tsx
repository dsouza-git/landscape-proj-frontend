"use client";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#1A0E05]/85 backdrop-blur-xl border-b border-white/5 py-2 sm:py-3"
          : "bg-transparent py-3 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2 group">
          <div
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(255,107,0,0.4)]"
            style={{ background: "linear-gradient(135deg, #FF6B00, #FF8C38)" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="sm:w-[18px] sm:h-[18px]">
              <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5" />
            </svg>
          </div>
          <span className="text-base sm:text-lg font-bold text-white tracking-tight">
            Fox<span className="text-[#FF6B00]">Flow</span>
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {["Funcionalidades", "Sobre", "Preços", "Contato"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm text-gray-400 hover:text-white transition-colors duration-300 relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gradient-to-r from-[#FF6B00] to-[#FF8C38] group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <button
          id="nav-cta-desktop"
          className="hidden md:inline-flex items-center justify-center min-w-fit px-8 py-3 rounded-lg text-sm font-medium text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,107,0,0.3)] hover:scale-105 whitespace-nowrap"
          style={{ background: "linear-gradient(135deg, #FF6B00, #FF8C38)" }}
        >
          <span className="px-6">Começar</span>
        </button>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-4 bg-[#1A0E05]/95 backdrop-blur-xl border-t border-white/5 flex flex-col gap-3">
          {["Funcionalidades", "Sobre", "Preços", "Contato"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="text-sm text-gray-400 hover:text-white py-2 transition-colors duration-300"
            >
              {item}
            </a>
          ))}
          <button
            id="nav-cta-mobile"
            className="mt-2 inline-flex items-center justify-center min-w-fit w-full px-8 py-4 rounded-lg text-sm font-medium text-white whitespace-nowrap"
            style={{ background: "linear-gradient(135deg, #FF6B00, #FF8C38)" }}
          >
            <span className="px-6">Começar</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
