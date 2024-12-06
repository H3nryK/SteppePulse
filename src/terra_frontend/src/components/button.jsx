import React, { useState } from 'react';
import { Wallet, Unplug } from 'lucide-react';

const PlugWallet = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  const connectPlugWallet = async () => {
    if (window.ic && window.ic.plug) {
      try {

        if (!window.ic?.plug) {
            window.open('https://plugwallet.ooo/', '_blank');
            throw new Error('Plug wallet not intsalled.');
        }
        
        // Request connection to Plug Wallet
        const connected = await window.ic.plug.requestConnect();
        
        if (connected) {
          // Get the principal/wallet address
          const principalId = await window.ic.plug.agent.getPrincipal();
          setWalletAddress(principalId.toString());
          setIsConnected(true);
        }
      } catch (error) {
        console.error('Wallet connection error:', error);
        alert('Failed to connect Plug Wallet');
      }
    } else {
      alert('Plug Wallet extension not found. Please install it first.');
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress('');
  };

  return (
    <div className="mt-4 w-full">
      {!isConnected ? (
        <button 
          onClick={connectPlugWallet}
          className="w-full bg-green-700/50 hover:bg-green-700/70 text-green-300 
                     rounded-xl p-3 md:p-4 flex items-center justify-center 
                     transition-colors duration-300"
        >
          <Wallet className="mr-2 w-5 h-5" />
          Connect Plug Wallet
        </button>
      ) : (
        <div className="bg-gray-700/50 rounded-xl p-3 md:p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Wallet className="text-green-500 w-5 h-5" />
              <span className="text-sm text-gray-300 truncate max-w-[200px]">
                {walletAddress}
              </span>
            </div>
            <button 
              onClick={disconnectWallet}
              className="text-red-400 hover:text-red-500 transition-colors"
            >
              <Unplug className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlugWallet;