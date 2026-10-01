/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bb: {
          base: "#0B0A14",      // Near-black indigo base
          panel: "#15121F",     // Panel color
          surface: "#1D192B",   // Elevated surface
          border: "#29233B",    // Border tone
          borderLight: "#3E3559",
          text: "#ECEAF5",      // Soft off-white text
          muted: "#8A84A3",     // Muted violet-grey secondary text
          purple: "#7B2FF7",    // Brand purple
          magenta: "#E53E9C",   // Brand magenta
          blue: "#4F6EF7",      // Electric blue matching logo chevrons
        }
      },
      fontFamily: {
        display: ['"Bebas Neue"', '"Oswald"', 'sans-serif'],
        condensed: ['"Oswald"', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Space Mono"', 'monospace'],
      },
      letterSpacing: {
        'cinema-wide': '0.25em',
        'cinema-widest': '0.35em',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #7B2FF7 0%, #E53E9C 100%)',
        'brand-gradient-hover': 'linear-gradient(135deg, #8C47F8 0%, #EA54A8 100%)',
        'spotlight-glow': 'radial-gradient(circle at 50% 40%, rgba(123, 47, 247, 0.22) 0%, rgba(229, 62, 156, 0.12) 40%, rgba(11, 10, 20, 0) 75%)',
        'blue-glow': 'radial-gradient(circle at 50% 50%, rgba(79, 110, 247, 0.15) 0%, rgba(11, 10, 20, 0) 70%)',
      }
    },
  },
  plugins: [],
}
