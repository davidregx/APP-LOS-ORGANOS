import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShoppingCart, FaTimes, FaWhatsapp, FaCamera, FaTrash, FaChevronRight, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import ShopProductCard from '../components/ShopProductCard'; // Importamos el nuevo componente
import html2canvas from 'html2canvas'; // Para capturar la pantalla

// Base de datos de productos por categorías (precios en Soles Peruanos)
const productosDB = {
  frutas: {
    emoji: '🍎',
    nombre: 'Frutas',
    subcategorias: {
      manzanas: {
        emoji: '🍏',
        nombre: 'Manzanas',
        productos: [
          { nombre: 'Manzana Roja', precio: 5.50, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 1.38 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 2.75 },
            { cantidad: 1, unidad: '1 kg', precio: 5.50 }
          ]},
          { nombre: 'Manzana Verde', precio: 6.00, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 1.50 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 3.00 },
            { cantidad: 1, unidad: '1 kg', precio: 6.00 }
          ]},
          { nombre: 'Manzana Amarilla', precio: 5.80, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 1.45 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 2.90 },
            { cantidad: 1, unidad: '1 kg', precio: 5.80 }
          ]},
          { nombre: 'Manzana Gala', precio: 6.50, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 1.63 },
            { cantidad: 0.5, unit: '1/2 kg', precio: 3.25 },
            { cantidad: 1, unidad: '1 kg', precio: 6.50 }
          ]},
          { nombre: 'Manzana Fuji', precio: 7.00, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 1.75 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 3.50 },
            { cantidad: 1, unidad: '1 kg', precio: 7.00 }
          ]}
        ]
      },
      platanos: {
        emoji: '🍌',
        nombre: 'Plátanos',
        productos: [
          { nombre: 'Plátano Común', precio: 3.00, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 0.75 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 1.50 },
            { cantidad: 1, unidad: '1 kg', precio: 3.00 }
          ]},
          { nombre: 'Plátano Maduro', precio: 2.80, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 0.70 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 1.40 },
            { cantidad: 1, unidad: '1 kg', precio: 2.80 }
          ]},
          { nombre: 'Plátano Verde', precio: 3.20, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 0.80 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 1.60 },
            { cantidad: 1, unidad: '1 kg', precio: 3.20 }
          ]},
          { nombre: 'Plátano Dominico', precio: 4.00, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 1.00 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 2.00 },
            { cantidad: 1, unidad: '1 kg', precio: 4.00 }
          ]},
          { nombre: 'Plátano de Seda', precio: 3.50, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 0.88 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 1.75 },
            { cantidad: 1, unidad: '1 kg', precio: 3.50 }
          ]}
        ]
      },
      citricos: {
        emoji: '🍋',
        nombre: 'Cítricos',
        productos: [
          { nombre: 'Naranja Común', precio: 3.50, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 0.88 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 1.75 },
            { cantidad: 1, unidad: '1 kg', precio: 3.50 }
          ]},
          { nombre: 'Naranja Valencia', precio: 4.20, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 1.05 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 2.10 },
            { cantidad: 1, unidad: '1 kg', precio: 4.20 }
          ]},
          { nombre: 'Naranja Navel', precio: 5.00, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 1.25 },
            { quantity: 0.5, unit: '1/2 kg', price: 2.50 },
            { quantity: 1, unit: '1 kg', price: 5.00 }
          ]},
          { nombre: 'Mandarina', precio: 4.80, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 1.20 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 2.40 },
            { cantidad: 1, unidad: '1 kg', precio: 4.80 }
          ]},
          { nombre: 'Naranja Agria', precio: 2.50, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 0.63 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 1.25 },
            { cantidad: 1, unidad: '1 kg', precio: 2.50 }
          ]},
          { nombre: 'Limón', precio: 7.00, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 1.75 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 3.50 },
            { cantidad: 1, unidad: '1 kg', precio: 7.00 }
          ]},
          { nombre: 'Lima', precio: 8.00, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 2.00 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 4.00 },
            { cantidad: 1, unidad: '1 kg', precio: 8.00 }
          ]},
          { nombre: 'Toronja', precio: 4.20, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 1.05 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 2.10 },
            { cantidad: 1, unidad: '1 kg', precio: 4.20 }
          ]},
          { nombre: 'Pomelo', precio: 6.00, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 1.50 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 3.00 },
            { cantidad: 1, unidad: '1 kg', precio: 6.00 }
          ]},
          { nombre: 'Limón Sutil', precio: 6.50, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 1.63 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 3.25 },
            { cantidad: 1, unidad: '1 kg', precio: 6.50 }
          ]}
        ]
      },
      tropicales: {
        emoji: '🥭',
        nombre: 'Frutas Tropicales',
        productos: [
          { nombre: 'Mango', precio: 7.50, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 1.88 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 3.75 },
            { cantidad: 1, unidad: '1 kg', precio: 7.50 }
          ]},
          { nombre: 'Piña', precio: 6.00, unidad: 'unidad' },
          { nombre: 'Maracuyá', precio: 5.00, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 1.25 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 2.50 },
            { cantidad: 1, unidad: '1 kg', precio: 5.00 }
          ]},
          { nombre: 'Papaya', precio: 4.50, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 1.13 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 2.25 },
            { cantidad: 1, unidad: '1 kg', precio: 4.50 }
          ]},
          { nombre: 'Aguaymanto', precio: 12.00, unidad: 'bandeja' }
        ]
      },
      bayas: {
        emoji: '🍓',
        nombre: 'Bayas y Frutos Rojos',
        productos: [
          { nombre: 'Fresa', precio: 8.00, unidad: 'bandeja' },
          { nombre: 'Arándano', precio: 15.00, unidad: 'bandeja' },
          { nombre: 'Frambuesa', precio: 18.00, unidad: 'bandeja' },
          { nombre: 'Mora', precio: 10.00, unidad: 'bandeja' }
        ]
      }
    }
  },
  verduras: {
    emoji: '🥕',
    nombre: 'Verduras',
    subcategorias: {
      hojas: {
        emoji: '🥬',
        nombre: 'Hojas Verdes',
        productos: [
          { nombre: 'Lechuga Americana', precio: 3.00, unidad: 'unidad' },
          { nombre: 'Espinaca', precio: 5.00, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 1.25 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 2.50 },
            { cantidad: 1, unidad: '1 kg', precio: 5.00 }
          ]},
          { nombre: 'Acelga', precio: 4.20, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 1.05 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 2.10 },
            { cantidad: 1, unidad: '1 kg', precio: 4.20 }
          ]},
          { nombre: 'Rúcula', precio: 6.50, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 1.63 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 3.25 },
            { cantidad: 1, unidad: '1 kg', precio: 6.50 }
          ]},
          { nombre: 'Apio', precio: 5.80, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 1.45 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 2.90 },
            { cantidad: 1, unidad: '1 kg', precio: 5.80 }
          ]},
          { nombre: 'Col', precio: 3.50, unidad: 'unidad' },
          { nombre: 'Perejil', precio: 1.50, unidad: 'atado' },
          { nombre: 'Cilantro', precio: 1.50, unidad: 'atado' }
        ]
      },
      tuberculos: {
        emoji: '🥔',
        nombre: 'Tubérculos',
        productos: [
          { nombre: 'Papa Blanca', precio: 3.50, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 0.88 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 1.75 },
            { cantidad: 1, unidad: '1 kg', precio: 3.50 }
          ]},
          { nombre: 'Papa Amarilla', precio: 4.20, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 1.05 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 2.10 },
            { cantidad: 1, unidad: '1 kg', precio: 4.20 }
          ]},
          { nombre: 'Camote', precio: 5.00, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 1.25 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 2.50 },
            { cantidad: 1, unidad: '1 kg', precio: 5.00 }
          ]},
          { nombre: 'Yuca', precio: 4.00, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 1.00 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 2.00 },
            { cantidad: 1, unidad: '1 kg', precio: 4.00 }
          ]},
          { nombre: 'Zanahoria', precio: 4.80, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 1.20 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 2.40 },
            { cantidad: 1, unidad: '1 kg', precio: 4.80 }
          ]},
          { nombre: 'Beterraga', precio: 3.00, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 0.75 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 1.50 },
            { cantidad: 1, unidad: '1 kg', precio: 3.00 }
          ]},
          { nombre: 'Kion (Jengibre)', precio: 7.00, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 1.75 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 3.50 },
            { cantidad: 1, unidad: '1 kg', precio: 7.00 }
          ]}
        ]
      },
      tomates: {
        emoji: '🍅',
        nombre: 'Tomates',
        productos: [
          { nombre: 'Tomate Redondo', precio: 6.00, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 1.50 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 3.00 },
            { cantidad: 1, unidad: '1 kg', precio: 6.00 }
          ]},
          { nombre: 'Tomate Cherry', precio: 10.00, unidad: 'bandeja' },
          { nombre: 'Tomate de Árbol', precio: 8.50, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 2.13 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 4.25 },
            { cantidad: 1, unidad: '1 kg', precio: 8.50 }
          ]},
          { nombre: 'Tomate Riñón', precio: 7.50, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 1.88 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 3.75 },
            { cantidad: 1, unidad: '1 kg', precio: 7.50 }
          ]}
        ]
      },
      cebollas: {
        emoji: '🧅',
        nombre: 'Cebollas',
        productos: [
          { nombre: 'Cebolla Roja', precio: 4.00, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 1.00 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 2.00 },
            { cantidad: 1, unidad: '1 kg', precio: 4.00 }
          ]},
          { nombre: 'Cebolla Blanca', precio: 5.00, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 1.25 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 2.50 },
            { cantidad: 1, unidad: '1 kg', precio: 5.00 }
          ]},
          { nombre: 'Cebolla China', precio: 5.80, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 1.45 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 2.90 },
            { cantidad: 1, unidad: '1 kg', precio: 5.80 }
          ]},
          { nombre: 'Ajo', precio: 12.00, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 3.00 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 6.00 },
            { cantidad: 1, unidad: '1 kg', precio: 12.00 }
          ]}
        ]
      },
      pimientos: {
        emoji: '🌶️',
        nombre: 'Pimientos y Ajíes',
        productos: [
          { nombre: 'Pimiento Rojo', precio: 6.00, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 1.50 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 3.00 },
            { cantidad: 1, unidad: '1 kg', precio: 6.00 }
          ]},
          { nombre: 'Pimiento Verde', precio: 5.50, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 1.38 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 2.75 },
            { cantidad: 1, unidad: '1 kg', precio: 5.50 }
          ]},
          { nombre: 'Ají Amarillo', precio: 8.00, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 2.00 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 4.00 },
            { cantidad: 1, unidad: '1 kg', precio: 8.00 }
          ]},
          { nombre: 'Ají Limo', precio: 9.00, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 2.25 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 4.50 },
            { cantidad: 1, unidad: '1 kg', precio: 9.00 }
          ]},
          { nombre: 'Rocoto', precio: 7.00, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 1.75 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 3.50 },
            { cantidad: 1, unidad: '1 kg', precio: 7.00 }
          ]}
        ]
      },
      otras: {
        emoji: '🥦',
        nombre: 'Otras Verduras',
        productos: [
          { nombre: 'Brócoli', precio: 6.00, unidad: 'unidad' },
          { nombre: 'Coliflor', precio: 5.50, unidad: 'unidad' },
          { nombre: 'Pepino', precio: 3.00, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 0.75 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 1.50 },
            { cantidad: 1, unidad: '1 kg', precio: 3.00 }
          ]},
          { nombre: 'Zapallo', precio: 4.00, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 1.00 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 2.00 },
            { cantidad: 1, unidad: '1 kg', precio: 4.00 }
          ]},
          { nombre: 'Choclo', precio: 2.50, unidad: 'unidad' }
        ]
      }
    }
  },
  carnes: {
    emoji: '🥩',
    nombre: 'Carnes',
    subcategorias: {
      res: {
        emoji: '🐄',
        nombre: 'Carne de Res',
        productos: [
          { nombre: 'Lomo Fino', precio: 28.50, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 7.13 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 14.25 },
            { cantidad: 1, unidad: '1 kg', precio: 28.50 }
          ]},
          { nombre: 'Bistec de Res', precio: 24.00, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 6.00 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 12.00 },
            { cantidad: 1, unidad: '1 kg', precio: 24.00 }
          ]},
          { nombre: 'Carne Molida de Res', precio: 23.00, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 5.75 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 11.50 },
            { cantidad: 1, unidad: '1 kg', precio: 23.00 }
          ]},
          { nombre: 'Asado de Tira', precio: 20.00, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 5.00 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 10.00 },
            { cantidad: 1, unidad: '1 kg', precio: 20.00 }
          ]},
          { nombre: 'Costilla de Res', precio: 18.00, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 4.50 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 9.00 },
            { cantidad: 1, unidad: '1 kg', precio: 18.00 }
          ]},
          { nombre: 'Guiso de Res', precio: 19.00, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 4.75 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 9.50 },
            { cantidad: 1, unidad: '1 kg', precio: 19.00 }
          ]}
        ]
      },
      pollo: {
        emoji: '🐔',
        nombre: 'Pollo',
        productos: [
          { nombre: 'Pollo Entero', precio: 12.50, unidad: 'kg', variantes: [
            { cantidad: 0.5, unidad: '1/2 kg', precio: 6.25 },
            { cantidad: 1, unidad: '1 kg', precio: 12.50 },
            { cantidad: 1.5, unidad: '1.5 kg', precio: 18.75 }
          ]},
          { nombre: 'Pechuga de Pollo', precio: 16.00, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 4.00 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 8.00 },
            { cantidad: 1, unidad: '1 kg', precio: 16.00 }
          ]},
          { nombre: 'Muslo de Pollo', precio: 11.00, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 2.75 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 5.50 },
            { cantidad: 1, unidad: '1 kg', precio: 11.00 }
          ]},
          { nombre: 'Alas de Pollo', precio: 10.00, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 2.50 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 5.00 },
            { cantidad: 1, unidad: '1 kg', precio: 10.00 }
          ]},
          { nombre: 'Pierna de Pollo', precio: 10.50, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 2.63 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 5.25 },
            { cantidad: 1, unidad: '1 kg', precio: 10.50 }
          ]},
          { nombre: 'Mollejitas de Pollo', precio: 8.00, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 2.00 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 4.00 },
            { cantidad: 1, unidad: '1 kg', precio: 8.00 }
          ]}
        ]
      },
      cerdo: {
        emoji: '🐖',
        nombre: 'Carne de Cerdo',
        productos: [
          { nombre: 'Lomo de Cerdo', precio: 20.00, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 5.00 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 10.00 },
            { cantidad: 1, unidad: '1 kg', precio: 20.00 }
          ]},
          { nombre: 'Chuleta de Cerdo', precio: 19.00, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 4.75 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 9.50 },
            { cantidad: 1, unidad: '1 kg', precio: 19.00 }
          ]},
          { nombre: 'Tocino', precio: 16.00, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 4.00 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 8.00 },
            { cantidad: 1, unidad: '1 kg', precio: 16.00 }
          ]},
          { nombre: 'Jamón de Cerdo', precio: 25.00, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 6.25 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 12.50 },
            { cantidad: 1, unidad: '1 kg', precio: 25.00 }
          ]},
          { nombre: 'Costilla de Cerdo', precio: 17.00, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 4.25 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 8.50 },
            { cantidad: 1, unidad: '1 kg', precio: 17.00 }
          ]}
        ]
      },
      pescado: {
        emoji: '🐟',
        nombre: 'Pescados y Mariscos',
        productos: [
          { nombre: 'Tilapia', precio: 15.00, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 3.75 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 7.50 },
            { cantidad: 1, unidad: '1 kg', precio: 15.00 }
          ]},
          { nombre: 'Trucha', precio: 22.00, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 5.50 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 11.00 },
            { cantidad: 1, unidad: '1 kg', precio: 22.00 }
          ]},
          { nombre: 'Atún Fresco', precio: 26.00, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 6.50 },
            { quantity: 0.5, unit: '1/2 kg', price: 13.00 },
            { quantity: 1, unit: '1 kg', price: 26.00 }
          ]},
          { nombre: 'Salmón', precio: 40.00, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 10.00 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 20.00 },
            { cantidad: 1, unidad: '1 kg', precio: 40.00 }
          ]},
          { nombre: 'Corvina', precio: 30.00, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 7.50 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 15.00 },
            { cantidad: 1, unidad: '1 kg', precio: 30.00 }
          ]},
          { nombre: 'Langostinos', precio: 45.00, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 11.25 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 22.50 },
            { cantidad: 1, unidad: '1 kg', precio: 45.00 }
          ]},
          { nombre: 'Calamares', precio: 20.00, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 5.00 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 10.00 },
            { cantidad: 1, unidad: '1 kg', precio: 20.00 }
          ]}
        ]
      }
    }
  },
  lacteos: {
    emoji: '🥛',
    nombre: 'Lácteos y Huevos',
    subcategorias: {
      leche: {
        emoji: '🥛',
        nombre: 'Leche',
        productos: [
          { nombre: 'Leche Fresca Entera', precio: 4.20, unidad: 'L', variantes: [
            { cantidad: 0.5, unidad: '1/2 L', precio: 2.10 },
            { cantidad: 1, unidad: '1 L', precio: 4.20 },
            { cantidad: 3, unidad: '3 L', precio: 12.60 }
          ]},
          { nombre: 'Leche Fresca Descremada', precio: 4.50, unidad: 'L', variantes: [
            { cantidad: 0.5, unidad: '1/2 L', precio: 2.25 },
            { cantidad: 1, unidad: '1 L', precio: 4.50 },
            { cantidad: 3, unidad: '3 L', precio: 13.50 }
          ]},
          { nombre: 'Leche UHT Entera', precio: 4.00, unidad: 'L', variantes: [
            { cantidad: 0.5, unidad: '1/2 L', precio: 2.00 },
            { cantidad: 1, unidad: '1 L', precio: 4.00 },
            { cantidad: 3, unidad: '3 L', precio: 12.00 }
          ]},
          { nombre: 'Leche UHT Descremada', precio: 4.30, unidad: 'L', variantes: [
            { cantidad: 0.5, unidad: '1/2 L', precio: 2.15 },
            { cantidad: 1, unidad: '1 L', precio: 4.30 },
            { cantidad: 3, unidad: '3 L', precio: 12.90 }
          ]},
          { nombre: 'Leche Deslactosada', precio: 5.00, unidad: 'L', variantes: [
            { cantidad: 0.5, unidad: '1/2 L', precio: 2.50 },
            { cantidad: 1, unidad: '1 L', precio: 5.00 },
            { cantidad: 3, unidad: '3 L', precio: 15.00 }
          ]},
          { nombre: 'Leche de Almendra', precio: 9.00, unidad: 'L', variantes: [
            { cantidad: 0.5, unidad: '1/2 L', precio: 4.50 },
            { cantidad: 1, unidad: '1 L', precio: 9.00 }
          ]},
          { nombre: 'Leche de Soya', precio: 8.50, unidad: 'L', variantes: [
            { cantidad: 0.5, unidad: '1/2 L', precio: 4.25 },
            { cantidad: 1, unidad: '1 L', precio: 8.50 }
          ]}
        ]
      },
      quesos: {
        emoji: '🧀',
        nombre: 'Quesos',
        productos: [
          { nombre: 'Queso Fresco', precio: 12.00, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 3.00 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 6.00 },
            { cantidad: 1, unidad: '1 kg', precio: 12.00 }
          ]},
          { nombre: 'Queso Mozzarella', precio: 15.00, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 3.75 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 7.50 },
            { cantidad: 1, unidad: '1 kg', precio: 15.00 }
          ]},
          { nombre: 'Queso Cheddar', precio: 16.50, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 4.13 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 8.25 },
            { cantidad: 1, unidad: '1 kg', precio: 16.50 }
          ]},
          { nombre: 'Queso Parmesano', precio: 22.00, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 5.50 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 11.00 },
            { cantidad: 1, unidad: '1 kg', precio: 22.00 }
          ]},
          { nombre: 'Queso Edam', precio: 18.00, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 4.50 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 9.00 },
            { cantidad: 1, unidad: '1 kg', precio: 18.00 }
          ]},
          { nombre: 'Ricotta', precio: 10.00, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 2.50 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 5.00 },
            { cantidad: 1, unidad: '1 kg', precio: 10.00 }
          ]}
        ]
      },
      yogurt: {
        emoji: '🍶',
        nombre: 'Yogurt',
        productos: [
          { nombre: 'Yogurt Natural', precio: 8.00, unidad: 'kg', variantes: [
            { cantidad: 0.5, unidad: '1/2 kg', precio: 4.00 },
            { cantidad: 1, unidad: '1 kg', precio: 8.00 }
          ]},
          { nombre: 'Yogurt con Frutas', precio: 9.50, unidad: 'kg', variantes: [
            { cantidad: 0.5, unidad: '1/2 kg', precio: 4.75 },
            { cantidad: 1, unidad: '1 kg', precio: 9.50 }
          ]},
          { nombre: 'Yogurt Griego', precio: 12.50, unidad: 'kg', variantes: [
            { cantidad: 0.5, unidad: '1/2 kg', precio: 6.25 },
            { cantidad: 1, unidad: '1 kg', precio: 12.50 }
          ]},
          { nombre: 'Yogurt Descremado', precio: 8.80, unidad: 'kg', variantes: [
            { cantidad: 0.5, unidad: '1/2 kg', precio: 4.40 },
            { cantidad: 1, unidad: '1 kg', precio: 8.80 }
          ]},
          { nombre: 'Yogurt Bebible', precio: 3.00, unidad: 'unidad' }
        ]
      },
      huevos: {
        emoji: '🥚',
        nombre: 'Huevos',
        productos: [
          { nombre: 'Huevo Blanco (docena)', precio: 7.00, unidad: 'docena' },
          { nombre: 'Huevo de Codorniz (bandeja)', precio: 5.00, unidad: 'bandeja' },
          { nombre: 'Huevo de Campo (docena)', precio: 9.00, unidad: 'docena' }
        ]
      },
      mantequillas: {
        emoji: '🧈',
        nombre: 'Mantequillas y Margarinas',
        productos: [
          { nombre: 'Mantequilla con Sal', precio: 8.00, unidad: '200g' },
          { nombre: 'Mantequilla sin Sal', precio: 8.50, unidad: '200g' },
          { nombre: 'Margarina', precio: 5.00, unidad: '250g' }
        ]
      }
    }
  },
  granos: {
    emoji: '🌾',
    nombre: 'Granos, Cereales y Legumbres',
    subcategorias: {
      arroz: {
        emoji: '🍚',
        nombre: 'Arroz',
        productos: [
          { nombre: 'Arroz Blanco Superior', precio: 4.00, unidad: 'kg', variantes: [
            { cantidad: 0.5, unidad: '1/2 kg', precio: 2.00 },
            { cantidad: 1, unidad: '1 kg', precio: 4.00 },
            { cantidad: 5, unidad: '5 kg', precio: 20.00 }
          ]},
          { nombre: 'Arroz Integral', precio: 5.80, unidad: 'kg', variantes: [
            { cantidad: 0.5, unidad: '1/2 kg', precio: 2.90 },
            { cantidad: 1, unidad: '1 kg', precio: 5.80 }
          ]},
          { nombre: 'Arroz Basmati', precio: 8.00, unidad: 'kg', variantes: [
            { cantidad: 0.5, unidad: '1/2 kg', precio: 4.00 },
            { cantidad: 1, unidad: '1 kg', precio: 8.00 }
          ]},
          { nombre: 'Arroz Arborio', precio: 9.00, unidad: 'kg', variantes: [
            { cantidad: 0.5, unidad: '1/2 kg', precio: 4.50 },
            { cantidad: 1, unidad: '1 kg', precio: 9.00 }
          ]},
          { nombre: 'Arroz Jazmín', precio: 7.50, unidad: 'kg', variantes: [
            { cantidad: 0.5, unidad: '1/2 kg', precio: 3.75 },
            { cantidad: 1, unidad: '1 kg', precio: 7.50 }
          ]}
        ]
      },
      legumbres: {
        emoji: '🫘',
        nombre: 'Legumbres',
        productos: [
          { nombre: 'Frijol Negro', precio: 5.00, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 1.25 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 2.50 },
            { cantidad: 1, unidad: '1 kg', precio: 5.00 }
          ]},
          { nombre: 'Frijol Canario', precio: 5.20, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 1.30 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 2.60 },
            { cantidad: 1, unidad: '1 kg', precio: 5.20 }
          ]},
          { nombre: 'Frijol Castilla', precio: 5.50, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 1.38 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 2.75 },
            { cantidad: 1, unidad: '1 kg', precio: 5.50 }
          ]},
          { nombre: 'Lenteja', precio: 6.50, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 1.63 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 3.25 },
            { cantidad: 1, unidad: '1 kg', precio: 6.50 }
          ]},
          { nombre: 'Garbanzo', precio: 7.00, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 1.75 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 3.50 },
            { cantidad: 1, unidad: '1 kg', precio: 7.00 }
          ]},
          { nombre: 'Arveja Partida', precio: 6.00, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 1.50 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 3.00 },
            { cantidad: 1, unidad: '1 kg', precio: 6.00 }
          ]}
        ]
      },
      pasta: {
        emoji: '🍝',
        nombre: 'Pastas',
        productos: [
          { nombre: 'Espagueti', precio: 5.00, unidad: 'paquete' },
          { nombre: 'Macarrones', precio: 5.20, unidad: 'paquete' },
          { nombre: 'Penne', precio: 5.80, unidad: 'paquete' },
          { nombre: 'Lasaña', precio: 7.20, unidad: 'paquete' },
          { nombre: 'Fideos Tornillo', precio: 4.80, unidad: 'paquete' }
        ]
      },
      cereales: {
        emoji: '🥣',
        nombre: 'Cereales y Avenas',
        productos: [
          { nombre: 'Avena Instantánea', precio: 4.00, unidad: 'paquete' },
          { nombre: 'Avena Tradicional', precio: 3.50, unidad: 'paquete' },
          { nombre: 'Quinua', precio: 10.00, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 2.50 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 5.00 },
            { cantidad: 1, unidad: '1 kg', precio: 10.00 }
          ]},
          { nombre: 'Kiwicha', precio: 9.00, unidad: 'kg', variantes: [
            { cantidad: 0.25, unidad: '1/4 kg', precio: 2.25 },
            { cantidad: 0.5, unidad: '1/2 kg', precio: 4.50 },
            { cantidad: 1, unidad: '1 kg', precio: 9.00 }
          ]},
          { nombre: 'Cereal de Maíz', precio: 12.00, unidad: 'caja' }
        ]
      }
    }
  },
  bebidas: {
    emoji: '🥤',
    nombre: 'Bebidas',
    subcategorias: {
      gaseosas: {
        emoji: '🥤',
        nombre: 'Gaseosas',
        productos: [
          { nombre: 'Coca Cola (1.5L)', precio: 8.00, unidad: 'unidad' },
          { nombre: 'Pepsi (1.5L)', precio: 7.50, unidad: 'unidad' },
          { nombre: 'Sprite (1.5L)', precio: 7.80, unidad: 'unidad' },
          { nombre: 'Fanta (1.5L)', precio: 7.80, unidad: 'unidad' },
          { nombre: 'Inca Kola (1.5L)', precio: 8.00, unidad: 'unidad' }
        ]
      },
      jugos: {
        emoji: '🧃',
        nombre: 'Jugos y Néctares',
        productos: [
          { nombre: 'Jugo de Naranja', precio: 10.00, unidad: 'L', variantes: [
            { cantidad: 0.5, unidad: '1/2 L', precio: 5.00 },
            { cantidad: 1, unidad: '1 L', precio: 10.00 }
          ]},
          { nombre: 'Jugo de Manzana', precio: 10.50, unidad: 'L', variantes: [
            { cantidad: 0.5, unidad: '1/2 L', precio: 5.25 },
            { cantidad: 1, unidad: '1 L', precio: 10.50 }
          ]},
          { nombre: 'Jugo de Uva', precio: 11.50, unidad: 'L', variantes: [
            { cantidad: 0.5, unidad: '1/2 L', precio: 5.75 },
            { cantidad: 1, unidad: '1 L', precio: 11.50 }
          ]},
          { nombre: 'Jugo Multivitamínico', precio: 13.00, unidad: 'L', variantes: [
            { cantidad: 0.5, unidad: '1/2 L', precio: 6.50 },
            { cantidad: 1, unidad: '1 L', precio: 13.00 }
          ]},
          { nombre: 'Néctar de Durazno', precio: 9.00, unidad: 'L', variantes: [
            { cantidad: 0.5, unidad: '1/2 L', precio: 4.50 },
            { cantidad: 1, unidad: '1 L', precio: 9.00 }
          ]}
        ]
      },
      agua: {
        emoji: '💧',
        nombre: 'Agua',
        productos: [
          { nombre: 'Agua Mineral sin Gas (600ml)', precio: 3.50, unidad: 'unidad' },
          { nombre: 'Agua Mineral con Gas (600ml)', precio: 5.00, unidad: 'unidad' },
          { nombre: 'Agua Saborizada (600ml)', precio: 6.00, unidad: 'unidad' },
          { nombre: 'Agua de Mesa', precio: 4.00, unidad: 'L', variantes: [
            { cantidad: 1, unidad: '1 L', precio: 4.00 },
            { cantidad: 2.5, unidad: '2.5 L', precio: 10.00 },
            { cantidad: 5, unidad: '5 L', precio: 18.00 }
          ]}
        ]
      },
      cafe_te: {
        emoji: '☕',
        nombre: 'Café y Té',
        productos: [
          { nombre: 'Café Instantáneo (100g)', precio: 15.00, unidad: 'frasco' },
          { nombre: 'Café Molido (250g)', precio: 20.00, unidad: 'paquete' },
          { nombre: 'Bolsitas de Té Negro (25 und)', precio: 8.00, unidad: 'caja' },
          { nombre: 'Bolsitas de Té Verde (25 und)', precio: 9.00, unidad: 'caja' }
        ]
      }
    }
  },
  panaderia: {
    emoji: '🍞',
    nombre: 'Panadería y Pastelería',
    subcategorias: {
      pan: {
        emoji: '🥖',
        nombre: 'Pan',
        productos: [
          { nombre: 'Pan Francés', precio: 0.30, unidad: 'unidad' },
          { nombre: 'Pan Ciabatta', precio: 1.00, unidad: 'unidad' },
          { nombre: 'Pan de Molde Blanco', precio: 5.00, unidad: 'paquete' },
          { nombre: 'Pan de Molde Integral', precio: 6.00, unidad: 'paquete' }
        ]
      },
      dulces: {
        emoji: '🍰',
        nombre: 'Dulces y Postres',
        productos: [
          { nombre: 'Galletas Surtidas', precio: 4.00, unidad: 'paquete' },
          { nombre: 'Queque de Vainilla', precio: 15.00, unidad: 'unidad' },
          { nombre: 'Alfajores (6 und)', precio: 10.00, unidad: 'paquete' },
          { nombre: 'Chocolate en Barra', precio: 7.00, unidad: 'unidad' }
        ]
      }
    }
  },
  abarrotes: {
    emoji: '🥫',
    nombre: 'Abarrotes y Despensa',
    subcategorias: {
      aceites: {
        emoji: '🍾',
        nombre: 'Aceites y Vinagres',
        productos: [
          { nombre: 'Aceite Vegetal', precio: 9.00, unidad: 'L', variantes: [
            { cantidad: 0.5, unidad: '1/2 L', precio: 4.50 },
            { cantidad: 1, unidad: '1 L', precio: 9.00 },
            { cantidad: 3, unidad: '3 L', precio: 25.00 }
          ]},
          { nombre: 'Aceite de Oliva Extra Virgen', precio: 25.00, unidad: 'L', variantes: [
            { cantidad: 0.25, unidad: '1/4 L', precio: 6.25 },
            { cantidad: 0.5, unidad: '1/2 L', precio: 12.50 },
            { cantidad: 1, unidad: '1 L', precio: 25.00 }
          ]},
          { nombre: 'Vinagre Blanco', precio: 4.00, unidad: 'L', variantes: [
            { cantidad: 0.5, unidad: '1/2 L', precio: 2.00 },
            { cantidad: 1, unidad: '1 L', precio: 4.00 }
          ]},
          { nombre: 'Vinagre de Manzana', precio: 7.00, unidad: 'L', variantes: [
            { cantidad: 0.5, unidad: '1/2 L', precio: 3.50 },
            { cantidad: 1, unidad: '1 L', precio: 7.00 }
          ]}
        ]
      },
      conservas: {
        emoji: '🥫',
        nombre: 'Conservas',
        productos: [
          { nombre: 'Atún en Lata (aceite)', precio: 5.00, unidad: 'lata' },
          { nombre: 'Atún en Lata (agua)', precio: 5.50, unidad: 'lata' },
          { nombre: 'Sardinas en Lata', precio: 4.00, unidad: 'lata' },
          { nombre: 'Duraznos en Almíbar (lata)', precio: 8.00, unidad: 'lata' }
        ]
      },
      salsas: {
        emoji: '🌶️',
        nombre: 'Salsas y Condimentos',
        productos: [
          { nombre: 'Ketchup (500g)', precio: 6.00, unidad: 'frasco' },
          { nombre: 'Mayonesa (500g)', precio: 7.00, unidad: 'frasco' },
          { nombre: 'Mostaza (200g)', precio: 4.00, unidad: 'frasco' },
          { nombre: 'Sal', precio: 2.00, unidad: 'kg', variantes: [
            { cantidad: 0.5, unidad: '1/2 kg', precio: 1.00 },
            { cantidad: 1, unidad: '1 kg', precio: 2.00 }
          ]},
          { nombre: 'Azúcar', precio: 4.50, unidad: 'kg', variantes: [
            { cantidad: 0.5, unidad: '1/2 kg', precio: 2.25 },
            { cantidad: 1, unidad: '1 kg', precio: 4.50 }
          ]}
        ]
      }
    }
  },
  limpieza: {
    emoji: '🧼',
    nombre: 'Limpieza del Hogar',
    subcategorias: {
      ropa: {
        emoji: '🧺',
        nombre: 'Lavandería',
        productos: [
          { nombre: 'Detergente Líquido', precio: 15.00, unidad: 'L', variantes: [
            { cantidad: 0.5, unidad: '1/2 L', precio: 7.50 },
            { cantidad: 1, unidad: '1 L', precio: 15.00 },
            { cantidad: 3, unidad: '3 L', precio: 40.00 }
          ]},
          { nombre: 'Suavizante', precio: 10.00, unidad: 'L', variantes: [
            { cantidad: 0.5, unidad: '1/2 L', precio: 5.00 },
            { cantidad: 1, unidad: '1 L', precio: 10.00 }
          ]},
          { nombre: 'Lejía', precio: 5.00, unidad: 'L', variantes: [
            { cantidad: 0.5, unidad: '1/2 L', precio: 2.50 },
            { cantidad: 1, unidad: '1 L', precio: 5.00 }
          ]}
        ]
      },
      superficies: {
        emoji: '🧽',
        nombre: 'Limpieza de Superficies',
        productos: [
          { nombre: 'Limpiador Multiusos', precio: 8.00, unidad: 'L', variantes: [
            { cantidad: 0.5, unidad: '1/2 L', precio: 4.00 },
            { cantidad: 1, unidad: '1 L', precio: 8.00 }
          ]},
          { nombre: 'Desinfectante', precio: 9.00, unidad: 'L', variantes: [
            { cantidad: 0.5, unidad: '1/2 L', precio: 4.50 },
            { quantity: 1, unit: '1 L', price: 9.00 }
          ]},
          { nombre: 'Lavavajillas (500ml)', precio: 6.00, unidad: 'botella' }
        ]
      }
    }
  },
  cuidado_personal: {
    emoji: '🧴',
    nombre: 'Cuidado Personal',
    subcategorias: {
      higiene: {
        emoji: '🚿',
        nombre: 'Higiene Personal',
        productos: [
          { nombre: 'Jabón de Tocador', precio: 3.00, unidad: 'unidad' },
          { nombre: 'Champú', precio: 12.00, unidad: 'L', variantes: [
            { cantidad: 0.2, unidad: '200ml', precio: 6.00 },
            { cantidad: 0.4, unidad: '400ml', precio: 12.00 },
            { cantidad: 0.75, unidad: '750ml', precio: 20.00 }
          ]},
          { nombre: 'Acondicionador', precio: 12.00, unidad: 'L', variantes: [
            { cantidad: 0.2, unidad: '200ml', precio: 6.00 },
            { cantidad: 0.4, unidad: '400ml', precio: 12.00 },
            { cantidad: 0.75, unidad: '750ml', precio: 20.00 }
          ]},
          { nombre: 'Pasta Dental (75ml)', precio: 7.00, unidad: 'tubo' }
        ]
      },
      belleza: {
        emoji: '💄',
        nombre: 'Belleza',
        productos: [
          { nombre: 'Crema Hidratante', precio: 20.00, unidad: 'frasco', variantes: [
            { cantidad: 0.1, unidad: '100ml', precio: 12.00 },
            { cantidad: 0.2, unidad: '200ml', precio: 20.00 },
            { cantidad: 0.4, unidad: '400ml', precio: 35.00 }
          ]},
          { nombre: 'Protector Solar (SPF 50)', precio: 30.00, unidad: 'tubo' }
        ]
      }
    }
  }
};

const ShopPage = () => {
  const navigate = useNavigate();
  // Cargar listaProductos desde localStorage al inicio
  const [listaProductos, setListaProductos] = useState(() => {
    try {
      const savedList = localStorage.getItem('shoppingList');
      return savedList ? JSON.parse(savedList) : [];
    } catch (error) {
      console.error("Error al cargar la lista de compras desde localStorage:", error);
      return [];
    }
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [notification, setNotification] = useState(null);
  const [clientName, setClientName] = useState(''); // Nuevo estado para el nombre del cliente

  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const [showProducts, setShowProducts] = useState(false);

  const categoriasGridRef = useRef(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);

  // Formulario de agregar producto manual
  const [manualProductName, setManualProductName] = useState('');
  const [manualQuantity, setManualQuantity] = useState(1);
  const [manualUnit, setManualUnit] = useState('unidad');
  const [manualPrice, setManualPrice] = useState('');

  // Guardar listaProductos en localStorage cada vez que cambie
  useEffect(() => {
    try {
      localStorage.setItem('shoppingList', JSON.stringify(listaProductos));
    } catch (error) {
      console.error("Error al guardar la lista de compras en localStorage:", error);
    }
  }, [listaProductos]);

  useEffect(() => {
    // Actualizar el indicador de scroll al montar y al hacer scroll
    const updateIndicator = () => {
      if (categoriasGridRef.current) {
        const { scrollWidth, clientWidth, scrollLeft } = categoriasGridRef.current;
        const hasHorizontalScroll = clientWidth < scrollWidth; // Cambiado para ser más preciso
        const atEnd = scrollLeft + clientWidth >= scrollWidth - 5; // Pequeño margen de error
        setShowScrollIndicator(activeCategory === null && hasHorizontalScroll && !atEnd);
      }
    };

    updateIndicator(); // Llamar al montar
    const currentRef = categoriasGridRef.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', updateIndicator);
    }
    window.addEventListener('resize', updateIndicator);

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', updateIndicator);
      }
      window.removeEventListener('resize', updateIndicator);
    };
  }, [activeCategory]);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const handleAddProduct = (productToAdd) => {
    setListaProductos(prevList => {
      // Si el producto tiene variantes, productToAdd ya es la variante seleccionada
      // Si no tiene variantes, productToAdd es el producto base
      const itemToAdd = productToAdd.selectedVariant || productToAdd;

      const existingItemIndex = prevList.findIndex(item => 
        item.nombre === itemToAdd.nombre && item.unidad === itemToAdd.unidad
      );

      if (existingItemIndex > -1) {
        const newList = [...prevList];
        newList[existingItemIndex].cantidad += 1; 
        return newList;
      } else {
        return [...prevList, { 
          ...itemToAdd, 
          id: Date.now() + Math.random(), // Asegurar ID único
          cantidad: 1,
          // Guardar el precio original de la variante si existe, o el precio base
          precio: itemToAdd.precio 
        }];
      }
    });
    showNotification(`${productToAdd.nombre} añadido a la lista`);
  };

  const handleRemoveProduct = (id) => {
    setListaProductos(prevList => {
      const existingItemIndex = prevList.findIndex(item => item.id === id);
      if (existingItemIndex > -1) {
        const newList = [...prevList];
        if (newList[existingItemIndex].cantidad > 1) {
          newList[existingItemIndex].cantidad -= 1;
        } else {
          newList.splice(existingItemIndex, 1);
        }
        return newList;
      }
      return prevList;
    });
  };

  const calculateTotal = () => {
    return listaProductos.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  };

  const toggleCart = () => {
    setCartOpen(prev => !prev);
  };

  const generateWhatsAppMessage = () => {
    if (listaProductos.length === 0) {
      showNotification('Tu lista está vacía. Agrega algunos productos antes de enviar.');
      return;
    }

    let texto = '🛒 *LISTA DE MERCADO*\n\n';
    if (clientName) {
      texto += `👤 *Cliente:* ${clientName}\n`;
    }
    texto += `📄 *Boleta Nº:* ${boletaNumber}\n`;
    texto += `🗓️ *Fecha:* ${boletaDate}\n\n`;

    let total = 0;

    listaProductos.forEach((producto, index) => {
      const subtotal = producto.precio * producto.cantidad;
      total += subtotal;

      texto += `${index + 1}. *${producto.nombre}*\n`;
      texto += `   Cantidad: ${producto.cantidad} ${producto.unidad}${producto.cantidad > 1 && producto.unidad === 'unidad' ? 'es' : ''}\n`;

      if (producto.precio > 0) {
        texto += `   Precio Unitario: S/${producto.precio.toFixed(2)}\n`;
        texto += `   Subtotal: S/${subtotal.toFixed(2)}\n`;
      }
      texto += '\n';
    });

    if (total > 0) {
      texto += `💰 *TOTAL ESTIMADO: S/${total.toFixed(2)}*\n\n`;
    }

    texto += '📱 Lista generada desde Lista de Mercado App';
    return texto;
  };

  const sendWhatsApp = () => {
    const message = generateWhatsAppMessage();
    if (message) {
      const phoneNumber = '975842622'; // Número de WhatsApp
      const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');
    }
  };

  const captureList = async () => {
    if (listaProductos.length === 0) {
      showNotification('Tu lista está vacía. Agrega algunos productos antes de capturar.');
      return;
    }

    // Ocultar elementos que no queremos en la captura (ej. el botón flotante del carrito)
    const cartIconElement = document.getElementById('cartIcon');
    if (cartIconElement) cartIconElement.style.display = 'none';
    const floatingCartElement = document.getElementById('floatingCart');
    if (floatingCartElement) floatingCartElement.style.display = 'none';

    // Capturar el contenedor principal de la lista
    // Usamos document.body para capturar toda la página si es necesario, o un contenedor específico
    const containerToCapture = document.querySelector('.shop-container-full-width'); // Nuevo selector para el contenedor principal
    if (containerToCapture) {
      try {
        const canvas = await html2canvas(containerToCapture, {
          scale: 2, // Aumentar la escala para mejor calidad
          useCORS: true, // Importante si hay imágenes de diferentes orígenes
          logging: true,
          windowWidth: containerToCapture.scrollWidth, // Capturar el ancho completo del contenido
          windowHeight: containerToCapture.scrollHeight, // Capturar el alto completo del contenido
        });
        const image = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = image;
        a.download = 'lista_mercado.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        showNotification('Lista capturada y descargada');
      } catch (error) {
        console.error("Error al capturar la lista:", error);
        showNotification('Error al capturar la lista.');
      } finally {
        // Volver a mostrar los elementos ocultos
        if (cartIconElement) cartIconElement.style.display = 'flex';
        if (floatingCartElement) floatingCartElement.style.display = 'flex';
      }
    }
  };

  const clearList = () => {
    if (listaProductos.length > 0 && window.confirm('¿Estás seguro de que quieres limpiar toda la lista?')) {
      setListaProductos([]);
      showNotification('Lista limpiada');
    }
  };

  const handleCategoryClick = (categoryKey) => {
    setActiveCategory(categoryKey);
    setActiveSubcategory(null);
    setShowProducts(false);
  };

  const handleSubcategoryClick = (subCategoryKey) => {
    setActiveSubcategory(subCategoryKey);
    setShowProducts(true);
  };

  const handleBackToCategories = () => {
    setActiveCategory(null);
    setActiveSubcategory(null);
    setShowProducts(false);
  };

  const handleBackToSubcategories = () => {
    setActiveSubcategory(null);
    setShowProducts(false);
  };

  const handleManualAddProduct = () => {
    if (!manualProductName.trim()) {
      showNotification('Por favor, ingresa el nombre del producto');
      return;
    }

    const newProduct = {
      id: Date.now(),
      nombre: manualProductName.trim(),
      cantidad: manualQuantity,
      unidad: manualUnit,
      precio: parseFloat(manualPrice) || 0,
    };

    setListaProductos(prevList => [...prevList, newProduct]);
    showNotification('Producto agregado correctamente');
    setManualProductName('');
    setManualQuantity(1);
    setManualUnit('unidad');
    setManualPrice('');
  };

  // Determinar si el botón de "volver" debe aparecer
  const showBackButton = activeCategory !== null;
  const backButtonAction = activeSubcategory !== null ? handleBackToSubcategories : handleBackToCategories;
  const backButtonText = activeSubcategory !== null ? 'Volver a Subcategorías' : 'Volver a Categorías';

  // Generar número de boleta y fecha
  const generateBoletaInfo = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Enero es 0
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    const boletaNumber = `B-${year}${month}${day}-${hours}${minutes}${seconds}-${Math.floor(Math.random() * 1000)}`;
    const boletaDate = `${day}/${month}/${year} ${hours}:${minutes}`;
    return { boletaNumber, boletaDate };
  };

  const { boletaNumber, boletaDate } = generateBoletaInfo();


  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 flex flex-col items-center shop-container-full-width" // Fondo de la página principal
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container w-full mx-auto bg-white bg-opacity-95 backdrop-blur-md rounded-2xl p-5 shadow-xl relative pb-20"> {/* Eliminamos max-w-2xl */}
        {/* Botón de Volver flotante (igual que Tours) */}
        <motion.button
          onClick={() => navigate('/')}
          className="fixed top-4 left-4 w-14 h-14 bg-yellow-400 rounded-full flex items-center justify-center shadow-xl cursor-pointer z-50 text-gray-900"
          whileHover={{ scale: 1.05, boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4)' }}
          whileTap={{ scale: 0.95 }}
        >
          <FaArrowLeft className="text-2xl" />
        </motion.button>
        
        {/* Nuevo Header para el título de la tienda */}
        <header className="bg-blue-500 rounded-md p-5 shadow-md mb-8"> {/* Fondo azul de la página principal */}
          <h1 className="text-white font-extrabold text-xl flex items-center justify-center gap-2 md:text-3xl lg:text-4xl"> {/* Estilo del título de Tours */}
            <span className="text-yellow-300">🛒</span> Lista de Mercado
          </h1>
          <p className="text-white text-sm mt-1 leading-tight text-center md:text-base lg:text-lg">
            Organiza tus compras de forma sencilla.
          </p>
        </header>

        {/* Categorías y Productos */}
        <div className="relative z-10">
          {activeCategory === null && (
            <div className="categorias-container mb-6">
              <h3 className="text-blue-600 text-xl font-semibold text-center mb-4">📋 Categorías de Productos</h3> {/* Color de la página principal */}
              <div ref={categoriasGridRef} className="categorias-grid flex overflow-x-auto gap-3 pb-3 lg:grid lg:grid-cols-4 lg:gap-4 lg:overflow-x-hidden lg:pb-0"> {/* Ajuste para escritorio */}
                {Object.keys(productosDB).map(categoryKey => {
                  const category = productosDB[categoryKey];
                  return (
                    <motion.div
                      key={categoryKey}
                      className={`categoria-item flex-shrink-0 min-w-[120px] bg-blue-50 border-2 border-blue-400 rounded-xl p-3 text-center font-semibold text-blue-600 text-sm cursor-pointer transition-all duration-300
                                  ${activeCategory === categoryKey ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' : ''}`} // Colores de la página principal
                      data-emoji={category.emoji}
                      onClick={() => handleCategoryClick(categoryKey)}
                      whileHover={{ translateY: -3, boxShadow: '0 5px 15px rgba(37, 99, 235, 0.3)', background: 'linear-gradient(135deg, #2563eb, #7c3aed)', color: 'white' }} // Colores de la página principal
                    >
                      <span className="text-2xl block mb-1">{category.emoji}</span>
                      {category.nombre}
                    </motion.div>
                  );
                })}
              </div>
              {showScrollIndicator && (
                <div className="scroll-indicator absolute right-2 top-1/2 -translate-y-1/2 bg-blue-500 text-white rounded-full w-9 h-9 flex items-center justify-center text-lg shadow-md animate-bounce-right lg:hidden"> {/* Ocultar en lg */}
                  <FaChevronRight />
                </div>
              )}
            </div>
          )}

          {activeCategory && activeSubcategory === null && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="subcategorias-grid grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6"
            >
              <h3 className="col-span-full text-blue-600 text-xl font-semibold text-center mb-2"> {/* Color de la página principal */}
                Subcategorías de {productosDB[activeCategory].nombre}
              </h3>
              {Object.keys(productosDB[activeCategory].subcategorias).map(subCategoryKey => {
                const subCategory = productosDB[activeCategory].subcategorias[subCategoryKey];
                return (
                  <motion.div
                    key={subCategoryKey}
                    className={`subcategoria-item bg-yellow-50 border-2 border-yellow-400 rounded-xl p-3 text-center font-semibold text-gray-800 text-sm cursor-pointer transition-all duration-300
                                ${activeSubcategory === subCategoryKey ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white' : ''}`} // Colores de la página principal
                    data-emoji={subCategory.emoji}
                    onClick={() => handleSubcategoryClick(subCategoryKey)}
                    whileHover={{ translateY: -2, boxShadow: '0 3px 10px rgba(255, 213, 79, 0.3)', background: 'linear-gradient(135deg, #facc15, #fb923c)' }} // Colores de la página principal
                  >
                    <span className="text-2xl block mb-1">{subCategory.emoji}</span>
                    {subCategory.nombre}
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {activeSubcategory && showProducts && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="productos-grid grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6"
            >
              <h3 className="col-span-full text-blue-600 text-xl font-semibold text-center mb-2"> {/* Color de la página principal */}
                Productos de {productosDB[activeCategory].subcategorias[activeSubcategory].nombre}
              </h3>
              {productosDB[activeCategory].subcategorias[activeSubcategory].productos.map(product => (
                <ShopProductCard key={product.nombre} product={product} onAddProduct={handleAddProduct} />
              ))}
            </motion.div>
          )}
        </div>

        {/* Sección de agregar producto manual */}
        <div className="input-section flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            id="producto"
            placeholder="Nombre del producto"
            className="w-full p-3 border-2 border-gray-300 rounded-xl text-base focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300" // Colores de la página principal
            value={manualProductName}
            onChange={(e) => setManualProductName(e.target.value)}
          />
          <input
            type="number"
            id="cantidad"
            placeholder="Cantidad"
            min="1"
            value={manualQuantity}
            onChange={(e) => setManualQuantity(parseInt(e.target.value) || 1)}
            className="w-full p-3 border-2 border-gray-300 rounded-xl text-base focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300" // Colores de la página principal
          />
          <select
            id="unidad"
            value={manualUnit}
            onChange={(e) => setManualUnit(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-xl text-base focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300" // Colores de la página principal
          >
            <option value="unidad">Unidad</option>
            <option value="kg">Kilogramo</option>
            <option value="lb">Libra</option>
            <option value="g">Gramo</option>
            <option value="L">Litro</option>
            <option value="ml">Mililitro</option>
            <option value="paquete">Paquete</option>
            <option value="caja">Caja</option>
          </select>
          <input
            type="number"
            id="precio"
            placeholder="Precio (opcional)"
            min="0"
            step="0.01"
            value={manualPrice}
            onChange={(e) => setManualPrice(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-xl text-base focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300" // Colores de la página principal
          />
          <motion.button
            className="btn bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 rounded-xl uppercase tracking-wide shadow-md
                       hover:translate-y-[-2px] hover:shadow-lg transition-all duration-300" // Colores de la página principal
            onClick={handleManualAddProduct}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Agregar
          </motion.button>
        </div>

        {listaProductos.length === 0 && (
          <div className="empty-state text-center p-8 text-gray-500 text-lg">
            <span className="text-5xl block mb-3">🛒</span>
            Tu lista está vacía. ¡Agrega algunos productos!
          </div>
        )}
      </div>

      {/* Botón flotante de "Volver" */}
      <AnimatePresence>
        {showBackButton && (
          <motion.button
            key="backButton"
            className="fixed bottom-24 right-5 w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center shadow-xl cursor-pointer z-50"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={backButtonAction}
          >
            <FaArrowLeft className="text-white text-2xl" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Ícono flotante del carrito */}
      <motion.div
        id="cartIcon"
        className="cart-icon fixed bottom-5 right-5 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-xl cursor-pointer z-50" // Color amarillo
        onClick={toggleCart}
        whileHover={{ scale: 1.05, boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4)' }}
        whileTap={{ scale: 0.95 }}
      >
        <FaShoppingCart className="text-gray-900 text-2xl" /> {/* Icono oscuro para contraste */}
        <AnimatePresence>
          {listaProductos.length > 0 && (
            <motion.div
              className="cart-count absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs shadow-md"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              {listaProductos.length}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Carrito flotante */}
      <AnimatePresence>
        {cartOpen && (
          <motion.div
            id="floatingCart"
            className="floating-cart fixed inset-0 md:inset-auto md:bottom-5 md:right-5 md:w-96 md:h-auto md:max-h-[80vh] bg-white rounded-t-2xl md:rounded-2xl shadow-2xl z-[1000] flex flex-col"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="cart-header bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 flex justify-between items-center rounded-t-2xl">
              <div>
                <div className="cart-title text-xl font-semibold">Boleta de Compra</div>
                <div className="text-sm text-blue-100">Nº: {boletaNumber}</div>
                <div className="text-xs text-blue-100">Fecha: {boletaDate}</div>
                {/* Campo para el nombre del cliente */}
                <input
                  type="text"
                  placeholder="Nombre del Cliente (opcional)"
                  className="w-full p-2 mt-2 text-sm rounded-md bg-blue-50 border border-blue-200 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-300"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                />
              </div>
              <button className="close-cart text-white text-2xl p-1" onClick={toggleCart}>
                <FaTimes />
              </button>
            </div>
            <div className="cart-content flex-1 overflow-y-auto p-4 bg-gray-50">
              {listaProductos.length === 0 ? (
                <div className="empty-state text-center p-8 text-gray-500 text-lg">
                  <span className="text-5xl block mb-3">🛒</span>
                  Tu carrito está vacío.
                </div>
              ) : (
                <div className="w-full">
                  {/* Encabezados de la boleta */}
                  <div className="grid grid-cols-10 gap-2 text-gray-700 font-bold border-b-2 border-gray-300 pb-2 mb-2 text-sm">
                    <span className="col-span-4">Producto</span>
                    <span className="col-span-2 text-center">Cant.</span>
                    <span className="col-span-2 text-right">P. Unit.</span>
                    <span className="col-span-2 text-right">Subtotal</span>
                  </div>
                  {/* Lista de productos */}
                  {listaProductos.map(item => (
                    <div key={item.id} className="grid grid-cols-10 gap-2 items-center py-2 border-b border-gray-200 text-sm">
                      <span className="col-span-4 text-gray-800">{item.nombre}</span>
                      <span className="col-span-2 text-center text-gray-600">{item.cantidad} {item.unidad}</span>
                      <span className="col-span-2 text-right text-gray-600">S/. {item.precio.toFixed(2)}</span>
                      <span className="col-span-2 text-right text-gray-800 font-medium">S/. {(item.precio * item.cantidad).toFixed(2)}</span>
                      <button
                        className="col-span-10 flex justify-end text-red-500 hover:text-red-700 text-xs mt-1"
                        onClick={() => handleRemoveProduct(item.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="cart-total bg-blue-50 p-4 text-center font-bold text-xl text-blue-600 border-t-2 border-blue-500">
              Total estimado: S/{calculateTotal().toFixed(2)}
            </div>
            <div className="cart-actions flex flex-wrap gap-3 p-4 bg-blue-50">
              <motion.button
                className="btn bg-green-500 text-white font-semibold py-3 rounded-xl flex-1 flex items-center justify-center gap-2 shadow-md
                           hover:translate-y-[-2px] hover:shadow-lg transition-all duration-300"
                onClick={sendWhatsApp}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaWhatsapp /> WhatsApp
              </motion.button>
              <motion.button
                className="btn bg-gray-400 text-gray-800 font-semibold py-3 rounded-xl flex-1 flex items-center justify-center gap-2 shadow-md
                           hover:translate-y-[-2px] hover:shadow-lg transition-all duration-300"
                onClick={clearList}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaTrash /> Limpiar
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notificaciones */}
      <AnimatePresence>
        {notification && (
          <motion.div
            className="fixed top-4 right-4 left-4 sm:left-auto bg-green-500 text-white p-3 rounded-lg shadow-lg z-[2000] text-center"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {notification}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ShopPage;