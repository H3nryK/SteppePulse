import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navigation from './components/Header';
import Footer from './components/Footer';
import HeroPage from './pages/HeroPage';
import NFTTokensPage from './pages/NFTTokensPage';
import MarketplacePage from './pages/MarketPlacePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import Example from './components/Example';
import Categories from './pages/Categories';
import Preloader from './components/Preloader';
import ConservationDashboard from './pages/Dashboard';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <Preloader onComplete={handleLoadingComplete} />
          ) : (
            <>
              <Navigation />
              <main className="flex-grow">
                <AnimatePresence mode="wait">
                  <Routes>
                    <Route path="/" element={<HeroPage />} />
                    <Route path="/nft-tokens" element={<NFTTokensPage />} />
                    <Route path="/marketplace" element={<MarketplacePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path='/explore' element={<Example />} />
                    <Route path="/category" element={<Categories />} />
                    <Route path="/dashboard" element={<ConservationDashboard />} />
                  </Routes>
                </AnimatePresence>
              </main>
              <Footer />
            </>
          )}
        </AnimatePresence>

        {/* Global notification container */}
        <div className="fixed bottom-4 right-4 z-50" id="notification-container" />
        
        {/* Global modal container */}
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none" id="modal-container" />
      </div>
    </Router>
  );
};

export default App;