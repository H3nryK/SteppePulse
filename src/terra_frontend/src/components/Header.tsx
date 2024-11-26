import React, { useState, useEffect } from 'react';
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

const Navigation = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: ShoppingCart, label: 'NFT Tokens', path: '/nft-tokens' },
    { icon: TrendingUp, label: 'Marketplace', path: '/marketplace' },
    { icon: Info, label: 'About', path: '/about' },
    { icon: Phone, label: 'Contact', path: '/contact' },
    { icon: Wallet, label: 'Connect Wallet', path: '#', isAction: true }
  ];

  // Scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsExpanded(false);
  }, [location]);

  const handleNavigation = (path: string, isAction?: boolean) => {
    if (isAction) {
      // Wallet connection logic
      console.log('Wallet connection initiated');
      return;
    }
    navigate(path);
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
        stiffness: 300
      }
    }
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-gray-900/80 backdrop-blur-md shadow-xl' 
          : 'bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-md'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center p-4 relative">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <motion.div 
            whileHover={{ scale: 1.05 }}
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
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`flex items-center transition-all duration-300 ${
                location.pathname === item.path
                  ? 'text-emerald-400'
                  : 'text-white hover:text-emerald-300'
              }`}
            >
              <item.icon className="mr-2" size={20} />
              {item.label}
            </motion.button>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <motion.button 
          onClick={() => setIsExpanded(!isExpanded)}
          whileTap={{ scale: 0.9 }}
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
                  variants={navItemVariants}
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
  );
};

export default Navigation;