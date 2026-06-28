import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FoxFlow | Experiência Digital de Nova Geração",
  description:
    "Design de ponta, performance ilimitada e interatividade 3D com raposa abstrata que cativa o usuário do primeiro olhar. Transforme sua presença digital com FoxFlow.",
  keywords: ["landing page", "3D interativo", "web design", "experiência digital", "raposa 3D"],
  authors: [{ name: "FoxFlow" }],
  openGraph: {
    title: "FoxFlow | Experiência Digital de Nova Geração",
    description: "Transforme sua experiência digital com tecnologia de ponta e design imersivo.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
