/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nubl: {
          obsidian: "rgb(var(--nubl-obsidian) / <alpha-value>)",
          espresso: "rgb(var(--nubl-espresso) / <alpha-value>)",
          surface: "rgb(var(--nubl-surface) / <alpha-value>)",
          surfaceLight: "rgb(var(--nubl-surfaceLight) / <alpha-value>)",
          brown: "rgb(var(--nubl-brown) / <alpha-value>)",
          border: "var(--nubl-border)",
          borderLight: "var(--nubl-borderLight)",
          gold: "rgb(var(--nubl-gold) / <alpha-value>)",
          goldHover: "rgb(var(--nubl-goldHover) / <alpha-value>)",
          goldMuted: "rgb(var(--nubl-goldMuted) / <alpha-value>)",
          goldSoft: "rgb(var(--nubl-goldSoft) / <alpha-value>)",
          ivory: "rgb(var(--nubl-ivory) / <alpha-value>)",
          ivoryDark: "rgb(var(--nubl-ivoryDark) / <alpha-value>)",
          white: "#FFFFFF",
          muted: "rgb(var(--nubl-muted) / <alpha-value>)",
          subtle: "rgb(var(--nubl-subtle) / <alpha-value>)",
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
        'luxury': 'var(--nubl-shadow-luxury)',
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
