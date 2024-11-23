import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import CTASection from '../components/CTA';
import Elephant from '../../public/images/elephant.avif';
import { Leaf, Globe, Shield, TrendingUp, ArrowDown, ExternalLink } from 'lucide-react';

const HeroPage = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);
  const imageParallax = useTransform(scrollY, [0, 300], [0, 50]);

  const features = [
    { icon: Leaf, title: 'Conservation', text: 'Support wildlife through NFTs', color: 'from-green-400 to-green-600' },
    { icon: Globe, title: 'Global Impact', text: 'Worldwide conservation network', color: 'from-blue-400 to-blue-600' },
    { icon: Shield, title: 'Secure', text: 'Blockchain-powered protection', color: 'from-purple-400 to-purple-600' },
    { icon: TrendingUp, title: 'Growth', text: 'Sustainable investment in nature', color: 'from-emerald-400 to-emerald-600' }
  ];

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
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const slideVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 50
      }
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-100">
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
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "linear"
            }}
            className={`absolute ${i % 2 === 0 ? '-right-1/4' : '-left-1/4'} 
                      ${i === 1 ? 'top-1/2' : i === 2 ? 'bottom-1/4' : '-top-1/4'} 
                      w-1/2 h-1/2 bg-gradient-to-br from-green-300/20 to-blue-300/20 
                      rounded-full blur-3xl`}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-24">
        {/* Hero Section */}
        <motion.div
          style={{ opacity, scale }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-32"
        >
          {/* Text Content */}
          <motion.div 
            variants={slideVariants}
            className="lg:w-1/2 text-left"
          >
            <motion.h1 
              variants={itemVariants}
              className="text-7xl md:text-8xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-6"
            >
              TerraPulse
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-2xl md:text-3xl text-gray-700 mb-8 leading-relaxed"
            >
              Connecting the World to Conservation Through Digital Innovation
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-6"
            >
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: '#047857' }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-10 py-4 rounded-full text-lg font-semibold flex items-center shadow-lg hover:shadow-xl transition-shadow"
              >
                <Leaf className="mr-2" /> Start Exploring
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: '#f0fdf4' }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/80 backdrop-blur-sm border-2 border-green-600 text-green-600 px-10 py-4 rounded-full text-lg font-semibold flex items-center shadow-lg hover:shadow-xl transition-shadow"
              >
                <Globe className="mr-2" /> Learn More
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Image Container */}
          <motion.div
            style={{ y: imageParallax }}
            className="lg:w-1/2 relative"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="relative w-full aspect-square max-w-lg mx-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-200 to-blue-200 rounded-3xl transform rotate-6 scale-105" />
              <motion.div
                whileHover={{ scale: 1.02, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="relative bg-white p-4 rounded-3xl shadow-xl transform -rotate-3 overflow-hidden"
              >
                <img
                  src={Elephant}
                  alt="Wildlife Conservation"
                  className="w-full h-full object-cover rounded-2xl"
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end justify-center p-6 rounded-2xl"
                >
                  <span className="text-white text-lg font-semibold flex items-center gap-2">
                    View Details <ExternalLink size={20} />
                  </span>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Enhanced Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative group"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
              />
              <div className="relative bg-white/90 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-gray-200 transform transition-transform duration-300 hover:rotate-2">
                <div className={`inline-block p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-4`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.text}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Call to Action */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <CTASection />
        </motion.div>

        {/* Enhanced Scroll Indicator */}
        <motion.div
          animate={{
            y: [0, 10, 0]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <motion.div
            whileHover={{ scale: 1.2 }}
            className="flex flex-col items-center gap-2"
          >
            <div className="relative w-6 h-10 border-2 border-green-600 rounded-full flex justify-center">
              <motion.div
                animate={{
                  y: [0, 12, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-2 h-2 bg-green-600 rounded-full mt-2"
              />
            </div>
            <motion.div
              animate={{
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-green-600"
            >
              <ArrowDown size={20} />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroPage;