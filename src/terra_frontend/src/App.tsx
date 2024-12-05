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
import { createActor } from '../../declarations/terra_backend';

// Define type for profile creation result
type ProfileCreationResult = {
  success: boolean;
  error?: string;
  type?: string;
  profile?: any;
};

const AppContent: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, principal, userProfile, login } = useAuth();
  const [OnBoardingModal, setOnBoardingModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (isAuthenticated && !userProfile) {
        setOnBoardingModal(true);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [isAuthenticated, userProfile]);

  const handleCreateProfile = async (username: string, acceptedTerms: boolean): Promise<ProfileCreationResult> => {
    // Input validation
    if (!principal) {
      console.error("Authentication error: User is not authenticated.");
      return {
        success: false,
        error: "Authentication required. Please log in again."
      };
    }

    if (!username || username.trim().length < 3) {
      console.error("Invalid username: Must be at least 3 characters long.");
      return {
        success: false,
        error: "Username must be at least 3 characters long."
      };
    }

    if (!acceptedTerms) {
      console.error("Terms not accepted.");
      return {
        success: false,
        error: "You must accept the terms and conditions."
      };
    }

    try {
      // Create the backend actor
      const backend = createActor(principal);

      // Attempt to create user profile
      const result = await backend.createUserProfile(username);

      // Comprehensive result handling
      if ('ok' in result) {
        console.log("Profile created successfully:", result.ok);
        setOnBoardingModal(false);
        return {
          success: true,
          profile: result.ok
        };
      } else if ('error' in result) {
        const errorMessage = result.error || "Profile creation failed";
        console.error(errorMessage);
        
        // Handle specific error types if applicable
        if (typeof errorMessage === 'string' && errorMessage.includes("Username already exists")) {
          return {
            success: false,
            error: "This username is already taken. Please choose another.",
            type: "USERNAME_CONFLICT"
          };
        }

        return {
          success: false,
          error: errorMessage.toString()
        };
      } else {
        // Unexpected result format
        console.error("Unexpected response format from createUserProfile");
        return {
          success: false,
          error: "An unexpected error occurred during profile creation."
        };
      }
    } catch (error) {
      // Network errors, connection issues, etc.
      console.error("Profile creation error:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "An unknown error occurred",
        type: "NETWORK_ERROR"
      };
    }

  };  const onSubmitProfile = async (username: string, acceptedTerms: boolean) => {
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

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;