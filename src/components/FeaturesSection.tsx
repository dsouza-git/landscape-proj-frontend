"use client";
import { useEffect, useRef, useState } from "react";

const features = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: "Arquitetura Modular",
    description:
      "Componentes reutilizáveis e escaláveis construídos com as melhores práticas de desenvolvimento moderno.",
    gradient: "from-[#FF6B00] to-[#FF8C38]",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: "Performance Extrema",
    description:
      "Otimizações avançadas que garantem carregamento instantâneo e interações suaves em qualquer dispositivo.",
    gradient: "from-[#8B5E3C] to-[#FFAA60]",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
        <path d="M3.27 6.96L12 12.01l8.73-5.05" />
        <path d="M12 22.08V12" />
      </svg>
    ),
    title: "3D Imersivo",
    description:
      "Experiências tridimensionais interativas que respondem ao toque e ao movimento, criando engajamento real.",
    gradient: "from-[#FF8C38] to-[#5C3A1E]",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Segurança Integrada",
    description:
      "Proteção de ponta a ponta com criptografia avançada e práticas de segurança em cada camada da aplicação.",
    gradient: "from-[#FFAA60] to-[#FF6B00]",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: "Design Responsivo",
    description:
      "Interfaces que se adaptam perfeitamente a qualquer tela, de smartphones a monitores ultrawide.",
    gradient: "from-[#5C3A1E] to-[#FF8C38]",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    title: "Deploy Instantâneo",
    description:
      "Pipeline de CI/CD automatizado com deploys em segundos e rollback inteligente para máxima disponibilidade.",
    gradient: "from-[#FF6B00] to-[#FFAA60]",
  },
];

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
        y: ((e.clientY - rect.top) / rect.height) * 2 - 1,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute("data-index") || "0");
          if (entry.isIntersecting) {
            setVisibleCards((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.15 }
    );
    const cards = document.querySelectorAll("[data-feature-card]");
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative py-24 sm:py-32 md:py-40 lg:py-48 px-4 sm:px-6 overflow-hidden flex flex-col items-center w-full"
      style={{ background: "linear-gradient(180deg, #1A0E05 0%, #241408 50%, #1A0E05 100%)" }}
    >
      {/* Parallax background grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 107, 0, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 107, 0, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          transform: `translate(${mousePos.x * 10}px, ${mousePos.y * 10}px)`,
          transition: "transform 0.5s ease-out",
        }}
      />

      {/* Floating orbs */}
      <div
        className="absolute w-[200px] sm:w-[300px] md:w-[400px] h-[200px] sm:h-[300px] md:h-[400px] rounded-full opacity-10 blur-[60px] md:blur-[100px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, #FF6B00, transparent 70%)",
          top: "10%",
          right: "5%",
          transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -15}px)`,
          transition: "transform 0.5s ease-out",
        }}
      />
      <div
        className="absolute w-[150px] sm:w-[200px] md:w-[300px] h-[150px] sm:h-[200px] md:h-[300px] rounded-full opacity-10 blur-[50px] md:blur-[80px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, #8B5E3C, transparent 70%)",
          bottom: "15%",
          left: "5%",
          transform: `translate(${mousePos.x * 15}px, ${mousePos.y * 12}px)`,
          transition: "transform 0.5s ease-out",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10 w-full flex flex-col items-center">
        {/* Section header */}
        <div className="flex flex-col items-center mb-12 sm:mb-16 md:mb-20">
          <span className="text-xs sm:text-sm font-medium tracking-[0.15em] sm:tracking-[0.2em] uppercase text-[#FF6B00] mb-3 sm:mb-4">
            Funcionalidades
          </span>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 text-center"
            style={{
              background: "linear-gradient(135deg, #FAF5F0 0%, #D4C4B0 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Tecnologia que Inspira
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-500 max-w-xs sm:max-w-lg md:max-w-2xl text-center">
            Cada componente é projetado para oferecer o máximo desempenho com a melhor experiência possível.
          </p>
        </div>

        {/* Features flex layout */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-5 md:gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              data-feature-card
              data-index={index}
              className={`group relative flex flex-col items-center text-center rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 transition-all duration-700 ease-out cursor-default w-full sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-1rem)] min-w-0 ${
                visibleCards.has(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
                background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
                border: "1px solid rgba(255,255,255,0.06)",
                transform: visibleCards.has(index)
                  ? `translateY(0) translate(${mousePos.x * (1 + index * 0.3)}px, ${mousePos.y * (1 + index * 0.2)}px)`
                  : "translateY(48px)",
              }}
            >
              {/* Hover gradient border */}
              <div
                className="absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: "linear-gradient(135deg, transparent 0%, transparent 40%, rgba(255,107,0,0.1) 100%)",
                  border: "1px solid rgba(255,107,0,0.2)",
                  borderRadius: "inherit",
                }}
              />

              {/* Icon */}
              <div
                className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl mb-4 sm:mb-5 md:mb-6 flex-shrink-0"
                style={{ background: "linear-gradient(135deg, rgba(255,107,0,0.15), rgba(139,94,60,0.1))" }}
              >
                <div className="text-[#FF8C38]">{feature.icon}</div>
              </div>

              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-2 sm:mb-3 group-hover:text-[#FF8C38] transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-500 leading-relaxed text-xs sm:text-sm flex-1">
                {feature.description}
              </p>

              {/* Bottom accent line */}
              <div
                className={`absolute bottom-0 left-6 right-6 sm:left-8 sm:right-8 h-[1px] bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-40 transition-opacity duration-500`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
