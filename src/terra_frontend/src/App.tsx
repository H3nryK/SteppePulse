import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navigation from './components/Header';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import NFTTokensPage from './pages/NFTTokensPage';
import MarketplacePage from './pages/MarketPlacePage';
import AboutPage from './pages/AboutPage';
import Example from './components/Example';
import Categories from './pages/Categories';
import ConservationDashboard from './pages/Dashboard';
import { AuthProvider, useAuth } from './services/AuthContext';
import UserOnboardingModal from './components/UserOnBoarding';
import { createActor } from '../../declarations/terra_backend';

// Define a type for the backend result that matches the actual return type
type BackendResult = 
  | { ok: true; data?: any }
  | { ok: false; error: string };

const AppContent: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, principal, userProfile, login } = useAuth();
  const [OnBoardingModal, setOnBoardingModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (isAuthenticated && !userProfile) {
        setOnBoardingModal(true);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [isAuthenticated, userProfile]);

  const handleCreateProfile = async (username: string, acceptedTerms: boolean) => {
    if (!principal) {
      console.error("Principal is null or undefined");
      return;
    }

    try {
      const backend = createActor(principal);
      console.log("Backend Actor initialized:", backend);

      const result = await backend.createUserProfile(username) as unknown as BackendResult;

      if (result.ok) {
        // Profile created successfully
        setOnBoardingModal(false);
      } else {
        throw new Error(result.error || 'Profile creation failed');
      }
    } catch (error) {
      console.error('Profile creation error:', error);
      throw error;
    }
  };

  if (isLoading) {
    return <Preloader onComplete={() => setIsLoading(false)} />;
  }

  return (
    <>
      <Router>
        <Navigation />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/nft-tokens" element={isAuthenticated ? <NFTTokensPage /> : <Navigate to="/" />} />
            <Route path="/marketplace" element={isAuthenticated ? <MarketplacePage /> : <Navigate to="/" />} />
            <Route path="/" element={<AboutPage />} />
            <Route path="/example" element={<Example />} />
            <Route path="/categories" element={isAuthenticated ? <Categories /> : <Navigate to="/" />} />
            <Route path="/dashboard" element={isAuthenticated ? <ConservationDashboard /> : <Navigate to="/" />} />
          </Routes>
        </AnimatePresence>
        <Footer />
      </Router>

      {/* Onboarding Modal */}
      {OnBoardingModal && (
        <UserOnboardingModal
          isOpen={true}
          onClose={() => setOnBoardingModal(false)}
          onSubmit={handleCreateProfile}
        />
      )}
    </>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;