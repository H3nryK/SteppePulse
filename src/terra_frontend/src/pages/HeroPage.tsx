import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import CTASection from '../components/CTA';
import { Leaf, Globe, Shield } from 'lucide-react';

const HeroPage = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);
  const overlayOpacity = useTransform(scrollY, [0, 300], [0.7, 0.85]);

  const features = [
    { icon: Leaf, title: 'Conservation', text: 'Support wildlife through NFTs', color: 'from-green-400 to-green-600' },
    { icon: Globe, title: 'Global Impact', text: 'Worldwide conservation network', color: 'from-blue-400 to-blue-600' },
    { icon: Shield, title: 'Secure', text: 'Blockchain-powered protection', color: 'from-purple-400 to-purple-600' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-900">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center">
        {/* Video Background with Enhanced Overlay */}
        <div className="absolute inset-0">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            src="/videos/bg.mp4"
          ></video>
          {/* Gradient Overlay */}
          <motion.div 
            style={{ opacity: overlayOpacity }}
            className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/75 to-black/90"
          ></motion.div>
          {/* Additional subtle pattern overlay for texture */}
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] mix-blend-overlay"></div>
        </div>

        <div className="relative z-20 container mx-auto px-4 py-24">
          <motion.div
            style={{ opacity, scale }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col lg:flex-row items-center justify-between"
          >
            <motion.div variants={itemVariants} className="lg:w-1/2 text-left">
              <motion.h1
                variants={itemVariants}
                className="text-7xl md:text-8xl font-bold bg-gradient-to-r from-emerald-400 via-green-300 to-blue-400 bg-clip-text text-transparent mb-6 drop-shadow-2xl"
              >
                SteppePulse
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="text-2xl md:text-3xl text-gray-200 mb-8 leading-relaxed drop-shadow-lg"
              >
                Connecting the World to Conservation Through Digital Innovation
              </motion.p>
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-6"
              >
                <motion.button
                  onClick={() => navigate('/explore')}
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)' }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-10 py-4 rounded-full text-lg font-semibold flex items-center shadow-lg transition-all duration-300 backdrop-blur-sm"
                >
                  <Leaf className="mr-2" /> Adopt Now
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/about')}
                  className="bg-white/10 backdrop-blur-md border-2 border-emerald-500/50 text-emerald-400 px-10 py-4 rounded-full text-lg font-semibold flex items-center shadow-lg transition-all duration-300 hover:bg-white/15"
                >
                  <Globe className="mr-2" /> Learn More
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Features Section with Glass Morphism */}
      <div className="relative z-20 min-h-[75vh] flex items-center justify-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative group"
            >
              <div className="relative bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-gray-700/50 transform transition-all duration-300 hover:rotate-2">
                <div
                  className={`inline-block p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-4 shadow-lg`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-300">{feature.text}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* CTA Section */}
      <div className="relative z-20 min-h-screen flex items-center justify-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <CTASection />
        </motion.div>
      </div>
    </div>
  );
};

export default HeroPage;