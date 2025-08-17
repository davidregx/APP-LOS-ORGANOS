import React from 'react';
import { motion } from 'framer-motion';
import RestaurantCard from '../components/RestaurantCard';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export const restaurantsData = [ // Exportamos la constante
  {
    id: 1,
    name: 'Restaurante Turístico Bambu',
    type: 'Restaurante de Mariscos / Cocina Peruana',
    // rating: '4.1', // Eliminado
  image: '/restaurantes/Restaurante Turístico Bambu.png',
    location: 'Malecón de Los Órganos',
    instagram: 'https://www.instagram.com/turisticobambu/',
    facebook: 'https://www.facebook.com/profile.php?id=100063587562874', // ¡FACEBOOK ACTUALIZADO!
  },
  {
    id: 2,
    name: 'La Cabaña de Wilo',
    type: 'Pizzería',
    // rating: '4.2', // Eliminado
  image: '/restaurantes/La Cabaña de Wilo.jpg',
    location: 'Av. La Marina s/n, Los Órganos',
    instagram: 'https://www.instagram.com/lacabanadewilo/',
    facebook: 'https://www.facebook.com/lacabanadewilo/',
  },
  {
    id: 4,
    name: 'Restaurant Donde Rosa',
    type: 'Restaurante de Mariscos',
    // rating: '4.2', // Eliminado
  image: '/restaurantes/Restaurant Donde Rosa.jpg',
    location: 'Av. Panamericana Norte Km 1153, Los Órganos',
    instagram: 'https://www.instagram.com/restaurantdonderosa/',
    facebook: 'https://www.facebook.com/restaurantdonderosa/',
  },
  {
    id: 7,
    name: 'Ocean Blue & Venezia Restobar',
    type: 'Restobar / Mariscos',
    // rating: '4.1', // Eliminado
  image: '/restaurantes/Ocean Blue & Venezia Restobar.jpg',
    location: 'Av. La Marina s/n, Los Órganos',
    instagram: 'https://www.instagram.com/oceanbluevenezia/',
    facebook: 'https://www.facebook.com/oceanbluevenezia/',
  },
  {
    id: 8,
    name: 'El Point de Órganos',
    type: 'Restobar',
    // rating: '4.9', // Eliminado
  image: '/restaurantes/El Point de Órganos.jpg',
    location: 'Av. Panamericana Norte Km 1153, Los Órganos',
    instagram: 'https://www.instagram.com/elpointdeorganos/',
    facebook: 'https://www.facebook.com/elpointdeorganos/',
  },
  {
    id: 9,
    name: 'El Imperio del Sabor',
    type: 'Cevichería',
    // rating: 'N/A', // Eliminado
  image: '/restaurantes/El Imperio del Sabor.jpg',
    location: 'Av. Grau 345, Los Órganos',
    instagram: 'https://www.instagram.com/elimperiodelsabor/',
    facebook: 'https://www.facebook.com/elimperiodelsabor/',
  },
  {
    id: 10,
    name: 'Las 10 Lucas de Pino',
    type: 'Cevichería',
    // rating: '4.2', // Eliminado
  image: '/restaurantes/Las 10 Lucas de Pino.jpg',
    location: 'Av. Panamericana Norte Km 1153, Los Órganos',
    instagram: 'https://www.instagram.com/las10lucasdepino/',
    facebook: 'https://www.facebook.com/las10lucasdepino/',
  },
  {
    id: 11,
    name: 'Burger Beach y Pizzas El Che',
    type: 'Hamburguesería / Pizzería',
    // rating: '4.1', // Eliminado
  image: '/restaurantes/Burger Beach y Pizzas El Che.jpg',
    location: 'Av. Grau 345, Los Órganos',
    instagram: 'https://www.instagram.com/burgerbeachpizzaselche/',
    facebook: 'https://www.facebook.com/burgerbeachpizzaselche/',
  },
  {
    id: 13,
    name: 'El Manglar Oficial',
    type: 'Cevichería / Restaurante de Mariscos',
    // rating: '4.0', // Eliminado
  image: '/restaurantes/El Manglar Oficial.jpg',
    location: 'Av. La Marina s/n, Los Órganos',
    instagram: 'https://www.instagram.com/elmanglaroficial/',
    facebook: 'https://www.facebook.com/elmanglaroficial/',
  },
  {
    id: 14,
    name: 'Punto Marino Restaurant',
    type: 'Restaurante de Mariscos',
    // rating: '4.0', // Eliminado
  image: '/restaurantes/Punto Marino Restaurant.jpg',
    location: 'Av. Panamericana Norte Km 1153, Los Órganos',
    instagram: 'https://www.instagram.com/puntomarinorestaurant/',
    facebook: 'https://www.facebook.com/puntomarinorestaurant/',
  },
  {
    id: 16,
    name: 'Restobar El Fogón',
    type: 'Restobar / Mariscos',
    // rating: '4.8', // Eliminado
  image: '/restaurantes/Restobar El Fogón.jpg',
    location: 'Av. La Marina s/n, Los Órganos',
    instagram: 'https://www.instagram.com/restobarelfogon/',
    facebook: 'https://www.facebook.com/restobarelfogon/',
  },
  {
    id: 18,
    name: 'Cevichería Percebes',
    type: 'Cevichería',
    // rating: '3.8', // Eliminado
  image: '/restaurantes/Cevichería Percebes.jpg',
    location: 'Av. Grau 345, Los Órganos',
    instagram: 'https://www.instagram.com/cevicheriapercebes/',
    facebook: 'https://www.facebook.com/cevicheriapercebes/',
  },
  {
    id: 19,
    name: 'Café de Barrio',
    type: 'Cafetería',
    // rating: '4.5', // Eliminado
  image: '/restaurantes/Café de Barrio.png',
    location: 'Av. Panamericana Norte Km 1153, Los Órganos',
    instagram: 'https://www.instagram.com/cafedebarrio/',
    facebook: 'https://www.facebook.com/cafedebarrio/',
  },
  {
    id: 22,
    name: 'El Huarique de Valeria',
    type: 'Cevichería',
    // rating: 'N/A', // Eliminado
  image: '/restaurantes/El Huarique de Valeria.jpg',
    location: 'Av. La Marina s/n, Los Órganos',
    instagram: 'https://www.instagram.com/elhuariquedevaleria/',
    facebook: 'https://www.facebook.com/elhuariquedevaleria/',
  },
  {
    id: 23,
    name: 'Cevichería Benito',
    type: 'Cevichería',
    // rating: '4.4', // Eliminado
  image: '/restaurantes/Cevichería Benito.jpg',
    location: 'Av. Grau 345, Los Órganos',
    instagram: 'https://www.instagram.com/cevicheriabenito/',
    facebook: 'https://www.facebook.com/cevicheriabenito/',
  },
  {
    id: 24,
    name: 'El Arbolito Sechurano',
    type: 'Restaurante de Mariscos / Cocina Peruana',
    // rating: '4.1', // Eliminado
  image: '/restaurantes/El Arbolito Sechurano.jpg',
    location: 'Av. Panamericana Norte Km 1153, Los Órganos',
    instagram: 'https://www.instagram.com/elarbolitosechurano/',
    facebook: 'https://www.facebook.com/elarbolitosechurano/',
  },
  {
    id: 25,
    name: 'Manón Beach',
    type: 'Pollería / Hamburguesería',
    // rating: 'N/A', // Eliminado
  image: '/restaurantes/Manón Beach.jpg',
    location: 'Av. La Marina s/n, Los Órganos',
    instagram: 'https://www.instagram.com/manonbeach/',
    facebook: 'https://www.facebook.com/manonbeach/',
  },
  {
    id: 26,
    name: 'Cevichería Lissette',
    type: 'Cevichería',
    // rating: '4.7', // Eliminado
  image: '/restaurantes/Cevichería Lissette.jpg',
    location: 'Av. Grau 345, Los Órganos',
    instagram: 'https://www.instagram.com/cevicherialissette/',
    facebook: 'https://www.facebook.com/cevicherialissette/',
  },
  {
    id: 27,
    name: 'Huarique Cevichería Rosy',
    type: 'Cevichería',
    // rating: '5.0', // Eliminado
  image: '/restaurantes/Huarique Cevichería Rosy.jpg',
    location: 'Av. Panamericana Norte Km 1153, Los Órganos',
    instagram: 'https://www.instagram.com/huariquecevicheriariosy/',
    facebook: 'https://www.facebook.com/huariquecevicheriariosy/',
  },
  {
    id: 28,
    name: 'Restaurante Turístico El Ostion',
    type: 'Restaurante de Mariscos',
    // rating: '3.9', // Eliminado
  image: '/restaurantes/Restaurante Turístico El Ostion.jpg',
    location: 'Av. La Marina s/n, Los Órganos',
    instagram: 'https://www.instagram.com/restauranteelostion/',
    facebook: 'https://www.facebook.com/restauranteelostion/',
  },
  {
    id: 29,
    name: 'Pollería Las Piedritas',
    type: 'Pollería',
    // rating: '3.8', // Eliminado
  image: '/restaurantes/Pollería Las Piedritas.jpg',
    location: 'Av. Grau 345, Los Órganos',
    instagram: 'https://www.instagram.com/pollerialaspiedritas/',
    facebook: 'https://www.facebook.com/pollerialaspiedritas/',
  },
  {
    id: 30,
    name: 'Café Restaurant Jimmy',
    type: 'Cafetería / Restaurante',
    // rating: '3.6', // Eliminado
  image: '/restaurantes/Café Restaurant Jimmy.jpg',
    location: 'Av. Panamericana Norte Km 1153, Los Órganos',
    instagram: 'https://www.instagram.com/caferestaurantjimmy/',
    facebook: 'https://www.facebook.com/caferestaurantjimmy/',
  },
  {
    id: 31,
    name: 'Cevichería Kalifa',
    type: 'Cevichería',
    // rating: '3.4', // Eliminado
  image: '/restaurantes/Cevichería Kalifa.jpg',
    location: 'Av. La Marina s/n, Los Órganos',
    instagram: 'https://www.instagram.com/cevicheriakalifa/',
    facebook: 'https://www.facebook.com/cevicheriakalifa/',
  },
  {
    id: 32,
    name: 'Chicken Room',
    type: 'Pollería / Cevichería',
    // rating: '4.0', // Eliminado
  image: '/restaurantes/Chicken Room.jpg',
    location: 'Av. Grau 345, Los Órganos',
    instagram: 'https://www.instagram.com/chickenroom/',
    facebook: 'https://www.facebook.com/chickenroom/',
  },
];

const RestaurantsPage = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 flex flex-col items-center" // Fondo de la página principal
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

      <div className="w-full max-w-md md:max-w-4xl lg:max-w-6xl space-y-4"> {/* Aumentamos el max-width para pantallas grandes */}
        <header className="bg-blue-500 rounded-md p-5 shadow-md mt-16"> {/* Añadimos mt-16 para dejar espacio al botón flotante */}
          <h1 className="text-white font-extrabold text-xl flex items-center gap-2 md:text-3xl lg:text-4xl"> {/* Estilo del título */}
            <span>🍽️</span> Restaurantes en Los Órganos
          </h1>
          <p className="text-white text-sm mt-1 leading-tight md:text-base lg:text-lg"> {/* Estilo de la descripción */}
            Descubre los mejores sabores de la gastronomía local.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"> {/* Usamos un grid para las tarjetas, 2 columnas en md, 3 en lg */}
          {restaurantsData.map((restaurant, index) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} index={index} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default RestaurantsPage;