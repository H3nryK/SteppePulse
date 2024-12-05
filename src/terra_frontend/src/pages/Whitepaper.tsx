import React, { useState, useEffect } from 'react';
import { 
  Award, 
  Leaf, 
  Shield, 
  Globe, 
  Zap, 
  Lock, 
  Users, 
  TrendingUp, 
  MapPin 
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

// Tokenomics Distribution Data
const tokenomicsData = [
  { name: 'Community Incentives', value: 40, color: '#4CAF50' },
  { name: 'Development Fund', value: 30, color: '#2196F3' },
  { name: 'Team Allocation', value: 20, color: '#FF9800' },
  { name: 'Advisors & Partnerships', value: 10, color: '#9C27B0' }
];

// Roadmap Progress Data
const roadmapProgressData = [
  { quarter: 'Q1 2025', progress: 20, milestone: 'Token Launch' },
  { quarter: 'Q2 2025', progress: 40, milestone: 'Staking Mechanisms' },
  { quarter: 'Q3 2025', progress: 60, milestone: 'Marketplace Launch' },
  { quarter: 'Q4 2025', progress: 80, milestone: 'Partnerships' },
  { quarter: '2026', progress: 100, milestone: 'Global Expansion' }
];

const StepulWhitepaper = () => {
  const [activeSection, setActiveSection] = useState('executive-summary');
  const [animationTrigger, setAnimationTrigger] = useState(false);

  useEffect(() => {
    // Trigger animations on component mount
    const timer = setTimeout(() => {
      setAnimationTrigger(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const renderTokenomicsPieChart = () => (
    <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
      <h3 className="text-2xl font-bold text-white mb-4">Token Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="w-full md:w-1/2">
            {tokenomicsData.map((entry) => (
              <div 
                key={entry.name} 
                className="flex items-center mb-2 text-white"
              >
                <div 
                  className="w-4 h-4 mr-2 rounded-full" 
                  style={{ backgroundColor: entry.color }}
                />
                <span>{entry.name}: {entry.value}%</span>
              </div>
            ))}
          </div>
          <div className="w-full md:w-1/2">
            <svg viewBox="0 0 400 400" className="w-full max-w-xs">
              {tokenomicsData.map((entry, index) => {
                const startAngle = index === 0 ? 0 : 
                  tokenomicsData.slice(0, index).reduce((a, b) => a + (b.value / 100 * 360), 0);
                const endAngle = startAngle + (entry.value / 100 * 360);
                
                const x1 = 200 + 150 * Math.cos(startAngle * Math.PI / 180);
                const y1 = 200 + 150 * Math.sin(startAngle * Math.PI / 180);
                const x2 = 200 + 150 * Math.cos(endAngle * Math.PI / 180);
                const y2 = 200 + 150 * Math.sin(endAngle * Math.PI / 180);
                
                return (
                  <path
                    key={entry.name}
                    d={`M 200 200 L ${x1} ${y1} A 150 150 0 ${entry.value > 50 ? 1 : 0} 1 ${x2} ${y2} Z`}
                    fill={entry.color}
                    opacity={0.8}
                  />
                );
              })}
              <circle cx="200" cy="200" r="100" fill="rgba(0,0,0,0.5)" />
              <text 
                x="200" 
                y="200" 
                textAnchor="middle" 
                dy=".3em" 
                className="text-2xl font-bold text-white"
              >
                100M
                <tspan x="200" dy="1.2em" className="text-sm">Total Tokens</tspan>
              </text>
            </svg>
          </div>
        </div>
      </ResponsiveContainer>
    </div>
  );

  const renderRoadmapTimeline = () => (
    <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
      <h3 className="text-2xl font-bold text-white mb-6">Project Roadmap</h3>
      <div className="relative">
        {roadmapProgressData.map((milestone, index) => (
          <div 
            key={milestone.quarter} 
            className={`flex items-center mb-4 transition-all duration-700 ${
              animationTrigger ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
            style={{ transitionDelay: `${index * 200}ms` }}
          >
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center mr-4 text-white"
              style={{ 
                backgroundColor: `rgba(76, 175, 80, ${milestone.progress / 100})`,
                border: '2px solid #4CAF50'
              }}
            >
              {milestone.progress}%
            </div>
            <div>
              <h4 className="text-xl font-semibold text-white">{milestone.quarter}</h4>
              <p className="text-gray-300">{milestone.milestone}</p>
            </div>
          </div>
        ))}
        <div 
          className="absolute left-[23px] top-0 bottom-0 w-1 bg-gradient-to-b from-green-500 to-blue-500"
        />
      </div>
    </div>
  );

  const renderFeatureIcons = () => {
    const features = [
      { icon: Leaf, title: 'Conservation', description: 'Support wildlife protection' },
      { icon: Shield, title: 'Security', description: 'Advanced cryptographic protocols' },
      { icon: Globe, title: 'Interoperability', description: 'Cross-blockchain connectivity' },
      { icon: Zap, title: 'Performance', description: 'High-speed transactions' }
    ];

    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {features.map((feature) => (
          <div 
            key={feature.title}
            className="bg-gray-700 p-4 rounded-lg text-center transition-transform hover:scale-105"
          >
            <feature.icon className="mx-auto mb-3 text-green-400" size={48} />
            <h4 className="text-xl font-bold text-white mb-2">{feature.title}</h4>
            <p className="text-gray-300">{feature.description}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen px-4 pt-20 md:p-10">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
            Stepul Coin
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Decentralized Ecosystem for Wildlife Conservation
          </p>
        </header>

        {/* Navigation */}
        <nav className="mb-10 flex flex-wrap justify-center gap-4">
          {[
            { id: 'executive-summary', label: 'Overview' },
            { id: 'tokenomics', label: 'Tokenomics' },
            { id: 'technology', label: 'Technology' },
            { id: 'roadmap', label: 'Roadmap' }
          ].map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`px-4 py-2 rounded-full transition-all ${
                activeSection === section.id 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {section.label}
            </button>
          ))}
        </nav>

        {/* Content Sections */}
        <div className="space-y-10">
          {activeSection === 'executive-summary' && (
            <section>
              <h2 className="text-3xl font-bold mb-6 text-green-400">Project Overview</h2>
              {renderFeatureIcons()}
              <div className="bg-gray-800 p-6 rounded-lg mt-6">
                <p className="text-lg text-gray-300">
                  Stepul is a visionary cryptocurrency leveraging the Internet Computer (ICP) 
                  blockchain to build a decentralized ecosystem dedicated to wildlife conservation. 
                  With a fixed supply of 100 million tokens, we integrate cutting-edge blockchain 
                  technology to enable seamless digital asset management while championing 
                  ecological sustainability.
                </p>
              </div>
            </section>
          )}

          {activeSection === 'tokenomics' && (
            <section>
              <h2 className="text-3xl font-bold mb-6 text-green-400">Tokenomics</h2>
              {renderTokenomicsPieChart()}
            </section>
          )}

          {activeSection === 'technology' && (
            <section>
              <h2 className="text-3xl font-bold mb-6 text-green-400">Technology Overview</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    <Lock className="inline mr-2 text-green-400" />
                    Security
                  </h3>
                  <p className="text-gray-300">
                    Implements advanced cryptographic protocols to protect user data 
                    and ensure transaction integrity on the ICP blockchain.
                  </p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    <TrendingUp className="inline mr-2 text-blue-400" />
                    Scalability
                  </h3>
                  <p className="text-gray-300">
                    Efficiently handles thousands of transactions per second, 
                    supporting a growing global user base with high-performance infrastructure.
                  </p>
                </div>
              </div>
            </section>
          )}

          {activeSection === 'roadmap' && (
            <section>
              <h2 className="text-3xl font-bold mb-6 text-green-400">Project Roadmap</h2>
              {renderRoadmapTimeline()}
            </section>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center">
          <div className="flex justify-center space-x-4 mb-6">
            <Users className="text-green-400" size={32} />
            <MapPin className="text-blue-400" size={32} />
            <Award className="text-yellow-400" size={32} />
          </div>
          <p className="text-gray-400">
            © 2024 Stepul Coin. Decentralizing Conservation, One Token at a Time.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default StepulWhitepaper;