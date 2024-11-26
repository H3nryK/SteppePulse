import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Heart, 
  Globe, 
  Shield, 
  Users, 
  Target,
  Sprout,
  Award,
  Camera,
  Play,
  Pause
} from 'lucide-react';
import Bree from '../../public/team/bree.jpg';
import Mirriam from '../../public/team/mirriam.jpg';
import Henry from "../../public/team/DSC09687-2.jpg";
import Elephant from "../../public/images/bg-8.jpg";

const AboutPage = () => {
  const [activeVideo, setActiveVideo] = useState(null);

  const teamMembers = [
    {
      name: 'Henry Kimani',
      role: 'CEO & co-founder',
      image: Henry,
      description: 'Software Engineer.',
      bio: 'A visionary leader with a passion for technology and conservation.',
      video: null  // Add video URL if available
    },
    {
      name: 'Bridgit Nyambeka',
      role: 'Project Manager & co-founder',
      image: Bree,
      description: 'Software Engineer & Graphic Designer',
      bio: 'Bridging technology and creative design to drive meaningful change.',
      video: null
    },
    {
      name: 'Mirriam Njeri',
      role: 'Marketing, Community lead & co-founder',
      image: Mirriam,
      description: 'Journalist & software developer.',
      bio: 'Amplifying conservation stories through innovative digital platforms.',
      video: null
    },
    {
      name: 'Brandistone Nyambonyi',
      role: 'CTO & co-founder',
      image: Bree,
      description: 'Software Developer',
      bio: 'Technical architect driving blockchain solutions for environmental impact.',
      video: null
    },
  ];

  const stats = [
    { icon: Heart, value: '0', label: 'NFTs Minted', description: 'Unique digital assets supporting wildlife' },
    { icon: Globe, value: '1', label: 'Countries', description: 'Global conservation network' },
    { icon: Shield, value: '$5+', label: 'Conservation Fund', description: 'Direct impact on ecosystem preservation' },
    { icon: Users, value: '600+', label: 'Community Members', description: 'Passionate advocates for change' }
  ];

  // Enhanced animation variants
  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { 
        delay, 
        duration: 0.6, 
        type: "spring", 
        stiffness: 100 
      }
    }),
    hover: { 
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  };

  const pageVariants = {
    initial: { opacity: 0, background: 'rgba(0,0,0,0)' },
    animate: { 
      opacity: 1, 
      background: 'linear-gradient(135deg, rgba(16,22,58,1) 0%, rgba(32,44,96,1) 100%)',
      transition: { duration: 1, delay: 0.5 }
    }
  };

  // Intersection Observer hooks
  const createInViewHook = () => useInView({ 
    threshold: 0.1, 
    triggerOnce: true 
  });

  const [heroRef, heroInView] = createInViewHook();
  const [statsRef, statsInView] = createInViewHook();
  const [valuesRef, valuesInView] = createInViewHook();
  const [teamRef, teamInView] = createInViewHook();

  const toggleVideoPlay = (index) => {
    setActiveVideo(activeVideo === index ? null : index);
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={pageVariants}
      className="min-h-screen text-gray-100"
    >
      {/* Hero Section with Parallax-like Effect */}
      <motion.div
        ref={heroRef}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        className="relative h-[80vh] overflow-hidden"
      >
        <motion.div 
          className="absolute inset-0"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        >
          <motion.img
            src={Elephant}
            alt="Wildlife Conservation"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-black/60" />
        </motion.div>
        
        <motion.div 
          variants={variants}
          custom={0.5}
          className="relative z-10 container mx-auto h-full flex items-center px-4"
        >
          <div className="space-y-6 text-center">
            <motion.h1 
              variants={variants}
              custom={0.7}
              className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500"
            >
              Reimagining Conservation
            </motion.h1>
            <motion.p
              variants={variants}
              custom={0.9}
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            >
              Bridging blockchain technology with wildlife preservation to create a sustainable future for our planet's most precious ecosystems.
            </motion.p>
          </div>
        </motion.div>
      </motion.div>

      {/* Stats Section with Expanded Descriptions */}
      <motion.div
        ref={statsRef}
        initial="hidden"
        animate={statsInView ? "visible" : "hidden"}
        className="container mx-auto px-4 py-20"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={variants}
              custom={index * 0.2}
              whileHover="hover"
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 text-center border border-gray-700/30 transform transition-all"
            >
              <motion.div 
                className="flex justify-center mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <stat.icon className="w-12 h-12 text-green-400" />
              </motion.div>
              <div className="text-4xl font-bold text-green-300 mb-2">{stat.value}</div>
              <div className="text-gray-400 mb-2">{stat.label}</div>
              <p className="text-sm text-gray-500">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Team Section with Expanded Profiles */}
      <motion.div
        ref={teamRef}
        initial="hidden"
        animate={teamInView ? "visible" : "hidden"}
        className="container mx-auto px-4 py-20"
      >
        <motion.h2
          variants={variants}
          custom={0.3}
          className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-16"
        >
          Meet Our Innovative Team
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              variants={variants}
              custom={index * 0.2}
              whileHover="hover"
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/30 transform transition-all"
            >
              <div className="relative">
                <motion.img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-72 object-cover"
                />
                {member.video && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={() => toggleVideoPlay(index)}
                    className="absolute top-4 right-4 bg-black/50 p-2 rounded-full"
                  >
                    {activeVideo === index ? <Pause className="text-white" /> : <Play className="text-white" />}
                  </motion.button>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-green-300 mb-1">{member.name}</h3>
                <p className="text-gray-400 mb-2">{member.role}</p>
                <p className="text-sm text-gray-500">{member.description}</p>
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ 
                    height: 'auto', 
                    opacity: 1,
                    transition: { duration: 0.3 }
                  }}
                  className="mt-4 text-gray-300 text-sm"
                >
                  {member.bio}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AboutPage;