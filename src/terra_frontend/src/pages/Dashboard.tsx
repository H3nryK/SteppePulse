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
  Activity
} from 'lucide-react';
import { EventHandlers } from '@react-three/fiber/dist/declarations/src/core/events';
import { JSX } from 'react/jsx-runtime';

import { terra_backend } from '../../../declarations/terra_backend';
import { Principal } from '@dfinity/principal';

// Type Definitions
type UserId = string;
type NFTId = string;
type Rarity = 'Common' | 'Rare' | 'Epic' | 'Legendary';
type TransactionType = 'Purchase' | 'Donation' | 'Reward';
type ProjectType = 'Wildlife' | 'Forest' | 'Ocean' | 'Climate';

// Interfaces
interface UserProfile {
  id: UserId;
  username: string;
  avatar?: string;
  adoptions: NFTId[];
  contributions: number;
  badges: string[];
  balance: number;
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
}

interface NFT {
  id: NFTId;
  name: string;
  imageUrl: string;
  category: ProjectType;
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
const ConservationDashboard = ({ onLogout }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [principal, setPrincipal] = useState('');

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    setIsLoading(true);
    try {
      const info = await terra_backend.whoami();
      const principal = blobToPrincipal(info._arr);
      setPrincipal(principal);
    } catch (error) {
      console.error('Error fetching user info:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to convert Uint8Array to string
  const blobToPrincipal = (blob) => {
    // Convert array to Uint8Array
    const uint8Array = new Uint8Array(blob);
  
    // Decode as Principal
    const principal = Principal.fromUint8Array(uint8Array);
    
    // Convert Principal to text format
    return principal.toText();
  }

  // State Management
  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: 'user_001',
    username: "Global Ecosystem Guardian",
    avatar: "/images/user.png",
    adoptions: ['nft_001', 'nft_002'],
    contributions: 15670,
    badges: ['Early Adopter', 'Conservation Hero', 'Climate Champion'],
    balance: 8420,
    tier: 'Gold'
  });

  const [nftCollection, setNFTCollection] = useState<NFT[]>([
    {
      id: 'nft_001',
      name: "Endangered Jaguar Sanctuary",
      imageUrl: "/images/bg-6.jpg",
      category: "Wildlife",
      rarity: "Epic",
      conservationStatus: "Amazon Rainforest Protection",
      coordinates: [-3.4653, -62.2159, 0],
      impactMetrics: {
        carbonOffset: 5600,
        speciesProtected: 42,
        habitatPreserved: 10500
      }
    },
    {
      id: 'nft_002',
      name: "Arctic Polar Bear Haven",
      imageUrl: "/images/bg-6.jpg",
      category: "Wildlife", 
      rarity: "Legendary",
      conservationStatus: "Polar Ice Cap Preservation",
      coordinates: [74.5, -94.1, 0],
      impactMetrics: {
        carbonOffset: 8900,
        speciesProtected: 28,
        habitatPreserved: 15200
      }
    }
  ]);

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 'tx_001',
      from: 'platform',
      to: userProfile.id,
      amount: 500,
      timestamp: Date.now(),
      transactionType: 'Reward',
      project: 'Wildlife'
    },
    {
      id: 'tx_002',
      from: userProfile.id,
      to: 'conservation_fund',
      amount: 1000,
      timestamp: Date.now() - 86400000,
      transactionType: 'Donation',
      project: 'Forest'
    }
  ]);

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
    <Canvas>
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <EarthGlobe position={[0, 0, 0]} />
        <Environment preset="sunset" />
        <Stars 
          radius={100} 
          depth={50} 
          count={5000} 
          factor={4} 
          saturation={0} 
        />
        <OrbitControls />
      </Suspense>
    </Canvas>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 text-white">
      <div className="grid grid-cols-3 gap-8 p-8">
        {/* 3D Global Impact Visualization */}
        <div className="col-span-3 h-[40vh]">
          <DashboardVisualization />
        </div>

        {/* User Profile Section */}
        <motion.div 
          className="bg-gray-800/60 backdrop-blur-xl rounded-3xl p-8 border border-green-700/30 shadow-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <img 
                src={userProfile.avatar} 
                alt={userProfile.username} 
                className="w-20 h-20 rounded-full border-4 border-green-500"
              />
              <div>
                <h2 className="text-2xl font-bold text-green-300">
                  {principal}
                </h2>
                <div className="flex items-center space-x-2">
                  <Trophy 
                    className={`
                      ${userProfile.tier === 'Platinum' ? 'text-white' : 
                        userProfile.tier === 'Gold' ? 'text-yellow-400' : 
                        userProfile.tier === 'Silver' ? 'text-gray-300' : 
                        'text-yellow-700'}
                    `} 
                  />
                  <span className="text-sm text-gray-400">
                    {userProfile.tier} Tier
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Impact Metrics */}
          <div className="space-y-4 mt-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-700/50 rounded-xl p-4 text-center">
                <Globe className="mx-auto text-green-500 mb-2" />
                <span className="block text-sm text-gray-400">Total Impact</span>
                <span className="font-bold text-green-300">
                  ${userProfile.contributions}
                </span>
              </div>
              <div className="bg-gray-700/50 rounded-xl p-4 text-center">
                <Trees className="mx-auto text-blue-500 mb-2" />
                <span className="block text-sm text-gray-400">Conservation Tokens</span>
                <span className="font-bold text-blue-300">
                  {userProfile.balance}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* NFT Collection Section */}
        <motion.div 
          className="bg-gray-800/60 backdrop-blur-xl rounded-3xl p-8 border border-purple-700/30 shadow-2xl"
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
                      {nft.impactMetrics.carbonOffset} kg CO2
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievements Section */}
        <motion.div 
          className="bg-gray-800/60 backdrop-blur-xl rounded-3xl p-8 border border-amber-700/30 shadow-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-2xl font-semibold mb-6 text-amber-300 flex items-center">
            <Medal className="mr-3 text-amber-400" />
            Global Achievements
          </h3>
          <div className="space-y-4">
            {achievements.map((achievement) => (
              <motion.div 
                key={achievement.id}
                className="bg-gray-700/50 rounded-xl p-4 flex items-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-200">{achievement.name}</p>
                  <p className="text-sm text-gray-400">{achievement.description}</p>
                </div>
                <Trophy 
                  className={`
                    ${achievement.rarity === 'Legendary' ? 'text-yellow-500' : 
                      achievement.rarity === 'Epic' ? 'text-purple-500' : 
                      achievement.rarity === 'Rare' ? 'text-blue-500' : 
                      'text-gray-500'}
                  `} 
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ConservationDashboard;