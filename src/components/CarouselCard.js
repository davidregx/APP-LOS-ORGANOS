import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaFacebook, FaInstagram, FaBookOpen, FaWhatsapp, FaShoppingCart } from 'react-icons/fa'; // Eliminamos FaStar

const CarouselCard = ({ item, type, navigateTo }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(navigateTo);
  };

  const renderContent = () => {
    if (type === 'restaurant' || type === 'tour') {
      return (
        <div className="relative w-full h-full">
          <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover" />
          {/* Degradado para mejorar la visibilidad del texto */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          
          <div className="relative z-10 p-3 flex flex-col justify-end h-full text-white">
            {/* Eliminamos el rating */}
            <h4 className="font-semibold text-lg truncate">{item.name}</h4>
            {type === 'restaurant' && (
              <p className="text-xs text-gray-200 truncate">{item.type}</p>
            )}
            {type === 'tour' && (
              <p className="text-xs text-gray-200 truncate">{item.duration}</p>
            )}
            <p className="text-sm font-bold text-yellow-300 mt-1">{item.price}</p>
          </div>
        </div>
      );
    } else if (type === 'shopCategory') {
      return (
  <div className="flex flex-col items-center justify-center h-full p-3 bg-transparent"> {/* Fondo transparente para categorías de tienda */}
          <span className="text-3xl mb-2">{item.emoji}</span>
          <h4 className="font-semibold text-gray-800 text-sm text-center">{item.nombre}</h4>
        </div>
      );
    } else {
      return (
  <div className="flex flex-col items-center justify-center h-full p-3 bg-transparent">
          <span className="text-3xl mb-2">❓</span>
          <h4 className="font-semibold text-gray-800 text-sm text-center">Contenido Desconocido</h4>
        </div>
      );
    }
  };

  return (
    <motion.div
      className="bg-transparent rounded-lg shadow-md overflow-hidden cursor-pointer flex flex-col h-full" // Cambiado a bg-transparent
      whileHover={{ y: -5, boxShadow: '0 10px 15px rgba(0,0,0,0.2)' }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
    >
      {renderContent()}
    </motion.div>
  );
};

export default CarouselCard;