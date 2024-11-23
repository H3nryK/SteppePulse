import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Home, 
  ShoppingCart, 
  TrendingUp, 
  Info, 
  Phone, 
  Wallet 
} from 'lucide-react';
import Favicon from '../../public/favicon.ico';

const Navigation = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: ShoppingCart, label: 'NFT Tokens', path: '/nft-tokens' },
    { icon: TrendingUp, label: 'Marketplace', path: '/marketplace' },
    { icon: Info, label: 'About', path: '/about' },
    { icon: Phone, label: 'Contact', path: '/contact' },
    { icon: Wallet, label: 'Connect Wallet', path: '#', isAction: true }
  ];

  const handleNavigation = (path: string, isAction?: boolean) => {
    if (isAction) {
      // Handle wallet connection or other actions
      console.log('Wallet connection clicked');
      return;
    }
    navigate(path);
    setIsExpanded(false);
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="fixed top-0 left-0 w-full bg-gradient-to-r from-green-800 to-emerald-700 text-white p-4 z-50 shadow-lg"
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="text-2xl font-bold flex items-center"
          >
            <img 
              src={Favicon}
              alt="TerraPulse Logo" 
              className="mr-2 rounded-full"
            />
            TerraPulse
          </motion.div>
        </Link>

        <div className="hidden md:flex space-x-6">
          {navItems.map((item, index) => (
            <motion.button
              key={index}
              onClick={() => handleNavigation(item.path, item.isAction)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center hover:text-green-200 transition"
            >
              <item.icon className="mr-2" size={20} />
              {item.label}
            </motion.button>
          ))}
        </div>

        <motion.button 
          onClick={() => setIsExpanded(!isExpanded)}
          whileTap={{ scale: 0.9 }}
          className="md:hidden"
        >
          {isExpanded ? '✕' : '☰'}
        </motion.button>
      </div>

      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-green-900 absolute left-0 right-0 top-full"
        >
          {navItems.map((item, index) => (
            <motion.button
              key={index}
              onClick={() => handleNavigation(item.path, item.isAction)}
              className="w-full text-left p-4 hover:bg-green-700 flex items-center"
            >
              <item.icon className="mr-4" />
              {item.label}
            </motion.button>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navigation;