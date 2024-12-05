import React, { useState, useEffect, useRef } from 'react';
import { 
  Leaf, 
  Shield, 
  Globe, 
  Zap, 
  Lock, 
  Users, 
  TrendingUp, 
  MapPin,
  PawPrint,
  TreeDeciduous,
  Bird,
  Waves,
  BookOpen,
  Feather
} from 'lucide-react';

// Enhanced animal conservation data
const wildlifeImpactData = [
  { species: 'Elephant', progress: 35, description: 'Habitat Protection' },
  { species: 'Tiger', progress: 45, description: 'Anti-Poaching Initiatives' },
  { species: 'Coral Reef', progress: 25, description: 'Marine Ecosystem Restoration' },
  { species: 'Rainforest', progress: 55, description: 'Carbon Offset Programs' }
];

// Tokenomics Distribution Data with animal-themed allocation
const tokenomicsData = [
  { name: 'Wildlife Conservation', value: 40, color: '#2ECC71', icon: PawPrint },
  { name: 'Ecosystem Development', value: 30, color: '#3498DB', icon: TreeDeciduous },
  { name: 'Research & Innovation', value: 20, color: '#F39C12', icon: Bird },
  { name: 'Community Engagement', value: 10, color: '#9B59B6', icon: Waves }
];

const StepulWhitepaper = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [animationTrigger, setAnimationTrigger] = useState(false);
  const sectionRefs = {
    overview: useRef(null),
    tokenomics: useRef(null),
    impact: useRef(null),
    roadmap: useRef(null)
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
        }
      });
    }, observerOptions);

    // Observe all section refs
    Object.values(sectionRefs).forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    // Trigger initial animations
    const animationTimer = setTimeout(() => {
      setAnimationTrigger(true);
    }, 500);

    return () => {
      clearTimeout(animationTimer);
      Object.values(sectionRefs).forEach(ref => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, []);

  const WildlifeImpactSection = () => (
    <section ref={sectionRefs.impact} className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-green-400 flex items-center">
        <Feather className="mr-3 text-green-500" />
        Wildlife Impact Tracker
      </h2>
      <div className="grid md:grid-cols-2 gap-4">
        {wildlifeImpactData.map((project, index) => (
          <div 
            key={project.species} 
            className="bg-gray-700 p-4 rounded-lg transform transition-all hover:scale-105"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-semibold text-white">{project.species}</h3>
              <span className="text-green-400 font-bold">{project.progress}%</span>
            </div>
            <div className="w-full bg-gray-600 rounded-full h-2.5">
              <div 
                className="bg-green-500 h-2.5 rounded-full" 
                style={{ width: `${project.progress}%` }}
              />
            </div>
            <p className="text-gray-300 mt-2">{project.description}</p>
          </div>
        ))}
      </div>
    </section>
  );

  const TokenomicsSection = () => (
    <section ref={sectionRefs.tokenomics} className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-green-400 flex items-center">
        <BookOpen className="mr-3 text-blue-500" />
        Tokenomics Breakdown
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Token Distribution Visualization */}
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-white mb-4">Token Allocation</h3>
          <div className="space-y-3">
            {tokenomicsData.map((allocation) => {
              const Icon = allocation.icon;
              return (
                <div 
                  key={allocation.name} 
                  className="flex items-center space-x-3 bg-gray-600 p-3 rounded-lg"
                >
                  <Icon className="text-white" size={24} />
                  <div className="flex-grow">
                    <div className="flex justify-between text-white">
                      <span>{allocation.name}</span>
                      <span>{allocation.value}%</span>
                    </div>
                    <div 
                      className="h-2 rounded-full mt-1" 
                      style={{ 
                        width: `${allocation.value}%`, 
                        backgroundColor: allocation.color 
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Total Supply Visualization */}
        <div className="bg-gray-700 p-4 rounded-lg flex flex-col items-center justify-center">
          <svg viewBox="0 0 200 200" className="w-full max-w-xs">
            <circle cx="100" cy="100" r="90" fill="rgba(0,0,0,0.3)" />
            <text 
              x="100" 
              y="100" 
              textAnchor="middle" 
              className="text-3xl font-bold fill-white"
              dy=".3em"
            >
              100M
              <tspan 
                x="100" 
                dy="1.5em" 
                className="text-base fill-gray-300"
              >
                Total Tokens
              </tspan>
            </text>
          </svg>
          <p className="text-gray-300 text-center mt-4">
            Carefully allocated to maximize conservation impact
          </p>
        </div>
      </div>
    </section>
  );

  return (
    <div className="bg-gray-900 text-white min-h-screen p-4 md:p-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
            Stepul
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Blockchain-Powered Wildlife Conservation
          </p>
        </header>

        {/* Navigation */}
        <nav className="mb-10 flex flex-wrap justify-center gap-4">
          {[
            { id: 'overview', label: 'Overview', icon: Globe },
            { id: 'tokenomics', label: 'Tokenomics', icon: Lock },
            { id: 'impact', label: 'Wildlife Impact', icon: PawPrint },
            { id: 'roadmap', label: 'Roadmap', icon: TrendingUp }
          ].map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`
                flex items-center px-4 py-2 rounded-full transition-all 
                ${activeSection === section.id 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }
              `}
            >
              <section.icon className="mr-2" size={20} />
              {section.label}
            </button>
          ))}
        </nav>

        {/* Dynamic Content Sections */}
        <div className="space-y-10">
          {activeSection === 'overview' && (
            <section ref={sectionRefs.overview} className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-3xl font-bold mb-6 text-green-400 flex items-center">
                <TreeDeciduous className="mr-3 text-green-500" />
                Our Mission
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-lg text-gray-300">
                    Stepul combines cutting-edge blockchain technology with a passionate 
                    commitment to wildlife conservation. By leveraging the Internet Computer 
                    (ICP) blockchain, we create a transparent, efficient ecosystem that 
                    directly supports global conservation efforts.
                  </p>
                </div>
                <div className="flex items-center justify-center">
                  <svg 
                    viewBox="0 0 300 200" 
                    className="w-full max-w-md animate-pulse"
                  >
                    <path 
                      d="M50 100 Q150 20, 250 100 T450 100" 
                      fill="none" 
                      stroke="#4CAF50" 
                      strokeWidth="3"
                    />
                    <circle cx="150" cy="100" r="10" fill="#2ECC71" />
                    <circle cx="250" cy="100" r="10" fill="#27AE60" />
                  </svg>
                </div>
              </div>
            </section>
          )}

          {activeSection === 'tokenomics' && <TokenomicsSection />}
          {activeSection === 'impact' && <WildlifeImpactSection />}
          {activeSection === 'roadmap' && (
            <section ref={sectionRefs.roadmap} className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-3xl font-bold mb-6 text-green-400 flex items-center">
                <MapPin className="mr-3 text-blue-500" />
                Project Milestones
              </h2>
              <div className="relative">
                {[
                  { quarter: 'Q1 2025', milestone: 'Platform Launch', icon: Zap },
                  { quarter: 'Q3 2025', milestone: 'Conservation Partnerships', icon: Users },
                  { quarter: 'Q1 2026', milestone: 'Global Expansion', icon: Globe }
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div 
                      key={item.quarter}
                      className="flex items-center mb-6 transform transition-all hover:scale-105"
                    >
                      <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mr-4">
                        <Icon className="text-green-400" size={32} />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">{item.quarter}</h3>
                        <p className="text-gray-300">{item.milestone}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center">
          <div className="flex justify-center space-x-4 mb-6">
            <PawPrint className="text-green-400 animate-bounce" size={32} />
            <TreeDeciduous className="text-blue-400 animate-pulse" size={32} />
            <Bird className="text-yellow-400 animate-spin" size={32} />
          </div>
          <p className="text-gray-400">
            © 2024 Stepul. Empowering Conservation Through Blockchain.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default StepulWhitepaper;

// Add custom animations to Tailwind config
const tailwindConfig = {
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-in-up': 'fadeInUp 0.7s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    }
  }
};