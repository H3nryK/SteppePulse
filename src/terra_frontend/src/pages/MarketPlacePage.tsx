import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Activity,
  BarChart2,
  Clock,
  Globe,
  Users
} from 'lucide-react';

const MarketplacePage = () => {
  const [timeframe, setTimeframe] = useState('24h');
  
  // Sample data for the chart
  const chartData = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 5000 },
    { name: 'Apr', value: 4500 },
    { name: 'May', value: 6000 },
    { name: 'Jun', value: 5500 }
  ];

  const stats = [
    { 
      label: 'Total Volume', 
      value: '$12.5M',
      change: '+15.2%',
      icon: DollarSign,
      positive: true
    },
    {
      label: 'Active Traders',
      value: '2,341',
      change: '+8.7%',
      icon: Users,
      positive: true
    },
    {
      label: 'Conservation Impact',
      value: '1,234 ha',
      change: '+25.4%',
      icon: Globe,
      positive: true
    }
  ];

  const timeframes = ['24h', '7d', '30d', 'All'];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto"
      >
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-green-400 mb-2">
              Conservation Market
            </h1>
            <p className="text-gray-400">
              Real-time trading insights and conservation impact
            </p>
          </div>
          
          {/* Timeframe Selector */}
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

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <stat.icon className="w-6 h-6 text-green-400 mr-2" />
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
        </div>

        {/* Chart Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-2xl p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Trading Volume</h2>
            <div className="flex items-center text-gray-400">
              <Clock className="w-4 h-4 mr-2" />
              Last updated: Just now
            </div>
          </div>
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
        </motion.div>

        {/* Recent Trades */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-2xl p-6"
        >
          <h2 className="text-xl font-bold mb-6">Recent Trades</h2>
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
                {[1, 2, 3, 4, 5].map((_, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-b border-gray-700"
                  >
                    <td className="py-4">
                      <div className="flex items-center">
                        <img 
                          src="/api/placeholder/32/32" 
                          alt="NFT" 
                          className="w-8 h-8 rounded-full mr-2"
                        />
                        <span>Serengeti Lion #{index + 1}</span>
                      </div>
                    </td>
                    <td className="text-right">
                      <div className="text-green-400">2.5 ICP</div>
                    </td>
                    <td className="text-right text-gray-400">0x1234...5678</td>
                    <td className="text-right text-gray-400">0x8765...4321</td>
                    <td className="text-right text-gray-400">2 mins ago</td>
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