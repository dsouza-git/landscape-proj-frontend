# FoxFlow - Landing Page Frontend

![FoxFlow](https://img.shields.io/badge/Status-Concluído-success)
![Next.js](https://img.shields.io/badge/Next.js-14+-black?logo=next.js)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3+-blue?logo=tailwindcss)
![React Three Fiber](https://img.shields.io/badge/3D-React_Three_Fiber-purple)

**FoxFlow** é uma landing page moderna, imersiva e de altíssima performance, desenvolvida para demonstrar capacidades avançadas de desenvolvimento frontend, integrando interfaces 3D, efeitos glassmorphism e animações fluidas.

## 🌟 Principais Recursos e Funcionalidades

- **Design Premium e Responsivo**: Layout construído com a abordagem Mobile-First, garantindo experiência perfeita em celulares, tablets e desktops (através do Flexbox e media queries do Tailwind).
- **Cena 3D Interativa (Hero Section)**: Integração com `three.js` e `@react-three/fiber` para renderizar uma constelação de partículas 3D interativas no fundo da tela inicial. As partículas reagem suavemente ao movimento do mouse.
- **Glassmorphism (Efeito Vidro)**: Uso extensivo de fundos translúcidos (`backdrop-blur`), bordas sutis e sombras dinâmicas para criar componentes com aparência de vidro polido.
- **Micro-interações e Animações**:
  - Botões que crescem suavemente (`hover:scale-105`) e emitem um brilho dinâmico (glow) ao serem apontados.
  - Textos em gradiente animado (`background-clip: text` com animação contínua de transição de cores).
  - Componentes que aparecem suavemente à medida que a página é carregada (`opacity` e `translate` transitions).
- **Escalonamento Perfeito de Texto**: Textos e espaçamentos (paddings) dos botões foram configurados de forma cirúrgica para não "esmagarem" o conteúdo, usando utilitários avançados estruturais como `min-w-fit`, `whitespace-nowrap` e `inline-flex`.

## 🛠️ Tecnologias, Técnicas e Ferramentas Utilizadas

### 1. **Next.js (App Router)**
Utilizado como framework principal React para garantir carregamento instantâneo, roteamento moderno e suporte nativo a SSR (Server-Side Rendering) e SSG (Static Site Generation), ideal para SEO e performance.

### 2. **Tailwind CSS**
O coração da estilização. Foi usado para criar todo o design system (cores, gradientes personalizados, espaçamentos) de forma utilitária, rápida e sem necessidade de arquivos CSS separados gigantes.
- *Técnica aplicada*: Classes complexas de Hover, foco, gradientes arbitrários (`bg-gradient-to-r`) e media queries inline (`sm:`, `md:`, `lg:`).

### 3. **React Three Fiber & Drei**
Biblioteca que permite escrever código Three.js (3D WebGL) em formato de componentes React.
- *Técnica aplicada*: Renderização de partículas otimizadas usando instâncias geométricas (para rodar a 60 FPS sem pesar na CPU), atreladas a hooks globais de rastreamento do mouse.

### 4. **Framer Motion**
Para as orquestrações de animação da interface e rolagem (Scroll). (Configurado na estrutura base do projeto).

## 🚀 Como visualizar (GitHub Pages)

O projeto está configurado para exportação estática (`output: "export"` no `next.config.ts`), sendo perfeitamente compatível com o **GitHub Pages**.

### Passos para deploy no GitHub Pages:
1. Vá na aba **Settings** do seu repositório no GitHub.
2. No menu lateral esquerdo, clique em **Pages**.
3. Na seção "Build and deployment", no campo "Source", selecione **GitHub Actions**.
4. O próprio GitHub irá sugerir o fluxo (workflow) do **Next.js**. Basta clicar em "Configure" e realizar o commit (ele fará o build e deploy automaticamente pra você).
