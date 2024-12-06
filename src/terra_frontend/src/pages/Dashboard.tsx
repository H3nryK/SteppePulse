import { useState, Suspense } from 'react';
import { Canvas, Euler, ExtendedColors, Layers, Matrix4, NodeProps, NonFunctionKeys, Overwrite, Quaternion, Vector3 } from '@react-three/fiber';
import { 
  motion} from 'framer-motion';
import { 
  OrbitControls, 
  Environment, 
  Stars, 
  useTexture 
} from '@react-three/drei';
import * as THREE from 'three';
import { 
  Wallet, 
  Users, 
  Trophy,
  Heart,
  Globe,
  Trees,
  CreditCard,
  Star,
  Compass
} from 'lucide-react';
import { Principal } from '@dfinity/principal';
import { terra_backend } from '../../../declarations/terra_backend';
import { EventHandlers } from '@react-three/fiber/dist/declarations/src/core/events';

// Type Definitions
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
const ConservationDashboard = () => {
  // State Management
  const [userProfile, setUserProfile] = useState([]);
  const [userPrincipal, setUserPrincipal] = useState<string | null>(null);
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

  const fetchProfile = async () => {
    try {
      const principal = await terra_backend.whoami();
      const info = blobToPrincipal(principal._arr);
      setUserPrincipal(info);

      const result = await terra_backend.getUserProfile(principal);
      setUserProfile([result]);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const blobToPrincipal = (blob) => {
    // Convert array to Uint8Array
    const uint8Array = new Uint8Array(blob);
  
    // Decode as Principal
    const principal = Principal.fromUint8Array(uint8Array);
    
    // Convert Principal to text format
    return principal.toText();
  }

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-8 py-10 md:py-20">
          {/* 3D Global Impact Visualization */}
          <div className="col-span-3 h-[50vh] rounded-3xl overflow-hidden shadow-2xl border border-green-800/30">
            <DashboardVisualization />
          </div>
  
          {/* User Profile Section - Improved Mobile Responsiveness */}
          <motion.div 
            className="md:col-span-1 bg-gray-800/70 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-green-700/30 shadow-2xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col md:flex-row items-center justify-center md:justify-between mb-6">
              <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
                <div className="w-16 md:w-20 h-16 md:h-20 bg-green-700/50 rounded-full flex items-center justify-center">
                  <Users className="w-8 md:w-10 h-8 md:h-10 text-green-300" />
                </div>
                <div className="text-center md:text-left">
                  <h2 className="text-xl md:text-2xl font-bold text-green-300">
                    {userPrincipal}
                  </h2>
                  <div className="flex items-center justify-center md:justify-start space-x-2">
                    <Trophy className="text-yellow-400 w-4 h-4 md:w-5 md:h-5" />
                    <span className="text-xs md:text-sm text-gray-400">
                      Conservation Profile
                    </span>
                  </div>
                </div>
              </div>
            </div>
  
            {/* Enhanced Impact Metrics */}
            <div className="space-y-4 mt-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-700/50 rounded-xl p-3 md:p-4 text-center">
                  <Globe className="mx-auto text-green-500 mb-2 w-6 md:w-8 h-6 md:h-8" />
                  <span className="block text-xs md:text-sm text-gray-400">Total Impact</span>
                  <span className="font-bold text-green-300 text-sm md:text-base">
                    --
                  </span>
                </div>
                <div className="bg-gray-700/50 rounded-xl p-3 md:p-4 text-center">
                  <Trees className="mx-auto text-blue-500 mb-2 w-6 md:w-8 h-6 md:h-8" />
                  <span className="block text-xs md:text-sm text-gray-400">Conservation Tokens</span>
                  <span className="font-bold text-blue-300 text-sm md:text-base">
                    --
                  </span>
                </div>
              </div>
  
              {/* Badges Section */}
              <div className="mt-4">
                <h3 className="text-base md:text-lg font-semibold text-gray-200 mb-2 flex items-center justify-center md:justify-start">
                  <Star className="mr-2 text-amber-400 w-4 h-4 md:w-5 md:h-5" /> Achievements
                </h3>
                <div className="flex justify-center md:justify-start">
                  <h2 className="text-sm md:text-lg font-semibold text-gray-200">No badges yet</h2>
                </div>
              </div>
            </div>

            {/* Wallet Connection */}
            <Wallet />
          </motion.div>
  
          {/* NFT Collection Section - Improved Mobile Responsiveness */}
          <motion.div 
            className="md:col-span-1 bg-gray-800/70 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-purple-700/30 shadow-2xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl md:text-2xl font-semibold mb-6 text-purple-300 flex items-center justify-center md:justify-start">
              <Heart className="mr-3 text-red-400 w-5 md:w-6 h-5 md:h-6" />
              Conservation NFTs
            </h3>
            <div className="space-y-4 text-center md:text-left">
              <h2 className="text-base md:text-lg font-semibold text-gray-200">
                No NFTs collected
              </h2>
              <div className="grid grid-cols-3 gap-4 opacity-30">
                {[1,2,3].map((item) => (
                  <div 
                    key={item} 
                    className="aspect-square bg-gray-700 rounded-lg flex items-center justify-center"
                  >
                    <Heart className="text-purple-400 w-6 h-6" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
  
          {/* Milestones and Marketplace Section - Improved Mobile Responsiveness */}
          <motion.div 
            className="md:col-span-1 bg-gray-800/70 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-amber-700/30 shadow-2xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="mb-6">
              <h3 className="text-xl md:text-2xl font-semibold text-amber-300 flex items-center justify-center md:justify-start">
                <Compass className="mr-3 text-amber-400 w-5 md:w-6 h-5 md:h-6" />
                Active Milestones
              </h3>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-700/50 rounded-xl p-4 text-center md:text-left">
                <h2 className="text-sm md:text-base font-semibold text-gray-200 mb-2">
                  No milestones found
                </h2>
                <div className="grid grid-cols-3 gap-2 opacity-30">
                  {[1,2,3].map((milestone) => (
                    <div 
                      key={milestone} 
                      className="bg-gray-600 rounded-lg p-2 flex items-center justify-center"
                    >
                      <Compass className="text-amber-400 w-4 h-4" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
  
            {/* Marketplace Statistics */}
            <div className="mt-6">
              <h3 className="text-base md:text-xl font-semibold text-gray-200 mb-4 flex items-center justify-center md:justify-start">
                <CreditCard className="mr-3 text-indigo-400 w-4 md:w-5 h-4 md:h-5" />
                Marketplace Overview
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-700/50 rounded-xl p-3 md:p-4 text-center">
                  <span className="block text-xs md:text-sm text-gray-400">Total Volume</span>
                  <span className="font-bold text-indigo-300 text-sm md:text-base">
                    ${marketplaceStats.totalVolume.toLocaleString()}
                  </span>
                </div>
                <div className="bg-gray-700/50 rounded-xl p-3 md:p-4 text-center">
                  <span className="block text-xs md:text-sm text-gray-400">Unique Owners</span>
                  <span className="font-bold text-purple-300 text-sm md:text-base">
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

function async() {
  throw new Error('Function not implemented.');
}
