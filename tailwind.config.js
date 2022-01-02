module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        ibm: "'IBM Plex Sans', sans-serif",
        plus: "'M PLUS Rounded 1c', sans-serif",
      },
      colors: {
        'white-100': '#f1efe9',
        primary: '#E5E1D6',
        secondary: '#373536',
        black: '#1f1d1e',
        'brown-100': '#83593b',
        'brown-200': '#704f37',
        'brown-300': '#513a29',
      },
    },
  },
  plugins: [],
};
