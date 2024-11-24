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

// Wallet Connection Modal Component
const WalletConnectionModal = ({ isOpen, onClose, onConnect }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState('');

  const handleInternetIdentityConnect = useCallback(async () => {
    setIsConnecting(true);
    setError('');
    
    try {
      const authClient = await AuthClient.create();
      
      const isConnected = await authClient.login({
        identityProvider: process.env.REACT_APP_II_URL || 'https://identity.ic0.app',
        onSuccess: async () => {
          const identity = authClient.getIdentity();
          
          const agent = new HttpAgent({
            identity,
            host: process.env.REACT_APP_IC_HOST || 'https://ic0.app'
          });

          await agent.fetchRootKey();
          const principal = identity.getPrincipal();

          const connectionInfo = {
            principal: principal.toString(),
            provider: 'Internet Identity',
            isAuthenticated: true,
            agent: agent,
          };

          onConnect(connectionInfo);
          onClose();
        },
        onError: (error) => {
          setError(`Authentication failed: ${error.message}`);
          setIsConnecting(false);
        },
      });

      if (!isConnected) {
        setError('Connection cancelled or failed');
      }
    } catch (err) {
      setError(`Failed to connect: ${err.message}`);
    } finally {
      setIsConnecting(false);
    }
  }, [onConnect, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900">Connect Wallet</h2>
          <p className="text-gray-500 mt-1">
            Connect to the Internet Computer using Internet Identity
          </p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-2" />
            <div>
              <h3 className="text-red-800 font-medium">Error</h3>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          </div>
        )}

        <button
          onClick={handleInternetIdentityConnect}
          disabled={isConnecting}
          className="w-full flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
              <LogIn className="h-6 w-6 text-white" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-900">Internet Identity</h3>
              <p className="text-sm text-gray-500">Connect with Internet Identity</p>
            </div>
          </div>
          {isConnecting ? (
            <div className="h-5 w-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
          ) : (
            <X className="h-5 w-5 text-gray-400" />
          )}
        </button>
      </div>
    </div>
  );
};

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