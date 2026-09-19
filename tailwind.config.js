/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nubl: {
          obsidian: "#0B0A09",
          espresso: "#15110D",
          surface: "#1A1512",
          surfaceLight: "#241E19",
          brown: "#2A211A",
          border: "rgba(185, 151, 91, 0.15)",
          borderLight: "rgba(255, 255, 255, 0.08)",
          gold: "#B9975B",
          goldHover: "#CBAA6E",
          goldMuted: "#8C7142",
          goldSoft: "#E8D8B5",
          ivory: "#F5F1EA",
          ivoryDark: "#E8E1D5",
          white: "#FFFFFF",
          muted: "#9E978F",
          subtle: "#6E6760",
        },
      },
      fontFamily: {
        arabic: ['"IBM Plex Sans Arabic"', '"Tajawal"', 'sans-serif'],
        heading: ['"IBM Plex Sans Arabic"', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.15em',
        luxury: '0.2em',
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(0, 0, 0, 0.7)',
        'gold-glow': '0 0 30px -5px rgba(185, 151, 91, 0.25)',
        'gold-glow-lg': '0 0 50px -10px rgba(185, 151, 91, 0.4)',
        'inner-dark': 'inset 0 2px 8px 0 rgba(0, 0, 0, 0.6)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gold-gradient': 'linear-gradient(135deg, #B9975B 0%, #E8D8B5 50%, #B9975B 100%)',
        'dark-vignette': 'radial-gradient(circle at center, rgba(21, 17, 13, 0.4) 0%, rgba(11, 10, 9, 0.95) 100%)',
      },
    },
  },
  plugins: [],
}
