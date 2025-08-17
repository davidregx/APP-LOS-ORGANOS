/ @type {import('tailwindcss').Config} */
module.exports = {
  // Habilitar el modo oscuro basado en la clase 'dark' en el HTML
  darkMode: 'class',
  content: [
    "./index.html",
    "./App.js",
    "./components//*.js",
    "./pages//*.js", // Asegúrate de que Tailwind escanee también tus páginas
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        cursive: ['Pacifico', 'cursive'], // Asegúrate de que esta fuente esté disponible o cámbiala
      },
      colors: {
        'blue-300': '#93c5fd',
        'blue-400': '#60a5fa',
        'cyan-300': '#67e8f9',
        'yellow-300': '#fde047',
        'yellow-400': '#facc15',
        'pink-400': '#f472b6',
        'orange-400': '#fb923c',
        'red-400': '#f87171',
        'blue-200': '#bfdbfe',
        'blue-50': '#eff6ff',
        'purple-50': '#f5f3ff',
        'blue-600': '#2563eb',
        'purple-600': '#7c3aed',
        // Colores para el modo oscuro
        'gray-900': '#1a202c',
        'gray-800': '#2d3748',
        'gray-700': '#4a5568',
        'gray-600': '#718096',
        'gray-500': '#a0aec0',
        'yellow-300-dark': '#f6e05e', // Un amarillo más suave para el modo oscuro
      },
    },
  },
  plugins: [],
}