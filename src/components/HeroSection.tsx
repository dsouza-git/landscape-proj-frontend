"use client";
import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";
import useMousePosition from "@/hooks/useMousePosition";

const Scene3D = dynamic(() => import("./Scene3D"), { ssr: false });

export default function HeroSection() {
  const mousePosition = useMousePosition();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(180deg, #1A0E05 0%, #2A1810 50%, #1A0E05 100%)" }}
    >
      {/* Radial glow effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute w-[300px] sm:w-[400px] md:w-[600px] h-[300px] sm:h-[400px] md:h-[600px] rounded-full opacity-20 blur-[80px] md:blur-[120px]"
          style={{
            background: "radial-gradient(circle, #FF6B00 0%, transparent 70%)",
            top: "20%",
            left: "25%",
            transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 20}px)`,
            transition: "transform 0.3s ease-out",
          }}
        />
        <div
          className="absolute w-[250px] sm:w-[350px] md:w-[500px] h-[250px] sm:h-[350px] md:h-[500px] rounded-full opacity-15 blur-[80px] md:blur-[100px]"
          style={{
            background: "radial-gradient(circle, #FF8C38 0%, transparent 70%)",
            top: "40%",
            right: "15%",
            transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -15}px)`,
            transition: "transform 0.3s ease-out",
          }}
        />
        <div
          className="absolute w-[200px] sm:w-[300px] md:w-[400px] h-[200px] sm:h-[300px] md:h-[400px] rounded-full opacity-10 blur-[60px] md:blur-[80px]"
          style={{
            background: "radial-gradient(circle, #5C3A1E 0%, transparent 70%)",
            bottom: "10%",
            left: "40%",
            transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 25}px)`,
            transition: "transform 0.3s ease-out",
          }}
        />
      </div>

      {/* 3D Canvas */}
      <div className="absolute inset-0 z-[1]">
        <Suspense fallback={null}>
          <Scene3D mousePosition={mousePosition} />
        </Suspense>
      </div>

      {/* Content overlay */}
      <div
        className={`relative z-10 flex flex-col items-center justify-center w-full px-4 sm:px-6 md:px-8 transition-all duration-[1500ms] ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Badge */}
        <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6 sm:mb-8">
          <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse flex-shrink-0" />
          <span className="text-xs sm:text-sm text-gray-300 tracking-wide whitespace-nowrap">Experiência Digital de Nova Geração</span>
        </div>

        <h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-extrabold tracking-tight mb-4 sm:mb-6 leading-[1.1] text-center"
          style={{
            background: "linear-gradient(135deg, #FF6B00 0%, #FF8C38 30%, #FFFFFF 60%, #FF6B00 100%)",
            backgroundSize: "200% 200%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "gradientShift 6s ease infinite",
          }}
        >
          Transforme Sua
          <br />
          Experiência Digital.
        </h1>

        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 mb-6 sm:mb-8 md:mb-10 max-w-xs sm:max-w-lg md:max-w-2xl text-center leading-relaxed font-light">
          Design de ponta, performance ilimitada e interatividade que cativa o usuário do primeiro olhar.
          Construa o futuro com tecnologia que inspira.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center w-full sm:w-auto">
          <button
            id="cta-hero-primary"
            className="group relative inline-flex items-center justify-center min-w-fit px-12 py-4 text-sm font-bold tracking-wide rounded-full text-white overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,107,0,0.4)] whitespace-nowrap"
            style={{
              background: "linear-gradient(135deg, #FF6B00 0%, #FF8C38 100%)",
            }}
          >
            <span className="relative z-10 px-10 sm:px-12">Comece Seu Projeto</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#FFAA60] to-[#FF6B00] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </button>

          <button
            id="cta-hero-secondary"
            className="inline-flex items-center justify-center min-w-fit px-12 py-4 text-sm font-bold tracking-wide rounded-full text-white/80 border border-white/20 backdrop-blur-sm hover:border-[#FF6B00]/40 hover:text-white transition-all duration-300 hover:bg-white/5 whitespace-nowrap"
          >
            <span className="px-10 sm:px-12">Ver Demo →</span>
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-widest">Scroll</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gray-500 sm:w-6 sm:h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
