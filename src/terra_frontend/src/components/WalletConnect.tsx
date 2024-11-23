import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, PlugZap, Globe } from 'lucide-react';

const WalletConnect = () => {
  const [selectedWallet, setSelectedWallet] = useState(null);

  const walletOptions = [
    { 
      name: 'Plug Wallet', 
      icon: PlugZap, 
      description: 'Native ICP Blockchain Wallet' 
    },
    { 
      name: 'Internet Identity', 
      icon: Globe, 
      description: 'Decentralized Authentication' 
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-200 flex items-center justify-center p-8">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        <div className="text-center mb-6">
          <Wallet size={64} className="mx-auto text-green-600 mb-4" />
          <h2 className="text-3xl font-bold text-green-800">Connect Wallet</h2>
          <p className="text-gray-600 mt-2">
            Select your preferred blockchain wallet
          </p>
        </div>

        {walletOptions.map((wallet, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedWallet(wallet.name as any)}
            className={`
              flex items-center p-4 mb-4 rounded-lg cursor-pointer transition
              ${selectedWallet === wallet.name 
                ? 'bg-green-100 border-2 border-green-500' 
                : 'bg-gray-100 hover:bg-green-50'}
            `}
          >
            <wallet.icon size={40} className="mr-4 text-green-600" />
            <div>
              <h3 className="font-bold text-green-800">{wallet.name}</h3>
              <p className="text-gray-600 text-sm">{wallet.description}</p>
            </div>
          </motion.div>
        ))}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={!selectedWallet}
          className={`
            w-full py-3 rounded-full mt-4 transition
            ${selectedWallet 
              ? 'bg-green-600 text-white hover:bg-green-700' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
          `}
        >
          {selectedWallet ? `Connect ${selectedWallet}` : 'Select a Wallet'}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default WalletConnect;