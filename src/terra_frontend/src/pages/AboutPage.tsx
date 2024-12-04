import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Heart, 
  Globe, 
  Shield, 
  Users, 
  MessageCircle,
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

  const socialLinks = [
    { 
      icon: FaTelegram, 
      name: 'Telegram', 
      url: 'https://t.me/yourchannellink',
      color: 'text-blue-400'
    },
    { 
      icon: RiTwitterXFill, 
      name: 'X (Twitter)', 
      url: 'https://twitter.com/yourhandle',
      color: 'text-white'
    },
    { 
      icon: FaWhatsapp, 
      name: 'WhatsApp', 
      url: 'https://wa.me/yournumber',
      color: 'text-green-500'
    },
    { 
      icon: FaInstagram, 
      name: 'Instagram', 
      url: 'https://instagram.com/yourprofile',
      color: 'text-pink-500'
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
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
            src="/images/bg-8.jpg"
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
        ref={aboutRef}
        initial="hidden"
        animate={aboutInView ? "visible" : "hidden"}
        className="container mx-auto px-4 py-20 bg-gray-900/50"
      >
        <motion.h2
          variants={variants}
          custom={0.3}
          className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-12"
        >
          About Our Mission
        </motion.h2>
        <motion.div
          variants={variants}
          custom={0.5}
          className="max-w-4xl mx-auto text-center text-gray-300 text-lg leading-relaxed space-y-6"
        >
          <p>
            We are pioneering a revolutionary approach to wildlife conservation by leveraging the power of blockchain technology and NFTs. Our mission is to create a sustainable ecosystem where digital innovation meets environmental preservation.
          </p>
          <p>
            By connecting passionate individuals with critical conservation efforts, we aim to transform how we protect and support the world's most vulnerable wildlife habitats and species.
          </p>
          <p>
            Every digital asset we create represents more than just a token – it's a direct lifeline to protecting biodiversity, supporting local communities, and creating a lasting impact on our planet's future.
          </p>
        </motion.div>
      </motion.div>

      {/* Socials */}
      <motion.div
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 py-20"
      >
        <motion.h2
          variants={variants}
          custom={0.3}
          className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-12"
        >
          Connect With Us
        </motion.h2>
        <div className="flex justify-center space-x-8">
          {socialLinks.map((social, index) => (
            <motion.a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={variants}
              custom={index * 0.2}
              whileHover="hover"
              className={`${social.color} hover:scale-110 transition-transform duration-300`}
            >
              <social.icon className="w-12 h-12" />
              <span className="sr-only">{social.name}</span>
            </motion.a>
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
        ref={contactRef}
        initial="hidden"
        animate={contactInView ? "visible" : "hidden"}
        className="container mx-auto px-4 py-20 bg-gray-900/50"
      >
        <motion.h2
          variants={variants}
          custom={0.3}
          className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-12"
        >
          Get In Touch
        </motion.h2>
        <div className="max-w-xl mx-auto bg-gray-800/50 p-8 rounded-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
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
        </div>
      </motion.div>

      {/* FAQs Section */}
      <motion.div
        ref={faqRef}
        initial="hidden"
        animate={faqInView ? "visible" : "hidden"}
        className="container mx-auto px-4 py-20"
      >
        <motion.h2
          variants={variants}
          custom={0.3}
          className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-12"
        >
          Frequently Asked Questions
        </motion.h2>
        <div className="max-w-3xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={variants}
              custom={index * 0.2}
              className="bg-gray-800/50 rounded-2xl p-6"
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
  );
};

export default AboutPage;
