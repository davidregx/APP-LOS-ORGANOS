import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CarouselCard from './CarouselCard';

const DynamicCarousel = ({ items, type, navigateTo, carouselDelay = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (items.length > 1) {
      const initialDelay = carouselDelay * 1000; // Convertir segundos a milisegundos
      const intervalDuration = 7000; // 7 segundos para cada transición

      // Iniciar el carrusel después del delay inicial
      const timer = setTimeout(() => {
        const interval = setInterval(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
        }, intervalDuration);
        return () => clearInterval(interval); // Limpiar el intervalo al desmontar
      }, initialDelay);

      return () => clearTimeout(timer); // Limpiar el timer inicial si el componente se desmonta antes
    }
  }, [items.length, carouselDelay]); // Dependencias para que se reinicie si cambian

  if (!items || items.length === 0) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg text-gray-500 text-center p-4">
        No hay elementos disponibles.
      </div>
    );
  }

  // Variantes para la animación de "scroll-rotación"
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%', // Entra desde la derecha o izquierda
      rotateY: direction > 0 ? 45 : -45, // Rotación inicial
      opacity: 1, // Opacidad completa al entrar
      zIndex: 0, // El elemento que entra está detrás inicialmente
    }),
    center: {
      x: '0%', // Posición central
      rotateY: 0, // Sin rotación
      opacity: 1, // Opacidad completa en el centro
      zIndex: 1, // El elemento central está al frente
    },
    exit: (direction) => ({
      x: direction > 0 ? '-100%' : '100%', // Sale hacia la izquierda o derecha
      rotateY: direction > 0 ? -45 : 45, // Rotación final
      opacity: 1, // Mantiene opacidad completa durante la mayor parte de la salida
      zIndex: 0, // El elemento que sale está detrás
    }),
  };

  // Usamos una dirección fija para la rotación para simplificar
  const direction = 1; // Siempre rota en la misma dirección (simulando scroll hacia la izquierda)

  return (
  <div className="relative w-full h-full overflow-hidden bg-transparent rounded-lg">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          className="absolute inset-0"
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 50, damping: 10, duration: 7 }, // Duración de 7 segundos
            rotateY: { type: "spring", stiffness: 50, damping: 10, duration: 7 }, // Duración de 7 segundos
            opacity: { duration: 0.5, delay: 6.5 }, // Opacidad se desvanece muy rápido al final de la duración total
          }}
        >
          <CarouselCard item={items[currentIndex]} type={type} navigateTo={navigateTo} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default DynamicCarousel;