import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Activity,
  BarChart2,
  Clock,
  Globe,
  Users,
  Zap,
  PieChart,
  Award
} from 'lucide-react';

const MarketplacePage = () => {
  const [timeframe, setTimeframe] = useState('24h');
  const [activeTab, setActiveTab] = useState('Market');
  const [isLoading, setIsLoading] = useState(true);

  // Simulated data generation
  const generateChartData = (baseline: number) => {
    return Array.from({ length: 6 }, (_, i) => ({
      name: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i],
      value: baseline + Math.random() * 2000
    }));
  };

  const [chartData, setChartData] = useState(generateChartData(4000));

  // Simulate data updates
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setChartData(generateChartData(4000));
    }, 1500);

    return () => clearTimeout(timer);
  }, [timeframe]);

  const stats = [
    { 
      label: 'Total Volume', 
      value: '$12.5M',
      change: '+15.2%',
      icon: DollarSign,
      positive: true,
      color: 'text-green-400'
    },
    {
      label: 'Active Traders',
      value: '2,341',
      change: '+8.7%',
      icon: Users,
      positive: true,
      color: 'text-blue-400'
    },
    {
      label: 'Conservation Impact',
      value: '1,234 ha',
      change: '+25.4%',
      icon: Globe,
      positive: true,
      color: 'text-teal-400'
    }
  ];

  const tabs = ['Market', 'My Collection', 'Conservation'];
  const timeframes = ['24h', '7d', '30d', 'All'];

  const recentTrades = [
    { 
      nft: 'Serengeti Lion', 
      price: '2.5 ICP', 
      from: '0x1234...5678', 
      to: '0x8765...4321', 
      time: '2 mins ago',
      species: 'African Lion'
    },
    { 
      nft: 'Amazon Jaguar', 
      price: '3.2 ICP', 
      from: '0x9876...5432', 
      to: '0x2345...6789', 
      time: '15 mins ago',
      species: 'Panthera Onca'
    },
    // Add more trade entries
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto"
      >
        {/* Header with Navigation Tabs */}
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8 mt-16"
        >
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div>
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-2">
                Wildlife Conservation Market
              </h1>
              <p className="text-gray-400 max-w-xl">
                Explore, trade, and make a difference. Each NFT purchase supports 
                wildlife preservation and habitat restoration.
              </p>
            </div>

            {/* Tab Navigation */}
            <div className="flex bg-gray-800 rounded-xl p-1 mt-4 md:mt-0">
              {tabs.map((tab) => (
                <motion.button
                  key={tab}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeTab === tab 
                      ? 'bg-green-600 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {tab}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Timeframe Selector */}
          <div className="flex justify-center mb-6">
            <div className="flex gap-2 bg-gray-800 p-1 rounded-lg">
              {timeframes.map((tf) => (
                <motion.button
                  key={tf}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setTimeframe(tf)}
                  className={`px-4 py-2 rounded-lg ${
                    timeframe === tf 
                      ? 'bg-green-600 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {tf}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stats Grid with Animations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <AnimatePresence>
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800 rounded-2xl p-6 hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <stat.icon className={`w-6 h-6 ${stat.color} mr-2`} />
                    <span className="text-gray-400">{stat.label}</span>
                  </div>
                  <div className={`flex items-center ${
                    stat.positive ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {stat.positive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                    <span className="ml-1">{stat.change}</span>
                  </div>
                </div>
                <div className="text-3xl font-bold">{stat.value}</div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Trading Volume Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-2xl p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold flex items-center">
              <BarChart2 className="mr-2 text-green-400" /> Trading Volume
            </h2>
            <div className="flex items-center text-gray-400">
              <Clock className="w-4 h-4 mr-2" />
              Last updated: Just now
            </div>
          </div>

          {isLoading ? (
            <div className="h-[400px] flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 1, 
                  ease: "linear" 
                }}
              >
                <Zap className="w-12 h-12 text-green-400 animate-pulse" />
              </motion.div>
            </div>
          ) : (
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937',
                      border: 'none',
                      borderRadius: '0.5rem',
                      color: '#fff'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#10B981" 
                    strokeWidth={2}
                    dot={{ fill: '#10B981' }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </motion.div>

        {/* Recent Trades with Enhanced Animations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-2xl p-6"
        >
          <h2 className="text-xl font-bold mb-6 flex items-center">
            <Award className="mr-2 text-yellow-400" /> Recent Trades
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-gray-400 border-b border-gray-700">
                  <th className="pb-4 text-left">NFT</th>
                  <th className="pb-4 text-right">Price</th>
                  <th className="pb-4 text-right">From</th>
                  <th className="pb-4 text-right">To</th>
                  <th className="pb-4 text-right">Time</th>
                </tr>
              </thead>
              <tbody>
                {recentTrades.map((trade, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-b border-gray-700 hover:bg-gray-700 transition-colors"
                  >
                    <td className="py-4">
                      <div className="flex items-center">
                        <img 
                          src="/api/placeholder/32/32" 
                          alt="NFT" 
                          className="w-8 h-8 rounded-full mr-2"
                        />
                        <div>
                          <div>{trade.nft}</div>
                          <div className="text-xs text-gray-500">{trade.species}</div>
                        </div>
                      </div>
                    </td>
                    <td className="text-right">
                      <div className="text-green-400">{trade.price}</div>
                    </td>
                    <td className="text-right text-gray-400">{trade.from}</td>
                    <td className="text-right text-gray-400">{trade.to}</td>
                    <td className="text-right text-gray-400">{trade.time}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MarketplacePage;