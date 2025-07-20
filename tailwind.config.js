/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
      colors: {
        // PicklePro Color Palette
        'ocean-teal': '#204F56',
        'sky-mist': '#9EB8F9',
        'ivory-whisper': '#FEFFFD',
        'lemon-zest': '#E6FD53',
        'deep-navy': '#1B263F',
        // Variations for better UX
        'ocean-teal-light': '#2A6B74',
        'ocean-teal-dark': '#1A3E44',
        'sky-mist-light': '#B8CCFA',
        'sky-mist-dark': '#7BA0F7',
        'lemon-zest-light': '#EFFE7A',
        'lemon-zest-dark': '#D9F03C',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-10px)' },
          '60%': { transform: 'translateY(-5px)' },
        },
      },
    },
  },
  plugins: [],
};