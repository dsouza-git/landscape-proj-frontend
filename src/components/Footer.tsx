export default function Footer() {
  return (
    <footer
      className="relative py-10 sm:py-12 md:py-16 px-4 sm:px-6 border-t border-white/5 flex flex-col items-center"
      style={{ background: "#0F0804" }}
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col items-center">
        {/* Main footer content - flex wrap, centered */}
        <div className="flex flex-wrap justify-center gap-8 sm:gap-10 md:gap-16 mb-10 sm:mb-12 w-full text-center">
          {/* Brand */}
          <div className="flex flex-col items-center w-full sm:w-auto sm:flex-1 sm:min-w-[200px] md:max-w-[300px]">
            <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
              <div
                className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #FF6B00, #FF8C38)" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="sm:w-4 sm:h-4">
                  <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5" />
                </svg>
              </div>
              <span className="text-base sm:text-lg font-bold text-white">
                Fox<span className="text-[#FF6B00]">Flow</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed max-w-xs text-center">
              Transformando experiências digitais com tecnologia de ponta e design imersivo.
            </p>
          </div>

          {/* Link groups - centered */}
          {[
            {
              title: "Produto",
              links: ["Funcionalidades", "Preços", "Integrações", "Changelog"],
            },
            {
              title: "Empresa",
              links: ["Sobre", "Blog", "Carreiras", "Contato"],
            },
            {
              title: "Legal",
              links: ["Privacidade", "Termos", "Cookies", "Licenças"],
            },
          ].map((group) => (
            <div key={group.title} className="flex flex-col items-center w-[calc(50%-1rem)] sm:w-auto sm:flex-1 sm:min-w-[120px]">
              <h4 className="text-xs sm:text-sm font-semibold text-white mb-3 sm:mb-4 tracking-wide text-center">{group.title}</h4>
              <div className="flex flex-col items-center gap-2 sm:gap-3">
                {group.links.map((link) => (
                  <a key={link} href="#" className="text-xs sm:text-sm text-gray-500 hover:text-[#FF8C38] transition-colors duration-200 text-center">
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar - flex col centered */}
        <div className="flex flex-col items-center justify-center pt-6 sm:pt-8 border-t border-white/5 gap-6 w-full">
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            {[
              "M24 4.56c-.88.39-1.83.65-2.83.77a4.93 4.93 0 002.16-2.72 9.86 9.86 0 01-3.13 1.2A4.92 4.92 0 0016.62 2c-2.73 0-4.93 2.2-4.93 4.92 0 .39.04.77.13 1.13C7.69 7.82 4.07 5.9 1.64 2.9a4.82 4.82 0 00-.67 2.48c0 1.7.87 3.21 2.19 4.1a4.9 4.9 0 01-2.23-.62v.06c0 2.38 1.7 4.37 3.95 4.82a4.93 4.93 0 01-2.22.08 4.93 4.93 0 004.6 3.42A9.87 9.87 0 010 19.54a13.94 13.94 0 007.55 2.21c9.06 0 14.01-7.5 14.01-14.01 0-.21 0-.42-.02-.63A10.01 10.01 0 0024 4.56z",
              "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm5 11.5h-3.5V17h-3v-3.5H7v-3h3.5V7h3v3.5H17v3z",
              "M20.45 20.45H16.9v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 11-.001-4.14 2.07 2.07 0 01.001 4.14zM7.12 20.45H3.56V9h3.56v11.45z",
            ].map((path, i) => (
              <a
                key={i}
                href="#"
                className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/5 border border-white/10 hover:bg-[#FF6B00]/10 hover:border-[#FF6B00]/30 transition-all duration-200"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-gray-400 sm:w-[14px] sm:h-[14px]">
                  <path d={path} />
                </svg>
              </a>
            ))}
          </div>
          <p className="text-[10px] sm:text-xs text-gray-600 text-center">
            © {new Date().getFullYear()} FoxFlow. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
