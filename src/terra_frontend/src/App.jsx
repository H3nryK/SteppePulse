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
import StepulWhitePaper from './pages/Whitepaper';
import { terra_backend } from '../../declarations/terra_backend';

const AppContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, principal, userProfile, login } = useAuth();
  const [OnBoardingModal, setOnBoardingModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (isAuthenticated && !userProfile) {
        setOnBoardingModal(true);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [isAuthenticated, userProfile]);

  const handleCreateProfile = async (username, acceptedTerms) => {
    if (!principal) {
      return { success: false, error: "Authentication required. Please log in." };
    }
  
    if (!username || username.trim().length < 3) {
      return { success: false, error: "Username must be at least 3 characters long." };
    }
  
    if (!acceptedTerms) {
      return { success: false, error: "Please accept the terms and conditions." };
    }
  
    try {
      const result = await terra_backend.createUserProfile(username);
      
      if ('ok' in result) {
        console.log("Profile created:", result.ok);
        return { success: true, profile: result.ok };
      }
      if ('err' in result) {
        switch (result.err) {
          case "#InvalidInput":
            return { success: false, error: "Invalid username. Ensure it is between 3 and 20 characters." };
          case "#AlreadyExists":
            return { success: false, error: "Username already exists. Please choose another." };
          default:
            return { success: false, error: "An unknown error occurred." };
        }
      }
    } catch (error) {
      console.error("Error creating profile:", error);
      return { success: false, error: "Network error. Please try again later." };
    }
  };   
  
  const onSubmitProfile = async (username, acceptedTerms) => {
    const result = await handleCreateProfile(username, acceptedTerms);
    
    if (result.success) {
      // Optional: handle successful profile creation
      setErrorMessage(null);
    } else {
      // Handle error
      setErrorMessage(result.error || "Profile creation failed");
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
            <Route path="/whitepaper" element={<StepulWhitePaper />} />
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
          onSubmit={onSubmitProfile}
        />
      )}
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;