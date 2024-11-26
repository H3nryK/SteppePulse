import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import CTASection from '../components/CTA';
import { Leaf, Globe, Shield, ChevronDown, Play, Pause } from 'lucide-react';

const HeroPage = () => {
  const { scrollY } = useScroll();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const navigate = useNavigate();

  // Advanced scroll-based transformations
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);
  const overlayOpacity = useTransform(scrollY, [0, 300], [0.7, 0.85]);
  const heroTextTransform = useTransform(scrollY, [0, 200], [0, -50]);

  // More sophisticated features with deeper context
  const features = [
    { 
      icon: Leaf, 
      title: 'Regenerative Conservation', 
      text: 'Innovative blockchain technology that directly funds ecosystem restoration and wildlife protection', 
      color: 'from-green-400 to-green-600',
      details: 'Our AI-driven platform tracks conservation impact in real-time, ensuring transparency and measurable environmental outcomes.'
    },
    { 
      icon: Globe, 
      title: 'Global Ecosystem Network', 
      text: 'Connecting local conservation efforts with a global community of environmental stewards', 
      color: 'from-blue-400 to-blue-600',
      details: 'Leveraging decentralized technologies to create a collaborative, borderless approach to environmental preservation.'
    },
    { 
      icon: Shield, 
      title: 'Secure & Transparent', 
      text: 'Blockchain-powered protection with verifiable conservation metrics', 
      color: 'from-purple-400 to-purple-600',
      details: 'Smart contracts and NFT technologies ensure that every contribution is tracked, validated, and has a direct, documentable impact.'
    }
  ];

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
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
        stiffness: 120,
        damping: 10,
      },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 },
    },
  };

  // Video control handler
  const toggleVideoPlayback = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-900">
      {/* Hero Section with Enhanced Video Background */}
      <div className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            src="/videos/bg.mp4"
          ></video>
          
          {/* More Dynamic Overlay */}
          <motion.div 
            style={{ opacity: overlayOpacity }}
            className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/75 to-black/90"
          ></motion.div>
          
          {/* Video Playback Toggle */}
          <motion.button
            onClick={toggleVideoPlayback}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-20 right-6 z-50 bg-white/20 backdrop-blur-md p-3 rounded-full"
          >
            {isVideoPlaying ? <Pause className="text-white" /> : <Play className="text-white" />}
          </motion.button>
        </div>

        <div className="relative z-20 container mx-auto px-4 py-24">
          <motion.div
            style={{ 
              opacity, 
              scale, 
              translateY: heroTextTransform 
            }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col lg:flex-row items-center justify-between"
          >
            <motion.div variants={itemVariants} className="lg:w-1/2 text-left">
              <motion.h1
                variants={itemVariants}
                className="text-6xl md:text-8xl font-extrabold bg-gradient-to-r from-emerald-300 via-green-200 to-blue-400 bg-clip-text text-transparent mb-6 drop-shadow-2xl tracking-tight"
              >
                SteppePulse
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="text-xl md:text-3xl text-gray-100 mb-8 leading-relaxed drop-shadow-lg font-light"
              >
                Transforming Digital Engagement into Tangible Environmental Restoration
              </motion.p>
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-6"
              >
                <motion.button
                  onClick={() => navigate('/explore')}
                  whileHover="hover"
                  variants={itemVariants}
                  className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-10 py-4 rounded-full text-lg font-semibold flex items-center shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300"
                >
                  <Leaf className="mr-2" /> Regenerate Now
                </motion.button>
                <motion.button
                  variants={itemVariants}
                  whileHover="hover"
                  onClick={() => navigate('/about')}
                  className="bg-white/10 backdrop-blur-md border-2 border-emerald-500/50 text-emerald-300 px-10 py-4 rounded-full text-lg font-semibold flex items-center shadow-lg transition-all duration-300 hover:bg-white/15"
                >
                  <Globe className="mr-2" /> Our Vision
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Features Section */}
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
              whileHover={{ 
                scale: 1.05, 
                rotate: index % 2 === 0 ? 2 : -2,
                transition: { duration: 0.3 }
              }}
              className="relative group"
            >
              <div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-gray-700/50 transform transition-all duration-300 hover:border-emerald-500/50">
                <div
                  className={`inline-block p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-4 shadow-lg`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-300 mb-4">{feature.text}</p>
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  whileHover={{ height: 'auto', opacity: 1 }}
                  className="overflow-hidden text-gray-400 text-sm"
                >
                  {feature.details}
                </motion.div>
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

      {/* Scroll Hint */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          repeat: Infinity, 
          duration: 1.5, 
          repeatType: 'mirror' 
        }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-50 text-white/70"
      >
        <ChevronDown className="w-10 h-10 animate-bounce" />
      </motion.div>
    </div>
  );
};

export default HeroPage;