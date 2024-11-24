import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Wallet, TreePine, ExternalLink, Stars } from 'lucide-react';

const CTASection = () => {
  const bgImages = [
    "url('/images/bg-7.jpg')",
    "url('/images/bg-8.jpg')",
    "url('/images/bg-6.jpg')",
    "url('/images/bg-5.avif')",
    "url('/images/bg-5.avif')"
  ];

  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % bgImages.length);
    }, 5000);

    setIsVisible(true);
    return () => clearInterval(interval);
  }, [bgImages.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const floatingStars = {
    animate: {
      y: ['0%', '-20%', '0%'],
      opacity: [1, 0.5, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden py-24">
      {/* Background Image with Overlay */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentBgIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
          style={{
            backgroundImage: bgImages[currentBgIndex],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80"></div>
          {/* Noise texture */}
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] mix-blend-overlay"></div>
        </motion.div>
      </AnimatePresence>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
              x: [0, 100, 0],
              y: [0, 50, 0]
            }}
            transition={{
              duration: 15 + i * 5,
              repeat: Infinity,
              ease: "linear"
            }}
            className={`absolute ${i === 0 ? '-right-1/4' : i === 1 ? 'left-1/4' : '-left-1/4'} 
                      ${i === 0 ? 'top-1/4' : i === 1 ? 'top-1/2' : 'bottom-1/4'} 
                      w-1/2 h-1/2 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 
                      rounded-full blur-3xl`}
          />
        ))}
      </div>

      {/* Floating stars */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            variants={floatingStars}
            animate="animate"
            custom={i}
            className={`absolute ${i % 2 === 0 ? 'left-1/4' : 'right-1/4'} 
                       ${i % 3 === 0 ? 'top-1/4' : 'top-3/4'}`}
          >
            <Stars className="text-emerald-400/30 w-12 h-12" />
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-6xl font-bold bg-gradient-to-r from-emerald-400 via-green-300 to-blue-400 bg-clip-text text-transparent mb-6 drop-shadow-2xl"
          >
            Join the Conservation Revolution
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Tokenize wildlife, support conservation efforts, and become part of a global 
            community dedicated to protecting our planet's most precious ecosystems.
          </motion.p>
          
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-6 mb-16"
          >
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.2), 0 8px 10px -6px rgb(0 0 0 / 0.2)'
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-10 py-4 rounded-full text-lg font-semibold flex items-center shadow-lg transition-all duration-300 backdrop-blur-sm"
            >
              <Wallet className="mr-2" /> Connect Wallet
            </motion.button>
            
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.2), 0 8px 10px -6px rgb(0 0 0 / 0.2)'
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/10 backdrop-blur-md border-2 border-emerald-500/50 text-emerald-400 px-10 py-4 rounded-full text-lg font-semibold flex items-center shadow-lg transition-all duration-300 hover:bg-white/15"
            >
              <TreePine className="mr-2" /> Explore NFTs
            </motion.button>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="flex justify-center items-center gap-8"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="group relative bg-gray-900/50 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-700/50"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl rounded-2xl"
              />
              <div className="relative flex items-center gap-2">
                <Leaf className="w-6 h-6 text-emerald-400" />
                <p className="text-gray-300">Already part of SteppePulse?</p>
                <a 
                  href="/dashboard" 
                  className="text-emerald-400 font-semibold flex items-center gap-1 hover:text-emerald-300 transition-colors duration-300"
                >
                  Go to Dashboard <ExternalLink size={16} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;