import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Globe, Shield } from 'lucide-react';

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Initializing');

  useEffect(() => {
    const totalSteps = 100;
    const loadingStages = [
      'Connecting Global Networks',
      'Initializing Conservation Protocols',
      'Synchronizing Ecosystem Data',
      'Establishing Blockchain Connections',
      'Preparing Environmental Insights'
    ];

    const simulateLoading = () => {
      let currentProgress = 0;
      let stageIndex = 0;

      const intervalId = setInterval(() => {
        // Randomize progress to feel more natural
        currentProgress += Math.random() * 15;
        
        // Update status based on progress
        if (currentProgress < 20) {
          setStatus(loadingStages[0]);
        } else if (currentProgress < 40) {
          setStatus(loadingStages[1]);
        } else if (currentProgress < 60) {
          setStatus(loadingStages[2]);
        } else if (currentProgress < 80) {
          setStatus(loadingStages[3]);
        } else {
          setStatus(loadingStages[4]);
        }

        // Cap progress and trigger completion
        if (currentProgress >= totalSteps) {
          clearInterval(intervalId);
          setProgress(100);
          setTimeout(onComplete, 1000);
        } else {
          setProgress(Math.min(currentProgress, totalSteps));
        }
      }, 100);

      return () => clearInterval(intervalId);
    };

    const cleanup = simulateLoading();
    return cleanup;
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center"
    >
      <div className="text-center">
        {/* 3D Animated Logo/Icon */}
        <motion.div
          initial={{ scale: 0.5, rotateY: -180 }}
          animate={{ 
            scale: 1, 
            rotateY: 0,
            transition: { 
              type: 'spring', 
              stiffness: 120, 
              damping: 10,
              duration: 1 
            }
          }}
          className="flex items-center justify-center mb-8"
        >
          <motion.div 
            animate={{ 
              rotate: 360,
              transition: { 
                repeat: Infinity, 
                duration: 4, 
                ease: 'linear' 
              }
            }}
            className="relative w-40 h-40"
          >
            {/* Orbiting Icons */}
            <motion.div 
              className="absolute inset-0 flex items-center justify-center"
              animate={{
                rotate: 360,
                transition: { 
                  repeat: Infinity, 
                  duration: 6, 
                  ease: 'linear' 
                }
              }}
            >
              <div className="absolute top-0 bg-emerald-500 p-3 rounded-full shadow-2xl">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <div className="absolute right-0 bg-blue-500 p-3 rounded-full shadow-2xl">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <div className="absolute bottom-0 bg-purple-500 p-3 rounded-full shadow-2xl">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </motion.div>

            {/* Central Logo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-full shadow-2xl flex items-center justify-center">
                <span className="text-white text-3xl font-bold">SP</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Progress Section */}
        <div className="w-96 bg-gray-800 rounded-full h-4 mb-4 overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
            className="h-full bg-gradient-to-r from-emerald-500 to-blue-600"
          ></motion.div>
        </div>

        {/* Status Text */}
        <motion.h2
          key={status}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl text-gray-200 font-light"
        >
          {status}...
        </motion.h2>

        {/* Percentage */}
        <motion.p
          className="text-sm text-gray-400 mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {Math.round(progress)}% Loaded
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Preloader;