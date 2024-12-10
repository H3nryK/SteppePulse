import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Heart, 
  Globe, 
  Shield, 
  Users, 
  MessageCircle,
  Feather,
  Leaf,
  PawPrint,
  Bird,
  Mountain,
  Turtle,
  TreePine,
} from 'lucide-react';
import { FaWhatsapp, FaTelegram, FaInstagram } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";

const AboutPage = () => {
  const [activeVideo, setActiveVideo] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const teamMembers = [
    {
      name: 'Henry Kimani',
      role: 'CEO & co-founder',
      image: '/team/DSC09687-2.jpg',
      description: 'Software Engineer.'
    },
    {
      name: 'Bridgit Nyambeka',
      role: 'Project Manager & co-founder',
      image: '/team/bree.jpg',
      description: 'Software Engineer & Graphic Designer'
    },
    {
      name: 'Mirriam Njeri',
      role: 'Marketing, Community lead & co-founder',
      image: '/team/mirriam.jpg',
      description: 'Journalist & software developer.'
    },
    {
      name: 'Brandistone Nyabonyi',
      role: 'CTO & co-founder',
      image: '/team/brandy.jpg',
      description: 'Software Engineer'
    },
  ];

  const stats = [
    { icon: Heart, value: '0', label: 'NFTs Minted', description: 'Unique digital assets supporting wildlife' },
    { icon: Globe, value: '1', label: 'Countries', description: 'Global conservation network' },
    { icon: Shield, value: '$5+', label: 'Conservation Fund', description: 'Direct impact on ecosystem preservation' },
    { icon: Users, value: '600+', label: 'Community Members', description: 'Passionate advocates for change' }
  ];

  const faqs = [
    {
      question: "What is our primary mission?",
      answer: "We aim to leverage blockchain technology to support wildlife conservation efforts, creating unique digital assets that directly contribute to ecosystem preservation."
    },
    {
      question: "How do NFTs support conservation?",
      answer: "Each NFT represents a direct contribution to wildlife protection, with proceeds funding conservation projects, research, and habitat preservation."
    },
    {
      question: "Can anyone join the community?",
      answer: "Absolutely! We welcome anyone passionate about wildlife conservation and innovative blockchain solutions to join our global community."
    },
    {
      question: "How are funds used?",
      answer: "Funds are carefully allocated to vetted conservation projects, scientific research, and community-driven initiatives that protect endangered ecosystems."
    }
  ];

  const socialPlatforms = [
    { 
      icon: FaTelegram, 
      name: 'Telegram', 
      url: 'https://t.me/steppepulse',
      color: 'text-blue-400',
      animal: Bird,
      description: 'Swift communication like a soaring eagle'
    },
    { 
      icon: RiTwitterXFill, 
      name: 'X (Twitter)', 
      url: 'https://x.com/steppepulse',
      color: 'text-white',
      animal: PawPrint,
      description: 'Tracking our conservation journey'
    },
    { 
      icon: FaWhatsapp, 
      name: 'WhatsApp', 
      url: 'https://whatsapp.com/channel/0029VasrR7A35fLvuli9qG0m',
      color: 'text-green-500',
      animal: Leaf,
      description: 'Growing our green community'
    },
    { 
      icon: FaInstagram, 
      name: 'Instagram', 
      url: 'https://www.instagram.com/steppe_pulse',
      color: 'text-pink-500',
      animal: Mountain,
      description: "Capturing nature's breathtaking moments"
    },
  ];

  const ecosystemData = [
    {
      icon: Turtle,
      title: 'Marine Conservation',
      description: 'Protecting ocean biodiversity through blockchain-powered initiatives',
      color: 'text-teal-400',
      background: 'bg-blue-900/20'
    },
    {
      icon: TreePine,
      title: 'Forest Preservation',
      description: 'Securing critical forest habitats and supporting reforestation efforts',
      color: 'text-green-400',
      background: 'bg-green-900/20'
    },
    {
      icon: Mountain,
      title: 'Alpine Ecosystem',
      description: 'Safeguarding high-altitude wildlife and fragile mountain environments',
      color: 'text-indigo-400',
      background: 'bg-indigo-900/20'
    },
    {
      icon: Bird,
      title: 'Migratory Pathways',
      description: 'Tracking and protecting critical migration routes for endangered species',
      color: 'text-sky-400',
      background: 'bg-sky-900/20'
    }
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
  const [aboutRef, aboutInView] = createInViewHook();
  const [teamRef, teamInView] = createInViewHook();
  const [contactRef, contactInView] = createInViewHook();
  const [faqRef, faqInView] = createInViewHook();
  
  const [activeAnimal, setActiveAnimal] = useState<String | null>(null);
  const [activeEcosystem, setActiveEcosystem] = useState<string | null>(null);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    // TODO: Implement actual form submission logic
    console.log('Form submitted', formData);
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      message: ''
    });
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
            src="/images/rhino.jpg"
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
              className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 p-4"
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
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 text-center border shadow-2xl transition-all duration-300 hover:border-emerald-500/50 hover:shadow-emerald-500/30 transform hover:-translate-y-3"
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

      {/* About the Project */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-20 py-20 bg-gray-900/50"
      >
        <motion.h2
          className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-16"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Our Holistic Conservation Approach
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            className="space-y-6 text-gray-300 text-lg leading-relaxed"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p>
              We're pioneering a revolutionary intersection of blockchain technology and wildlife conservation. 
              Our mission transcends traditional boundaries, creating a dynamic ecosystem where digital innovation 
              directly supports environmental preservation.
            </p>
            <p>
              By leveraging NFT technology, we transform digital assets into powerful conservation tools, 
              connecting passionate global citizens with critical environmental challenges.
            </p>
            <p>
              Each digital token represents more than a collectible – it's a direct lifeline to protecting 
              biodiversity, empowering local communities, and creating measurable impact.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {ecosystemData.map((ecosystem, index) => (
              <motion.div
                key={index}
                onHoverStart={() => setActiveEcosystem(ecosystem.title)}
                onHoverEnd={() => setActiveEcosystem(null)}
                whileHover={{ scale: 1.05 }}
                className={`
                  p-6 rounded-2xl transition-all duration-300 
                  ${activeEcosystem === ecosystem.title 
                    ? `${ecosystem.background} border-2 border-emerald-500` 
                    : 'bg-gray-800/30'}
                  cursor-pointer
                `}
              >
                <div className="flex items-center mb-4">
                  <ecosystem.icon 
                    className={`w-10 h-10 mr-4 ${ecosystem.color} 
                      ${activeEcosystem === ecosystem.title ? 'animate-pulse' : ''}
                    `} 
                  />
                  <h3 className="text-xl font-bold text-gray-200">
                    {ecosystem.title}
                  </h3>
                </div>
                <p className="text-gray-400 text-sm">
                  {ecosystem.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Animated Background Elements */}
        <motion.div 
          className="absolute left-0 top-1/3 opacity-20"
          animate={{ 
            x: [0, 20, -20, 0],
            rotate: [0, 10, -10, 0]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "loop"
          }}
        >
          <Leaf className="w-64 h-64 text-green-300" />
        </motion.div>
        
        <motion.div 
          className="absolute right-0 bottom-1/3 opacity-20"
          animate={{ 
            x: [-20, 0, -20],
            y: [0, 30, -30, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "loop"
          }}
        >
          <PawPrint className="w-48 h-48 text-blue-300" />
        </motion.div>
      </motion.div>

      {/* Socials */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 py-20"
      >
        <motion.h2
          className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-12"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Join Our Wildlife Conservation Journey
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {socialPlatforms.map((platform, index) => (
            <motion.div
              key={index}
              whileHover={{ 
                scale: 1.05,
                rotate: [0, 5, -5, 0],
                transition: { duration: 0.3 }
              }}
              onHoverStart={() => setActiveAnimal(platform.name)}
              onHoverEnd={() => setActiveAnimal(null)}
              className="relative group"
            >
              <motion.a
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative"
              >
                <div className={`
                  w-full h-64 flex flex-col items-center justify-center 
                  rounded-2xl border-2 border-transparent 
                  bg-gray-800/50 backdrop-blur-sm 
                  transition-all duration-300
                  ${activeAnimal === platform.name 
                    ? 'border-emerald-500 shadow-2xl shadow-emerald-500/30' 
                    : 'hover:border-emerald-500/50'
                  }
                `}>
                  <motion.div 
                    className={`
                      mb-4 ${platform.color} 
                      transition-all duration-300 
                      group-hover:scale-125
                    `}
                  >
                    <platform.icon className="w-16 h-16" />
                  </motion.div>
                  
                  <h3 className="text-xl font-bold text-gray-200 mb-2">
                    {platform.name}
                  </h3>
                  
                  <p className="text-gray-400 text-center px-4">
                    {platform.description}
                  </p>
                </div>
              </motion.a>
              
              {activeAnimal === platform.name && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute -top-16 left-1/2 -translate-x-1/2 
                    bg-gray-900/80 backdrop-blur-sm 
                    rounded-full p-4 
                    shadow-2xl shadow-emerald-500/30"
                >
                  <platform.animal className="w-12 h-12 text-emerald-400" />
                </motion.div>
              )}
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
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/30 transform transition-all shadow-2xl duration-300 hover:border-emerald-500/50 hover:shadow-emerald-500/30 hover:-translate-y-3"
            >
              <div className="relative">
                <motion.img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-82 object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-green-300 mb-1">{member.name}</h3>
                <p className="text-gray-400 mb-2">{member.role}</p>
                <p className="text-sm text-gray-500">{member.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* Contact Section */}
      <motion.div 
        initial="hidden"
        animate="visible"
        className="container mx-auto p-20 flex flex-col md:flex-row gap-12"
      >
        {/* Contact Section - Left Side */}
        <motion.div 
          variants={variants}
          custom={0.3}
          className="w-full md:w-1/2 relative"
        >
          <motion.div 
            className="absolute -top-10 -left-10 z-0"
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 0.9, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "loop"
            }}
          >
            <Leaf className="w-24 h-24 text-green-300/30" />
          </motion.div>
          
          <motion.div 
            className="relative z-10 bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-8">
              Get In Touch
            </h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-700 text-gray-200 border-none rounded-lg p-3 focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-700 text-gray-200 border-none rounded-lg p-3 focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-300 mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full bg-gray-700 text-gray-200 border-none rounded-lg p-3 focus:ring-2 focus:ring-emerald-500"
                ></textarea>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-3 rounded-lg hover:from-green-500 hover:to-blue-600 transition-all duration-300"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </motion.div>

        {/* FAQs Section - Right Side */}
        <motion.div 
          variants={variants}
          custom={0.5}
          className="w-full md:w-1/2 relative"
        >
          <motion.div 
            className="absolute -top-10 -right-10 z-0"
            animate={{ 
              x: [0, 20, -20, 0],
              rotate: [0, 15, -15, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "loop"
            }}
          >
            <Feather className="w-24 h-24 text-blue-300/30" />
          </motion.div>

          <motion.div 
            className="relative z-10"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  variants={variants}
                  custom={index * 0.2}
                  className="bg-gray-800/50 rounded-2xl p-6"
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: 'rgba(31, 41, 55, 0.6)'
                  }}
                >
                  <div className="flex items-center mb-4">
                    <MessageCircle className="w-6 h-6 text-green-400 mr-3" />
                    <h3 className="text-xl font-semibold text-green-300">{faq.question}</h3>
                  </div>
                  <p className="text-gray-400">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default AboutPage;
