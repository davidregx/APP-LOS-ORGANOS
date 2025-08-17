import React from 'react'; 
import { motion } from 'framer-motion';
import { HashRouter as Router, Routes, Route } from 'react-router-dom'; // <- cambio aquí
import Header from './components/Header';
import NavigationIcons from './components/NavigationIcons';
import PromoCarousel from './components/PromoCarousel';
import QuickAccess from './components/QuickAccess';
import FooterGallery from './components/FooterGallery';
import RestaurantsPage from './pages/RestaurantsPage';
import ToursPage from './pages/ToursPage';
import TaxiPage from './pages/TaxiPage';
import ShopPage from './pages/ShopPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="min-h-screen w-screen bg-gradient-to-br from-blue-50 to-purple-50 font-sans overflow-x-hidden">
            <Header />
            <NavigationIcons />
            <PromoCarousel />
            <QuickAccess />
            <FooterGallery />
          </div>
        } />
        <Route path="/restaurants" element={<RestaurantsPage />} />
        <Route path="/tours" element={<ToursPage />} />
        <Route path="/taxi" element={<TaxiPage />} />
        <Route path="/shop" element={<ShopPage />} />
      </Routes>
    </Router>
  );
}
