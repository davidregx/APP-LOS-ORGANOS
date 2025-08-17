import React from 'react';
import { motion } from 'framer-motion';
import { FaPlus } from 'react-icons/fa'; // Importamos el icono de suma

const ShopProductCard = ({ product, onAddProduct }) => {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full border border-gray-200"
      whileHover={{ y: -3, boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="p-4 flex-grow">
        <h3 className="font-semibold text-gray-800 text-lg mb-1">{product.nombre}</h3>
        <p className="text-gray-600 text-sm">{product.unidad}</p>
        <p className="text-blue-600 font-bold text-xl mt-2">S/. {product.precio.toFixed(2)}</p>
      </div>
      <div className="p-4 border-t border-gray-200">
        <motion.button
          className="w-full bg-yellow-400 text-gray-900 font-semibold py-2 rounded-lg flex items-center justify-center gap-2
                     hover:bg-yellow-500 transition-all duration-300" // Color amarillo
          onClick={() => onAddProduct(product)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaPlus /> Agregar
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ShopProductCard;