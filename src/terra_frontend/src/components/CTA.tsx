import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { 
  Leaf, 
  Wallet, 
  TreePine, 
  ExternalLink, 
  Globe, 
  Shield, 
  PlaneTakeoff 
} from 'lucide-react';

// Wallet Connection Modal (Same as in Navigation)
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
          className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div 
            initial={{ scale: 0.8, rotateY: -30 }}
            animate={{ scale: 1, rotateY: 0 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="bg-gray-900 rounded-2xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-white mb-4 text-center">
              Connect Your Wallet
            </h2>
            <p className="text-gray-400 text-center mb-6">
              Choose a wallet to connect and access TerraPulse
            </p>
            <div className="space-y-4">
              {walletOptions.map((wallet) => (
                <motion.button
                  key={wallet.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onConnect(wallet.id)}
                  className="w-full flex items-center space-x-4 bg-gray-800 p-4 rounded-xl hover:bg-gray-700 transition-all"
                >
                  {wallet.logo}
                  <div className="text-left">
                    <h3 className="text-white font-semibold">{wallet.name}</h3>
                    <p className="text-gray-400 text-sm">{wallet.description}</p>
                  </div>
                </motion.button>
              ))}
            </div>
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full mt-4 bg-gray-700 text-white py-3 rounded-xl hover:bg-gray-600 transition-all"
            >
              Cancel
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const CTASection = () => {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [activeFeature, setActiveFeature] = useState(0);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const bgImages = [
    "/images/rainforest-canopy.jpg",
    "/images/coral-reef-wide.jpg",
    "/images/savanna-sunset.jpg",
    "/images/mountain-conservation.jpg",
    "/images/river-ecosystem.jpg"
  ];

  const features = [
    {
      icon: Globe,
      title: "Global Impact",
      description: "Your token directly supports conservation efforts across continents."
    },
    {
      icon: Shield,
      title: "Blockchain Transparency",
      description: "Track exactly how your contribution protects endangered habitats."
    },
    {
      icon: PlaneTakeoff,
      title: "Innovative Conservation",
      description: "Pioneering blockchain technology to revolutionize wildlife preservation."
    }
  ];

  useEffect(() => {
    const bgInterval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % bgImages.length);
    }, 7000);

    const featureInterval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);

    return () => {
      clearInterval(bgInterval);
      clearInterval(featureInterval);
    };
  }, [bgImages.length, features.length]);

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12
      }
    }
  };

  return (
    <section
      ref={ref}
      className="relative w-screen min-h-screen overflow-hidden flex items-center justify-center"
      style={{
        backgroundImage: `url(${bgImages[currentBgIndex]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        transition: 'background-image 1.5s ease-in-out'
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-900/50 to-blue-900/50 backdrop-blur-sm" />

      {/* Animated Background Elements */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.3, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      >
        {features.map((_, i) => (
          <motion.div
            key={i}
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, 180, 360],
              x: [0, 100, -100, 0],
              y: [0, 50, -50, 0]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className={`absolute ${i === 0 ? 'right-1/4 top-1/4' : 'left-1/4 bottom-1/4'} 
                        w-1/3 h-1/3 bg-gradient-to-br from-green-300/20 to-blue-300/20 
                        rounded-full blur-2xl opacity-50`}
          />
        ))}
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-full px-4 sm:px-6 lg:px-8 text-center">
        <AnimatePresence>
          {isInView && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="space-y-8 w-full"
            >
              <motion.h1 
                variants={itemVariants}
                className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-green-400 via-blue-500 to-green-600 
                           bg-clip-text text-transparent leading-tight mb-6 drop-shadow-2xl"
              >
                Revolutionize Conservation
              </motion.h1>

              <motion.p 
                variants={itemVariants}
                className="text-xl md:text-3xl text-white max-w-4xl mx-auto mb-12 leading-relaxed 
                           font-medium tracking-wide drop-shadow-xl px-4"
              >
                Transform environmental protection through blockchain. 
                Each token is a direct lifeline to preserving our planet's most critical ecosystems.
              </motion.p>

              {/* Call-to-Action Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex justify-center space-x-4 md:space-x-6 mb-16 px-4"
              >
                <motion.button
                  onClick={() => setIsWalletModalOpen(true)}
                  whileHover={{ scale: 1.05, backgroundColor: '#047857' }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-green-600 to-emerald-700 text-white 
                             px-6 md:px-12 py-3 md:py-5 rounded-full text-base md:text-xl font-bold 
                             flex items-center gap-3 shadow-2xl hover:shadow-green-700/50 
                             transition-all duration-300 ease-in-out"
                >
                  <Wallet className="w-5 md:w-7 h-5 md:h-7" /> Connect Wallet
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: '#f0fdf4' }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/90 backdrop-blur-sm border-2 border-green-600 
                             text-green-700 px-6 md:px-12 py-3 md:py-5 rounded-full text-base md:text-xl font-bold 
                             flex items-center gap-3 shadow-2xl hover:shadow-green-600/50 
                             transition-all duration-300 ease-in-out"
                >
                  <TreePine className="w-5 md:w-7 h-5 md:h-7" /> Explore NFTs
                </motion.button>
              </motion.div>

              {/* Wallet Connection Modal */}
              <WalletConnectionModal 
                isOpen={isWalletModalOpen}
                onClose={() => setIsWalletModalOpen(false)}
                onConnect={handleWalletConnection}
              />

              {/* Dynamic Features Carousel */}
              <motion.div 
                variants={itemVariants}
                className="flex justify-center px-4"
              >
                <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 md:p-8 max-w-4xl w-full">
                  <div className="flex items-center justify-between">
                    {features.map((feature, idx) => {
                      const FeatureIcon = feature.icon;
                      return (
                        <motion.div
                          key={feature.title}
                          className={`flex items-center gap-2 md:gap-4 p-2 md:p-4 rounded-xl transition-all duration-300 cursor-pointer ${
                            activeFeature === idx 
                              ? 'bg-green-100 text-green-800 scale-105' 
                              : 'text-gray-600 opacity-70'
                          }`}
                          whileHover={{ scale: 1.05 }}
                          onClick={() => setActiveFeature(idx)}
                        >
                          <FeatureIcon className="w-5 md:w-8 h-5 md:h-8" />
                          <span className="font-semibold text-sm md:text-lg">{feature.title}</span>
                        </motion.div>
                      );
                    })}
                  </div>
                  <motion.p 
                    key={activeFeature}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="text-center text-base md:text-xl text-gray-700 mt-4 md:mt-6"
                  >
                    {features[activeFeature].description}
                  </motion.p>
                </div>
              </motion.div>

              {/* Dashboard Link */}
              <motion.div 
                variants={itemVariants}
                className="flex justify-center px-4"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/90 backdrop-blur-lg rounded-2xl px-6 md:px-8 py-3 md:py-4 
                             flex items-center gap-3 md:gap-4 shadow-xl hover:shadow-green-600/30 
                             transition-all duration-300"
                >
                  <Leaf className="w-4 md:w-6 h-4 md:h-6 text-green-600" />
                  <p className="text-sm md:text-base text-gray-700">Already part of SteppePulse?</p>
                  <a 
                    href="/dashboard" 
                    className="text-green-600 font-bold flex items-center gap-1 md:gap-2 
                               hover:text-green-700 transition-colors text-sm md:text-base"
                  >
                    Go to Dashboard <ExternalLink className="w-3.5 md:w-4.5 h-3.5 md:h-4.5" />
                  </a>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CTASection;