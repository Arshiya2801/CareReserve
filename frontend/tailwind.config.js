/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary':"#10B981", // Emerald 500
        'primary-hover':"#059669", // Emerald 600
        'secondary':"#14B8A6", // Teal 500
        'accent': "#ecfdf5", // Emerald 50
        'background-light': "#ffffff",
        'background-dark': "#0f172a", // Slate 900
        'surface-light': "#ffffff",
        'surface-dark': "#1e293b", // Slate 800
        'border-light': "#f1f5f9", // Slate 100
        'border-dark': "#334155", // Slate 700
        'text-light': "#334155", // Slate 700
        'text-dark': "#f8fafc", // Slate 50
      },
      gridTemplateColumns:{
        'auto':'repeat(auto-fill,minmax(200px,1fr))'
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}

