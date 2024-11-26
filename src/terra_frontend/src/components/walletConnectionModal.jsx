import React, { useState, useCallback } from 'react';
import { X, LogIn, AlertCircle } from 'lucide-react';
import { AuthClient } from '@dfinity/auth-client';
import { HttpAgent } from '@dfinity/agent';

export default function WalletConnectionModal = ({ isOpen, onClose, onConnect }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState('');

  const handleInternetIdentityConnect = useCallback(async () => {
    setIsConnecting(true);
    setError('');
    
    try {
      const authClient = await AuthClient.create();
      
      // Start the login process
      const isConnected = await authClient.login({
        identityProvider: process.env.REACT_APP_II_URL || 'https://identity.ic0.app',
        onSuccess: async () => {
          const identity = authClient.getIdentity();
          
          // Create an agent using the identity
          const agent = new HttpAgent({
            identity,
            host: process.env.REACT_APP_IC_HOST || 'https://ic0.app'
          });

          // Verify the connection to IC network
          await agent.fetchRootKey();

          // Get the principal ID
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