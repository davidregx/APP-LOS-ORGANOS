import React from 'react';
import { motion } from 'framer-motion';
// Eliminamos FaMapMarkerAlt ya que no se usará el texto "Tu destino tropical"

const Header = () => {
  return (
    <motion.header
      // Cambiamos el color de fondo principal del header a un azul cielo más intenso
      className="bg-blue-500 flex flex-col items-center justify-center relative overflow-hidden w-full py-8 md:py-12"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Este div es para el efecto de luz/patrón */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          backgroundImage: 'radial-gradient(circle at 100% 0%, rgba(255,255,255,0.2) 0%, transparent 70%)',
          backgroundSize: '200% 200%',
          backgroundPosition: 'top right'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      />
      <motion.div
        className="relative z-10 flex flex-col items-center px-4"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {/* Contenedor del logo con el fondo blanco */}
        <motion.div
          className="w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-white p-4 sm:p-5 flex items-center justify-center shadow-lg"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8, type: "spring", stiffness: 100 }}
        >
          <img
            src="https://lh3.googleusercontent.com/ogw/AF2bZyhg-x6vcpFK1u2ftE_Q1IqrwhOqDQTF-XBk0hHQDEMi1g=s1000-c-mo"
            alt="Logo Los Órganos"
            className="w-full h-full object-contain"
          />
        </motion.div>
      </motion.div>
    </motion.header>
  );
};

export default Header;