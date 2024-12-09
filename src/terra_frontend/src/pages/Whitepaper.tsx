import { useState, useRef } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  PieChart, Pie, Cell, ResponsiveContainer 
} from 'recharts';
import { 
  Globe, Zap, Lock, TrendingUp, 
  MapPin, PawPrint, TreeDeciduous, Bird, Waves, BookOpen, Feather 
} from 'lucide-react';
import { FaInfinity, FaChargingStation } from "react-icons/fa";
import { GiTeamIdea } from "react-icons/gi";

// Wildlife Impact Data with Progress Tracking
const wildlifeImpactData = [
  { species: 'Black rhino', progress: 55, description: 'Poaching, habitat loss, and climate change are the main threats to this species.'},
  { species: 'Javan rhino', progress: 30, description: 'Poaching and the illegal trade of their parts, especially their horn'},
  { species: 'Eastern gorilla', progress: 25, description: 'Marine Ecosystem Restoration'},
  { species: 'Tana River mangabey', progress: 45, description: "considered one of the world's 25 most threatened primates."}
];

// Enhanced Tokenomics Data
const tokenomicsData = [
  { 
    name: 'ICP Hub Kenya', 
    value: 7, 
    color: '#2E6780', 
    icon: FaInfinity,
    description: 'Direct funding for conservation projects'
  },
  { 
    name: 'Liquidity', 
    value: 50, 
    color: '#2ECC71', 
    icon: PawPrint,
    description: 'Direct funding for conservation projects'
  },
  { 
    name: 'Ecosystem Development', 
    value: 5, 
    color: '#3498DB', 
    icon: TreeDeciduous,
    description: 'Blockchain infrastructure and technology'
  },
  { 
    name: 'Team', 
    value: 7, 
    color: '#eff542', 
    icon: GiTeamIdea,
    description: 'Scientific research and tracking technologies'
  },
  { 
    name: 'Marketing', 
    value: 9, 
    color: '#f5425a ', 
    icon: FaChargingStation,
    description: 'Scientific research and tracking technologies'
  },
  { 
    name: 'Wildlife Kitty', 
    value: 5, 
    color: '#F39C12', 
    icon: Bird,
    description: 'Scientific research and tracking technologies'
  },
  { 
    name: 'Community Engagement', 
    value: 17, 
    color: '#9B59B6', 
    icon: Waves,
    description: 'Education and global awareness'
  }
];

// Detailed Roadmap Data
const roadmapData = [
  {
    quarter: 'Q1 2025',
    milestones: [
      'Platform Development Launch',
      'Initial Blockchain Integration',
      'NFT & Stepul marketplace launch',
      'First Conservation Partnership Signed'
    ],
    status: 'upcoming'
  },
  {
    quarter: 'Q2 2025',
    milestones: [
      'AI & IOT - powered Conservation Monitoring',
      'Global Conservation Network Expansion',
      'Advanced Tracking Technology Rollout',
      'Community Engagement Program Launch'
    ],
    status: 'upcoming'
  },
  {
    quarter: 'Q3 2025',
    milestones: [
      'International Research Collaborations',
      'Sustainable Development Initiatives'
    ],
    status: 'upcoming'
  }
];

const StepulWhitepaper = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const sectionRefs = {
    overview: useRef(null),
    tokenomics: useRef(null),
    impact: useRef(null),
    roadmap: useRef(null)
  };

  // Roadmap Section Component
  const RoadmapSection = () => (
    <section ref={sectionRefs.roadmap} className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-green-400 flex items-center">
        <MapPin className="mr-3 text-blue-500" />
        Project Milestones
      </h2>
      <div className="grid md:grid-cols-3 gap-4">
        {roadmapData.map((phase) => (
          <div 
            key={phase.quarter} 
            className="bg-gray-700 p-4 rounded-lg transform transition-all hover:scale-105"
          >
            <h3 className="text-xl font-semibold text-white mb-3">{phase.quarter}</h3>
            <ul className="space-y-2">
              {phase.milestones.map((milestone, index) => (
                <li 
                  key={index} 
                  className="flex items-center text-gray-300"
                >
                  <Zap className="mr-2 text-green-500" size={16} />
                  {milestone}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );

  // Tokenomics Section with Enhanced Visualization
  const TokenomicsSection = () => (
    <section ref={sectionRefs.tokenomics} className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-green-400 flex items-center">
        <BookOpen className="mr-3 text-blue-500" />
        Tokenomics Breakdown
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Pie Chart Visualization */}
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-white mb-4">Token Allocation</h3>
          <ResponsiveContainer width="100%" height={500}>
            <PieChart>
              <Pie
                data={tokenomicsData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {tokenomicsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#333', color: '#fff' }}
                itemStyle={{ color: '#fff' }}
              />
              <Legend 
                layout="vertical" 
                verticalAlign="bottom" 
                align="center"
                formatter={(value, entry) => (
                  <span className="text-white">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Detailed Allocation List */}
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-white mb-4">Allocation Details</h3>
          {tokenomicsData.map((allocation) => {
            const Icon = allocation.icon;
            return (
              <div 
                key={allocation.name} 
                className="flex items-center mb-3 bg-gray-600 p-3 rounded-lg"
              >
                <Icon className="mr-3 text-white" size={24} />
                <div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-white">{allocation.name}</span>
                    <span className="text-green-400">{allocation.value}%</span>
                  </div>
                  <p className="text-gray-300 text-sm">{allocation.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );

  // Wildlife Impact Section with Bar Chart
  const WildlifeImpactSection = () => (
    <section ref={sectionRefs.impact} className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-green-400 flex items-center">
        <Feather className="mr-3 text-green-500" />
        Wildlife Impact Projection
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Bar Chart Visualization */}
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-white mb-4">Conservation Projection on Impact</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={wildlifeImpactData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="species" tick={{ fill: 'white' }} />
              <YAxis tick={{ fill: 'white' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#333', color: '#fff' }}
                itemStyle={{ color: '#fff' }}
              />
              <Bar dataKey="progress" fill="#2ECC71">
                {wildlifeImpactData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill="#2ECC71" />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Detailed Impact List */}
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-white mb-4">Project Details</h3>
          {wildlifeImpactData.map((project) => (
            <div 
              key={project.species} 
              className="mb-4 bg-gray-600 p-3 rounded-lg"
            >
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-white">{project.species}</span>
                <span className="text-green-400">{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-500 rounded-full h-2.5 mb-2">
                <div 
                  className="bg-green-500 h-2.5 rounded-full" 
                  style={{ width: `${project.progress}%` }}
                />
              </div>
              <div className="flex justify-between text-gray-300 text-sm">
                <span>{project.description}</span>  
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  return (
    <div className="bg-gray-900 text-white min-h-screen px-8 md:p-10">
      <div className="max-w-6xl mx-auto py-10 ">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
            Stepul
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Official SteppePulse Token
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
          {activeSection === 'roadmap' && <RoadmapSection />}
        </div>
      </div>
    </div>
  );
};

export default StepulWhitepaper;