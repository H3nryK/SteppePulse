import React, { useState, useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthClient } from '@dfinity/auth-client';
import { HttpAgent } from '@dfinity/agent';
import { 
  Home, 
  ShoppingCart, 
  TrendingUp, 
  Info, 
  Phone, 
  Wallet,
  LogIn,
  X,
  AlertCircle,
  LogOut
} from 'lucide-react';
import WalletConnec

// Main Navigation Component
const Navigation = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [authState, setAuthState] = useState(null);
  const navigate = useNavigate();

  // Check for existing authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      const authClient = await AuthClient.create();
      if (await authClient.isAuthenticated()) {
        const identity = authClient.getIdentity();
        const agent = new HttpAgent({
          identity,
          host: process.env.REACT_APP_IC_HOST || 'https://ic0.app'
        });
        await agent.fetchRootKey();
        const principal = identity.getPrincipal();
        
        setAuthState({
          principal: principal.toString(),
          provider: 'Internet Identity',
          isAuthenticated: true,
          agent: agent,
        });
      }
    };
    checkAuth();
  }, []);

  const handleConnect = (connectionInfo) => {
    setAuthState(connectionInfo);
    localStorage.setItem('ic-identity', JSON.stringify({
      principal: connectionInfo.principal,
      isAuthenticated: true
    }));
  };

  const handleDisconnect = async () => {
    try {
      const authClient = await AuthClient.create();
      await authClient.logout();
      setAuthState(null);
      localStorage.removeItem('ic-identity');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: ShoppingCart, label: 'NFT Tokens', path: '/nft-tokens' },
    { icon: TrendingUp, label: 'Marketplace', path: '/marketplace' },
    { icon: Info, label: 'About', path: '/about' },
    { icon: Phone, label: 'Contact', path: '/contact' }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsExpanded(false);
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="fixed top-0 left-0 w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white p-4 z-50 shadow-lg"
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="text-2xl font-bold flex items-center"
          >
            SteppePulse
          </motion.div>
        </Link>

        <div className="hidden md:flex space-x-6">
          {navItems.map((item, index) => (
            <motion.button
              key={index}
              onClick={() => handleNavigation(item.path)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center hover:text-gray-400 transition"
            >
              <item.icon className="mr-2" size={20} />
              {item.label}
            </motion.button>
          ))}
          
          {/* Wallet Connection Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={authState ? handleDisconnect : () => setIsWalletModalOpen(true)}
            className="flex items-center px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition"
          >
            {authState ? (
              <>
                <Wallet className="mr-2" size={20} />
                <span className="mr-2">{authState.principal.slice(0, 6)}...</span>
                <LogOut size={16} />
              </>
            ) : (
              <>
                <Wallet className="mr-2" size={20} />
                Connect Wallet
              </>
            )}
          </motion.button>
        </div>

        <motion.button 
          onClick={() => setIsExpanded(!isExpanded)}
          whileTap={{ scale: 0.9 }}
          className="md:hidden"
        >
          {isExpanded ? '✕' : '☰'}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-gray-900 absolute left-0 right-0 top-full"
        >
          {navItems.map((item, index) => (
            <motion.button
              key={index}
              onClick={() => handleNavigation(item.path)}
              className="w-full text-left p-4 hover:bg-gray-800 flex items-center"
            >
              <item.icon className="mr-4" />
              {item.label}
            </motion.button>
          ))}
          <motion.button
            onClick={authState ? handleDisconnect : () => setIsWalletModalOpen(true)}
            className="w-full text-left p-4 hover:bg-gray-800 flex items-center"
          >
            <Wallet className="mr-4" />
            {authState ? `${authState.principal.slice(0, 6)}... (Disconnect)` : 'Connect Wallet'}
          </motion.button>
        </motion.div>
      )}

      {/* Wallet Connection Modal */}
      <WalletConnectionModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        onConnect={handleConnect}
      />
    </motion.nav>
  );
};

export default Navigation;