import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaTaxi, FaWhatsapp, FaMapMarkerAlt, FaCar, FaWalking } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const TaxiPage = () => {
  const navigate = useNavigate();
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [showRoute, setShowRoute] = useState(false);

  // Estado para simular el zoom y la posición del mapa
  const [mapZoom, setMapZoom] = useState(100); // Porcentaje de zoom
  const [mapPosX, setMapPosX] = useState(50); // Posición X del centro (0-100%)
  const [mapPosY, setMapPosY] = useState(50); // Posición Y del centro (0-100%)

  const mapContainerRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const startMapPosX = useRef(0);
  const startMapPosY = useRef(0);

  // URL de la imagen del mapa (placeholder, reemplaza con tu imagen de alta resolución)
  const MAP_IMAGE_URL = "https://via.placeholder.com/1200x800/ADD8E6/FFFFFF?text=Mapa+de+Los+Organos+Detallado"; // Imagen genérica de mapa

  const handleRequestTaxi = () => {
    const message = encodeURIComponent(`¡Hola! Necesito un taxi.\nOrigen: ${origin || 'Mi ubicación actual'}\nDestino: ${destination || 'No especificado'}\n\n¿Podrías confirmarme la disponibilidad y el costo?`);
    const phoneNumber = "975842622"; // Reemplaza con el número de WhatsApp del taxista
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappURL, '_blank');
  };

  const handleShowRoute = () => {
    if (origin && destination) {
      setShowRoute(true);
    } else {
      alert('Por favor, ingresa un origen y un destino para simular la ruta.');
    }
  };

  // Funciones para simular el paneo del mapa
  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.clientX;
    startY.current = e.clientY;
    startMapPosX.current = mapPosX;
    startMapPosY.current = mapPosY;
    if (mapContainerRef.current) {
      mapContainerRef.current.style.cursor = 'grabbing';
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const dx = e.clientX - startX.current;
    const dy = e.clientY - startY.current;

    // Ajustar la sensibilidad del paneo
    const sensitivity = 0.1; 

    setMapPosX(Math.max(0, Math.min(100, startMapPosX.current - dx * sensitivity)));
    setMapPosY(Math.max(0, Math.min(100, startMapPosY.current - dy * sensitivity)));
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    if (mapContainerRef.current) {
      mapContainerRef.current.style.cursor = 'grab';
    }
  };

  useEffect(() => {
    const container = mapContainerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseup', handleMouseUp);
      container.addEventListener('mouseleave', handleMouseUp); // Detener arrastre si el ratón sale del contenedor
      container.style.cursor = 'grab'; // Cursor por defecto

      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseup', handleMouseUp);
        container.removeEventListener('mouseleave', handleMouseUp);
      };
    }
  }, [mapPosX, mapPosY]); // Dependencias para que los listeners se actualicen con los estados

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="w-full max-w-md md:max-w-4xl lg:max-w-6xl">
        {/* Botón de Volver flotante (igual que Tours) */}
        <motion.button
          onClick={() => navigate('/')}
          className="fixed top-4 left-4 w-14 h-14 bg-yellow-400 rounded-full flex items-center justify-center shadow-xl cursor-pointer z-50 text-gray-900"
          whileHover={{ scale: 1.05, boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4)' }}
          whileTap={{ scale: 0.95 }}
        >
          <FaArrowLeft className="text-2xl" />
        </motion.button>

        <header className="bg-blue-500 rounded-md p-5 shadow-md text-white text-center mb-8">
          <h1 className="font-extrabold text-3xl flex items-center justify-center gap-2 md:text-4xl lg:text-5xl">
            <FaTaxi className="text-yellow-300" /> Taxi en Los Órganos
          </h1>
          <p className="text-sm mt-2 leading-tight md:text-base lg:text-lg">
            Tu transporte seguro y rápido por todo el distrito.
          </p>
        </header>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Simulador de Ruta</h2>
          
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <input
              type="text"
              placeholder="Origen (ej. Muelle de Los Órganos)"
              className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
            />
            <input
              type="text"
              placeholder="Destino (ej. Playa El Ñuro)"
              className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
            <motion.button
              onClick={handleShowRoute}
              className="bg-blue-500 text-white font-semibold py-3 px-6 rounded-md flex items-center justify-center gap-2
                         hover:bg-blue-600 transition-colors duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaCar /> Simular Ruta
            </motion.button>
          </div>

          <div 
            ref={mapContainerRef}
            className="relative w-full h-80 bg-gray-100 rounded-md overflow-hidden border border-gray-300"
            onMouseDown={handleMouseDown}
            // onWheel={handleWheel} // Para simular zoom con la rueda del ratón (opcional)
            style={{
              backgroundImage: `url(${MAP_IMAGE_URL})`,
              backgroundSize: `${mapZoom}%`,
              backgroundPosition: `${mapPosX}% ${mapPosY}%`,
              cursor: 'grab'
            }}
          >
            {/* Capa semitransparente para el texto, pero menos opaca */}
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 text-white text-center p-4">
              {!origin && !destination && (
                <p className="text-lg font-semibold">
                  Ingresa un origen y destino para ver la ruta simulada.
                </p>
              )}
            </div>

            {/* Marcadores de Origen y Destino - Posicionados sobre el mapa simulado */}
            {origin && (
              <motion.div
                className="absolute p-2 bg-red-600 rounded-full shadow-lg flex items-center justify-center border-2 border-white"
                style={{ top: '30%', left: '20%' }} // Posición simulada
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <FaMapMarkerAlt className="text-white text-2xl" />
              </motion.div>
            )}
            {destination && (
              <motion.div
                className="absolute p-2 bg-green-600 rounded-full shadow-lg flex items-center justify-center border-2 border-white"
                style={{ top: '70%', left: '80%' }} // Posición simulada
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              >
                <FaMapMarkerAlt className="text-white text-2xl" />
              </motion.div>
            )}

            {/* Ruta simulada - Más evidente */}
            {showRoute && (
              <motion.div
                className="absolute border-4 border-dashed border-blue-600"
                style={{
                  top: '35%', left: '25%',
                  width: '50%', height: '35%',
                  transform: 'rotate(45deg)',
                  transformOrigin: 'top left'
                }}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              >
                <motion.div
                  className="absolute w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center"
                  style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                  initial={{ x: '-100%', y: '-100%' }}
                  animate={{ x: '100%', y: '100%' }}
                  transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
                >
                  <FaCar className="text-white text-xl" />
                </motion.div>
              </motion.div>
            )}
          </div>
          <p className="text-sm text-gray-600 mt-4 text-center">
            Este es un mapa simulado para mostrar la funcionalidad.
          </p>
        </div>

        <motion.button
          onClick={handleRequestTaxi}
          className="w-full bg-green-500 text-white font-bold py-4 rounded-lg text-xl flex items-center justify-center gap-3 shadow-lg
                     hover:bg-green-600 transition-colors duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FaWhatsapp className="text-2xl" /> Solicitar Taxi por WhatsApp
        </motion.button>

        <div className="mt-8 text-center text-gray-600">
          <p>¿Necesitas ayuda? Contáctanos.</p>
        </div>
      </div>
    </motion.div>
  );
};

export default TaxiPage;