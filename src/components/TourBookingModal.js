import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaWhatsapp, FaPlus, FaMinus } from 'react-icons/fa';

const TourBookingModal = ({ tour, isOpen, onClose }) => {
  const [bookingDate, setBookingDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [participants, setParticipants] = useState([
    { fullName: '', age: '', dni: '', allergies: '', disabilities: '' }
  ]);
  const [specialRequests, setSpecialRequests] = useState('');
  const [notes, setNotes] = useState(''); // Campo genérico para "requerimientos de cada uno"

  const handleAddParticipant = () => {
    setParticipants([
      ...participants,
      { fullName: '', age: '', dni: '', allergies: '', disabilities: '' }
    ]);
  };

  const handleRemoveParticipant = (index) => {
    const newParticipants = participants.filter((_, i) => i !== index);
    setParticipants(newParticipants);
  };

  const handleParticipantChange = (index, field, value) => {
    const newParticipants = participants.map((p, i) =>
      i === index ? { ...p, [field]: value } : p
    );
    setParticipants(newParticipants);
  };

  const handleSubmit = () => {
    // Validaciones básicas
    if (!bookingDate || !preferredTime || participants.some(p => !p.fullName)) {
      alert('Por favor, completa la fecha, horario y el nombre completo de al menos un participante.');
      return;
    }

    let message = `*📅 SOLICITUD DE RESERVA DE TOUR*\n\n`;
    message += `🏝️ *Tour:* ${tour.name}\n`;
    message += `💰 *Precio:* ${tour.price}\n`;
    message += `📍 *Ubicación:* ${tour.location}\n`;
    message += `⏳ *Duración:* ${tour.duration}\n\n`;

    message += `🗓️ *Fecha del Tour:* ${bookingDate}\n`;
    message += `⏰ *Horario Preferido:* ${preferredTime}\n\n`;

    message += `👥 *Información de Participantes:*\n`;
    participants.forEach((p, index) => {
      message += `--- Participante ${index + 1} ---\n`;
      message += `  Nombre Completo: ${p.fullName}\n`;
      if (p.age) message += `  Edad: ${p.age}\n`;
      if (p.dni) message += `  DNI/Pasaporte: ${p.dni}\n`;
      if (p.allergies) message += `  Alergias: ${p.allergies}\n`;
      if (p.disabilities) message += `  Discapacidades: ${p.disabilities}\n`;
    });
    message += `\n`;

    if (specialRequests) {
      message += `✨ *Solicitudes Especiales:* ${specialRequests}\n\n`;
    }
    if (notes) {
      message += `📝 *Notas Adicionales (Requerimientos específicos del tour):* ${notes}\n\n`;
    }

    message += `¡Gracias por tu interés! Esperamos tu confirmación.`;

    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = "975842622"; // Reemplaza con el número de WhatsApp real
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
    onClose(); // Cierra el modal después de enviar
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto relative"
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
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4 text-center"> {/* Título con degradado */}
            Reservar Tour: {tour.name}
          </h2>

          <div className="space-y-4">
            <div>
              <label htmlFor="bookingDate" className="block text-gray-700 font-semibold mb-1">Fecha del Tour:</label>
              <input
                type="date"
                id="bookingDate"
                className="w-full p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200" // Bordes azules
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="preferredTime" className="block text-gray-700 font-semibold mb-1">Horario Preferido:</label>
              <input
                type="text"
                id="preferredTime"
                placeholder="Ej: 9:00 AM o Tarde"
                className="w-full p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200" // Bordes azules
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Información de Participantes:</label>
              {participants.map((p, index) => (
                <div key={index} className="border border-blue-200 rounded-md p-3 mb-3 space-y-2 bg-blue-50"> {/* Fondo azul claro */}
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-blue-700">Participante {index + 1}</h3> {/* Texto azul oscuro */}
                    {participants.length > 1 && (
                      <button
                        type="button"
                        className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        onClick={() => handleRemoveParticipant(index)}
                      >
                        <FaMinus />
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    placeholder="Nombre Completo"
                    className="w-full p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                    value={p.fullName}
                    onChange={(e) => handleParticipantChange(index, 'fullName', e.target.value)}
                    required
                  />
                  <input
                    type="number"
                    placeholder="Edad"
                    className="w-full p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                    value={p.age}
                    onChange={(e) => handleParticipantChange(index, 'age', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="DNI/Pasaporte"
                    className="w-full p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                    value={p.dni}
                    onChange={(e) => handleParticipantChange(index, 'dni', e.target.value)}
                  />
                  <textarea
                    placeholder="Alergias (ej: mariscos, gluten)"
                    rows="2"
                    className="w-full p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                    value={p.allergies}
                    onChange={(e) => handleParticipantChange(index, 'allergies', e.target.value)}
                  ></textarea>
                  <textarea
                    placeholder="Discapacidades (ej: silla de ruedas, visual)"
                    rows="2"
                    className="w-full p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                    value={p.disabilities}
                    onChange={(e) => handleParticipantChange(index, 'disabilities', e.target.value)}
                  ></textarea>
                </div>
              ))}
              <button
                type="button"
                className="mt-2 flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold"
                onClick={handleAddParticipant}
              >
                <FaPlus /> Agregar más Participante
              </button>
            </div>

            <div>
              <label htmlFor="specialRequests" className="block text-gray-700 font-semibold mb-1">Solicitudes Especiales:</label>
              <textarea
                id="specialRequests"
                rows="3"
                placeholder="Ej: Necesidades dietéticas, asistencia especial, etc."
                className="w-full p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
              ></textarea>
            </div>

            <div>
              <label htmlFor="notes" className="block text-gray-700 font-semibold mb-1">Notas Adicionales (Requerimientos específicos del tour):</label>
              <textarea
                id="notes"
                rows="3"
                placeholder="Ej: Equipo de buceo específico, nivel de experiencia en surf, etc."
                className="w-full p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              ></textarea>
            </div>

            <motion.button
              className="w-full bg-gradient-to-r from-green-500 to-teal-600 text-white font-bold py-3 rounded-md text-lg flex items-center justify-center gap-2 shadow-md
                         hover:from-green-600 hover:to-teal-700 transition-all duration-300 mt-6" // Botón verde/teal
              onClick={handleSubmit}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaWhatsapp className="text-xl" /> Solicitar Reserva por WhatsApp
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TourBookingModal;