import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Heart, 
  Globe, 
  Shield, 
  Users, 
  Target,
  Sprout,
  Award,
  Camera
} from 'lucide-react';
import Bree from '/team/bree.jpg';
import Mirriam from '/team/mirriam.jpg';
import Henry from "/team/DSC09687-2.jpg";
import Elephant from "/images/bg-8.jpg";

const AboutPage = () => {
  const teamMembers = [
    {
      name: 'Henry Kimani',
      role: 'CEO & co-founder',
      image: Henry,
      description: 'Software Engineer.'
    },
    {
      name: 'Bridgit Nyambeka',
      role: 'Project Manager & co-founder',
      image: Bree,
      description: 'Software Engineer & Graphic Designer'
    },
    {
      name: 'Mirriam Njeri',
      role: 'Marketing, Community lead & co-founder',
      image: Mirriam,
      description: 'Journalist & software developer.'
    },
    {
      name: 'Brandistone Nyambonyi',
      role: 'CTO & co-founder',
      image: Bree,
      description: 'Software Developer'
    },
  ];

  const stats = [
    { icon: Heart, value: '50K+', label: 'NFTs Minted' },
    { icon: Globe, value: '25+', label: 'Countries' },
    { icon: Shield, value: '$2M+', label: 'Conservation Fund' },
    { icon: Users, value: '100K+', label: 'Community Members' }
  ];

  // Enhanced animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const scaleIn = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  // Scroll animation hooks
  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [statsRef, statsInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [valuesRef, valuesInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [teamRef, teamInView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Enhanced Hero Section */}
      <motion.div
        ref={heroRef}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={fadeInUp}
        className="relative h-[70vh] overflow-hidden"
      >
        <div className="absolute inset-0">
          <motion.img
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            src={Elephant}
            alt="Wildlife"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 container mx-auto h-full flex items-center px-4">
          <div className="space-y-6">
            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            >
              Our Mission
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-white/90 max-w-2xl leading-relaxed"
            >
              Leveraging blockchain technology to create sustainable eco-system for wildlife conservation and empower local communities.
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Stats Section */}
      <motion.div
        ref={statsRef}
        initial="hidden"
        animate={statsInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="container mx-auto px-4 py-20"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={scaleIn}
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow"
            >
              <motion.div 
                className="flex justify-center mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <stat.icon className="w-12 h-12 text-green-600" />
              </motion.div>
              <motion.div className="text-4xl font-bold text-gray-800 mb-2">
                {stat.value}
              </motion.div>
              <motion.div className="text-gray-600">{stat.label}</motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Enhanced Values Section */}
      <motion.div
        ref={valuesRef}
        initial="hidden"
        animate={valuesInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="bg-white py-20"
      >
        <div className="container mx-auto px-4">
          <motion.h2
            variants={fadeInUp}
            className="text-4xl font-bold text-center text-gray-800 mb-16"
          >
            Our Values
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: Target,
                title: 'Innovation',
                description: 'Pioneering blockchain solutions for conservation'
              },
              {
                icon: Sprout,
                title: 'Sustainability',
                description: 'Creating lasting impact for future generations'
              },
              {
                icon: Award,
                title: 'Transparency',
                description: 'Open and verifiable conservation funding'
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
                }}
                className="bg-gray-50 rounded-2xl p-8 text-center transform transition-all duration-300"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <value.icon className="w-12 h-12 text-green-600 mx-auto mb-4" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Enhanced Team Section */}
      <motion.div
        ref={teamRef}
        initial="hidden"
        animate={teamInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="container mx-auto px-4 py-20"
      >
        <motion.h2
          variants={fadeInUp}
          className="text-4xl font-bold text-center text-gray-800 mb-16"
        >
          Meet Our Team
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
              }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300"
            >
              <div className="relative overflow-hidden">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                  src={member.image}
                  alt={member.name}
                  className="w-full h-72 object-cover"
                />
              </div>
              <motion.div 
                className="p-6"
                variants={fadeInUp}
              >
                <h3 className="text-xl font-bold text-gray-800 mb-1">
                  {member.name}
                </h3>
                <p className="text-green-600 mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AboutPage;