import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaInfoCircle } from 'react-icons/fa'; // Importamos FaInfoCircle
import TourBookingModal from './TourBookingModal';
import TourDetailsModal from './TourDetailsModal'; // Importamos el nuevo modal

const TourCard = ({ tour, index }) => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false); // Nuevo estado para el modal de detalles

  const handleReserveClick = () => {
    setIsBookingModalOpen(true);
  };

  const handleCloseBookingModal = () => {
    setIsBookingModalOpen(false);
  };

  const handleOpenDetailsModal = () => { // Nueva función para abrir el modal de detalles
    setIsDetailsModalOpen(true);
  };

  const handleCloseDetailsModal = () => { // Nueva función para cerrar el modal de detalles
    setIsDetailsModalOpen(false);
  };

  return (
    <motion.section
      className="relative rounded-lg shadow-lg overflow-hidden text-white font-semibold leading-tight h-64
                 bg-white border border-gray-200 transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-xl
                 md:h-72 lg:h-80"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <img
        alt={tour.name}
        className="absolute inset-0 w-full h-full object-cover"
        src={tour.image}
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-blue-800/80 to-transparent p-4 flex flex-col justify-between"
      >
        <h2 className="font-bold text-xl drop-shadow-md text-white md:text-2xl lg:text-3xl">{tour.name}</h2>
        <div className="flex-grow"></div>
        <p className="text-sm drop-shadow-md max-w-[90%] mb-2 text-gray-100 md:text-base lg:text-lg overflow-hidden line-clamp-3">
          {tour.description}
        </p>
        <div
          className="flex flex-col items-end text-sm font-normal drop-shadow-md space-y-1"
        >
          {tour.originalPrice && (
            <span className="line-through opacity-70 text-gray-200 md:text-base">{tour.originalPrice}</span>
          )}
          <span className="font-bold text-yellow-300 text-lg md:text-xl lg:text-2xl">{tour.price}</span>
          
          <div className="flex gap-2 mt-2"> {/* Contenedor para los botones */}
            <motion.button
              onClick={handleOpenDetailsModal} // Botón para abrir el modal de detalles
              className="bg-blue-500 text-white text-xs font-bold rounded-full px-3 py-2 flex items-center gap-1
                         hover:bg-blue-600 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaInfoCircle className="text-sm md:text-base" /> Detalles
            </motion.button>

            <motion.button
              onClick={handleReserveClick}
              className="reserveBtn bg-yellow-400 text-gray-900 text-xs font-bold rounded-full px-3 py-2 flex items-center gap-1
                         hover:bg-yellow-500 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaWhatsapp className="text-sm md:text-base" /> Reservar
            </motion.button>
          </div>
        </div>
      </div>

      {/* Modal de Reserva */}
      <TourBookingModal tour={tour} isOpen={isBookingModalOpen} onClose={handleCloseBookingModal} />
      
      {/* Modal de Detalles del Tour */}
      <TourDetailsModal tour={tour} isOpen={isDetailsModalOpen} onClose={handleCloseDetailsModal} />
    </motion.section>
  );
};

export default TourCard;