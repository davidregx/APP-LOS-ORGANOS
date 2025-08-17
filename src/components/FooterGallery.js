import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaChevronRight } from 'react-icons/fa';
import DynamicCarousel from './DynamicCarousel';

// Importar datos de las otras páginas
import { restaurantsData } from '../pages/RestaurantsPage';
import toursData from '../mock/toursData';
import shopCategoriesData from '../mock/shopCategoriesData';

const FooterGallery = () => {
  const scrollContainerRef = useRef(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollWidth, clientWidth, scrollLeft } = scrollContainerRef.current;
      // Mostrar indicador si hay más contenido a la derecha y no estamos al final
      // Y solo si la pantalla es pequeña (menos de lg)
      const isMobile = window.innerWidth < 1024; // Tailwind's 'lg' breakpoint
      setShowScrollIndicator(isMobile && scrollWidth > clientWidth && scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  useEffect(() => {
    const currentRef = scrollContainerRef.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', checkScroll);
      // También verificar al cargar y al redimensionar
      checkScroll();
      window.addEventListener('resize', checkScroll);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      }
    };
  }, []);

  return (
    <motion.section
      className="bg-gradient-to-br from-blue-600 to-purple-600 p-6 mt-8 rounded-lg shadow-xl relative overflow-hidden w-full"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.8, duration: 0.8 }}
    >
      <div className="absolute inset-0" style={{
        backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent)',
        backgroundSize: '50px 50px'
      }} />
      
      {/* Contenedor para el scroll horizontal en móviles */}
      <div 
        ref={scrollContainerRef}
        className="relative z-10 grid grid-cols-2 gap-4 pb-4 -mb-4 w-full"
      >
        {/* Carrusel de Restaurantes */}
        <motion.div
          className="w-full h-full flex flex-col justify-center items-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 3 + 0 * 0.1, type: 'spring', stiffness: 150 }}
          whileHover={{ y: -5, boxShadow: '0 10px 15px rgba(0,0,0,0.2)' }}
        >
          <div className="w-full h-64 flex flex-col items-center justify-center">
            <DynamicCarousel items={restaurantsData} type="restaurant" navigateTo="/restaurants" carouselDelay={0} />
          </div>
        </motion.div>

        {/* Carrusel de Tours */}
        <motion.div
          className="w-full h-full flex flex-col justify-center items-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 3 + 1 * 0.1, type: 'spring', stiffness: 150 }}
          whileHover={{ y: -5, boxShadow: '0 10px 15px rgba(0,0,0,0.2)' }}
        >
          <div className="w-full h-64 flex flex-col items-center justify-center">
            <DynamicCarousel items={toursData} type="tour" navigateTo="/tours" carouselDelay={1} />
          </div>
        </motion.div>

  {/* Carruseles de Tienda y Taxi eliminados */}
      </div>

      {/* Flecha indicadora de scroll (solo en móviles) */}
      {showScrollIndicator && (
        <motion.div
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/50 rounded-full p-2 shadow-md cursor-pointer z-20
                     flex items-center justify-center lg:hidden" // Visible en sm y md, oculto en lg
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => {
            if (scrollContainerRef.current) {
              scrollContainerRef.current.scrollBy({ left: scrollContainerRef.current.clientWidth / 2, behavior: 'smooth' });
            }
          }}
        >
          <FaChevronRight className="text-blue-600 text-xl" />
        </motion.div>
      )}
    </motion.section>
  );
};

export default FooterGallery;