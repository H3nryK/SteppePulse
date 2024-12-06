import React, { useState, useEffect, Suspense } from 'react';
import { Canvas, Euler, ExtendedColors, Layers, Matrix4, NodeProps, NonFunctionKeys, Overwrite, Quaternion, Vector3 } from '@react-three/fiber';
import { 
  motion, 
  AnimatePresence 
} from 'framer-motion';
import { 
  OrbitControls, 
  Environment, 
  Stars, 
  useTexture 
} from '@react-three/drei';
import * as THREE from 'three';
import { 
  Leaf, 
  Wallet, 
  Shield, 
  Users, 
  Trophy,
  ArrowUpRight,
  Heart,
  Globe,
  Trees,
  Medal,
  CreditCard,
  Activity,
  Star,
  Compass
} from 'lucide-react';
import { terra_backend } from '../../../declarations/terra_backend';
import { EventHandlers } from '@react-three/fiber/dist/declarations/src/core/events';

// Type Definitions
type UserId = string;
type NFTId = string;
type Rarity = 'Common' | 'Rare' | 'Epic' | 'Legendary';
type TransactionType = 'Purchase' | 'Donation' | 'Reward';
type ProjectType = 'Wildlife' | 'Forest' | 'Ocean' | 'Climate';


interface Milestone {
  id: string;
  description: string;
  status: string;
  fundingRequired: number;
  targetDate: number;
  completedDate?: number;
} 

interface NFT {
  id: NFTId;
  name: string;
  imageUrl: string;
  rarity: Rarity;
  conservationStatus: string;
  coordinates?: [number, number, number];
  impactMetrics: {
    carbonOffset: number;
    speciesProtected: number;
    habitatPreserved: number;
  };
}

interface Transaction {
  id: string;
  from: string;
  to: string;
  amount: number;
  nftId?: NFTId;
  timestamp: number;
  transactionType: TransactionType;
  project?: ProjectType;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  criteria: {
    type: string;
    threshold: number;
  };
  rewardAmount: number;
  rarity: Rarity;
}

// 3D Earth Globe Component
function EarthGlobe(props: JSX.IntrinsicAttributes & Omit<ExtendedColors<Overwrite<Partial<THREE.Mesh<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.Material | THREE.Material[], THREE.Object3DEventMap>>, NodeProps<THREE.Mesh<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.Material | THREE.Material[], THREE.Object3DEventMap>, typeof THREE.Mesh>>>, NonFunctionKeys<{ position?: Vector3; up?: Vector3; scale?: Vector3; rotation?: Euler; matrix?: Matrix4; quaternion?: Quaternion; layers?: Layers; dispose?: (() => void) | null; }>> & { position?: Vector3; up?: Vector3; scale?: Vector3; rotation?: Euler; matrix?: Matrix4; quaternion?: Quaternion; layers?: Layers; dispose?: (() => void) | null; } & EventHandlers) {
  const texture = useTexture('/images/earth.jpg');

  return (
    <mesh {...props}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

// Main Dashboard Component
const ConservationDashboard: React.FC = () => {
  // State Management
  const [userProfile, setUserProfile] = useState(null);
  const [nftCollection, setNFTCollection] = useState([]);

  const [marketplaceStats, setMarketplaceStats] = useState({
    totalVolume: 250000,
    totalTransactions: 1245,
    uniqueOwners: 876,
    avgPrice: 320
  });

  const [milestones, setMilestones] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 'ach_001',
      name: "Wildlife Protector",
      description: "Support 5 different wildlife conservation projects",
      criteria: { type: 'Conservation', threshold: 5 },
      rewardAmount: 1000,
      rarity: 'Rare'
    },
    {
      id: 'ach_002',
      name: "Ecosystem Champion",
      description: "Contribute over $10,000 to conservation efforts",
      criteria: { type: 'Contribution', threshold: 10000 },
      rewardAmount: 2500,
      rarity: 'Epic'
    }
  ]);

  // 3D Visualization Render
  const DashboardVisualization = () => (
    <Canvas camera={{ position: [0, 0, 3],fov: 45 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <EarthGlobe position={[0, 0, 0]}  />
        <Environment preset="sunset" />
        <Stars 
          radius={100} 
          depth={50} 
          count={5000} 
          factor={4} 
          saturation={0} 
        />
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Suspense>
    </Canvas>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="grid grid-cols-3 gap-8 px-8 py-20">
        {/* Enhanced 3D Global Impact Visualization */}
        <div className="col-span-3 h-[50vh] rounded-3xl overflow-hidden shadow-2xl border border-green-800/30">
          <DashboardVisualization />
        </div>

        {/* User Profile Section */}
        <motion.div 
          className="bg-gray-800/70 backdrop-blur-xl rounded-3xl p-8 border border-green-700/30 shadow-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-green-700/50 rounded-full flex items-center justify-center">
                <Users className="w-10 h-10 text-green-300" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-green-300">
                  {userProfile.username}
                </h2>
                <div className="flex items-center space-x-2">
                  <Trophy className="text-yellow-400" />
                  <span className="text-sm text-gray-400">
                    Conservation Profile
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Impact Metrics */}
          <div className="space-y-4 mt-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-700/50 rounded-xl p-4 text-center">
                <Globe className="mx-auto text-green-500 mb-2" />
                <span className="block text-sm text-gray-400">Total Impact</span>
                <span className="font-bold text-green-300">
                  ${userProfile.contributions.toLocaleString()}
                </span>
              </div>
              <div className="bg-gray-700/50 rounded-xl p-4 text-center">
                <Trees className="mx-auto text-blue-500 mb-2" />
                <span className="block text-sm text-gray-400">Conservation Tokens</span>
                <span className="font-bold text-blue-300">
                  {userProfile.balance.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Badges Section */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-200 mb-2 flex items-center">
                <Star className="mr-2 text-amber-400" /> Achievements
              </h3>
              <div className="flex space-x-2">
                {userProfile.badges.map((badge, index) => (
                  <span 
                    key={index} 
                    className="bg-gray-700 text-xs px-2 py-1 rounded-full text-gray-300"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* NFT Collection Section */}
        <motion.div 
          className="bg-gray-800/70 backdrop-blur-xl rounded-3xl p-8 border border-purple-700/30 shadow-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-2xl font-semibold mb-6 text-purple-300 flex items-center">
            <Heart className="mr-3 text-red-400" />
            Conservation NFTs
          </h3>
          <div className="space-y-4">
            {nftCollection.map((nft) => (
              <motion.div 
                key={nft.id}
                className="bg-gray-700/50 rounded-xl p-4 flex items-center hover:bg-gray-700/70 transition"
                whileHover={{ scale: 1.05 }}
              >
                <img 
                  src={nft.imageUrl} 
                  alt={nft.name} 
                  className="w-20 h-20 rounded-lg mr-4 object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-200">{nft.name}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">{nft.rarity}</span>
                    <span className="text-sm text-blue-400">
                      ${nft.price.toLocaleString()}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Milestones and Marketplace Section */}
        <motion.div 
          className="bg-gray-800/70 backdrop-blur-xl rounded-3xl p-8 border border-amber-700/30 shadow-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="mb-6">
            <h3 className="text-2xl font-semibold text-amber-300 flex items-center">
              <Compass className="mr-3 text-amber-400" />
              Active Milestones
            </h3>
          </div>
          <div className="space-y-4">
            {milestones.map((milestone) => (
              <div 
                key={milestone.id}
                className="bg-gray-700/50 rounded-xl p-4 flex items-center"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-200">{milestone.description}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className={`
                      text-sm px-2 py-1 rounded-full
                      ${milestone.status === 'Funded' ? 'bg-green-700/50 text-green-300' : 
                        milestone.status === 'In Progress' ? 'bg-blue-700/50 text-blue-300' : 
                        'bg-gray-700/50 text-gray-300'}
                    `}>
                      {milestone.status}
                    </span>
                    <span className="text-sm text-gray-400">
                      ${milestone.fundingRequired.toLocaleString()} required
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Marketplace Statistics */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-200 mb-4 flex items-center">
              <CreditCard className="mr-3 text-indigo-400" />
              Marketplace Overview
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-700/50 rounded-xl p-4 text-center">
                <span className="block text-sm text-gray-400">Total Volume</span>
                <span className="font-bold text-indigo-300">
                  ${marketplaceStats.totalVolume.toLocaleString()}
                </span>
              </div>
              <div className="bg-gray-700/50 rounded-xl p-4 text-center">
                <span className="block text-sm text-gray-400">Unique Owners</span>
                <span className="font-bold text-purple-300">
                  {marketplaceStats.uniqueOwners}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ConservationDashboard;