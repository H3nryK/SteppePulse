import React from 'react';
import { motion } from 'framer-motion';
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

const AboutPage = () => {
  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'Conservation Lead',
      image: '/api/placeholder/200/200',
      description: 'PhD in Wildlife Conservation'
    },
    {
      name: 'Michael Chen',
      role: 'Blockchain Developer',
      image: '/api/placeholder/200/200',
      description: '10+ years in Web3'
    },
    // Add more team members
  ];

  const stats = [
    { icon: Heart, value: '50K+', label: 'NFTs Minted' },
    { icon: Globe, value: '25+', label: 'Countries' },
    { icon: Shield, value: '$2M+', label: 'Conservation Fund' },
    { icon: Users, value: '100K+', label: 'Community Members' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Hero Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative h-[60vh] overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src="/api/placeholder/1920/1080"
            alt="Wildlife"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 container mx-auto h-full flex items-center px-4">
          <motion.div variants={itemVariants}>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Our Mission
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl">
              Leveraging blockchain technology to create sustainable funding for wildlife conservation and empower local communities.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 py-16"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="text-center"
            >
              <div className="flex justify-center mb-4">
                <stat.icon className="w-12 h-12 text-green-600" />
              </div>
              <div className="text-4xl font-bold text-gray-800 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Values Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white py-16"
      >
        <div className="container mx-auto px-4">
          <motion.h2
            variants={itemVariants}
            className="text-4xl font-bold text-center text-gray-800 mb-12"
          >
            Our Values
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-50 rounded-2xl p-8 text-center"
              >
                <value.icon className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Team Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 py-16"
      >
        <motion.h2
          variants={itemVariants}
          className="text-4xl font-bold text-center text-gray-800 mb-12"
        >
          Meet Our Team
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-1">
                  {member.name}
                </h3>
                <p className="text-green-600 mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AboutPage;