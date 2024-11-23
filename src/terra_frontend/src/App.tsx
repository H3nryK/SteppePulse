import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HeroPage from './pages/HeroPage';
import NFTTokensPage from './pages/NFTTokensPage';
import MarketplacePage from './pages/MarketplacePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import { motion } from 'framer-motion';

// Loading animation component
const LoadingScreen = () => (
  <motion.div
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-emerald-900 flex items-center justify-center z-50"
  >
    <motion.div
      animate={{
        scale: [1, 1.2, 1],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="w-16 h-16 border-4 border-white border-t-transparent rounded-full"
    />
  </motion.div>
);

const App: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <LoadingScreen />
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