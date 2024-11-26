import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import CTASection from '../components/CTA';
import { Leaf, Globe } from 'lucide-react';

const HeroPage: React.FC = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);

  const heroVideos = React.useMemo(
    () => [
      `${process.env.PUBLIC_URL}/videos/bg.mp4`,
      `${process.env.PUBLIC_URL}/videos/bg.mp4`,
      `${process.env.PUBLIC_URL}/videos/bg.mp4`,
    ],
    []
  );

  const [currentBg, setCurrentBg] = React.useState<string>(heroVideos[0]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prevBg) => {
        const currentIndex = heroVideos.indexOf(prevBg);
        const nextIndex = (currentIndex + 1) % heroVideos.length;
        return heroVideos[nextIndex];
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [heroVideos]);

  const features = [
    { icon: Leaf, title: 'Conservation', text: 'Support wildlife through NFTs', color: 'from-green-400 to-green-600' },
    { icon: Globe, title: 'Global Impact', text: 'Worldwide conservation network', color: 'from-blue-400 to-blue-600' },
    { icon: 'shield', title: 'Secure', text: 'Blockchain-powered protection', color: 'from-purple-400 to-purple-600' },
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

  const navigate = useNavigate(); // Initialize the navigate function

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* TerraPulse Section */}
      <div className="relative min-h-screen flex items-center justify-center bg-cover bg-center transition-all duration-1000">
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-50"
          autoPlay
          loop
          muted
          playsInline
          src={currentBg}
        ></video>
        <div className="relative z-10 container mx-auto px-4 py-24">
          <motion.div
            style={{ opacity, scale }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col lg:flex-row items-center justify-between"
          >
            {/* Text Content */}
            <motion.div variants={itemVariants} className="lg:w-1/2 text-left">
              <motion.h1
                variants={itemVariants}
                className="text-7xl md:text-8xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-6"
              >
                SteppePulse
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
                  onClick={() => navigate('/explore')} // Navigate to the Example page
                  whileHover={{ scale: 1.05, backgroundColor: '#047857' }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-10 py-4 rounded-full text-lg font-semibold flex items-center shadow-lg hover:shadow-xl transition-shadow"
                >
                  <Leaf className="mr-2" /> Adopt Now
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
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 min-h-[75vh] flex items-center justify-center bg-black/60">
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
              <div className="relative bg-white/90 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-gray-200 transform transition-transform duration-300 hover:rotate-2">
                <div
                  className={`inline-block p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-4`}
                >
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
      </div>

      {/* Background Changing Section */}
      <div className="relative z-0 min-h-screen flex items-center justify-center transition-all duration-1000">
        {/* CTA Section */}
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
