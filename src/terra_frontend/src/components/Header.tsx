import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  ShoppingCart, 
  TrendingUp, 
  Info, 
  Phone, 
  Wallet,
  Menu,
  X 
} from 'lucide-react';

// Wallet Connection Modal Component
const WalletConnectionModal = ({ isOpen, onClose, onConnect }: { isOpen: boolean; onClose: () => void; onConnect: (walletId: string) => void }) => {
  const walletOptions = [
    { 
      id: 'plug', 
      name: 'Plug Wallet', 
      logo: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-16 h-16">
          <circle cx="24" cy="24" r="22" fill="#4CAF50" />
          <path d="M24 12v24c6.627 0 12-5.373 12-12S30.627 12 24 12z" fill="#45A049" />
          <path d="M24 12v24c-6.627 0-12-5.373-12-12S17.373 12 24 12z" fill="#2E7D32" />
        </svg>
      ),
      description: "Seamless crypto wallet for Web3"
    },
    { 
      id: 'nfid', 
      name: 'NFID', 
      logo: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-16 h-16">
          <rect width="48" height="48" rx="10" fill="#2196F3" />
          <path d="M24 14l-8 8h5v12h6V22h5z" fill="white" />
        </svg>
      ),
      description: "Secure identity wallet"
    },
    { 
      id: 'internet-identity', 
      name: 'Internet Identity', 
      logo: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-16 h-16">
          <circle cx="24" cy="24" r="22" fill="#673AB7" />
          <path d="M24 15c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" fill="white" />
        </svg>
      ),
      description: "Decentralized identity solution"
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ 
              type: 'spring', 
              stiffness: 300, 
              damping: 20 
            }}
            className="bg-gray-800 rounded-3xl p-8 w-full max-w-md shadow-2xl border border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-white">
                Connect Wallet
              </h2>
              <motion.button 
                onClick={onClose}
                whileHover={{ rotate: 90 }}
                className="text-gray-400 hover:text-white"
              >
                <X size={24} />
              </motion.button>
            </div>
            <p className="text-gray-400 text-center mb-8 text-sm">
              Select a wallet to connect and access SteppePulse
            </p>
            <div className="space-y-4">
              {walletOptions.map((wallet) => (
                <motion.button
                  key={wallet.id}
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: 'rgba(31, 41, 55, 1)' // bg-gray-800 with full opacity
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onConnect(wallet.id)}
                  className="w-full flex items-center space-x-6 bg-gray-900 p-5 rounded-2xl hover:shadow-lg transition-all border border-transparent hover:border-emerald-500"
                >
                  <div className="bg-gray-800 p-3 rounded-xl">
                    {wallet.logo}
                  </div>
                  <div className="text-left flex-grow">
                    <h3 className="text-white font-semibold text-lg">{wallet.name}</h3>
                    <p className="text-gray-400 text-xs">{wallet.description}</p>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="text-emerald-400 opacity-0"
                  >
                    →
                  </motion.div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Navigation = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: ShoppingCart, label: 'NFT Tokens', path: '/nft-tokens' },
    { icon: TrendingUp, label: 'Marketplace', path: '/marketplace' },
    { icon: Info, label: 'About', path: '/about' },
    { icon: Phone, label: 'Contact', path: '/contact' },
    { icon: Wallet, label: 'Connect Wallet', path: '#', isAction: true }
  ];

  // Scroll effect for navbar
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50);
  }, []);

  // Scroll effect for navbar
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsExpanded(false);
  }, [location]);

  const handleNavigation = (path: string, isAction?: boolean) => {
    if (isAction) {
      // Open wallet connection modal
      setIsWalletModalOpen(true);
      return;
    }
    navigate(path);
  };

  const handleWalletConnection = (walletType: string) => {
    // Implement wallet connection logic
    switch(walletType) {
      case 'plug':
        console.log('Connecting with Plug Wallet');
        // Add Plug wallet connection logic
        break;
      case 'nfid':
        console.log('Connecting with NFID');
        // Add NFID connection logic
        break;
      case 'internet-identity':
        console.log('Connecting with Internet Identity');
        // Add Internet Identity connection logic
        break;
    }
    setIsWalletModalOpen(false);
  };

  // Mobile menu animation variants
  const mobileMenuVariants = {
    hidden: { 
      opacity: 0, 
      height: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    },
    visible: { 
      opacity: 1, 
      height: 'auto',
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    }
  };

  // Navigation item animation variants
  const navItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        delay: (index: number) => index * 0.1
      }
    }
  };

  return (
    <>
      <motion.nav 
        initial={{ y: -100, rotateX: -30 }}
        animate={{ y: 0, rotateX: 0 }}
        transition={{ 
          type: 'spring', 
          stiffness: 300,
          damping: 15
        }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-gray-900/90 backdrop-blur-xl shadow-2xl' 
            : 'bg-gradient-to-r from-gray-800/90 to-gray-900/90 backdrop-blur-xl'
        }`}
      >
        <div className="container mx-auto flex justify-between items-center p-4 relative">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <motion.div 
              whileHover={{ 
                scale: 1.05,
                rotateY: 15
              }}
              className="text-2xl font-bold text-white flex items-center"
            >
              <span className="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
                SteppePulse
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 items-center">
            {navItems.map((item, index) => (
              <motion.button
                key={index}
                onClick={() => handleNavigation(item.path, item.isAction)}
                whileHover={{ 
                  scale: 1.1,
                  rotateY: 10
                }}
                whileTap={{ scale: 0.9 }}
                className={`flex items-center transition-all duration-300 ${
                  location.pathname === item.path
                    ? 'text-emerald-400'
                    : 'text-white hover:text-emerald-300'
                }`}
              >
                {item.label}
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <motion.button 
            onClick={() => setIsExpanded(!isExpanded)}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1}}
            className="md:hidden text-white"
          >
            {isExpanded ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              key="mobile-menu"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={mobileMenuVariants}
              className="md:hidden absolute left-0 right-0 top-full bg-gray-900/95 backdrop-blur-md shadow-2xl"
            >
              <div className="container mx-auto">
                {navItems.map((item, index) => (
                  <motion.button
                    key={index}
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: { opacity: 0, x: -50 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: {
                          type: "spring",
                          stiffness: 300,
                          delay: index * 0.1
                        }
                      }
                    }}
                    custom={index}
                    onClick={() => handleNavigation(item.path, item.isAction)}
                    className={`w-full text-left p-4 flex items-center transition-all duration-300 hover:bg-gray-800 ${
                      location.pathname === item.path
                        ? 'bg-gray-800 text-emerald-400'
                        : 'text-white'
                    }`}
                  >
                    <item.icon className="mr-4" size={20} />
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Wallet Connection Modal */}
      <WalletConnectionModal 
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        onConnect={handleWalletConnection}
      />
    </>
  );
};

export default Navigation;