import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Wallet, TreePine, ExternalLink } from 'lucide-react';

const CTASection = () => {
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

  return (
    <section className="relative overflow-hidden py-24">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {[...Array(2)].map((_, i) => (
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
            className={`absolute ${i === 0 ? '-right-1/4' : '-left-1/4'} 
                      ${i === 0 ? 'top-1/4' : 'bottom-1/4'} 
                      w-1/2 h-1/2 bg-gradient-to-br from-green-300/20 to-blue-300/20 
                      rounded-full blur-3xl`}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-6xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-6"
          >
            Join the Conservation Revolution
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-2xl text-gray-700 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Tokenize wildlife, support conservation efforts, and become part of a global 
            community dedicated to protecting our planet's most precious ecosystems.
          </motion.p>
          
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-6 mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: '#047857' }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-10 py-4 rounded-full text-lg font-semibold flex items-center shadow-lg hover:shadow-xl transition-shadow"
            >
              <Wallet className="mr-2" /> Connect Wallet
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: '#f0fdf4' }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/80 backdrop-blur-sm border-2 border-green-600 text-green-600 px-10 py-4 rounded-full text-lg font-semibold flex items-center shadow-lg hover:shadow-xl transition-shadow"
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
              className="group relative bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-gray-200"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl rounded-2xl"
              />
              <div className="relative flex items-center gap-2">
                <Leaf className="w-6 h-6 text-green-600" />
                <p className="text-gray-600">Already part of TerraPulse?</p>
                <a 
                  href="/dashboard" 
                  className="text-green-600 font-semibold flex items-center gap-1 hover:text-green-700"
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