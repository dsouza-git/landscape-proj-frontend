"use client";
import { useState } from "react";

export default function CTASection() {
  const [isHovered, setIsHovered] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <section
      id="cta-final"
      className="relative py-24 sm:py-32 md:py-40 lg:py-48 px-4 sm:px-6 overflow-hidden flex flex-col items-center w-full"
      style={{ background: "linear-gradient(180deg, #1A0E05 0%, #221008 40%, #2A150A 60%, #1A0E05 100%)" }}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] rounded-full blur-[100px] md:blur-[150px] opacity-15"
          style={{
            background: "radial-gradient(circle, #FF6B00, transparent)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
        <div
          className="absolute w-[200px] sm:w-[250px] md:w-[300px] h-[200px] sm:h-[250px] md:h-[300px] rounded-full blur-[80px] md:blur-[100px] opacity-10"
          style={{
            background: "radial-gradient(circle, #FF8C38, transparent)",
            top: "30%",
            left: "15%",
          }}
        />
        <div
          className="absolute w-[200px] sm:w-[250px] md:w-[300px] h-[200px] sm:h-[250px] md:h-[300px] rounded-full blur-[80px] md:blur-[100px] opacity-10"
          style={{
            background: "radial-gradient(circle, #5C3A1E, transparent)",
            bottom: "20%",
            right: "15%",
          }}
        />

        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Main content - full flex column centered */}
      <div className="flex flex-col items-center max-w-4xl mx-auto relative z-10">
        {/* Spark badge */}
        <div className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-[#FF6B00]/30 bg-[#FF6B00]/10 backdrop-blur-sm mb-6 sm:mb-8 md:mb-10">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF6B00" strokeWidth="2" className="sm:w-4 sm:h-4 flex-shrink-0">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
          <span className="text-xs sm:text-sm text-[#FFAA60] font-medium">Pronto para começar?</span>
        </div>

        <h2
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight text-center"
          style={{
            background: "linear-gradient(135deg, #FFFFFF 0%, #FAF5F0 50%, #D4C4B0 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Eleve Sua Presença
          <br className="hidden sm:block" />
          Digital ao Próximo Nível
        </h2>

        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 mb-8 sm:mb-10 md:mb-12 max-w-xs sm:max-w-lg md:max-w-2xl text-center leading-relaxed">
          Junte-se a milhares de empresas que já transformaram sua experiência digital.
          Comece gratuitamente, sem cartão de crédito.
        </p>

        {/* Email form - flex row/column */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-sm sm:max-w-md md:max-w-xl mb-6 sm:mb-8">
          <div className="flex flex-1 relative group">
            <input
              id="email-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 outline-none focus:border-[#FF6B00]/50 focus:ring-2 focus:ring-[#FF6B00]/20 transition-all duration-300 text-sm sm:text-base text-center"
            />
          </div>
          <button
            id="cta-final-submit"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative inline-flex items-center justify-center min-w-fit px-12 py-4 rounded-lg sm:rounded-xl font-bold tracking-wide text-white overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,107,0,0.3)] whitespace-nowrap text-sm flex-shrink-0"
            style={{
              background: isHovered
                ? "linear-gradient(135deg, #FFAA60 0%, #FF6B00 100%)"
                : "linear-gradient(135deg, #FF6B00 0%, #FF8C38 100%)",
            }}
          >
            <span className="relative z-10 px-10 sm:px-12">Começar Agora</span>
          </button>
        </div>

        {/* Trust indicators - flex wrap */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-500">
          {["Setup em 5 minutos", "Sem cartão de crédito", "Cancele quando quiser"].map((text, i) => (
            <div key={i} className="flex items-center gap-1.5 sm:gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF8C38" strokeWidth="2" className="sm:w-4 sm:h-4 flex-shrink-0">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              <span>{text}</span>
            </div>
          ))}
        </div>

        {/* Stats - flex row */}
        <div className="flex flex-row items-start justify-center gap-4 sm:gap-8 md:gap-12 w-full mt-12 sm:mt-16 md:mt-20 pt-8 sm:pt-12 md:pt-16 border-t border-white/5">
          {[
            { value: "10K+", label: "Projetos Ativos" },
            { value: "99.9%", label: "Uptime SLA" },
            { value: "< 50ms", label: "Latência Média" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center flex-1">
              <div
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2"
                style={{
                  background: "linear-gradient(135deg, #FF6B00, #FF8C38)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {stat.value}
              </div>
              <div className="text-[10px] sm:text-xs md:text-sm text-gray-500 text-center">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
