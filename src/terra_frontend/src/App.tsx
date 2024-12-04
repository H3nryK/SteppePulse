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

const AppContent: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  const {isAuthenticated, principal, userProfile, login} = useAuth();
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
    if (!principal) return;

    try {
      const backend = createActor(principal);
      const result = await backend.createUserProfile(username);
      
      if (result.ok) {
        // Profile created successfully
        setOnBoardingModal(false);
      } else {
        throw new Error('Profile creation failed');
      }
    } catch (error) {
      console.error('Profile creation error:', error);
      throw error;
    }
  };

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <AnimatePresence mode="wait">
            <>
              <Navigation />
              <main className="flex-grow">
                <AnimatePresence mode="wait">
                  <Routes>
                    <Route path="/" element={<AboutPage  />} />
                    <Route path="/nft-tokens" element={isAuthenticated ? (<NFTTokensPage />) : (<Navigate to="/" replace />)} />
                    <Route path="/marketplace" element={isAuthenticated ? (<MarketplacePage />) : (<Navigate to="/" replace />)} />
                    <Route path='/explore' element={isAuthenticated ? (<Example />) : (<Navigate to="/" replace />)} />
                    <Route path="/category" element={isAuthenticated ? (<Categories />) : (<Navigate to="/" replace />)} />
                    <Route path="/dashboard" element={isAuthenticated ? (<ConservationDashboard />) : (<Navigate to="/" replace />)} />
                  </Routes>
                  {/* Onboarding Modal */}
                  {OnBoardingModal && (
                    <UserOnboardingModal 
                      isOpen={OnBoardingModal}
                      onClose={() => setOnBoardingModal(false)}
                      onSubmit={handleCreateProfile}
                    />
                  )}
                </AnimatePresence>
              </main>
              <Footer />
            </>
        </AnimatePresence>
      </div>
    </Router>
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