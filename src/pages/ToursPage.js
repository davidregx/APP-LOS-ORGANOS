import React from 'react';
import { motion } from 'framer-motion';
import TourCard from '../components/TourCard';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const toursData = [
  {
    id: 1,
    name: 'Clases de Surf',
    description: 'Aprende a dominar las olas con instructores expertos en las playas de Los Órganos. Ideal para principiantes y avanzados.',
    price: 'S/. 80 / hora',
    originalPrice: 'S/. 100',
  image: '/tours/Clases-de-surf.jpg',
    location: 'Playa El Ñuro',
    duration: '1-2 horas',
  },
  {
    id: 2,
    name: 'Avistamiento de Ballenas',
    description: 'Vive la increíble experiencia de ver ballenas jorobadas en su hábitat natural (temporada de Julio a Octubre).',
    price: 'S/. 120 / persona',
  image: '/tours/Avistamiento de Ballenas.jpg',
    location: 'Altamar de Los Órganos',
    duration: '3-4 horas',
  },
  {
    id: 3,
    name: 'Pesca Deportiva',
    description: 'Disfruta de un día de pesca en alta mar, buscando especies como el pez espada, atún o dorado. Incluye equipo.',
    price: 'S/. 250 / persona',
  image: '/tours/pesca-deportiva.jpg',
    location: 'Altamar de Los Órganos',
    duration: '4-6 horas',
  },
  {
    id: 4,
    name: 'Snorkel y Buceo',
    description: 'Explora la rica vida marina de Los Órganos. Opciones para snorkel en arrecifes o buceo con certificación.',
    price: 'S/. 90 / persona (snorkel)',
    originalPrice: 'S/. 150 (buceo)',
  image: '/tours/Snorkel y Buceo.jpg',
    location: 'Arrecifes de Los Órganos',
    duration: '2-3 horas',
  },
  {
    id: 5,
    name: 'Paseo en Bote',
    description: 'Relájate con un paseo en bote por la costa, visitando puntos clave y disfrutando del paisaje marino.',
    price: 'S/. 60 / persona',
  image: '/tours/Paseo en Bote .png',
    location: 'Muelle de Los Órganos',
    duration: '1.5 horas',
  },
  {
    id: 6,
    name: 'Tour Atardecer',
    description: 'Un romántico paseo en bote al atardecer, ideal para parejas o para disfrutar de vistas espectaculares.',
    price: 'S/. 75 / persona',
  image: '/tours/tours atardecer.png',
    location: 'Muelle de Los Órganos',
    duration: '2 horas',
  },
];

const ToursPage = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Botón de Volver flotante */}
      <motion.button
        onClick={() => navigate('/')}
        className="fixed top-4 left-4 w-14 h-14 bg-yellow-400 rounded-full flex items-center justify-center shadow-xl cursor-pointer z-50 text-gray-900"
        whileHover={{ scale: 1.05, boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4)' }}
        whileTap={{ scale: 0.95 }}
      >
        <FaArrowLeft className="text-2xl" />
      </motion.button>

      <div className="w-full max-w-md md:max-w-4xl lg:max-w-6xl space-y-4">
        <header className="bg-blue-500 rounded-md p-5 shadow-md mt-16"> {/* Añadimos mt-16 para dejar espacio al botón flotante */}
          <h1 className="text-white font-extrabold text-xl flex items-center gap-2 md:text-3xl lg:text-4xl">
            <span className="text-yellow-300">🗺️</span> Tours y Actividades
          </h1>
          <p className="text-white text-sm mt-1 leading-tight md:text-base lg:text-lg">
            Explora las mejores experiencias en Los Órganos.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {toursData.map((tour, index) => (
            <TourCard key={tour.id} tour={tour} index={index} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ToursPage;