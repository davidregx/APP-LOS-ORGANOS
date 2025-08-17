import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaFacebook, FaInstagram, FaStar, FaBookOpen } from 'react-icons/fa';

const RestaurantCard = ({ restaurant, index }) => {
  const handleVisitClick = () => {
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.name + ', ' + restaurant.location)}`;
    window.open(mapUrl, '_blank');
  };

  // Función para simular la acción de "Ver Carta" - ELIMINADA
  // const handleViewMenuClick = () => {
  //   alert(`¡Imagina que estás viendo la carta de ${restaurant.name} ahora mismo!`);
  //   // Aquí iría la lógica real para mostrar el menú
  // };

  return (
    <motion.article
      id={restaurant.id}
      className="restaurant-card relative rounded-2xl shadow-md overflow-hidden h-64 sm:h-72 md:h-80 lg:h-96" // Altura fija para la tarjeta
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      {/* Imagen de fondo */}
      <img
        alt={restaurant.name}
        src={restaurant.image}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Capa de degradado para mejorar la visibilidad del texto */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

      {/* Contenido de la tarjeta */}
      <div className="relative z-10 p-4 sm:p-6 flex flex-col justify-end h-full text-white"> {/* Texto blanco para visibilidad */}
        <div className="social-icons absolute top-4 right-4 flex gap-2">
          {restaurant.instagram && (
            <a href={restaurant.instagram} target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-400 transition-colors">
              <FaInstagram className="text-xl sm:text-2xl" />
            </a>
          )}
          {restaurant.facebook && (
            <a href={restaurant.facebook} target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition-colors">
              <FaFacebook className="text-xl sm:text-2xl" />
            </a>
          )}
        </div>
        
        <div className="content-wrapper">
          {/* Eliminamos el rating */}
          <h3 className="text-xl sm:text-2xl font-bold mb-1 truncate">{restaurant.name}</h3>
          <p className="text-sm sm:text-base text-gray-200 mb-3 truncate">{restaurant.type}</p>
          
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            {/* Botón "Ver Carta" ELIMINADO */}
            {/* <motion.div
              className="flex items-center bg-yellow-400 text-gray-900 rounded-full px-4 py-2 text-sm sm:text-base font-semibold cursor-pointer select-none flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleViewMenuClick}
            >
              <FaBookOpen className="text-base sm:text-lg" />
              <span className="ml-1 sm:ml-2">Ver Carta</span>
            </motion.div> */}
            <motion.a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.name + ', ' + restaurant.location)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center bg-blue-500 text-white rounded-full px-4 py-2 text-sm sm:text-base font-semibold cursor-pointer select-none flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaMapMarkerAlt className="text-base sm:text-lg" />
              <span className="ml-1 sm:ml-2">Visitar</span>
            </motion.a>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default RestaurantCard;