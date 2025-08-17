import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaInfoCircle, FaCheckCircle } from 'react-icons/fa';

const TourDetailsModal = ({ tour, isOpen, onClose }) => {
  if (!isOpen) return null;

  // Datos de ejemplo para recomendaciones (puedes expandir esto en tu toursData si lo necesitas)
  const recommendations = {
    'Clases de Surf': [
      'Usar bloqueador solar resistente al agua.',
      'Llevar ropa de baño y toalla.',
      'Estar hidratado antes y después de la clase.',
      'Seguir siempre las instrucciones del instructor.'
    ],
    'Avistamiento de Ballenas': [
      'Llevar abrigo, incluso si hace sol.',
      'Usar gorra y lentes de sol.',
      'Tomar precauciones si eres propenso al mareo.',
      'Mantener silencio para no molestar a los animales.'
    ],
    'Pesca Deportiva': [
      'Llevar sombrero y ropa cómoda.',
      'Usar protector solar y repelente de insectos.',
      'Seguir las indicaciones del capitán.',
      'No olvidar la cámara para capturar la pesca.'
    ],
    'Snorkel y Buceo': [
      'Usar traje de baño y toalla.',
      'Aplicar bloqueador solar biodegradable.',
      'No tocar la vida marina ni los corales.',
      'Escuchar atentamente las instrucciones de seguridad.'
    ],
    'Paseo en Bote': [
      'Llevar una chaqueta ligera.',
      'Usar lentes de sol y gorra.',
      'Mantenerse sentado durante el recorrido.',
      'Disfrutar del paisaje y tomar fotos.'
    ],
    'Tour Atardecer': [
      'Llevar una manta o toalla para el frío.',
      'Cámara fotográfica para el atardecer.',
      'Llegar con anticipación al punto de encuentro.',
      'Relajarse y disfrutar del espectáculo natural.'
    ]
  };

  const currentRecommendations = recommendations[tour.name] || [
    'No olvides tu cámara.',
    'Mantente hidratado.',
    'Sigue las indicaciones de tu guía.',
    'Disfruta la experiencia al máximo.'
  ];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto relative"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
        >
          <button
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl"
            onClick={onClose}
          >
            <FaTimes />
          </button>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center flex items-center justify-center gap-2">
            <FaInfoCircle className="text-blue-500" /> Detalles del Tour: {tour.name}
          </h2>

          <div className="space-y-4 text-gray-700">
            <p className="text-lg font-medium leading-relaxed">{tour.description}</p>
            
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                <FaCheckCircle className="text-green-500" /> Recomendaciones
              </h3>
              <ul className="list-disc list-inside space-y-1">
                {currentRecommendations.map((rec, index) => (
                  <li key={index} className="text-base">{rec}</li>
                ))}
              </ul>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Información Adicional</h3>
              <p><strong>Ubicación:</strong> {tour.location}</p>
              <p><strong>Duración:</strong> {tour.duration}</p>
              <p><strong>Precio:</strong> {tour.price}</p>
              {tour.originalPrice && <p className="line-through text-gray-500">Precio Original: {tour.originalPrice}</p>}
            </div>
          </div>

          <motion.button
            className="w-full bg-blue-500 text-white font-bold py-3 rounded-md text-lg shadow-md
                       hover:bg-blue-600 transition-colors duration-300 mt-6"
            onClick={onClose}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Cerrar
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TourDetailsModal;